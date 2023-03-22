const { resolve } = require('path')
require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new ESLintPlugin({
      emitError: true,
      emitWarning: true,
      failOnError: true,
      extensions: ['.ts', '.tsx', '.js']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        include: [resolve(__dirname, 'src')],
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: resolve(__dirname, 'src/assets'),
        type: 'asset/resource'
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@api': resolve(__dirname, 'src/api/'),
      '@assets': resolve(__dirname, 'src/assets/'),
      '@components': resolve(__dirname, 'src/components/'),
      '@config': resolve(__dirname, 'src/config/'),
      '@constants': resolve(__dirname, 'src/constants/'),
      '@context': resolve(__dirname, 'src/context/'),
      '@hooks': resolve(__dirname, 'src/hooks/'),
      '@pages': resolve(__dirname, 'src/pages/'),
      '@router': resolve(__dirname, 'src/router/'),
      '@styles': resolve(__dirname, 'src/styles/'),
      '@theme': resolve(__dirname, 'src/theme/'),
      '@appTypes': resolve(__dirname, 'src/appTypes/'),
      '@utils': resolve(__dirname, 'src/utils/')
    }
  }
}
