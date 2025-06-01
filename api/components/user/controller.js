const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = function (injectStore, injectCache) {
  let store = injectStore;
  let cache = injectCache;

  if (!store) {
    store = require("../../../store/dummy");
  }

  if (!cache) {
    cache = require("../../../store/dummy");
  }

  async function list() {
    let users = await cache.list(TABLA);
    if(!users){
      console.log('No estaba en cache')
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    }else{
      console.log('Nos lo traemos de cache')
    }
    return users;
  }

  async function get(id) {
    return await store.get(TABLA, id);
  }

  async function upsert(body) {
    let user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.username || body.password) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return await store.upsert(TABLA, user);
  }

  async function remove(id) {
    return await store.get(TABLA, id);
  }

  async function follow(from, to){
    store.upsert(TABLA + '_follow', {
      user_from: from,
      user_to: to,
    })
  }

  async function following(user){
    const join = {}
    join[TABLA] = 'user_to';
    const query = {user_from: user};

    return await store.query(TABLA+ '_follow', query, join)
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following,
  };
};
