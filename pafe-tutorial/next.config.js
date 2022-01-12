const { resolve } = require('path')

module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias['~'] = resolve(__dirname, 'src')
    config.resolve.alias['~auto'] = resolve(__dirname, 'auto')
    return config
  },
}
