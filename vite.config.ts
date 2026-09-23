import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const modulePath = id.replaceAll('\\', '/');
          if (!modulePath.includes('/node_modules/')) return undefined;

          const packageName = modulePath.split('/node_modules/')[1]?.split('/')[0];
          if (['react', 'react-dom', 'scheduler'].includes(packageName ?? '')) return 'react-vendor';
          if (['framer-motion', 'motion-dom', 'motion-utils'].includes(packageName ?? '')) return 'motion-vendor';
          return undefined;
        },
      },
    },
  },
});
