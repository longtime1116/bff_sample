const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const request = require('sync-request');



// GraphQL schema
const schema = buildSchema(`
  type Query {
    top(id: ID!): Root
  },
  type Todo {
    userId: ID!
    title: String
  },
  type User {
    id: ID!
    name: String
  },
  type Root {
    user: User
    todos: [Todo]
  },
`);

const httpRequest = async (method, url) => {
  var options = {
    method: method,
    url: url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json'
    },
  };
  return request(method, url, options);
}

const fetchUser = async id => {
  const response = await httpRequest("GET", `https://jsonplaceholder.typicode.com/users/${id}`)
  return { user: JSON.parse(response.getBody('utf8'))  }
}

const fetchTodos = async user_id => {
  const response = await httpRequest("GET", `https://jsonplaceholder.typicode.com/todos?userId=${user_id}`)
  return { todos: JSON.parse(response.getBody('utf8'))  }
}

const top_data = async user_id => {
  if (!user_id) {
    return {}
  }
  var data = {}
  const results = await Promise.all([fetchUser(user_id), fetchTodos(user_id)])
  results.forEach((result) => {
    for(key in result){
      data[key] = result[key]
    }
  });
  return { top: data };
};

const parse_user_id = params  => {
  return parseInt(((params.query || "").replace(/\s+/g, "").match(/top\(id:([0-9])+\)/) || [])[1]) || undefined
}

const app = express();
app.use('/graphql', express_graphql(async (request, response, graphQLParams) => {
  const user_id = parse_user_id(graphQLParams);
  return {
    schema: schema,
    rootValue: await top_data(user_id),
    graphiql: true
  }
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
