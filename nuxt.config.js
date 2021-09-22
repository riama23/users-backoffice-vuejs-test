import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Users Backoffice',
    title: 'Users Backoffice',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: "apple-touch-icon", sizes:"180x180", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/apple-touch-icon.png"},
      {rel: "icon", type:"image/png", sizes:"32x32", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/favicon-32x32.png"},
      {rel: "icon", type:"image/png", sizes:"16x16", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/favicon-16x16.png"},
      {rel: "manifest", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/site.webmanifest"},
      {rel: "mask-icon", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/safari-pinned-tab.svg"},
      {rel: "shortcut icon", href:"https://everymatrix.com/wp-content/themes/em/img/favicon/rgs/favicon.ico"},

                ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': {target: 'https://jsonplaceholder.typicode.com', pathRewrite: {'^/api/': ''}}
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.purple.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
