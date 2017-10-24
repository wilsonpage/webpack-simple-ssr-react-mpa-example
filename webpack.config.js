
/**
 * External Dependencies
 */

const { optimize: { CommonsChunkPlugin } } = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')


const css = {
  critical: new ExtractTextPlugin({
    filename: '[name].critical.css',
    allChunks: false,
  }),

  nonCritical: new ExtractTextPlugin({
    filename: '[name].non-critical.css',
    allChunks: false,
  }),
};


module.exports = [
  {
    context: __dirname,
    entry: getEntryPoints('client.js'),

    output: {
      path: `${ __dirname }/.build`,
      filename: '[name].[chunkhash].js',
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
          oneOf: [
            {
              resourceQuery: /critical/,
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
              // use: ['style-loader', 'css-loader']
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
            }
          ],
        },
        {
          test: /\.(png|jpg|ico|svg|mp4)$/,
          use: 'file-loader',
        },
      ],
    },

    plugins: [
      new CommonsChunkPlugin({ name: 'commons' }),
      new ManifestPlugin(),
      // new ExtractTextPlugin('[name].css'),
      css.critical,
      css.nonCritical,
    ],
  },

  {
    target: 'node',
    context: __dirname,
    entry: getEntryPoints('server.js'),

    output: {
      path: `${__dirname}/.build`,
      filename: '[name].server.js',
      libraryTarget: 'commonjs',
    },

    externals: [ nodeExternals() ],

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
];

function getEntryPoints (filename) {
  const pages = glob.sync(`pages/*/${ filename }`);

  return pages.reduce((result, pagePath) => {
    const key = pagePath
      .replace('pages/', '')
      .replace(`/${ filename }`, '')

    result[key] = `${ __dirname }/${ pagePath }`;

    return result;
  }, {});
}
