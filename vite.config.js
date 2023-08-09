import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  //配置sass
  css: {
    preprocessorOptions: {
      scss: {
        // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
        additionalData: '@import "../assets/scss/globalVar.scss";@import "../assets/scss/globalMixin.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/dev-api': {
        target: `http://192.168.1.216`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VITE_BASE_API]: process.env.VITE_BASE_API
        }
      }
    },
    disableHostCheck: true
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, 'src'),
      "#": path.join(__dirname,'types')
    }
  }
})
