const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');


// GraphQL schema
const schema = buildSchema(`
  type Query {
    top(id: ID!): Root
  },
  type Todo {
    user_id: ID!
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

const top_data = user_id => {
  return {
    top : {
      user: { id: user_id, name: "Tom" },
      todos: [ { user_id: user_id, title: "example1"  }, { user_id: user_id, title: "example2"  } ]
    }
  }
};

const parse_user_id = params  => {
  return parseInt((params.query.replace(/\s+/g, "").match(/top\(id:([0-9])+\)/) || [])[1]) || undefined
}

const app = express();
app.use('/graphql', express_graphql((request, response, graphQLParams) => {
  return {
    schema: schema,
    rootValue: top_data(parse_user_id(graphQLParams)),
    graphiql: true
  }
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
