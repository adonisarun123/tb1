import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import imageminWebp from 'imagemin-webp'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo'
import imageminGifsicle from 'imagemin-gifsicle'

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
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    watch: {
      usePolling: true
    }
  },
  build: {
    // Target modern browsers to reduce legacy code
    target: 'es2022',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false
      },
      output: {
        manualChunks: (id) => {
          // More aggressive code splitting
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'react-core';
            }
            // Animation libraries
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Router
            if (id.includes('react-router')) {
              return 'router';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            // UI libraries
            if (id.includes('@headlessui') || id.includes('react-icons')) {
              return 'ui-libs';
            }
            // Emotion styling
            if (id.includes('@emotion')) {
              return 'emotion';
            }
            // Helmet for SEO
            if (id.includes('react-helmet')) {
              return 'helmet';
            }
            // Other utilities
            if (id.includes('react-intersection-observer')) {
              return 'utils';
            }
            // Other vendor dependencies
            return 'vendor';
          }
          
          // App-specific chunking
          if (id.includes('src/pages/')) {
            // Group pages by category for better caching
            if (id.includes('TeamBuilding') || id.includes('Corporate')) {
              return 'team-building-pages';
            }
            if (id.includes('Virtual') || id.includes('Online')) {
              return 'virtual-pages';
            }
            if (id.includes('Bangalore') || id.includes('Mumbai') || id.includes('Hyderabad')) {
              return 'location-pages';
            }
            return 'other-pages';
          }
          
          if (id.includes('src/components/')) {
            return 'components';
          }
        },
        // Optimize asset naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|avif|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    },
    // Disable source maps for production
    sourcemap: false,
    // Optimize chunk size - reduce warning limit
    chunkSizeWarningLimit: 500,
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
  }
})
