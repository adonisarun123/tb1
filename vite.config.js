import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion', 'react-intersection-observer'],
    },
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
        outDir: 'dist',
        assetsDir: 'assets',
        copyPublicDir: true,
    },
});
