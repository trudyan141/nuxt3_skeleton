// https://nuxt.com/docs/api/configuration/nuxt-config
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
export default defineNuxtConfig({
  devtools: { enabled: true },
   css: ["@/assets/css/main.scss"],
   vite: {
     plugins: [
      Components({
        resolvers: [AntDesignVueResolver({
          importStyle: 'less',
        })],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variable.scss" as *;',
        },
      },
    },
    ssr: {
      noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue'],
    },
  },
  modules: [
    "@nuxt/image", 
    'nuxt3-vuex-module',
    '@vee-validate/nuxt'
  ]
})