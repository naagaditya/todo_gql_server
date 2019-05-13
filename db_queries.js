
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

const insertTask = (title, description) => {
  return new Promise((resolve, reject) => {
    connection.query(`insert into tasks (title, description) values ('${title}', '${description }')`, (err, row, fields) => {
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

const getTaskByStatus = (status) => {
  return new Promise((resolve, reject) => {
    connection.query(`select * from tasks where status = ${status}`, (err, row, fields) => {
      if (err) reject(new Error(err));
      resolve(row);
    })
  });
}

const updateStatus = (id, newStatus) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE tasks SET status = ${newStatus} WHERE id = ${id}`, (err, row, fields) => {
      if (err) reject(new Error(err));
      resolve(row);
    })
  });
}

exports.insertTask = insertTask;
exports.getTaskById = getTaskById;
exports.getAllTasks = getAllTasks;
exports.getTaskByStatus = getTaskByStatus;
exports.updateStatus = updateStatus;