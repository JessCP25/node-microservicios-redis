const db = {
  user: [
    {
      id: "1",
      name: "Jessica",
    },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  const col = await list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}

async function query(tabla, q){
  const col = await list(tabla);
  const keys = Object.keys(q);
  const key = keys[0];
  return col.filter((item) => item[key] === q[key])[0] || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    db[tabla] = [];
  }
  db[tabla].push(data);
  return data;
}

async function remove(tabla, id) {
  const index = db[tabla].findIndex((item) => item.id === id);
  if (index !== -1) {
    db[tabla] = db[tabla].splice(index, 1);
  }
  return true;
}

module.exports = {
  get,
  list,
  upsert,
  remove,
  query,
};
