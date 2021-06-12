const path = require("path");
const fs = require("fs");
const apexnitroConfig = require("./apexnitro.config.json");
const CopyPlugin = require("copy-webpack-plugin");

const staticFileDir = path.join(__dirname, 'src', 'static');
const staticFileCount = fs.readdirSync(staticFileDir).length;

const plugins = [];

// If there are any static files to transfer, we want to register the the webpack
// copy plugin.
if (staticFileCount > 0) {
  plugins.push(new CopyPlugin({
    patterns: [
      {
        from: path.resolve(apexnitroConfig.srcFolder, "static"),
        to: path.resolve(apexnitroConfig.distFolder, "")
      }
    ]
  }));
}

module.exports = {
  mode: "production",
  entry: [apexnitroConfig.mainJs],
  output: {
    path: path.resolve(apexnitroConfig.distFolder),
    library: apexnitroConfig.libraryName,
    filename: `${apexnitroConfig.libraryName}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: plugins
};
