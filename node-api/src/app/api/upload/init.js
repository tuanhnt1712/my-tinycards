'use strict'

const path = require('path')

const multer = require('koa-multer')
const mkdirp = require('mkdirp')
const publicPath = path.resolve(__dirname, '../../../public')

module.exports = initUpload

const allowTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg']
const uploadConfig = {
  fields: 17,
  files: 17,
  fileSize: 100 * 1048576,
  parts: 17
}
const storage = multer.diskStorage({
  destination (req, file, cb) {
    const today = new Date()
    const dd = ('0' + today.getDate()).slice(-2)
    const mm = ('0' + (today.getMonth() + 1)).slice(-2)
    const yyyy = today.getFullYear()
    const uploadPath = path.resolve(__dirname, `../../../public/uploads/${yyyy}/${mm}/${dd}`)

    mkdirp(uploadPath, err => {
      if (err) console.log(err)
      else cb(null, uploadPath)
    })
  },
  filename (req, { originalname, mimetype }, cb) {
    const nameSegments = originalname.split('.')
    const name = nameSegments[0] || `${Date.now()}`
    const mineTypeSegments = mimetype.split('/')
    const ext = mineTypeSegments[1] || 'jpeg'
    cb(null, `${Date.now()}-${name}.${ext}`)
  }
})
const fileFilter = (req, { mimetype }, cb) =>
  cb(null, Boolean(allowTypes.indexOf(mimetype) > -1))
const uploader = multer({ storage, fileFilter, limits: uploadConfig })

function initUpload (router) {
  router.post('/api/v1/upload', uploader.single('image'), (ctx, next) => {
    let data = ctx.req.file
    data.link = process.env.UPLOAD_HOST + data.path.replace(publicPath, '')

    const resp = {
      data: data,
      status: 200,
      success: true
    }
    ctx.body = resp

    return ctx.body
  })
}
