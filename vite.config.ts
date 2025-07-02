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
        // PurgeCSS will be handled separately
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
  }
})
