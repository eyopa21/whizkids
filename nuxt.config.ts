
export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {

    inlineSSRStyles: false
  },

  build: {
    transpile: [
      'tslib',

    ],
  },


  modules: [
    '@nuxtjs/tailwindcss', '@nuxtjs/apollo', '@nuxtjs/color-mode', '@nuxt/image', '@nuxtjs/i18n', 'nuxt-icon'
  ],
  routeRules: {
    '/auth/**': { ssr: false }
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80,
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/doifglnsi/image/upload'
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },


  css: ['~/assets/css/app.css'],
  apollo: {
    clients: {
      default: {

        httpEndpoint: 'https://whizkids.hasura.app/v1/graphql',
        //authHeader: {'x-hasura-admin-secret': 'WfYLj861FHQaeZIeshj6B5FLiQItUAbKhD6cRk3CnecscCPQPZLJIkkbL2EGSmVV'},
        httpLinkOptions: {
          headers: {
            // 'x-hasura-admin-secret': 'Kre67iqkdXoNM9gjl46syGd80IffFGv5XmhcTmKIBVeMChl1asuXtQv10lndaXKr'
          }
        },


      }
    },
  },




  app: {
    pageTransition: { name: 'slide-fade' },
    head: {
      meta: [
      ],
      script: [
      ],
      link: [
        //    { rel: 'stylesheet', href: '/css/main.css' },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }

      ],

      noscript: [
        { children: 'JavaScript is required' }
      ]
    }
  },
})

