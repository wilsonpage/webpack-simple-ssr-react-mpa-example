
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
    filename: '[name]/styles.critical.css',
    allChunks: false,
  }),

  nonCritical: new ExtractTextPlugin({
    filename: '[name]/styles.[contenthash:8].css',
    allChunks: false,
  }),
}


module.exports = [
  {
    context: __dirname,
    entry: getEntryPoints(),

    output: {
      path: `${ __dirname }/.build`,
      filename: '[name]/bundle.[chunkhash:8].js',
    },

    // devtool: 'source-maps',

    resolve: {
      alias: {
        lib: path.resolve(__dirname, 'lib'),
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
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
      'server-render': './lib/server-render.js',
    },

    output: {
      path: `${__dirname}/.build`,
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },

    externals: [ nodeExternals() ],

    resolve: {
      alias: {
        lib: path.resolve(__dirname, 'lib'),
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

function getEntryPoints () {
  const pages = glob.sync(`pages/**/app`)
  return pages.reduce((result, pagePath) => {
    const appDir = pagePath.replace('/app', '')
    result[appDir] = `${ __dirname }/${ appDir }/client.js`
    return result
  }, {})
}
