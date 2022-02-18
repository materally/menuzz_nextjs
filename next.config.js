const webpack = require("webpack");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["menuzz.hu"],
    loader: "imgix",
    path: "https://menuzz.hu/img/loading.jpg",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },
};
