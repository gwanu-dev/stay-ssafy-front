import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  // @quasar/plugin-vite options list:
  // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
  quasar({
    sassVariables: 'src/quasar-variables.sass'
  })
  
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        rewrite: (path) => path.replace('/api', '')
      }
    }
  },
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"]
  },
});
