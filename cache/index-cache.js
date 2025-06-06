const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network');

const config = require('../config');

const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/', router)

app.listen(config.cacheService.port, ()=>{
  console.log('Servicio de cache escuchando en', config.cacheService.port)
})