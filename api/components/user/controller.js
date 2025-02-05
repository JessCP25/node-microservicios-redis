const nanoid = require("nanoid");
const TABLA = 'user';

module.exports = function(injectStore) {
  let store = injectStore;

  if(!store){
    store = require('../../../store/dummy');
  }

  async function list(){
    return await store.list(TABLA);
  }

  async function get(id){
    return await store.get(TABLA, id);
  }

  async function upsert(body){
    const user = {
      name: body.name
    }

    if(body.id){
      user.id = body.id
    }else{
      user.id = nanoid();
    }

    return await store.upsert(TABLA, user);
  }

  async function remove(id){
    return await store.get(TABLA, id);
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}