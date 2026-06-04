import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'hhttps://task-backend-ryya.onrender.com',
          changeOrigin: true,
        },
        '/tasks': {
          target: 'hhttps://task-backend-ryya.onrender.com',
          changeOrigin: true,
        },
        '/members': {
          target: 'hhttps://task-backend-ryya.onrender.com',
          changeOrigin: true,
        },
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
  };
});
