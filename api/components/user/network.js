const express = require("express");
const secure = require('./secure');
const response = require("./../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.get("/", list);

router.get("/:id", get);

router.get("/follow/:id", follow);

router.get("/:id/following", following);

router.post("/", upsert);

router.put("/",secure('update'), upsert);

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
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
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

function follow(req, res, next){
  Controller.follow(req.user.id, req.params.id)
    .then(data =>{
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function following(req, res, next){
  Controller.following(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
}

module.exports = router;
