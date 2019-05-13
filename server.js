var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');
var cors = require('cors')
var { insertTask,
    getTaskById,
    getAllTasks,
    getTaskByStatus,
    updateStatus} = require('./db_queries');
var schema = buildSchema(`
  type Query {
    message: String,
    cat: Cat,
    tasks: [Task],
    tasksByStatus(status: Int): [Task],
    task(id: String): Task
  }
  type Cat {
    name: String
  }
  type Task {
    id: ID,
    status: Int,
    title: String,
    description: String
  }
  input TaskInput {
    title: String,
    description: String
  }
  type Mutation {
    addTask(title: String, description: String): Task,
    updateStatus(id: ID, status: Int): Task
  }
`);

var rootValue = {
  message: () => 'hello world',
  cat: () => {
    return {name: 'stat'}
  },
  tasks: () => {
    return getAllTasks().then(res => res);
  },
  task: args => {
    return getTaskById(args.id).then(res => res[0]);
  },
  tasksByStatus: args => {
    return getTaskByStatus(args.status).then(res => res)
  },
  addTask: args => {
    return insertTask(args.title, args.description).then(res => res[0]);
  },
  updateStatus: args => {
    return updateStatus(args.id, args.status).then(res => ({id: args.id}));
  }
};

var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
  schema,
  rootValue,
  graphiql: true
}), );




app.listen(4000, () => {console.log('listening 4000')});