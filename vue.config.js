const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
        new GenerateSW({
            maximumFileSizeToCacheInBytes: 5000000,
        })
    ]
  }
};