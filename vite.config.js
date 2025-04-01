import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/public/api/v1/gotras': {
        target: 'https://vivah-backend-my.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS with a valid certificate
      },
    },
  },
});
