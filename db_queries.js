
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projects'
});
connection.connect();
const getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from tasks where id = ${id}`, (err, row, fields) => {
      if (err) reject(new Error(err));
      resolve(row);
    })
  });
}

const insertTask = (title, desc) => {
  return new Promise((resolve, reject) => {
    connection.query(`insert into tasks (title, description) values ('${ title }', '${ desc }')`, (err, row, fields) => {
      if (err) reject(new Error(err));
      getTaskById(row.insertId).then(res => {
        resolve(res);
      }).catch(err => {
        reject(new Error(err));
      })
    });
  });
}

const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    connection.query('select * from tasks', (err, rows, fields) => {
      if (err) reject(new Error(err));
      resolve(rows);
    });
  });
}


exports.insertTask = insertTask;