const path = require('path')
const environment = require('./environment')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    static: {
      directory: environment.paths.output
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },
    historyApiFallback: false,
    open: true,
    compress: true,
    hot: true,
    ...environment.server,
  },
  entry: {
    index: path.resolve(environment.paths.source, 'index.js')
  },
  output: {
    path: environment.paths.output,
    filename: 'js/bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/[hash].json'
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          }
        },
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.fonts,
          }
        },
        generator: {
          filename: 'assets/fonts/[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
  ]
}