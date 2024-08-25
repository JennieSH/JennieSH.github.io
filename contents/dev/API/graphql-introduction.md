---
title: "GraphQL - Graph Query Language"
fileName: "graphql-introduction"
description: "站在前端角度，去初探 GraphQL 世界 ～"
createdAt: 2024-04-17
updatedAt: 2024-04-17
tags:
  - graphql
  - api
  - restful
---

###### tags: `GraphQL`

# GraphQL - Graph Query Language

此篇是站在前端角度，去初探 GraphQL 世界 ～

## 什麼是 GraphQL ?

GraphQL 是一種用於 API 的查詢語言，可以讓 client 端更彈性去使用後端提供的資料。

最初是由 Facebook 開發的，是為了要解決手機 APP 在初次載入，會發多個 requests 去取得頁面資料，進而導致程式會變慢或直接當掉問題，所以他們想說將資料整合成一筆，送到 client 直接做使用。[後來 Facebook 也在 2015 年公開發佈這項技術](<(https://engineering.fb.com/2015/09/14/core-data/graphql-a-data-query-language/)>)。

## GraphQL v.s. RESTful

### 1. API endpoints

- `RESTful` 根據資源類型，會有多個 endpoints：

  - `/users/<id>`
  - `/users/<id>/posts`
  - `/users/<id>/followers`

- `GraphQL` 只有一個 endpoint：
  - `/graphql`

### 2. Data Fetching

- `RESTful`
  _ 需要打三次 api，才可以得到頁面要的全部資料
  _ 如果 api 本身有依賴前一支 API (A => B => C)，需要等到 A response，才能發 B 的 request
  ![](https://i.imgur.com/Wg2RlhE.png)

- `GraphQL`
  _ 可選擇三種不同類型的資料，集中在同一筆 request
  _ 資料本身有關聯，如 A 的 response 中有 B 所需要的 params，B 可以直嵌入 A 的 query 裡面，這樣也只需打一次 request 即可
  ![](https://i.imgur.com/aXeOu3I.png)

> [圖片來源](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/)

### 3. Overfetching and Underfetching

- `RESTful` 容易含過多或缺少一些資料，因為 endpoint 回的 response 資料是固定的
- `GraphQL` 可精準挑選所需要的資料

### 4. Schema & Type System

Schema 是用來定義 API 的結構和功能，前端可透過套件，映射一份與後端相同的 API Type System，不只 API 底下欄位定義的 Type，連 Type name 都可以跟後端同步，減少雙方對欄位認知不一致，且後端只要一更改，前端立馬隨之也會更新。

## 如何使用

### Query

用於取得資料

#### 1. 基本

```graphql=
# 寫法一：
{
  me {
    name
  }
}

# 寫法二：
query {
  me {
    name
  }
}

# 寫法三: Operation name for identify different GraphQL requests
query getMe {
  me {
    name
  }
}

```

:::info
:bulb:**Operation name：**

通常實務上都會使用寫法三，也就是會加 Operation name，可以方便 debug 和追蹤一些數據，相當於幫它取一個變數名的概念。

在 Network 裡面也可以看到 Operation name，官方也是建議使用這種寫法。

![](https://i.imgur.com/0cHSBgO.png)
:::

以上三種寫法都可以得到 server 的 response：

```json=
{
  "data":{
    "me": {
      "name": "Jennie"
    }
  }
}
```

#### 2. 有使用參數

```graphql=
# 寫法一： query + 參數
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}

# 寫法二： query + 參數
query humanInfo($id: Int!) {
  human(id: $id) {
    name
    height(unit: FOOT)
  }
}
```

得到的 response：

```json=
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```

#### 3. Aliases - 使用別名

```graphql=
# 使用別名，改變 response key
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

得到的 response：

```json=
{
  "data": {
    "empireHero": {
      "name": "Luke Skywalker"
    },
    "jediHero": {
      "name": "R2-D2"
    }
  }
}
```

#### 4. Fragments

```graphql=
# 使用 Fragments，可依據不同 episode，打同一隻 api
query getXXX{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

得到的 response：

```json=
{
  "data": {
    "leftComparison": {
      "name": "Luke Skywalker",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        },
        {
          "name": "C-3PO"
        },
        {
          "name": "R2-D2"
        }
      ]
    },
    "rightComparison": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ],
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

### Mutation

用於新增/更新/刪除資料

#### 基本

```graphql=
# mutation
mutation createReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

```json=
// variables
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

API 成功後，回傳的 response：

```json=
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

#### 參數預設值

可以使用 `=` 帶入參數的預設值

```graphql=
query HeroNameAndFriends($episode: Episode = JEDI) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

## 生態圈 + 工具

### [Language](https://graphql.org/code/) / Framework

前端 Web 和 App 語言基本 GraphQL 都有支持使用 (e.g. JavaScript、Kotlin、Swift)，另外，不論後端語言是使用哪一種，只需要後端也有使用 GraphQL 撰寫 API，前端就可以用 GraphQL 來做前後端的資料傳輸。

前端三大框架，也各有與 GraphQL 搭配的工具使用，所以可以考慮跟後端溝通，一同踏入 GraphQL 世界！

### GraphQL Client 常見工具

GraphQL Client 主要工作就是，使用前端寫好的 query 與 server 去溝通，即 client 只需要寫 query，打 API 行為就交給工具函式庫幫你解決，相當於在使用 RESTful API 時候，會去用 axios 幫助處理 API。另外這些工具有些也有整合前端其他框架、資料 Cache 等功能，基本都會選一個來搭配使用。

**GraphQL Client**

- [Apollo Client](https://www.apollographql.com/docs/)
- [graphql-request](https://github.com/prisma-labs/graphql-request)
  > 5/27 當天有口誤，主要 GraphQL Client 為 `graphql-request`，只是當天有在搭配，react-query 去處理 API
- [relay](https://relay.dev/)

**IDE**

基本就是 API Documentation，相當於 [swagger](https://swagger.io/) 在使用 RESTful API 扮演的角色，可以透過 IDE 看到 params/response 的 type 資訊，也能在上面直接送 request，查看 response 的資料，但要使用哪個 IDE 是由後端決定的，因為前端也會使用到，所以也稍微介紹一下。

- [GraphiQL](https://www.electronjs.org/apps/graphiql)
- [graphql-playground](https://github.com/graphql/graphql-playground)

**其他**

如果有使用 TypeScript 強烈推薦使用！它會依據 client 定義的 query，自動對到後端提供的 schema 產生對應的 type，連 type name 也不用前端想，對命名障礙的人簡直是福音，而且只要後端有改到 schema，文件也對自己自動修改，開發體驗非常好！ :+1:

- [GraphQL Code Generator](https://www.graphql-code-generator.com/)

![GraphQL Code Generator](https://i.imgur.com/5le51mm.png)

## GraphQL 優/缺點

### 優點

1. doc 文件清楚 (我覺得比 Swagger 好用)
2. 彈性調整 response，可以剛好配置出前端需要的資料格式
3. TypeScript 搭配工具，能自動產出 response type，節省開發和維護時間
4. 生態系已滿蓬勃，將來換語言或框架，經驗也可以沿用

### 缺點

1. 需要後端配合使用
2. 後端 api error response，相較於 Swagger，較不容易寫清楚
3. 學習成本，跟 RESTful 用法還是不同，需付出時間適應學習
4. 錯誤訊息需額外處理，基本有成功都是 200，更詳細錯誤訊息，需解構出來看
5. query 深度和複雜度都會影響整個 query 效能
6. 搭配 cache 功能的話，需考慮到整個專案設計，避免同資料，更新時間點不同步

## Apollo + React

:::info
**[Demo Code：](https://github.com/JennieSH/graphql-appworks)**

- **[client-js](https://github.com/JennieSH/graphql-appworks/tree/master/client-js)** : React + JavaScript + apollo
- **[client-ts](https://github.com/JennieSH/graphql-appworks/tree/master/client-ts)** : React + TypeScript + graphql-request
- **[server-js](https://github.com/JennieSH/graphql-appworks/tree/master/server-js)** : Nodejs + MongoDB

:bulb: 想實作前端的話，可以直接拉 **[feature/template](https://github.com/JennieSH/graphql-appworks/blob/feature/template/client-js/package.json)** 這個 branch，裡面 UI 已處理好，後端 server 起起來後，就可以自行針對練習 graphql

:bulb: 後端 DB 密碼記得改成 school wifi 密碼，或者改接自己的 DB、server 也可以
:::

#### 1. 安裝

```
npm install @apollo/client graphql
```

#### 2. 初始化 ApolloClient

- `uri` 需調整為 GraphQL server URL

```jsx
// App.jsx

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// step 1. initialize apollo client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

// step 2. add ApolloProvider
const App = () => {
  return <ApolloProvider client={client}>Hello world!</ApolloProvider>;
};

export default App;
```

:::info
:bulb:**[Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm/related)**

可在開發者工具的 tab 打開，即可看到如圖的畫面，也可以在這邊操作打 api，可以看到即時的 response 。

![](https://i.imgur.com/aG2qW58.png)
:::

## 總結

每個技術都有適合的場景應用，這篇並不是鼓吹棄用 RESTful API，只是從前端角度打開 GraphQL 世界的一篇紀錄，當然從後端角度看 GraphQL 一定是有另一種感悟和不同的考慮方向了，例如有： N+1 等性能問題。

GraphQL 提供靈活性和效率的同時，也帶來一些挑戰，了解該優缺點，才能在抉擇時，考慮更全面。

## 參考資料

1. [HOW TO GRAPHQL](https://www.howtographql.com/)
2. [GraphQL 官網](https://graphql.org/)
3. [Think in GraphQL](https://ithelp.ithome.com.tw/articles/10200678)
4. [Understanding Client-Side GraphQl With Apollo-Client In React Apps](https://www.smashingmagazine.com/2020/07/client-side-graphql-apollo-client-react-apps/)
