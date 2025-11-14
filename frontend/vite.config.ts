import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 这里是服务器的地址
const CGI_PATH = '/cgi/ThirdParty/code.editor/api.cgi'
const FILE_PATH = '_api=read&path=/var/apps/code.editor/target/server/dist'

export default defineConfig({
  build: {
    outDir: path.join(__dirname, '../app/app/server/dist'),
    emptyOutDir: true,

    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
      },
    },
  },

  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),

    process.env.NODE_ENV === 'development'
      ? undefined
      : {
          name: 'replace-file-loader',
          transformIndexHtml(html) {
            return html.replace(/(src|href)="([^"]*\.(js|css|ico))"/g, (match, attr, path) => {
              return `${attr}="${CGI_PATH}?${FILE_PATH}${path}"`
            })
          },
          generateBundle(_, bundle) {
            Object.keys(bundle).forEach((fileName) => {
              const chunk = bundle[fileName] as any

              if (fileName.endsWith('.css')) {
                chunk.source = chunk.source.replace(
                  /url\(\s*['"]?(\/assets\/[^'")]*)['"]?\s*\)/g,
                  (match: string, path: string) => {
                    return match.replace(path, `${CGI_PATH}?${FILE_PATH}${path}`)
                  },
                )
              }
            })
          },
        },
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
