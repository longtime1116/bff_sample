var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
  type Query {
    top: Root
    user: User
    item: Item
  },
  type Item {
    user_id: Int
    title: String
  },
  type User {
    id: Int
    name: String
  },
  type Root {
    user: User
    items: [Item]
  }
`);

var root = {
  top: { user: { id: 1, name: "Tom" }, items: [ { user_id: 1, title: "example1"  }, { user_id: 1, title: "example2"  } ]  }
};

var app = express();
app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
