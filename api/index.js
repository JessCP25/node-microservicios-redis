const express = require('express');
const app = express();
const config = require('./../config');
const user = require('./components/user/network')

// ROUTER
app.use('/api/user', user)

app.listen(config.api.port, () => {
  console.log('Escuchando en el puerto ', config.api.port)
})