const CracoLessPlugin = require('craco-less');

const appDirectory = require('fs').realpathSync(process.cwd());
const webpack = require('webpack');
const { writeFileSync } = require('fs');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // lessOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@white': '#fcfcf3',
              '@black': '#1d1d1d',
              '@primary-color': '#b3ff00',
              '@text-color': '#fcfcf3',
              '@text-color-inverse': 'black',
              '@link-active-color': 'black',
              '@border-radius-base': '20px',
              '@border-width-base': '2px',
              '@btn-primary-color': 'black',
              '@font-family': '"FavoritRegular", Helvetica, Arial, sans-serif',
              '@font-size-base': "20px",
              '@error-color': '#9e00ff'
              // '@font-size-lg': "120px"
              // "'-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji''"

            }
          }
        }
        // },
        // },
      }
      // plugins: [
      //   { plugin: rewireBabelLoader, 
      //     options: { 
      //       includes: [resolveApp("node_modules/use-shopping-cart")], //put things you want to include in array here
      //       excludes: [/(node_modules|bower_components)/] //things you want to exclude here
      //       //you can omit include or exclude if you only want to use one option
      //     }
      //   }
      // ],
    }
  ],
  webpack: {
    debug: true,
    configure: (cfg) => {
      cfg.plugins = [
        ...cfg.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'

          // fetch: 'exports-loader?self.fetch!whatwg-fetch'
        }),
        new TsconfigPathsPlugin({
          logInfoToStdOut: true,
          logLevel: 'INFO'
        }),
        new NodePolyfillPlugin()
      ];
      const r = ({
        ...cfg,
        rules: [
          ...cfg.module.rules,
          {
            type: "javascript/auto",
            test: /\.mjs$/,
            use: [],
          },
        ],
        ...{

          resolve: {
            alias: {
            },
            fallback: {
              // "url": require.resolve("url"),
              // "fs": require.resolve("graceful-fs"),
              // "tls": false,
              // "net": false,
              "os": require.resolve("os-browserify/browser"),
              // "path": require.resolve('path-browserify'),
              "zlib": require.resolve("browserify-zlib"),
              "http": require.resolve("stream-http"),
              "https": require.resolve("https-browserify"),
              "stream": false, //require.resolve('stream-browserify'),
              "crypto": require.resolve('crypto-browserify'),
              "buffer": require.resolve("buffer/"),
              "util": require.resolve("util/")
            },
            extensions: ['.ts', '.tsx', '.js']
          }
        },
      });
      return r;
    },
    babel: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
  },

  // options: {

}