
/**
 * External Dependencies
 */

const { optimize: { CommonsChunkPlugin } } = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const path = require('path')
const glob = require('glob')

const css = {
  critical: new ExtractTextPlugin({
    filename: '[name].critical.css',
    allChunks: false,
  }),

  nonCritical: new ExtractTextPlugin({
    filename: '[name].[contenthash:8].css',
    allChunks: false,
  }),
}


module.exports = [
  {
    context: __dirname,
    entry: getEntryPoints('client.js'),

    output: {
      path: `${ __dirname }/.build`,
      filename: '[name].[chunkhash:8].js',
    },

    devtool: 'source-maps',

    resolve: {
      alias: {
        components: path.resolve(__dirname, 'components'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          include: /critical.css$/,
          use: css.critical.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local][hash:8]',
              },
            },
          }),
        },
        {
          test: /\.css$/,
          exclude: /critical.css$/,
          use: css.nonCritical.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local][hash:8]',
              },
            },
          }),
        },
        {
          test: /\.(png|jpg|ico|svg|mp4)$/,
          use: 'file-loader',
        },
      ],
    },

    plugins: [
      css.critical,
      css.nonCritical,
      new CommonsChunkPlugin({ name: 'commons' }),
      new ManifestPlugin(),
    ],
  },

  {
    target: 'node',
    context: __dirname,
    entry: {
      render: './pages/lib/render.js',
    },

    output: {
      path: `${__dirname}/.build`,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },

    externals: [ nodeExternals() ],

    resolve: {
      alias: {
        components: path.resolve(__dirname, 'components'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader',
        },

        {
          test: /.\.css$/,
          use: [
            {
              loader: 'css-loader/locals',
              options: {
                modules: true,
                localIdentName: '[local][hash:8]',
              },
            },
          ],
        },
      ],
    },
  },
]

function getEntryPoints (filename) {
  const pages = glob.sync(`pages/*/${ filename }`)

  return pages.reduce((result, pagePath) => {
    const key = pagePath
      .replace('pages/', '')
      .replace(`/${ filename }`, '')

    result[key] = `${ __dirname }/${ pagePath }`

    return result
  }, {})
}
