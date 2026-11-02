import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'copy-static-showcase-files',
        closeBundle() {
          const outDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(outDir)) return;

          for (const file of ['config.js', 'script.js']) {
            const src = path.resolve(__dirname, file);
            if (fs.existsSync(src)) {
              fs.copyFileSync(src, path.join(outDir, file));
            }
          }

          const assetsSrc = path.resolve(__dirname, 'assets');
          const assetsDest = path.resolve(outDir, 'assets');
          if (fs.existsSync(assetsSrc)) {
            fs.cpSync(assetsSrc, assetsDest, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
