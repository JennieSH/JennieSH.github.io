window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1734247958",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FAPI\u002Fgraphql-introduction",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-API-graphql-introduction":{info:{title:b,fileName:"graphql-introduction",description:"站在前端角度，去初探 GraphQL 世界 ～",createdAt:c,updatedAt:c,tags:["graphql","api","restful"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EGraphQL\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"GraphQL - Graph Query Language\" title=\"GraphQL - Graph Query Language\"\u003EGraphQL - Graph Query Language\u003C\u002Fh1\u003E\n\u003Cp\u003E此篇是站在前端角度，去初探 GraphQL 世界 ～\u003C\u002Fp\u003E\n\u003Ch2 id=\"什麼是 GraphQL ?\" title=\"什麼是 GraphQL ?\"\u003E\u003Ca href=\"#什麼是 GraphQL ?\"\u003E什麼是 GraphQL ?\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003EGraphQL 是一種用於 API 的查詢語言，可以讓 client 端更彈性去使用後端提供的資料。\u003C\u002Fp\u003E\n\u003Cp\u003E最初是由 Facebook 開發的，是為了要解決手機 APP 在初次載入，會發多個 requests 去取得頁面資料，進而導致程式會變慢或直接當掉問題，所以他們想說將資料整合成一筆，送到 client 直接做使用。\u003Ca  href=\"(https:\u002F\u002Fengineering.fb.com\u002F2015\u002F09\u002F14\u002Fcore-data\u002Fgraphql-a-data-query-language\u002F)\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E後來 Facebook 也在 2015 年公開發佈這項技術\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003Ch2 id=\"GraphQL v.s. RESTful\" title=\"GraphQL v.s. RESTful\"\u003E\u003Ca href=\"#GraphQL v.s. RESTful\"\u003EGraphQL v.s. RESTful\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E1. API endpoints\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E\u003Ccode\u003ERESTful\u003C\u002Fcode\u003E 根據資源類型，會有多個 endpoints：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003E\u002Fusers\u002F&lt;id&gt;\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E\u002Fusers\u002F&lt;id&gt;\u002Fposts\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E\u002Fusers\u002F&lt;id&gt;\u002Ffollowers\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E\u003Ccode\u003EGraphQL\u003C\u002Fcode\u003E 只有一個 endpoint：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003E\u002Fgraphql\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E2. Data Fetching\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E\u003Ccode\u003ERESTful\u003C\u002Fcode\u003E\u003Cbr \u002F\u003E\n_ 需要打三次 api，才可以得到頁面要的全部資料\u003Cbr \u002F\u003E\n_ 如果 api 本身有依賴前一支 API (A =&gt; B =&gt; C)，需要等到 A response，才能發 B 的 request\u003Cbr \u002F\u003E\n\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FWg2RlhE.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E\u003Ccode\u003EGraphQL\u003C\u002Fcode\u003E\u003Cbr \u002F\u003E\n_ 可選擇三種不同類型的資料，集中在同一筆 request\u003Cbr \u002F\u003E\n_ 資料本身有關聯，如 A 的 response 中有 B 所需要的 params，B 可以直嵌入 A 的 query 裡面，這樣也只需打一次 request 即可\u003Cbr \u002F\u003E\n\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FaXeOu3I.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Ca  href=\"https:\u002F\u002Fwww.howtographql.com\u002Fbasics\u002F1-graphql-is-the-better-rest\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E圖片來源\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch3\u003E3. Overfetching and Underfetching\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003ERESTful\u003C\u002Fcode\u003E 容易含過多或缺少一些資料，因為 endpoint 回的 response 資料是固定的\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003EGraphQL\u003C\u002Fcode\u003E 可精準挑選所需要的資料\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E4. Schema &amp; Type System\u003C\u002Fh3\u003E\n\u003Cp\u003ESchema 是用來定義 API 的結構和功能，前端可透過套件，映射一份與後端相同的 API Type System，不只 API 底下欄位定義的 Type，連 Type name 都可以跟後端同步，減少雙方對欄位認知不一致，且後端只要一更改，前端立馬隨之也會更新。\u003C\u002Fp\u003E\n\u003Ch2 id=\"如何使用\" title=\"如何使用\"\u003E\u003Ca href=\"#如何使用\"\u003E如何使用\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003EQuery\u003C\u002Fh3\u003E\n\u003Cp\u003E用於取得資料\u003C\u002Fp\u003E\n\u003Ch4\u003E1. 基本\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E# 寫法一：\n{\n  me {\n    name\n  }\n}\n\n# 寫法二：\nquery {\n  me {\n    name\n  }\n}\n\n# 寫法三: Operation name for identify different GraphQL requests\nquery getMe {\n  me {\n    name\n  }\n}\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E💡\u003Cstrong\u003EOperation name：\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E通常實務上都會使用寫法三，也就是會加 Operation name，可以方便 debug 和追蹤一些數據，相當於幫它取一個變數名的概念。\u003C\u002Fp\u003E\n\u003Cp\u003E在 Network 裡面也可以看到 Operation name，官方也是建議使用這種寫法。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F0cHSBgO.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Cp\u003E以上三種寫法都可以得到 server 的 response：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;data&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;me&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Jennie&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E2. 有使用參數\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E# 寫法一： query + 參數\n{\n  human(id: &quot;1000&quot;) {\n    name\n    height(unit: FOOT)\n  }\n}\n\n# 寫法二： query + 參數\nquery humanInfo($id: Int!) {\n  human(id: $id) {\n    name\n    height(unit: FOOT)\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E得到的 response：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;data&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;human&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Luke Skywalker&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;height&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E5.6430448\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E3. Aliases - 使用別名\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E# 使用別名，改變 response key\n{\n  empireHero: hero(episode: EMPIRE) {\n    name\n  }\n  jediHero: hero(episode: JEDI) {\n    name\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E得到的 response：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;data&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;empireHero&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Luke Skywalker&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;jediHero&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;R2-D2&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E4. Fragments\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E# 使用 Fragments，可依據不同 episode，打同一隻 api\nquery getXXX{\n  leftComparison: hero(episode: EMPIRE) {\n    ...comparisonFields\n  }\n  rightComparison: hero(episode: JEDI) {\n    ...comparisonFields\n  }\n}\n\nfragment comparisonFields on Character {\n  name\n  appearsIn\n  friends {\n    name\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E得到的 response：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;data&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;leftComparison&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Luke Skywalker&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;appearsIn&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;NEWHOPE&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;EMPIRE&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;JEDI&quot;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;friends&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Han Solo&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Leia Organa&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;C-3PO&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;R2-D2&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;rightComparison&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;R2-D2&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;appearsIn&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;NEWHOPE&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;EMPIRE&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-string\"\u003E&quot;JEDI&quot;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;friends&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Luke Skywalker&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Han Solo&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Leia Organa&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EMutation\u003C\u002Fh3\u003E\n\u003Cp\u003E用於新增\u002F更新\u002F刪除資料\u003C\u002Fp\u003E\n\u003Ch4\u003E基本\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E# mutation\nmutation createReviewForEpisode($ep: Episode!, $review: ReviewInput!) {\n  createReview(episode: $ep, review: $review) {\n    stars\n    commentary\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F variables\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;ep&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;JEDI&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;review&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;stars&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E5\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;commentary&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;This is a great movie!&quot;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003EAPI 成功後，回傳的 response：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;data&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;hero&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;R2-D2&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;friends&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Luke Skywalker&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Han Solo&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;Leia Organa&quot;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E參數預設值\u003C\u002Fh4\u003E\n\u003Cp\u003E可以使用 \u003Ccode\u003E=\u003C\u002Fcode\u003E 帶入參數的預設值\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Equery HeroNameAndFriends($episode: Episode = JEDI) {\n  hero(episode: $episode) {\n    name\n    friends {\n      name\n    }\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"生態圈 + 工具\" title=\"生態圈 + 工具\"\u003E\u003Ca href=\"#生態圈 + 工具\"\u003E生態圈 + 工具\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E\u003Ca  href=\"https:\u002F\u002Fgraphql.org\u002Fcode\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ELanguage\u003C\u002Fa\u003E \u002F Framework\u003C\u002Fh3\u003E\n\u003Cp\u003E前端 Web 和 App 語言基本 GraphQL 都有支持使用 (e.g. JavaScript、Kotlin、Swift)，另外，不論後端語言是使用哪一種，只需要後端也有使用 GraphQL 撰寫 API，前端就可以用 GraphQL 來做前後端的資料傳輸。\u003C\u002Fp\u003E\n\u003Cp\u003E前端三大框架，也各有與 GraphQL 搭配的工具使用，所以可以考慮跟後端溝通，一同踏入 GraphQL 世界！\u003C\u002Fp\u003E\n\u003Ch3\u003EGraphQL Client 常見工具\u003C\u002Fh3\u003E\n\u003Cp\u003EGraphQL Client 主要工作就是，使用前端寫好的 query 與 server 去溝通，即 client 只需要寫 query，打 API 行為就交給工具函式庫幫你解決，相當於在使用 RESTful API 時候，會去用 axios 幫助處理 API。另外這些工具有些也有整合前端其他框架、資料 Cache 等功能，基本都會選一個來搭配使用。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003EGraphQL Client\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.apollographql.com\u002Fdocs\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EApollo Client\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fprisma-labs\u002Fgraphql-request\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Egraphql-request\u003C\u002Fa\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E5\u002F27 當天有口誤，主要 GraphQL Client 為 \u003Ccode\u003Egraphql-request\u003C\u002Fcode\u003E，只是當天有在搭配，react-query 去處理 API\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Frelay.dev\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Erelay\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Cstrong\u003EIDE\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E基本就是 API Documentation，相當於 \u003Ca  href=\"https:\u002F\u002Fswagger.io\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eswagger\u003C\u002Fa\u003E 在使用 RESTful API 扮演的角色，可以透過 IDE 看到 params\u002Fresponse 的 type 資訊，也能在上面直接送 request，查看 response 的資料，但要使用哪個 IDE 是由後端決定的，因為前端也會使用到，所以也稍微介紹一下。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.electronjs.org\u002Fapps\u002Fgraphiql\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGraphiQL\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fgraphql\u002Fgraphql-playground\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Egraphql-playground\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Cstrong\u003E其他\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E如果有使用 TypeScript 強烈推薦使用！它會依據 client 定義的 query，自動對到後端提供的 schema 產生對應的 type，連 type name 也不用前端想，對命名障礙的人簡直是福音，而且只要後端有改到 schema，文件也對自己自動修改，開發體驗非常好！ 👍\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.graphql-code-generator.com\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGraphQL Code Generator\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F5le51mm.png\" alt=\"GraphQL Code Generator\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"GraphQL 優\u002F缺點\" title=\"GraphQL 優\u002F缺點\"\u003E\u003Ca href=\"#GraphQL 優\u002F缺點\"\u003EGraphQL 優\u002F缺點\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E優點\u003C\u002Fh3\u003E\n\u003Col\u003E\n\u003Cli\u003Edoc 文件清楚 (我覺得比 Swagger 好用)\u003C\u002Fli\u003E\n\u003Cli\u003E彈性調整 response，可以剛好配置出前端需要的資料格式\u003C\u002Fli\u003E\n\u003Cli\u003ETypeScript 搭配工具，能自動產出 response type，節省開發和維護時間\u003C\u002Fli\u003E\n\u003Cli\u003E生態系已滿蓬勃，將來換語言或框架，經驗也可以沿用\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch3\u003E缺點\u003C\u002Fh3\u003E\n\u003Col\u003E\n\u003Cli\u003E需要後端配合使用\u003C\u002Fli\u003E\n\u003Cli\u003E後端 api error response，相較於 Swagger，較不容易寫清楚\u003C\u002Fli\u003E\n\u003Cli\u003E學習成本，跟 RESTful 用法還是不同，需付出時間適應學習\u003C\u002Fli\u003E\n\u003Cli\u003E錯誤訊息需額外處理，基本有成功都是 200，更詳細錯誤訊息，需解構出來看\u003C\u002Fli\u003E\n\u003Cli\u003Equery 深度和複雜度都會影響整個 query 效能\u003C\u002Fli\u003E\n\u003Cli\u003E搭配 cache 功能的話，需考慮到整個專案設計，避免同資料，更新時間點不同步\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch2 id=\"Apollo + React\" title=\"Apollo + React\"\u003E\u003Ca href=\"#Apollo + React\"\u003EApollo + React\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fgraphql-appworks\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EDemo Code：\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fgraphql-appworks\u002Ftree\u002Fmaster\u002Fclient-js\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eclient-js\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E : React + JavaScript + apollo\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fgraphql-appworks\u002Ftree\u002Fmaster\u002Fclient-ts\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eclient-ts\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E : React + TypeScript + graphql-request\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fgraphql-appworks\u002Ftree\u002Fmaster\u002Fserver-js\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eserver-js\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E : Nodejs + MongoDB\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E💡 想實作前端的話，可以直接拉 \u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fgraphql-appworks\u002Fblob\u002Ffeature\u002Ftemplate\u002Fclient-js\u002Fpackage.json\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Efeature\u002Ftemplate\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E 這個 branch，裡面 UI 已處理好，後端 server 起起來後，就可以自行針對練習 graphql\u003C\u002Fp\u003E\n\u003Cp\u003E💡 後端 DB 密碼記得改成 school wifi 密碼，或者改接自己的 DB、server 也可以\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch4\u003E1. 安裝\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Enpm install @apollo\u002Fclient graphql\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E2. 初始化 ApolloClient\u003C\u002Fh4\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003Euri\u003C\u002Fcode\u003E 需調整為 GraphQL server URL\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F App.jsx\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-keyword\"\u003Eimport\u003C\u002Fspan\u003E { \u003Cspan class=\"hljs-title class_\"\u003EApolloClient\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-title class_\"\u003EInMemoryCache\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-title class_\"\u003EApolloProvider\u003C\u002Fspan\u003E } \u003Cspan class=\"hljs-keyword\"\u003Efrom\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;@apollo\u002Fclient&quot;\u003C\u002Fspan\u003E;\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F step 1. initialize apollo client\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E client = \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title class_\"\u003EApolloClient\u003C\u002Fspan\u003E({\n  \u003Cspan class=\"hljs-attr\"\u003Euri\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;http:\u002F\u002Flocalhost:4000\u002Fgraphql&quot;\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003Ecache\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-keyword\"\u003Enew\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title class_\"\u003EInMemoryCache\u003C\u002Fspan\u003E()\n});\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F step 2. add ApolloProvider\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EApp\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003EApolloProvider\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclient\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{client}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EHello world!\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003EApolloProvider\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E;\n};\n\n\u003Cspan class=\"hljs-keyword\"\u003Eexport\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Edefault\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title class_\"\u003EApp\u003C\u002Fspan\u003E;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E💡\u003Cstrong\u003E\u003Ca  href=\"https:\u002F\u002Fchrome.google.com\u002Fwebstore\u002Fdetail\u002Fapollo-client-devtools\u002Fjdkknkkbebbapilgoeccciglkfbmbnfm\u002Frelated\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EApollo Client Devtools\u003C\u002Fa\u003E\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E可在開發者工具的 tab 打開，即可看到如圖的畫面，也可以在這邊操作打 api，可以看到即時的 response 。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FaG2qW58.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"總結\" title=\"總結\"\u003E\u003Ca href=\"#總結\"\u003E總結\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E每個技術都有適合的場景應用，這篇並不是鼓吹棄用 RESTful API，只是從前端角度打開 GraphQL 世界的一篇紀錄。當然，從後端角度看，GraphQL 一定有另一種感悟和不同的考慮方向，例如 N+1 等性能問題。GraphQL 在提供靈活性和效率的同時，也帶來了一些挑戰，了解這些優缺點，才能在做出選擇時考慮得更全面。\u003C\u002Fp\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.howtographql.com\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHOW TO GRAPHQL\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgraphql.org\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGraphQL 官網\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fithelp.ithome.com.tw\u002Farticles\u002F10200678\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EThink in GraphQL\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.smashingmagazine.com\u002F2020\u002F07\u002Fclient-side-graphql-apollo-client-react-apps\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EUnderstanding Client-Side GraphQl With Apollo-Client In React Apps\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n",toc:{title:b,subtitles:["什麼是 GraphQL ?","GraphQL v.s. RESTful","如何使用","生態圈 + 工具","GraphQL 優\u002F缺點","Apollo + React","總結","參考資料"]},wordCount:1411}}}}(null,"GraphQL - Graph Query Language","2024-04-17T00:00:00.000Z"));