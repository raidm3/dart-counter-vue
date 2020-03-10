const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new GenerateSW({
        swDest: 'service-worker.js',
        maximumFileSizeToCacheInBytes: 5000000,
      })
    ]
  }
};