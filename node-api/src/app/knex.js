const path = require('path')

const knexFactory = require('knex')
const KnexQueryBuilder = require('knex/lib/query/builder')

const { db: dbConfig } = require(path.resolve(__dirname, '../config'))
const knex = knexFactory(dbConfig)

module.exports = knex

KnexQueryBuilder.prototype.paginate = function ({ pageSize = 10, page = 1 } = {}) {
  pageSize = pageSize > 50 || pageSize < 0 ? 50 : pageSize
  page = (page < 1) ? 1 : page
  const offset = (page - 1) * pageSize
  const pagination = {}

  return Promise.all([
    this.clone().clearSelect().count('* as count').first(),
    this.offset(offset).limit(pageSize)
  ]).then(([total, rows]) => {
    pagination.total = parseInt(total.count)
    pagination.lastPage = Math.ceil(total.count / pageSize)
    pagination.page = parseInt(page)
    pagination.pageSize = parseInt(pageSize)
    pagination.from = parseInt(offset) + 1
    pagination.to = parseInt(offset) + rows.length
    return {
      pagination,
      rows
    }
  })
}

knex.queryBuilder = function () {
  return new KnexQueryBuilder(knex.client)
}
