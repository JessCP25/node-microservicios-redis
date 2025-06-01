const express = require('express');
const config = require('./../config');

const post = require('./components/post/network');
const bodyParser = require('body-parser');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());


// ROUTER
app.use('/api/post', post);
app.use(errors);

app.listen(config.post.port, () => {
  console.log('Escuchando POST en el puerto ', config.post.port)
})