require('dotenv').config();

module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000
  },
  post: {
    port: process.env.POST_PORT || 3002
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  mysql: {
    host: process.env.MYSQL_HOST || '',
    user: process.env.MYSQL_USER || '',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || '',
    port: 3306
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.CACHE_SRV_HOST || 'localhost',
    port: process.env.CACHE_SRV_PORT || 3003,
  },
  redis: {
    user: process.env.REDIS_USER || '',
    password: process.env.REDIS_PASS || '',
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_PORT || '',
  }
}