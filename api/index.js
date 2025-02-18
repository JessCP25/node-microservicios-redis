const express = require('express');
const config = require('./../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json');

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(config.api.port, () => {
  console.log('Escuchando en el puerto ', config.api.port)
})