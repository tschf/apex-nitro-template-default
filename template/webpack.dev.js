const path = require("path");
const fs = require("fs");
const apexnitroConfig = require("./apexnitro.config.json");
const CopyPlugin = require("copy-webpack-plugin");
const noSuchFolderErrorCode = 'ENOENT'

const staticFileDir = path.join(__dirname, 'src', 'static');
let staticDirFiles;
try {
  staticDirFiles = fs.readdirSync(staticFileDir);
} catch (e) {
  if (e.code !== noSuchFolderErrorCode){
    throw(e);
  }

  // Because the folder doesn't exist, we know its an empty file listing. Assign
  // an empty array
  staticDirFiles = [];
}
const staticFileCount = staticDirFiles.length;

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
  mode: "development",
  devtool: "eval-source-map",
  entry: [apexnitroConfig.mainJs],
  output: {
    path: path.resolve(apexnitroConfig.distFolder),
    library: apexnitroConfig.libraryName,
    filename: `${apexnitroConfig.libraryName}.js`
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
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
