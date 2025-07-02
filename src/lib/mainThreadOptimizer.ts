/**
 * Main Thread Task Optimizer
 * Addresses "Avoid long main-thread tasks" performance issue
 * Breaks up long tasks to prevent blocking the main thread
 */

interface TaskOptions {
  priority?: 'high' | 'normal' | 'low';
  timeout?: number;
  breakPoint?: number;
}

interface ScheduledTask {
  fn: () => void | Promise<void>;
  priority: 'high' | 'normal' | 'low';
  timeout: number;
}

class MainThreadOptimizer {
  private taskQueue: ScheduledTask[] = [];
  private isProcessing = false;
  private frameId: number | null = null;

  /**
   * Schedule a task to run with main thread optimization
   */
  scheduleTask(
    task: () => void | Promise<void>,
    options: TaskOptions = {}
  ): void {
    const {
      priority = 'normal',
      timeout = 5000,
    } = options;

    this.taskQueue.push({
      fn: task,
      priority,
      timeout,
    });

    // Sort by priority
    this.taskQueue.sort((a, b) => {
      const priorityOrder = { high: 0, normal: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    this.processQueue();
  }

  /**
   * Break up a large task into smaller chunks
   */
  async executeInChunks<T>(
    items: T[],
    processor: (item: T, index: number) => void | Promise<void>,
    _chunkSize: number = 10
  ): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;

      const processChunk = async () => {
        const start = performance.now();
        
        // Process items in chunk - using time-based chunking instead of count-based
        while (index < items.length && (performance.now() - start) < 16) {
          await processor(items[index], index);
          index++;
        }

        if (index < items.length) {
          // More items to process - yield to browser
          this.yieldToMain(() => processChunk());
        } else {
          resolve();
        }
      };

      processChunk();
    });
  }

  /**
   * Yield control back to the main thread
   */
  yieldToMain(callback: () => void): void {
    if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
      // Use Scheduler API if available
      (window as any).scheduler.postTask(callback, { priority: 'user-blocking' });
    } else if ('requestIdleCallback' in window) {
      // Use requestIdleCallback if available
      requestIdleCallback((deadline) => {
        if (deadline.timeRemaining() > 0) {
          callback();
        } else {
          // If no idle time, use setTimeout
          setTimeout(callback, 0);
        }
      });
    } else {
      // Fallback to setTimeout
      setTimeout(callback, 0);
    }
  }

  /**
   * Process the task queue with main thread considerations
   */
  private processQueue(): void {
    if (this.isProcessing || this.taskQueue.length === 0) return;

    this.isProcessing = true;

    const processNextTask = () => {
      if (this.taskQueue.length === 0) {
        this.isProcessing = false;
        return;
      }

      const task = this.taskQueue.shift()!;
      const startTime = performance.now();

      try {
        const result = task.fn();

        // Handle both sync and async tasks
        if (result instanceof Promise) {
          result
            .then(() => {
              this.checkTaskDuration(startTime);
              this.yieldToMain(processNextTask);
            })
            .catch((error) => {
              console.error('Task execution error:', error);
              this.yieldToMain(processNextTask);
            });
        } else {
          this.checkTaskDuration(startTime);
          this.yieldToMain(processNextTask);
        }
      } catch (error) {
        console.error('Task execution error:', error);
        this.yieldToMain(processNextTask);
      }
    };

    processNextTask();
  }

  /**
   * Check if task took too long and warn if needed
   */
  private checkTaskDuration(startTime: number): void {
    const duration = performance.now() - startTime;
    
    if (duration > 50) {
      console.warn(`Long task detected: ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Optimize DOM operations by batching them
   */
  batchDOMOperations(operations: (() => void)[]): void {
    this.scheduleTask(() => {
      // Use requestAnimationFrame for DOM operations
      requestAnimationFrame(() => {
        operations.forEach(op => op());
      });
    }, { priority: 'high' });
  }

  /**
   * Defer heavy computations until the browser is idle
   */
  deferHeavyComputation(computation: () => void): void {
    this.scheduleTask(computation, { priority: 'low' });
  }

  /**
   * Break up large data processing
   */
  async processLargeDataset<T, R>(
    data: T[],
    processor: (item: T) => R,
    chunkSize: number = 100
  ): Promise<R[]> {
    const results: R[] = [];
    
    await this.executeInChunks(data, (item) => {
      results.push(processor(item));
    }, chunkSize);

    return results;
  }

  /**
   * Optimize script loading to prevent main thread blocking
   */
  loadScriptAsync(src: string, options: { defer?: boolean; module?: boolean } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      this.scheduleTask(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        
        if (options.defer) script.defer = true;
        if (options.module) script.type = 'module';

        script.onload = () => resolve();
        script.onerror = reject;

        document.head.appendChild(script);
      }, { priority: 'normal' });
    });
  }

  /**
   * Clear all pending tasks
   */
  clearTasks(): void {
    this.taskQueue = [];
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    this.isProcessing = false;
  }
}

// Create singleton instance
export const mainThreadOptimizer = new MainThreadOptimizer();

// Utility functions for common patterns
export const optimizedSetTimeout = (callback: () => void, delay: number = 0): void => {
  mainThreadOptimizer.scheduleTask(() => {
    setTimeout(callback, delay);
  });
};

export const optimizedSetInterval = (callback: () => void, interval: number): NodeJS.Timeout => {
  let intervalId: NodeJS.Timeout;
  
  mainThreadOptimizer.scheduleTask(() => {
    intervalId = setInterval(() => {
      mainThreadOptimizer.scheduleTask(callback, { priority: 'low' });
    }, interval);
  });

  return intervalId!;
};

// React hook for using the optimizer
export const useMainThreadOptimizer = () => {
  return {
    scheduleTask: mainThreadOptimizer.scheduleTask.bind(mainThreadOptimizer),
    executeInChunks: mainThreadOptimizer.executeInChunks.bind(mainThreadOptimizer),
    yieldToMain: mainThreadOptimizer.yieldToMain.bind(mainThreadOptimizer),
    batchDOMOperations: mainThreadOptimizer.batchDOMOperations.bind(mainThreadOptimizer),
    deferHeavyComputation: mainThreadOptimizer.deferHeavyComputation.bind(mainThreadOptimizer),
    processLargeDataset: mainThreadOptimizer.processLargeDataset.bind(mainThreadOptimizer),
  };
};

export default mainThreadOptimizer; 