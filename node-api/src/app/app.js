'use strict'
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const createStaticServeMiddleware = require('koa-static')

const config = require(path.resolve(__dirname, '../config'))
const knex = require('./knex')

const app = new Koa()
const router = new Router()
const staticServeMiddleware = createStaticServeMiddleware(
  path.resolve(__dirname, '../public')
)

const uploadModule = require(path.resolve(__dirname, './api/upload'))

uploadModule.init(router)

router.get('/', (ctx, next) => {
  ctx.body = 'Hihi'
})

app
  .use(staticServeMiddleware)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
