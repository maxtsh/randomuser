import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        minifyInternalExports: true,
        compact: true,
        manualChunks: {
          react: ["react", "react-router-dom", "react-dom"],
        },
      },
    },
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
});
