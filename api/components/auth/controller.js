const DATA = 'auth'
module.exports = function(injectStore) {
  let store = injectStore;

  if(!store){
    store = require('../../../store/dummy');
  }

  async function upsert(data){
    auth = {
      id: data.id
    };

    if(data.username){
      auth.username = data.username;
    }

    if(data.password){
      auth.password = data.password;
    }

    return await store.upsert(DATA, auth);
  }

  return {
    upsert
  }
}