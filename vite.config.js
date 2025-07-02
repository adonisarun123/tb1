import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: [
            'react', 
            'react-dom', 
            'framer-motion', 
            'react-intersection-observer',
            'react-router-dom',
            'react-helmet-async'
        ],
    },
    build: {
        target: 'es2020', // Modern browsers for better performance
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            input: {
                main: './index.html',
            },
            output: {
                // Enhanced code splitting for better caching and loading
                manualChunks: {
                    // Vendor chunks
                    react: ['react', 'react-dom'],
                    router: ['react-router-dom'],
                    animation: ['framer-motion'],
                    utils: ['react-intersection-observer', 'react-helmet-async'],
                    
                    // Feature chunks (loaded on demand)
                    ai: ['./src/components/AIRecommendations', './src/components/AIChatbot'],
                    forms: ['./src/components/SmartForm', './src/components/ContactForm'],
                },
                // Better asset naming for caching
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
            }
        },
        outDir: 'dist',
        assetsDir: 'assets',
        copyPublicDir: true,
        chunkSizeWarningLimit: 1000, // Increase warning limit for large chunks
        reportCompressedSize: false, // Disable gzip size reporting for faster builds
    },
    // Performance optimizations
    esbuild: {
        target: 'es2020',
        legalComments: 'none', // Remove legal comments for smaller bundles
    },
});
