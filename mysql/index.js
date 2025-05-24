const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network');

const config = require('../config');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/', router)

app.listen(config.mysqlService.port, ()=>{
  console.log('Servicio de mysql escuchando en', config.mysqlService.port)
})