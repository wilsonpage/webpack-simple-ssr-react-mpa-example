
const database = async () => {
  return {
    name: 'Wilson',
  }
}

module.exports = ({ render, chunks, publicPath }) => async (req, res) => {
  res.send(render('home', {
    assets: {
      scripts: [
        `${ publicPath }/${ chunks['commons.js'] }`,
        `${ publicPath }/${ chunks['contact.js'] }`,
      ],
      styles: {
        external: `${ publicPath }/${ chunks['contact.css'] }`,
      },
    },
    props: await database(),
  }))
}
