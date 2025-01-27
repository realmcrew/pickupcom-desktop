import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;
// @ts-expect-error process is a nodejs global
const sentryAuthToken = process.env.VITE_SENTRY_AUTH_TOKEN;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  envPrefix: ['VITE_', 'TAURI_'],
  plugins: [
    TanStackRouterVite(),
    react(),
    sentryVitePlugin({
      authToken: sentryAuthToken,
      org: 'wild-coder',
      project: 'pickupcom-pc-tauri',
    }),
  ],
  build: { sourcemap: true },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));
