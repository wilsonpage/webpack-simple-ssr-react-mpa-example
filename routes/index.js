
module.exports = (app, views) => {
  app.get('/', (req, res) => {
    res.send(views.home())
  })

  app.get('/about', (req, res) => {
    res.send(views.home())
  })

  // ap.get('/articles/:id', async (req, res) => {
  //   const article = await database.articles.get(req.params.id)
  //   res.send(views.article.render({ article }))
  // })

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

    res.status(status).send(views.error({
      status,
      message,
    }))
  })
}
