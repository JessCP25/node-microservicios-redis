const nanoid = require("nanoid");
const user = require("../../../api/components/user");

const TABLA = "post";

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
    let post = {
      text: body.text,
      user: body.user,
    };

    if (body.id) {
      post.id = body.id;
    } else {
      post.id = nanoid();
    }

    return await store.upsert(TABLA, post);
  }

  async function remove(id) {
    return await store.get(TABLA, id);
  }

  return {
    list,
    get,
    upsert,
    remove,
  };
};
