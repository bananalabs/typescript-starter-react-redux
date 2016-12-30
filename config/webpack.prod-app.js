'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const pkg = require('../package.json');

module.exports = (fullpath) => {
  const fullcfg = merge({
    // =================================
    // base config
    // =================================
    name: 'prod-app',
    entry: {
      app: fullpath.app,
      library: fullpath.src
    },
    output: {
      path: fullpath.output.prod.app,
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(`${fullpath.base}/app/index.html`),
        inject: 'body',
      }),
      // --------
      // Chunking
      // --------
      new webpack.optimize.OccurrenceOrderPlugin(true),
      // new webpack.optimize.DedupePlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => {
          const req = module.userRequest;
          return typeof req === 'string' && req.indexOf('node_modules') >= 0;
        }
      })
    ]
  }, {
    // =================================
    //  source-map
    // =================================
    output: {
      // sourceMapFilename: '[name].[hash].js.map',
      sourceMapFilename: '[name].[hash].ts.map',
    },
    devtool: 'source-map',
    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].[hash].js.map',
        test: /\.tsx?$/
      }),
    ]
  }, {
    // =================================
    // Clean output directory between builds
    // =================================
    plugins: [
      new CleanWebpackPlugin([fullpath.output.prod.app], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: fullpath.base
      })
    ]
  }, {
    // =================================
    // webpack options
    // =================================

    // Disable performance hints during development
    performance: {
      hints: 'warning' // false || 'warning' || 'error'
    }
  }, {
    // =================================
    //  TypeScript loader
    // =================================
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js'
      ],
    },
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.tsx?$/,
        use: 'tslint-loader',
        exclude: /node_modules/
      /*}, {
            enforce: 'pre',
            test: /\.js$/,
            use: 'source-map-loader',
            exclude: /node_modules/
          */
      }, {
        test: /\.tsx?$/,
        use: `ts-loader?configFileName=${fullpath.tsconfig.prod.app}`,
        exclude: /node_modules/
      }]
    }
  }, {
    // =================================
    //  css
    // =================================
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          fullpath.app,
          fullpath.src
        ]
      }]
    }
  }, {
    // =================================
    //  fonts
    // =================================
  }, {
    // =================================
    // minification
    // =================================
    plugins: [
      // (process.env.NODE_ENV === 'production') enables React optimizations
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        },
        sourceMap: true,
        mangle: {
          except: ['webpackJsonp'],
          screw_ie8: true,
          keep_fnames: false
        }
      })
    ]
  }, {
    // =================================
    // Manifest generation
    // =================================
    plugins: [
      new ManifestPlugin({
        basePath: '/',
        writeToFileEmit: true,
        stripSrc: true,
        cache: {}
      })
    ]
  }, {
    // =================================
    // Visualize the bundles
    // =================================
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: fullpath.stats.prod.app.report,
        generateStatsFile: false,
        openAnalyzer: false,
        statsFilename: fullpath.stats.prod.app.json,
        logLevel: 'info'
      })
    ]
  });
  return fullcfg;
}
