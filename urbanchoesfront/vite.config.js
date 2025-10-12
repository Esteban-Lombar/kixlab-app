import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false
  },
  server: {
    port: 5173
  }
};
