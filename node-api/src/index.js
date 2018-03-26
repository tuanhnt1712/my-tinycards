'use strict'

const app = require('./app')
const { app: { port } } = require('./config')

app.listen(port, _ => {
  console.log(`App is starting on port: ${port}`)
})
