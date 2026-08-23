import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const PORT = parseInt(env.PORT || env.VITE_PORT || '5174', 10);
  const PREVIEW_PORT = parseInt(env.PREVIEW_PORT || '4174', 10);

  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react', 'leaflet', 'chart.js'],
    },
    server: {
      port: PORT,
      host: true,
      strictPort: false,
      cors: true,
    },
    preview: {
      port: PREVIEW_PORT,
      host: true,
    },
  };
});
