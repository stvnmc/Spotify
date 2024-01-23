import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Spotify/', // Ajusta el valor según tu configuración de GitHub Pages
  build: {
    outDir: 'dist', // Directorio de salida para archivos construidos
    assetsDir: '', // Directorio para los activos (assets), ajusta según tu estructura de carpetas
    manifest: true, // Generar archivo manifest.json
  },
});
