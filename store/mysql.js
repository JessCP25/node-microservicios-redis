const mysql = require('mysql2');

const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port
}

let connection;

function handleCon(){
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if(err){
      console.error('[db err]', err);
      setTimeout(handleCon, 2000);
    }else{
      console.log('BD Connected!');
    }
  });

  connection.on('error', err => {
    console.error('[db err]', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleCon();
    }else{
      throw err;
    }
  })
}

handleCon();

function list(tabla){
  return new Promise((resolve, reject)=>{
    connection.query(`SELECT * FROM ${tabla}`, (err,data) => {
      if(err) return reject(err);
      resolve(data);
    })
  })
};

function get(tabla, id){
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (err, data)=>{
      if(err) return reject(err);
      resolve(data)
    })
  })
}

function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    })
  })
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${tabla} SET ? WHERE id=?`, [data, data.id], (err, result) => {
      if(err) return reject(err);
      resolve(result);
    })
  })
}

function upsert(tabla, data){
  if(data && data.id){
    return update(tabla, data);
  }else{
    return insert(tabla, data)
  }
}

function query(tabla, query, join){
  let joinQuery = '';
  if(join){
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${tabla}.${val} = ${key}.id`
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} ${joinQuery} WHERE ?`,query, (err, res) =>{
      if(err) return reject(err);
      resolve(res);
    })
  })
}

module.exports = {
  list,
  get,
  insert,
  update,
  upsert,
  query
}