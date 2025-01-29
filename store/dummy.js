const db = {
  'user': [
    {
      id: 1,
      name: 'Jessica',
    }
  ]
}

function list(tabla){
  return db[tabla];
}

function get(tabla, id){
  const col = list(tabla);
  return col.filter(item => item.id === id)[0] || null;
}

function upsert(tabla, data){
  db[tabla].push(data);
}

function remove(tabla, id){
  return true;
}

module.exports = {
  get,
  list,
  upsert,
  remove
}