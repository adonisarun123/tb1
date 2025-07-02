import { supabase } from './supabaseClient';

interface DataLoader<T> {
  key: string;
  query: () => Promise<T>;
  priority: 'critical' | 'high' | 'normal' | 'low';
  cache: boolean;
  timeout?: number;
}

interface OptimizedDataResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fromCache: boolean;
}

class PerformanceOptimizer {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private pendingRequests = new Map<string, Promise<any>>();
  private isPreloading = false;

  // Cache TTL in milliseconds
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly CRITICAL_TTL = 2 * 60 * 1000; // 2 minutes
  private readonly HIGH_TTL = 3 * 60 * 1000; // 3 minutes

  /**
   * Load multiple data sources in parallel with optimized batching
   */
  async loadDataParallel<T extends Record<string, any>>(
    loaders: DataLoader<any>[],
    options: {
      timeoutMs?: number;
      retryAttempts?: number;
      fallbackData?: Partial<T>;
    } = {}
  ): Promise<{ [K in keyof T]: OptimizedDataResponse<T[K]> }> {
    const { timeoutMs = 10000, retryAttempts = 2, fallbackData = {} } = options;

    // Sort by priority
    const sortedLoaders = [...loaders].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, normal: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    // Execute critical requests first, then others in parallel
    const criticalLoaders = sortedLoaders.filter(l => l.priority === 'critical');
    const otherLoaders = sortedLoaders.filter(l => l.priority !== 'critical');

    const results: any = {};

    // Load critical data first
    if (criticalLoaders.length > 0) {
      const criticalPromises = criticalLoaders.map(loader =>
        this.executeLoader(loader, retryAttempts, timeoutMs)
      );
      
      const criticalResults = await Promise.allSettled(criticalPromises);
      criticalResults.forEach((result, index) => {
        const loader = criticalLoaders[index];
        results[loader.key] = this.processResult(result, loader.key, fallbackData);
      });
    }

    // Load other data in parallel (non-blocking)
    if (otherLoaders.length > 0) {
      const otherPromises = otherLoaders.map(loader =>
        this.executeLoader(loader, retryAttempts, timeoutMs)
      );
      
      const otherResults = await Promise.allSettled(otherPromises);
      otherResults.forEach((result, index) => {
        const loader = otherLoaders[index];
        results[loader.key] = this.processResult(result, loader.key, fallbackData);
      });
    }

    return results;
  }

  /**
   * Optimized Supabase data loading with intelligent batching
   */
  async loadSupabaseDataOptimized() {
    const dataLoaders: DataLoader<any>[] = [
      // Critical data (required for initial render)
      {
        key: 'activities',
        query: async () => {
          const { data, error } = await supabase.from('activities').select('*').limit(50);
          if (error) throw error;
          return data;
        },
        priority: 'critical',
        cache: true,
        timeout: 3000,
      },
      {
        key: 'destinations', 
        query: async () => {
          const { data, error } = await supabase.from('destinations').select('*').limit(20);
          if (error) throw error;
          return data;
        },
        priority: 'critical',
        cache: true,
        timeout: 3000,
      },

      // High priority data (visible above fold)
      {
        key: 'stays',
        query: async () => {
          const { data, error } = await supabase.from('stays').select('*').limit(30);
          if (error) throw error;
          return data;
        },
        priority: 'high',
        cache: true,
        timeout: 4000,
      },
      {
        key: 'regions',
        query: async () => {
          const { data, error } = await supabase.from('regions').select('*').order('name', { ascending: true });
          if (error) throw error;
          return data;
        },
        priority: 'high',
        cache: true,
      },

      // Normal priority data (below fold)
      {
        key: 'recentActivities',
        query: async () => {
          const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false });
          if (error) throw error;
          return data;
        },
        priority: 'normal',
        cache: true,
      },
      {
        key: 'teamOutingAds',
        query: async () => {
          const { data, error } = await supabase.from('team_outing_ads').select('*');
          if (error) throw error;
          return data;
        },
        priority: 'normal',
        cache: true,
      },

      // Low priority data (lazy loaded)
      {
        key: 'recentStays',
        query: async () => {
          const { data, error } = await supabase.from('stays').select('*').order('created_on', { ascending: false });
          if (error) throw error;
          return data;
        },
        priority: 'low',
        cache: true,
      },
      {
        key: 'blogPosts',
        query: async () => {
          const { data, error } = await supabase.from('blog_posts').select('*').order('published_on', { ascending: false });
          if (error) throw error;
          return data;
        },
        priority: 'low',
        cache: true,
      },

      // Metadata queries (very low priority)
      {
        key: 'activityCount',
        query: async () => {
          const { count, error } = await supabase.from('activities').select('id', { count: 'exact', head: true });
          if (error) throw error;
          return count;
        },
        priority: 'low',
        cache: true,
      },
      {
        key: 'stayCount',
        query: async () => {
          const { count, error } = await supabase.from('stays').select('id', { count: 'exact', head: true });
          if (error) throw error;
          return count;
        },
        priority: 'low',
        cache: true,
      },
    ];

    return this.loadDataParallel(dataLoaders, {
      timeoutMs: 8000,
      retryAttempts: 2,
      fallbackData: {
        activities: [],
        stays: [],
        destinations: [],
        regions: [],
        recentActivities: [],
        recentStays: [],
        blogPosts: [],
        teamOutingAds: [],
      },
    });
  }

  /**
   * Execute a single loader with caching and error handling
   */
  private async executeLoader<T>(
    loader: DataLoader<T>,
    retryAttempts: number,
    timeoutMs: number
  ): Promise<T> {
    // Check cache first
    if (loader.cache && this.isValidCache(loader.key)) {
      const cached = this.cache.get(loader.key);
      return cached!.data;
    }

    // Check if request is already pending
    if (this.pendingRequests.has(loader.key)) {
      return this.pendingRequests.get(loader.key)!;
    }

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Timeout: ${loader.key}`)), timeoutMs);
    });

    // Execute with retries
    const executeWithRetry = async (attempts: number): Promise<T> => {
      try {
        const result = await Promise.race([loader.query(), timeoutPromise]);
        
        // Cache successful result
        if (loader.cache) {
          const ttl = this.getTTL(loader.priority);
          this.cache.set(loader.key, {
            data: result,
            timestamp: Date.now(),
            ttl,
          });
        }

        return result;
      } catch (error) {
        if (attempts > 0) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryAttempts - attempts) * 100));
          return executeWithRetry(attempts - 1);
        }
        throw error;
      }
    };

    const promise = executeWithRetry(retryAttempts);
    this.pendingRequests.set(loader.key, promise);

    try {
      const result = await promise;
      this.pendingRequests.delete(loader.key);
      return result;
    } catch (error) {
      this.pendingRequests.delete(loader.key);
      throw error;
    }
  }

  /**
   * Process promise result into standardized response
   */
  private processResult<T>(
    result: PromiseSettledResult<T>,
    key: string,
    fallbackData: any
  ): OptimizedDataResponse<T> {
    if (result.status === 'fulfilled') {
      return {
        data: result.value,
        error: null,
        loading: false,
        fromCache: this.isValidCache(key),
      };
    } else {
      console.warn(`Failed to load ${key}:`, result.reason);
      return {
        data: fallbackData[key] || null,
        error: result.reason,
        loading: false,
        fromCache: false,
      };
    }
  }

  /**
   * Check if cached data is still valid
   */
  private isValidCache(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;

    const now = Date.now();
    return (now - cached.timestamp) < cached.ttl;
  }

  /**
   * Get TTL based on priority
   */
  private getTTL(priority: 'critical' | 'high' | 'normal' | 'low'): number {
    switch (priority) {
      case 'critical':
        return this.CRITICAL_TTL;
      case 'high':
        return this.HIGH_TTL;
      case 'normal':
      case 'low':
        return this.DEFAULT_TTL;
    }
  }

  /**
   * Preload data for next navigation
   */
  async preloadNextPageData(route: string) {
    if (this.isPreloading) return;

    this.isPreloading = true;

    const preloadMap: Record<string, DataLoader<any>[]> = {
      '/activities': [
        {
          key: 'activityDetails',
          query: async () => {
            const { data, error } = await supabase.from('activities').select('*').limit(100);
            if (error) throw error;
            return data;
          },
          priority: 'normal',
          cache: true,
        },
      ],
      '/stays': [
        {
          key: 'stayDetails',
          query: async () => {
            const { data, error } = await supabase.from('stays').select('*').limit(50);
            if (error) throw error;
            return data;
          },
          priority: 'normal',
          cache: true,
        },
      ],
      '/blog': [
        {
          key: 'blogDetails',
          query: async () => {
            const { data, error } = await supabase.from('blog_posts').select('*').limit(20);
            if (error) throw error;
            return data;
          },
          priority: 'normal',
          cache: true,
        },
      ],
    };

    const loaders = preloadMap[route];
    if (loaders) {
      try {
        await this.loadDataParallel(loaders, { timeoutMs: 5000 });
      } catch (error) {
        console.warn('Preload failed:', error);
      }
    }

    this.isPreloading = false;
  }

  /**
   * Clear cache for fresh data
   */
  clearCache(keys?: string[]) {
    if (keys) {
      keys.forEach(key => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheStats() {
    const now = Date.now();
    const stats = {
      totalKeys: this.cache.size,
      validKeys: 0,
      expiredKeys: 0,
      totalSize: 0,
    };

    this.cache.forEach((value, _key) => {
      const isValid = (now - value.timestamp) < value.ttl;
      if (isValid) {
        stats.validKeys++;
      } else {
        stats.expiredKeys++;
      }
      stats.totalSize += JSON.stringify(value.data).length;
    });

    return stats;
  }
}

// Singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Helper hooks for React components
export const useOptimizedData = () => {
  return {
    loadSupabaseData: () => performanceOptimizer.loadSupabaseDataOptimized(),
    preloadRoute: (route: string) => performanceOptimizer.preloadNextPageData(route),
    clearCache: (keys?: string[]) => performanceOptimizer.clearCache(keys),
    getCacheStats: () => performanceOptimizer.getCacheStats(),
  };
}; 