const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data){
  return jwt.sign(data, secret);
}

function verify(token){
  return jwt.verify(token, secret)
}

const check = {
  own: function (req, owner){
    const decoded = decodedHeader(req);
    if(decoded.id !== owner){
      throw error('No puedes hacer esto', 401);
    }
  },
  logged: function (req, owner){
    const decoded = decodedHeader(req);
  }
}

function decodedHeader(req){
  const authorization = req.headers.authorization || '';

  const token = getToken(authorization);

  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

function getToken(auth){
  if(!auth){
    throw new Error('No viene token')
  }

  if(auth.indexOf('Bearer ') === 1){
    throw new Error('Formato inválido')
  }

  const token = auth.replace('Bearer ', '');

  return token;
}

module.exports = {
  sign,
  check
}