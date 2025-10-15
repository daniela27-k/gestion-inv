// // nuxt.config.ts
// import { defineNuxtConfig } from 'nuxt/config'
// import Components from 'unplugin-vue-components/vite'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'


// export default defineNuxtConfig({
//    modules: [
//     '@nuxt/icon'  
//   ]


//    vite: {
//      plugins: [
//        Components({
//          resolvers: [
//            IconsResolver({
//              prefix: 'i', // <i-heroicons-cow /> por ejemplo
//            }),
//          ],
//        }),
//        Icons({
//          autoInstall: true, // instala packs automáticamente
//        }),
//      ],
//    },

//    css: ['@/assets/css/main.css'],

//    postcss: {
//      plugins: {
//        'postcss-nested': {},
//      },
//    },

//    modules: ['@nuxtjs/tailwindcss'],

//    compatibilityDate: '2025-07-15',
//    devtools: { enabled: true },

//    // RuntimeConfig para exponer variables de entorno
//    runtimeConfig: {
//      public: {
//        // Esta variable leerá NUXT_PUBLIC_API_BASE_URL del .env
//        apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
//      }
//    }
// })

// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],

  css: ['@/assets/css/main.css'],

  postcss: {
    plugins: {
      'postcss-nested': {},
    },
  },

  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'
    }
  }
})