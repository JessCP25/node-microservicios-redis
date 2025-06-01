const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);

router.get("/:id", get);

router.post("/", upsert);

router.put("/", upsert);

router.delete("/:id", remove);

function list(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((post) => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function remove(req, res, next) {
  Controller.remove(req.params.id)
    .then((state) => {
      response.success(req, res, state, 200);
    })
    .catch(next);
}

module.exports = router;
