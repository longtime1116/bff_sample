# このリポジトリは？
マイクロサービスアーキテクチャの元となる技術を試すリポジトリ。
学ぶ内容としては以下

* Backends For Frontends の概念
* GraphQL

# 構成
BFF は Next.js で立てている。
API GateWay となるサーバを GraphQL API サーバとして立てている。
GraphQL API サーバが叩く末端のバックエンドは REST API となっている。
