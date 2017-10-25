
// const { readFileSync } = require('fs')

const database = async () => {
  return {
    name: 'Wilson',
  }
}

module.exports = ({ render, chunks, publicPath }) => async (req, res) => {
  res.send(render('about', {
    assets: {
      scripts: [
        `${ publicPath }/${ chunks['commons.js'] }`,
        `${ publicPath }/${ chunks['about.js'] }`,
      ],
      styles: {
        // inline: readFileSync(`${ buildDir }/home.critical.css`),
        external: `${ publicPath }/${ chunks['about.css'] }`,
      },
    },
    props: await database(),
  }))
}
