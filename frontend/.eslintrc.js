module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      "vue/script-indent": ["error", TYPE, {
        "baseIndent": 0,
        "switchCase": 0,
        "ignores": []
      }]
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/standard'
  ]
}
