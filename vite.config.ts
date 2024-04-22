import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment";


// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react(), EnvironmentPlugin("all")],
});
