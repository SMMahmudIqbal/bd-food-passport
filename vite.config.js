import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base path so it deploys seamlessly to GitHub Pages subpaths as well as Vercel
  base: './',
  server: {
    port: 3000,
    host: true
  }
});
