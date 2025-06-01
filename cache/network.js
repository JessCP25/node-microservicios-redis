const express = require('express');
const response = require('../network/response');
const Store = require('../store/redis')

const router = express.Router();

router.get('/:tabla', list);
router.get('/:tabla/:id', get);
router.put('/:tabla', upsert);

async function list(req, res, next){
  const data = await Store.list(req.params.tabla)
  response.success(req, res, data, 200)
}

async function get(req, res, next){
  const data = await Store.get(req.params.tabla, req.params.id);
  response.success(req, res, data, 200)
}

async function upsert(req, res, next){
  const data = await Store.upsert(req.params.tabla, req.body);
  response.success(req, res, data, 201);
}

module.exports = router;