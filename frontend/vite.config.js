import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["recharts"],  // ✅ Force pre-bundling Recharts
  },
  server: {
    port: 5173, // optional: ensure default dev port
  },
   proxy: {
    '/api': 'http://localhost:5000',
  },
});
