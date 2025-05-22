const nanoid = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = function (injectStore) {
  let store = injectStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  async function list() {
    return await store.list(TABLA);
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

  return {
    list,
    get,
    upsert,
    remove,
    follow,
  };
};
