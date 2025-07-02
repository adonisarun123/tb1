import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import imageminWebp from 'imagemin-webp'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'
import imageminGifsicle from 'imagemin-gifsicle'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Image optimization plugin
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      mozjpeg: {
        quality: 80,
        progressive: true,
      },
      pngquant: {
        quality: [0.65, 0.8],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
      webp: {
        quality: 80,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    watch: {
      usePolling: true
    },
    hmr: {
      overlay: false,
    }
  },
  build: {
    // Target modern browsers to reduce legacy code
    target: 'es2022',
    minify: 'esbuild',
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false
      },
      output: {
        manualChunks: {
          // Split vendor libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-intersection-observer'],
          'icons-vendor': ['react-icons/fi', 'react-icons/fa', 'react-icons/md'],
          
          // Split heavy components
          'ai-components': [
            './src/components/AIChatbot',
            './src/components/AIRecommendations', 
            './src/components/AISearchWidget'
          ],
          'form-components': [
            './src/components/SmartForm',
            './src/components/ContactForm'
          ],
          'page-components': [
            './src/pages/Activities',
            './src/pages/Stays',
            './src/pages/Blog'
          ],
        },
        
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `assets/${facadeModuleId}-[hash].js`;
        },
        
        // Optimize asset naming
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      },
      external: (id) => {
        // Externalize large libraries that can be loaded from CDN
        if (id.includes('framer-motion') && process.env.NODE_ENV === 'production') {
          return true;
        }
        return false;
      },
    },
    // Enable source maps for production debugging (separate files)
    sourcemap: 'hidden',
    // Optimize chunk size - reduce warning limit
    chunkSizeWarningLimit: 300,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    reportCompressedSize: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'react-intersection-observer',
      'react-router-dom',
      'react-helmet-async',
      '@supabase/supabase-js',
      '@headlessui/react'
    ],
    exclude: [
      // Exclude large libraries from pre-bundling
      'framer-motion',
    ],
    // Force optimize dependencies
    force: true
  },
  // Add performance hints
  esbuild: {
    // Drop console logs and debugger in production
    drop: ['console', 'debugger'],
    // Use modern syntax
    target: 'es2022',
    // Optimize for speed
    treeShaking: true
  },
  // CSS optimization
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        // Add PurgeCSS-like functionality
        {
          postcssPlugin: 'unused-css-remover',
          Once(root, { result }) {
            // Remove unused utility classes that might be generated
            const unusedPatterns = [
              /\.text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)-\d+/,
              /\.text-\w+-\d{3,4}$/,
              /\.bg-\w+-\d{3,4}$/,
              /\.border-\w+-\d{3,4}$/,
              /\.ring-\w+-\d{3,4}$/,
              /\.from-\w+-\d{3,4}$/,
              /\.to-\w+-\d{3,4}$/,
              /\.via-\w+-\d{3,4}$/
            ];
            
            root.walkRules(rule => {
              const selector = rule.selector;
              if (unusedPatterns.some(pattern => pattern.test(selector))) {
                // Only remove if it looks like an unused Tailwind utility
                if (selector.includes('hover:') || selector.includes('focus:') || 
                    selector.includes('active:') || selector.includes('group-hover:')) {
                  // Keep interactive states
                  return;
                }
                
                // Check if it's actually unused (simplified heuristic)
                if (rule.nodes.length === 0) {
                  rule.remove();
                }
              }
            });
          }
        }
      ],
    },
    // Enable CSS modules optimization
    modules: {
      localsConvention: 'camelCase'
    },
    // Optimize CSS processing
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  // Define for better tree shaking
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production')
  }
})
