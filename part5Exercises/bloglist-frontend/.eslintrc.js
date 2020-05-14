module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  'extends': 'airbnb',
  'plugins': [
    "react", "jest", "cypress"
  ],
  'rules': {
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
  }
}