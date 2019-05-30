const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Jelle Kralt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
      { hid: 'description', name: 'description', content: 'Hi, I\'m Jelle Kralt. Front End Engineer at CODEZILLA. I ❤️ JavaScript' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@jellekralt' },
      { name: 'twitter:title', content: 'Jelle Kralt' },
      { name: 'twitter:description', content: `Jelle Kralt's personal blog. Hi, I'm Jelle Kralt, a Front End Engineer at CODEZILLA, currently working for KLM. I ❤️ everything to do with JavaScript, both in the browser and on Node.js.` },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#f7df1e' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/scss/main.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: ['@/assets/scss/_variables.scss', '@/assets/scss/_mixins.scss']
  },

  baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy:  true
  },

  proxy: {
    '/api': (process.env.NODE_ENV !== 'production' ? 'http://localhost:1337' : 'https://jellekralt-com.jellekralt.now.sh/'),
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
