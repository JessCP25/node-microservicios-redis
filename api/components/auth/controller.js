const auth = require('../../../auth');

const TABLA = 'auth'
module.exports = function(injectStore) {
  let store = injectStore;

  if(!store){
    store = require('../../../store/dummy');
  }

  async function login(username, password){
    const data = await store.query(TABLA, {username: username});
    if(data.password === password){
      return auth.sign(data);
    }else{
      throw new Error('Información inválida');
    }
  }

  async function upsert(data){
    const auth = {
      id: data.id
    };

    if(data.username){
      auth.username = data.username;
    }

    if(data.password){
      auth.password = data.password;
    }

    return await store.upsert(TABLA, auth);
  }

  return {
    upsert,
    login,
  }
}