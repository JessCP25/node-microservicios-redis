const { createClient } = require('redis');

const config = require('../config');


const client = createClient({
    username: config.redis.user,
    password: config.redis.password,
    socket: {
        host: config.redis.host,
        port: config.redis.port
    }
});

client.on('error', err => console.log('Redis Client Error', err));

let connect = false;

async function connectIfNeeded(){
  if(!connect){
    await client.connect();
    connect = true
  }
}

async function list(table) {
  await connectIfNeeded();
  
  const data = await client.get(table);
  return data ? JSON.parse(data) : null;
}

// Devuelve por id
async function get(table, id) {
  await connectIfNeeded();
  const key = `${table}:${id}`;
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
}

async function upsert(table, data) {
  await connectIfNeeded();

  let key = table;

  if (data && data.id) {
    key = ket + '_' + data.id
  }

  await client.set(key, JSON.stringify(data), { EX: 60 });

  return data;
}

module.exports = {
  list,
  get,
  upsert
}