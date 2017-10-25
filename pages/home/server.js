
const { readFileSync } = require('fs')

const database = async () => {
  return {
    name: 'Wilson',
  }
}

module.exports = ({ render, chunks, buildDir, publicPath }) => async (req, res) => {
  res.send(render('home', {
    assets: {
      scripts: [
        `${ publicPath }/${ chunks['commons.js'] }`,
        `${ publicPath }/${ chunks['home.js'] }`,
      ],
      styles: {
        inline: readFileSync(`${ buildDir }/home.critical.css`),
        external: `${ publicPath }/${ chunks['home.css'] }`,
      },
    },
    props: await database(),
  }))
}
