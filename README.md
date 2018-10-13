# GraphQL API サーバ起動

以下でサーバを起動

```bash
$ node api_gateway_server.js
Express GraphQL Server Now Running On localhost:4000/graphql
```

その後 `localhost:4000/graphql` にアクセスし、以下のようなクエリを左のペインに書いて実行する。

```js
query getTopPageData {
  top {
    user {
      id
      name
    }
    items {
      user_id
      title
    }
  }
}
```

すると以下のような結果が帰ってきて右ペインに表示される

```json
{
  "data": {
    "top": {
      "user": {
        "id": 1,
        "name": "Tom"
      },
      "items": [
        {
          "user_id": 1,
          "title": "example1"
        },
        {
          "user_id": 1,
          "title": "example2"
        }
      ]
    }
  }
}
```

curl で確認する際は、Content-Type の指定を忘れずに。

```bash
$curl -H 'Content-Type:application/json' -X POST -d '{"query": "query { top { user { id name  } items { user_id title  }  }  }"}' localhost:4000/graphql'
```
