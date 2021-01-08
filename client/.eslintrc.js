module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {},
  ignorePatterns: [
    'vue-shim.d.ts',
    'dist/'
  ]
}
