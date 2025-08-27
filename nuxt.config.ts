// nuxt.config.ts
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  css: [
    'vuetify/styles'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true })
    ]
  },
  app: {
    head: {
      title: 'Mi App Vuetify',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // Google Fonts Roboto
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
        },
        // Material Design Icons
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.x/css/materialdesignicons.min.css'
        }
      ]
    }
  }
})
