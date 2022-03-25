const webpack = require('webpack');
const CracoLessPlugin = require('craco-less');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");


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
      }
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
        }),
        new TsconfigPathsPlugin({
          logInfoToStdOut: true,
          logLevel: 'INFO'
        })
      ];
      const r = ({
        ...cfg,
        ...{

          resolve: {
            alias: {
              'react-router-dom': require.resolve('react-router-dom'),
              "overmind/app": require.resolve(__dirname + "/src/overmind/app.ts")
            },
            fallback: {
              "os": require.resolve("os-browserify/browser"),
              "zlib": require.resolve("browserify-zlib"),
              "http": require.resolve("stream-http"),
              "https": require.resolve("https-browserify"),
              "stream": false, //require.resolve('stream-browserify'),
              "crypto": require.resolve('crypto-browserify'),
              "buffer": require.resolve("buffer/")
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
  }

}