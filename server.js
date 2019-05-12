var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');
var { insertTask} = require('./db_queries');
var schema = buildSchema(`
  type Query {
    message: String,
    cat: Cat,
    tasks: [Task]
  }
  type Cat {
    name: String
  }
  type Task {
    id: ID,
    status: Int,
    title: String,
    desc: String
  }
  input TaskInput {
    title: String,
    desc: String
  }
  type Mutation {
    addTask(title: String, desc: String): Task
  }
`);

var rootValue = {
  message: () => 'hello world',
  cat: () => {
    return {name: 'stat'}
  },
  tasks: () => {
    return [{id: 1, status: 2}];
  },
  addTask: args => {
    return row = insertTask(args.title, args.desc).then(res => {
      return data =  {
        id: res[0].id,
        title: res[0].title,
        status: res[0].status,
        priority: res[0].priority,
        desc: res[0].description
      };
    });
  }
};

var app = express();

app.use('/graphql', express_graphql({
  schema,
  rootValue,
  graphiql: true
}), );




app.listen(4000, () => {console.log('listening 4000')});