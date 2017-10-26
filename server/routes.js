
module.exports = ({ app, render }) => {
  app.get('/', (req, res) => {
    res.send(render.home({ name: 'Wilson' }))
  })

  app.get('/about', (req, res) => {
    res.send(render.home())
  })

  app.get('/articles/:id', async (req, res) => {
    const { params: { id } } = req

    const articles = {
      1: {
        title: 'Article One Title',
        body: 'Article one body',
      },
      2: {
        title: 'Article Two Title',
        body: 'Article two body',
      },
    }

    const article = articles[id]
    res.send(render.article(article))
  })

  app.get('*', (req, res, next) => {
    const error = new Error('page not found')
    error.status = 404
    next(error)
  })

  app.use((err, req, res, next) => { // eslint-disable-line
    const {
      status = 500,
      message,
    } = err

    res.status(status).send(render.error({
      status,
      message,
    }))
  })
}
