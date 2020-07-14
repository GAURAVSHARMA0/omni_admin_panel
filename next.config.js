const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  /* config options here */
  env: {
      API_DOMAIN: 'api235.c-zentrix.com',
      APP_DOMAIN: 'app235.c-zentrix..com',
  },
  // publicRuntimeConfig: {
  //     basePath: '/var/www/html/admin_apps_view',
  // },

})
