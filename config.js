require('dotenv').config();

module.exports = {
  api: {
    port: process.env.API_PORT || 3000
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
    port: process.env.MYSQL_SRV_PORT || 3001,
  }
}