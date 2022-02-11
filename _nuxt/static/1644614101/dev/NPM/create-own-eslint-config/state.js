window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1644614101",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FNPM\u002Fcreate-own-eslint-config",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-NPM-create-own-eslint-config":{info:{title:b,fileName:"create-own-eslint-config",description:"實作自己的 ESLint Config Package。",createdAt:c,updatedAt:c,tags:["NPM","package","ESLint","config"]},content:"\u003Ch1 id=\"Create My Own ESLint Config Package !\" title=\"Create My Own ESLint Config Package !\"\u003ECreate My Own ESLint Config Package !\u003C\u002Fh1\u003E\n\u003Cp\u003E為了維護專案的程式品質，避免不同開發者放飛自我，ESLint 基本是每個專案必備的套件，透過 ESLint 可以規範整個團隊的開發風格和程式碼品質，也能降低新進開發者進專案的時間成本。學會了 ESLint，也可以嘗試實作 Stylelint，做法也是一樣的～\u003C\u002Fp\u003E\n\u003Ch2 id=\"為什麼要將 ESLint Config 獨立出來？\" title=\"為什麼要將 ESLint Config 獨立出來？\"\u003E\u003Ca href=\"#為什麼要將 ESLint Config 獨立出來？\"\u003E為什麼要將 ESLint Config 獨立出來？\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E如果公司的需求，是常常需要開新的專案，這樣每次都需要設定(\u003Cs\u003E複製\u003C\u002Fs\u003E)一份 ESLint Config，且如果團隊規範的規則更改的話，需要至各至專案內更改，一來太繁瑣，二來也怕規則沒正確同步。\u003C\u002Fp\u003E\n\u003Cp\u003E為了解決上述問題和更有效管理團隊規範，可以把 ESLint Config 打包成一個獨立套件，每個新開專案只要負責安裝套件、套用該規則即可～\u003C\u002Fp\u003E\n\u003Ch2 id=\"Configuring ESLint 配置選項\" title=\"Configuring ESLint 配置選項\"\u003E\u003Ca href=\"#Configuring ESLint 配置選項\"\u003EConfiguring ESLint 配置選項\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E下面例子為 vue-cli 創建專案時，所產出來的 ESLint Config 檔案，藉此我們會探討一些常見的配置選項。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F .eslintrc.js\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-variable language_\"\u003Emodule\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eexports\u003C\u002Fspan\u003E = {\n    \u003Cspan class=\"hljs-attr\"\u003Eroot\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003Eenv\u003C\u002Fspan\u003E: {\n      \u003Cspan class=\"hljs-string\"\u003E&quot;node&quot;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E\n    },\n    \u003Cspan class=\"hljs-attr\"\u003EparserOptions\u003C\u002Fspan\u003E: {\n      \u003Cspan class=\"hljs-string\"\u003E&quot;parser&quot;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;babel-eslint&quot;\u003C\u002Fspan\u003E\n    },\n    \u003Cspan class=\"hljs-attr\"\u003Eextends\u003C\u002Fspan\u003E: [\n      \u003Cspan class=\"hljs-string\"\u003E&quot;plugin:vue\u002Fessential&quot;\u003C\u002Fspan\u003E,\n      \u003Cspan class=\"hljs-string\"\u003E&quot;eslint:recommended&quot;\u003C\u002Fspan\u003E\n    ],\n    \u003Cspan class=\"hljs-attr\"\u003Eplugins\u003C\u002Fspan\u003E: [],\n    \u003Cspan class=\"hljs-attr\"\u003Erules\u003C\u002Fspan\u003E: {},\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E- \u003Ccode\u003Eroot\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E默認情況下，ESLint 會在所有父級目錄裡尋找配置文件，一直到根目錄，適合所有項目都遵循一個特定的約定時。\u003C\u002Fp\u003E\n\u003Cp\u003E如果想 ESLint 限制到一個特定的項目，可設置 \u003Ccode\u003E&quot;root&quot;: true\u003C\u002Fcode\u003E，表示當前配置文件為 eslint 的根配置文件，使其停止在父級目錄繼續尋找，效果如下：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ehome\n└── user\n    ├── .eslintrc\n    └── projectA\n        ├── .eslintrc  &lt;- Not used\n        └── lib\n            ├── .eslintrc  &lt;- { &quot;root&quot;: true }\n            └── main.js\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E- \u003Ccode\u003Eenv\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Ca  href=\"http:\u002F\u002Feslint.cn\u002Fdocs\u002Fuser-guide\u002Fconfiguring#specifying-environments\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E運行環境\u003C\u002Fa\u003E，用於定義全域變數，常見如下：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003Ebrowser : 瀏覽器環境中的全域變數\u003C\u002Fli\u003E\n\u003Cli\u003Enode : Node.js 全域變數和 Node.js 作用域\u003C\u002Fli\u003E\n\u003Cli\u003Emocha : 添加所有的 Mocha 測試全域變數\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E- \u003Ccode\u003EparserOptions\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Ca  href=\"http:\u002F\u002Feslint.cn\u002Fdocs\u002Fuser-guide\u002Fconfiguring#specifying-parser-options\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E解析器的配置選項\u003C\u002Fa\u003E，可以指定想要的 ECMAScript 版本等資訊。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 官網範例\u003C\u002Fspan\u003E\n \u003Cspan class=\"hljs-attr\"\u003E&quot;parserOptions&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;ecmaVersion&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-number\"\u003E6\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 支持的ES語法版本，默認為5\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;sourceType&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;module&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 指定JS代碼來源的類型，默認為script\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-attr\"\u003E&quot;ecmaFeatures&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 表示你想使用的額外的語言特性\u003C\u002Fspan\u003E\n          \u003Cspan class=\"hljs-attr\"\u003E&quot;jsx&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Etrue\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 啟用jsx語法\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdetails class='spoiler'\u003E\u003Csummary\u003E更多資訊\u003C\u002Fsummary\u003E\n\u003Cp\u003E\u003Ccode\u003EparserOptions\u003C\u002Fcode\u003E 的官方配置參數是不包括 \u003Ccode\u003Eparser\u003C\u002Fcode\u003E 的，這裡會出現是因為使用 \u003Ccode\u003EVue\u003C\u002Fcode\u003E 原因，詳情可參考\u003Ca  href=\"https:\u002F\u002Fsegmentfault.com\u002Fa\u002F1190000017461203?utm_source=tag-newest\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E這篇\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003EparserOptions: {\n  &quot;parser&quot;: &quot;babel-eslint&quot;\n},\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fdetails\u003E\n\u003Ch3\u003E- \u003Ccode\u003Eextends\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"http:\u002F\u002Feslint.cn\u002Fdocs\u002Fuser-guide\u002Fconfiguring#extending-configuration-files\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E規則繼承\u003C\u002Fa\u003E，可繼承別人定義好的 eslint config 檔案。\u003C\u002Fli\u003E\n\u003Cli\u003E設定檔命名規則基本為 \u003Ccode\u003Eeslint-config-*\u003C\u002Fcode\u003E 為前綴，在 extends 時可以把前綴省略。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F .eslintrc.js\u003C\u002Fspan\u003E\nextends\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E[\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 由 plugin 提供的設定檔(ESLint config)就要加上 `plugin:` 的前綴\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-string\"\u003E&quot;plugin:vue\u002Fessential&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 套件為 eslint-config-prettier，前綴 `eslint-config` 可省略\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-string\"\u003E&quot;prettier&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E]\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充：\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E有些 plugin 會提供 ESLint config 給使用者做選擇。\u003C\u002Fp\u003E\n\u003Cp\u003E&lt;br&gt;\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u003Ccode\u003Eplugin:vue\u002Fessential\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E 是繼承 \u003Ccode\u003Eeslint-plugin-vue\u003C\u002Fcode\u003E 中 \u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fvuejs\u002Feslint-plugin-vue\u002Fblob\u002Fmaster\u002Flib\u002Fconfigs\u002Fessential.js\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003Econfig\u002Fessential.js\u003C\u002Fcode\u003E\u003C\u002Fa\u003E (eslint config) 中的規則設定。\u003Cbr \u002F\u003E\n&lt;br\u002F&gt;\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 官方 repo 中的 essential.js\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-variable language_\"\u003Emodule\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eexports\u003C\u002Fspan\u003E = {\n  \u003Cspan class=\"hljs-attr\"\u003Eextends\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-built_in\"\u003Erequire\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003Eresolve\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&#x27;.\u002Fbase&#x27;\u003C\u002Fspan\u003E),\n  \u003Cspan class=\"hljs-attr\"\u003Erules\u003C\u002Fspan\u003E: {\n    \u003Cspan class=\"hljs-string\"\u003E&#x27;vue\u002Fno-arrow-functions-in-watch&#x27;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&#x27;error&#x27;\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-string\"\u003E&#x27;vue\u002Fno-async-in-computed-properties&#x27;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&#x27;error&#x27;\u003C\u002Fspan\u003E,\n    ...}\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003E- \u003Ccode\u003Eplugins\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E其他開發者定義的新規則，掛載至 plugin 後，使用者要自行決定如何去使用這些規則。\u003C\u002Fli\u003E\n\u003Cli\u003E命名規則為 \u003Ccode\u003Eeslint-plugin-*\u003C\u002Fcode\u003E 為前綴，在擴充 plugin 時可以把前綴省略。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E&lt;br&gt;\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F .eslintrc.js\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-attr\"\u003Erules\u003C\u002Fspan\u003E: {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F enforce tag names to pascal case\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-string\"\u003E&quot;vue\u002Fcomponent-name-in-template-casing&quot;\u003C\u002Fspan\u003E: [\n      \u003Cspan class=\"hljs-string\"\u003E&quot;error&quot;\u003C\u002Fspan\u003E,\n      \u003Cspan class=\"hljs-string\"\u003E&quot;PascalCase&quot;\u003C\u002Fspan\u003E,\n      {\n        \u003Cspan class=\"hljs-attr\"\u003EregisteredComponentsOnly\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Efalse\u003C\u002Fspan\u003E,\n        \u003Cspan class=\"hljs-attr\"\u003Eignores\u003C\u002Fspan\u003E: [\u003Cspan class=\"hljs-string\"\u003E&quot;\u002F^router-\u002F&quot;\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-string\"\u003E&quot;\u002F^keep-\u002F&quot;\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-string\"\u003E&quot;\u002F^transition-\u002F&quot;\u003C\u002Fspan\u003E],\n      },\n    ],\n  },\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E上面例子為 \u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fvuejs\u002Feslint-plugin-vue\u002Ftree\u002Fmaster\u002Flib\u002Frules\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003Eeslint-plugin-vue\u003C\u002Fcode\u003E\u003C\u002Fa\u003E 提供的規則 - \u003Ca  href=\"https:\u002F\u002Feslint.vuejs.org\u002Frules\u002Fcomponent-name-in-template-casing.html\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E強制組件大寫命名 (vue\u002Fcomponent-name-in-template-casing)\u003C\u002Fa\u003E，需要在 rules 開啟設定，更多設定可以參考 \u003Ca  href=\"https:\u002F\u002Feslint.vuejs.org\u002Frules\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eeslint-plugin-vue 官網文件\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003Ch3\u003E- \u003Ccode\u003Erules\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Ca  href=\"http:\u002F\u002Feslint.cn\u002Fdocs\u002Fuser-guide\u002Fconfiguring#extending-configuration-files\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E自定義規則\u003C\u002Fa\u003E，可擴展（或覆蓋）其他規則，後面規則會覆蓋前面的。\u003C\u002Fp\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充：\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E一般規則可到 ESLint 官網查詢，如果是 xxx\u002Faaa 這些開頭的規則，是 xxx plugin 自訂的規則，需到相對應插件的官網查看。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"創建 ESLint Config Package\" title=\"創建 ESLint Config Package\"\u003E\u003Ca href=\"#創建 ESLint Config Package\"\u003E創建 ESLint Config Package\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E這是一份常見的 \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E 檔案，其中包含 ESLint config 檔案，我們會嘗試把 ESLint config 抽出來成為獨立的 package。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002Fe93bVOm.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch3\u003EStep 1. 新增空資料夾 ＆ 初始化 npm\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F 新增空資料夾\n$ mkdir eslint-config-demo\n\n$ cd eslint-config-demo\n\n\u002F\u002F 初始化 npm\n$ npm init\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"warning\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E⚠️ 注意：\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\n\u003Cstrong\u003E檔名一定要 \u003Ccode\u003Eeslint-config-*\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E，否則無法被 ESLint 讀取成功。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Cp\u003E初始化完後，會得到一個 \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E 檔案。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F package.json\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;name&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;eslint-config-demo&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;version&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;1.0.0&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;description&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;main&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;index.js&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;scripts&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;test&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;author&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;license&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;ISC&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep 2. 新增 eslint 相關的 \u003Ccode\u003EdevDependencies\u003C\u002Fcode\u003E 至 \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F package.json\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  ...\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;peerDependencies&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;@vue\u002Fcli-plugin-eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;~4.5.0&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;babel-eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^10.1.0&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^6.7.2&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;eslint-plugin-vue&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^6.2.2&quot;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;devDependencies&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;@vue\u002Fcli-plugin-eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;~4.5.0&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;babel-eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^10.1.0&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;eslint&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^6.7.2&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;eslint-plugin-vue&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;^6.2.2&quot;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Ca  href=\"https:\u002F\u002Feslint.org\u002Fdocs\u002Fdeveloper-guide\u002Fshareable-configs#publishing-a-shareable-config\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E官網\u003C\u002Fa\u003E 有提及如果設定檔案有依賴 plugin 的話可設定成 \u003Ccode\u003EpeerDependency\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Ca  href=\"https:\u002F\u002Fwww.itread01.com\u002Fcontent\u002F1537702686.html\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Cstrong\u003E💡 peerDependencies 補充\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E：\u003C\u002Fp\u003E\n\u003Cp\u003EpeerDependencies 的目的是提示宿主環境去安裝滿足插件 peerDependencies 所指定依賴的包，永遠都是引用宿主環境統一安裝的 npm 包。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003EStep 3. 新增 \u003Ccode\u003E.eslintrc.js\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E設定 eslint config，內容與 \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E 中的 \u003Ccode\u003EeslintConfig\u003C\u002Fcode\u003E 相同，但這裡需要用 module 寫法，如果有其他規則要添加，都可以撰寫至這份檔案中。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F .eslintrc.js\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-variable language_\"\u003Emodule\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eexports\u003C\u002Fspan\u003E = {\n    \u003Cspan class=\"hljs-attr\"\u003Eroot\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003Eenv\u003C\u002Fspan\u003E: {\n      \u003Cspan class=\"hljs-string\"\u003E&quot;node&quot;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Etrue\u003C\u002Fspan\u003E\n    },\n    \u003Cspan class=\"hljs-attr\"\u003Eextends\u003C\u002Fspan\u003E: [\n      \u003Cspan class=\"hljs-string\"\u003E&quot;plugin:vue\u002Fessential&quot;\u003C\u002Fspan\u003E,\n      \u003Cspan class=\"hljs-string\"\u003E&quot;eslint:recommended&quot;\u003C\u002Fspan\u003E\n    ],\n    \u003Cspan class=\"hljs-attr\"\u003EparserOptions\u003C\u002Fspan\u003E: {\n      \u003Cspan class=\"hljs-string\"\u003E&quot;parser&quot;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;babel-eslint&quot;\u003C\u002Fspan\u003E\n    },\n    \u003Cspan class=\"hljs-attr\"\u003Erules\u003C\u002Fspan\u003E: {\n      \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 禁止使用 var\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-string\"\u003E&quot;no-var&quot;\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;error&quot;\u003C\u002Fspan\u003E\n    }\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep 4. 新增 \u003Ccode\u003Eindex.js\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E為 package 的入口檔案， 本體是 \u003Ccode\u003E.eslintrc.js\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F index.js\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E eslintrc = \u003Cspan class=\"hljs-built_in\"\u003Erequire\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&#x27;.\u002F.eslintrc.js&#x27;\u003C\u002Fspan\u003E);\n\n\u003Cspan class=\"hljs-variable language_\"\u003Emodule\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eexports\u003C\u002Fspan\u003E = eslintrc;\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep 5. 補上 \u003Ccode\u003Elock 檔\u003C\u002Fcode\u003E 和 \u003Ccode\u003E.gitignore\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003Einstall 完，取得 lock 檔案\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E$ npm run install\n$ yarn\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003E新增 \u003Ccode\u003E.gitignore\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F .gitignore\n\nnode_modules\u002F\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003EStep 6. 完成陽春版的 ESLint Config 檔案了！\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Feslint-config-demo\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eeslint-config-demo\u003C\u002Fa\u003E 的 Repository\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FCcuEZF8.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"使用 ESLint Config Package\" title=\"使用 ESLint Config Package\"\u003E\u003Ca href=\"#使用 ESLint Config Package\"\u003E使用 ESLint Config Package\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003EStep 1. 安裝\u003C\u002Fh3\u003E\n\u003Cp\u003E可以使用下述 \u003Ccode\u003Elocal\u003C\u002Fcode\u003E、\u003Ccode\u003Egithub\u003C\u002Fcode\u003E 和 \u003Ccode\u003Enpm\u003C\u002Fcode\u003E 三種方法安裝 package：\u003C\u002Fp\u003E\n\u003Ch4\u003E- local\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F npm i -D {{ 本機檔案路徑 }}\n$ npm i -D ..\u002Feslint-config-demo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E$ yarn add -D ..\u002Feslint-config-demo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch4\u003E- github\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F npm i -D {{ git + github 網址 }}\n$ npm i -D git+https:\u002F\u002Fgithub.com\u002FJennieSH\u002Feslint-config-demo.git\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E$ yarn add -D git+https:\u002F\u002Fgithub.com\u002FJennieSH\u002Feslint-config-demo.git\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\n如果有特定版號需求，可以在 github 網址後加指定版號\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E$ npm i -D git+https:\u002F\u002Fgithub.com\u002FJennieSH\u002Feslint-config-demo.git#v.1.0.0\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch4\u003E- npm (需要先在 npmjs 上架，才能下載)\u003C\u002Fh4\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充參考\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fhackmd.io\u002FtEcsYc-DQxqd5u_4onG_iw?view\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E如何發佈 NPM Package\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E已發佈的設定檔案：\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Feslint-config-vue\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003E@jenniesh\u002Feslint-config-vue\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F npm i -D {{ 套件名稱 }}\n$ npm i -D eslint-config-demo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E$ yarn add -D eslint-config-demo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"warning\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E❗注意\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\n如果是使用 \u003Ccode\u003EpeerDependencies\u003C\u002Fcode\u003E 方法，要確定專案(宿主)內，相關依賴的的套件都需要被安裝。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\n如果是在 npm 上架過的 package，且 npm 版本大於 5，可以使用 \u003Ccode\u003Enpx install-peerdeps\u003C\u002Fcode\u003E，一個指令就可以自動安裝全部的 \u003Ccode\u003EpeerDependencies\u003C\u002Fcode\u003E。\u003Cbr \u002F\u003E\n&lt;br&gt;\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003Enpm\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Enpx install-peerdeps --dev eslint-config-demo\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cul\u003E\n\u003Cli\u003Eyarn\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Enpx install-peerdeps --dev eslint-config-demo -Y\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003EStep 2. 設定專案內的 \u003Ccode\u003E.eslintrc.js\u003C\u002Fcode\u003E 檔案\u003C\u002Fh3\u003E\n\u003Cp\u003E在專案的 ESLint 設定檔內 extends 目標套件，其 \u003Ccode\u003Eeslint-config-*\u003C\u002Fcode\u003E 前綴可省略。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F .eslintrc.js\u003C\u002Fspan\u003E\n\n{\n  ...,\n  \u003Cspan class=\"hljs-string\"\u003E&quot;extends&quot;\u003C\u002Fspan\u003E: [ \u003Cspan class=\"hljs-string\"\u003E&quot;demo&quot;\u003C\u002Fspan\u003E ]\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E因為在設定檔的 rules 中有設置 \u003Ccode\u003E&quot;no-var&quot;: &quot;error&quot;\u003C\u002Fcode\u003E，完成 extends 設定後，就可以看到 eslint 報錯了～如果沒反應的話，VS Code 請重新啟動試試！\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FbkwUZMf.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E\u003Cstrong\u003E💡補充\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FNLkhZHd.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E能在 VS Code 即時顯示 lint 的錯誤，是需要先安裝 \u003Ca  href=\"https:\u002F\u002Fmarketplace.visualstudio.com\u002Fitems?itemName=dbaeumer.vscode-eslint\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EESLint\u003C\u002Fa\u003E Extension，如果沒有安裝的話，可以靠腳本 \u003Ccode\u003Eyarn lint\u003C\u002Fcode\u003E、\u003Ccode\u003Enpm run lint\u003C\u002Fcode\u003E 做檢查。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003EStep 3. VS Code 設定\u003C\u002Fh3\u003E\n\u003Cp\u003E基本的 \u003Ccode\u003EESLint Config Package\u003C\u002Fcode\u003E 使用設定在第 2 步驟時就已經完成了。\u003C\u002Fp\u003E\n\u003Cp\u003E如果想進一步，針對一些簡單錯誤，存檔後能自動修正，需要再調整 VS Code 設定。\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E確保 VS Code 有安裝 \u003Ca  href=\"https:\u002F\u002Fmarketplace.visualstudio.com\u002Fitems?itemName=dbaeumer.vscode-eslint\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EESLint\u003C\u002Fa\u003E Extension\u003C\u002Fli\u003E\n\u003Cli\u003E新增 \u003Ccode\u003Esettings.json\u003C\u002Fcode\u003E 至 \u003Ccode\u003E.vscode\u003C\u002Fcode\u003E 資料夾\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F settings.json\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F These are all my auto-save configs\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;editor.formatOnSave&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Etrue\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F turn it off for JS and JSX, we will do this via eslint\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;[javascript]&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;editor.formatOnSave&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Efalse\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;[javascriptreact]&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;editor.formatOnSave&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Efalse\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F show eslint icon at bottom toolbar\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;eslint.alwaysShowStatus&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Etrue\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E,\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F tell the ESLint plugin to run on save\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;editor.codeActionsOnSave&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003E&quot;source.fixAll&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Etrue\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E如果無正常運作的話，請麻煩重啟 VS Code 試試!\u003C\u002Fp\u003E\n\u003Chr \u002F\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fsegmentfault.com\u002Fa\u002F1190000017461203?utm_source=tag-newest\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E這可能是 vue 中 eslintrc.js 最詳細的介紹了\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.freecodecamp.org\u002Fnews\u002Fcreating-your-own-eslint-config-package\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHow to Create Your Own ESLint Config Package\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fmedium.com\u002F@PJCHENder?p=4b76c089848\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E建立公司內部使用的 eslint-config package\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Feslint.org\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EESLint 官網\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fwesbos\u002Feslint-config-wesbos\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGitHub: eslint-config-wesbo\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch6\u003Etags: \u003Ccode\u003EESLint\u003C\u002Fcode\u003E、\u003Ccode\u003ENPM\u003C\u002Fcode\u003E、\u003Ccode\u003Econfig\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n",toc:{title:b,subtitles:["為什麼要將 ESLint Config 獨立出來？","Configuring ESLint 配置選項","創建 ESLint Config Package","使用 ESLint Config Package","參考資料"]}}}}}(null,"Create My Own ESLint Config Package !","2021-11-14T00:00:00.000Z"));