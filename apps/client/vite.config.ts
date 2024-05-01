import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const url = "http://localhost:3000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: url,
        changeOrigin: true,
      },
    },
  },
});
