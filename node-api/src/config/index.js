'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = Object.freeze({
  db: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'tiny_cards_api',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '12345678',
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  mail: {
    user: process.env.MAIL_USER || 'username@gmail.com',
    password: process.env.MAIL_PASSWORD || 'password'
  },
  app: {
    port: parseInt(process.env.PORT) || 3000
  },
  passport: {
    google: {
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH2_CALLBACKURL
    }
  },
  cookie: {
    signKeys: process.env.COOKIE_SIGN_KEY
  }
})
