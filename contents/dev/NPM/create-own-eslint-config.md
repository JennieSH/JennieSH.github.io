---
title: Create My Own ESLint Config Package !
fileName: create-own-eslint-config
description: 實作自己的 ESLint Config Package。
createdAt: 2021-11-14
updatedAt: 2021-11-14
tags:
  - NPM
  - package
  - ESLint
  - config
---

# Create My Own ESLint Config Package !

為了維護專案的程式品質，避免不同開發者放飛自我，ESLint 基本是每個專案必備的套件，透過 ESLint 可以規範整個團隊的開發風格和程式碼品質，也能降低新進開發者進專案的時間成本。學會了 ESLint，也可以嘗試實作 Stylelint，做法也是一樣的～

## 為什麼要將 ESLint Config 獨立出來？

如果公司的需求，是常常需要開新的專案，這樣每次都需要設定(~~複製~~)一份 ESLint Config，且如果團隊規範的規則更改的話，需要至各至專案內更改，一來太繁瑣，二來也怕規則沒正確同步。

為了解決上述問題和更有效管理團隊規範，可以把 ESLint Config 打包成一個獨立套件，每個新開專案只要負責安裝套件、套用該規則即可～

## Configuring ESLint 配置選項

下面例子為 vue-cli 創建專案時，所產出來的 ESLint Config 檔案，藉此我們會探討一些常見的配置選項。

```js=
// .eslintrc.js

module.exports = {
    root: true,
    env: {
      "node": true
    },
    parserOptions: {
      "parser": "babel-eslint"
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    plugins: [],
    rules: {},
};
```

### - `root`

默認情況下，ESLint 會在所有父級目錄裡尋找配置文件，一直到根目錄，適合所有項目都遵循一個特定的約定時。

如果想 ESLint 限制到一個特定的項目，可設置 `"root": true`，表示當前配置文件為 eslint 的根配置文件，使其停止在父級目錄繼續尋找，效果如下：

```
home
└── user
    ├── .eslintrc
    └── projectA
        ├── .eslintrc  <- Not used
        └── lib
            ├── .eslintrc  <- { "root": true }
            └── main.js
```

### - `env`

[運行環境](http://eslint.cn/docs/user-guide/configuring#specifying-environments)，用於定義全域變數，常見如下：

- browser : 瀏覽器環境中的全域變數
- node : Node.js 全域變數和 Node.js 作用域
- mocha : 添加所有的 Mocha 測試全域變數

### - `parserOptions`

[解析器的配置選項](http://eslint.cn/docs/user-guide/configuring#specifying-parser-options)，可以指定想要的 ECMAScript 版本等資訊。

```json=
// 官網範例
 "parserOptions": {
      "ecmaVersion": 6, // 支持的ES語法版本，默認為5
      "sourceType": "module", // 指定JS代碼來源的類型，默認為script
      "ecmaFeatures": { // 表示你想使用的額外的語言特性
          "jsx": true // 啟用jsx語法
    }
},
```

:::spoiler 更多資訊

`parserOptions` 的官方配置參數是不包括 `parser` 的，這裡會出現是因為使用 `Vue` 原因，詳情可參考[這篇](https://segmentfault.com/a/1190000017461203?utm_source=tag-newest)。

```
parserOptions: {
  "parser": "babel-eslint"
},
```

:::

### - `extends`

- [規則繼承](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)，可繼承別人定義好的 eslint config 檔案。
- 設定檔命名規則基本為 `eslint-config-*` 為前綴，在 extends 時可以把前綴省略。

```json=
// .eslintrc.js
extends: [
    // 由 plugin 提供的設定檔(ESLint config)就要加上 `plugin:` 的前綴
    "plugin:vue/essential",
    // 套件為 eslint-config-prettier，前綴 `eslint-config` 可省略
    "prettier"
],
```

:::info

**:bulb:補充：**

有些 plugin 會提供 ESLint config 給使用者做選擇。

<br>

**`plugin:vue/essential`** 是繼承 `eslint-plugin-vue` 中 [`config/essential.js`](https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/configs/essential.js) (eslint config) 中的規則設定。
<br/>

```js=
// 官方 repo 中的 essential.js

module.exports = {
  extends: require.resolve('./base'),
  rules: {
    'vue/no-arrow-functions-in-watch': 'error',
    'vue/no-async-in-computed-properties': 'error',
    ...}
}
```

:::

### - `plugins`

- 其他開發者定義的新規則，掛載至 plugin 後，使用者要自行決定如何去使用這些規則。
- 命名規則為 `eslint-plugin-*` 為前綴，在擴充 plugin 時可以把前綴省略。

<br>

```js=
// .eslintrc.js

rules: {
    // enforce tag names to pascal case
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: ["/^router-/", "/^keep-/", "/^transition-/"],
      },
    ],
  },
```

上面例子為 [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue/tree/master/lib/rules) 提供的規則 - [強制組件大寫命名 (vue/component-name-in-template-casing)](https://eslint.vuejs.org/rules/component-name-in-template-casing.html)，需要在 rules 開啟設定，更多設定可以參考 [eslint-plugin-vue 官網文件](https://eslint.vuejs.org/rules/)。

### - `rules`

[自定義規則](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)，可擴展（或覆蓋）其他規則，後面規則會覆蓋前面的。

:::info
**:bulb:補充：**

一般規則可到 ESLint 官網查詢，如果是 xxx/aaa 這些開頭的規則，是 xxx plugin 自訂的規則，需到相對應插件的官網查看。
:::

## 創建 ESLint Config Package

這是一份常見的 `package.json` 檔案，其中包含 ESLint config 檔案，我們會嘗試把 ESLint config 抽出來成為獨立的 package。

![](https://i.imgur.com/e93bVOm.png)

### Step 1. 新增空資料夾 ＆ 初始化 npm

```zsh=
// 新增空資料夾
$ mkdir eslint-config-demo

$ cd eslint-config-demo

// 初始化 npm
$ npm init
```

:::warning
**:warning: 注意：**
**檔名一定要 `eslint-config-*`**，否則無法被 ESLint 讀取成功。
:::

初始化完後，會得到一個 `package.json` 檔案。

```json=
// package.json

{
  "name": "eslint-config-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### Step 2. 新增 eslint 相關的 `devDependencies` 至 `package.json`

```json=
// package.json

{
  ...,
  "peerDependencies": {
    "@vue/cli-plugin-eslint": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-eslint": "~4.5.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-vue": "^6.2.2"
  }
}
```

[官網](https://eslint.org/docs/developer-guide/shareable-configs#publishing-a-shareable-config) 有提及如果設定檔案有依賴 plugin 的話可設定成 `peerDependency`。

:::info
[**:bulb: peerDependencies 補充**](https://www.itread01.com/content/1537702686.html)：

peerDependencies 的目的是提示宿主環境去安裝滿足插件 peerDependencies 所指定依賴的包，永遠都是引用宿主環境統一安裝的 npm 包。
:::

### Step 3. 新增 `.eslintrc.js`

設定 eslint config，內容與 `package.json` 中的 `eslintConfig` 相同，但這裡需要用 module 寫法，如果有其他規則要添加，都可以撰寫至這份檔案中。

```js=
// .eslintrc.js

module.exports = {
    root: true,
    env: {
      "node": true
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    parserOptions: {
      "parser": "babel-eslint"
    },
    rules: {
      // 禁止使用 var
      "no-var": "error"
    }
};
```

### Step 4. 新增 `index.js`

為 package 的入口檔案， 本體是 `.eslintrc.js`。

```js=
// index.js

const eslintrc = require('./.eslintrc.js');

module.exports = eslintrc;
```

### Step 5. 補上 `lock 檔` 和 `.gitignore`

- install 完，取得 lock 檔案
  ```zsh=
  $ npm run install
  $ yarn
  ```
- 新增 `.gitignore`

  ```zsh=
  // .gitignore

  node_modules/
  ```

### Step 6. 完成陽春版的 ESLint Config 檔案了！

- [eslint-config-demo](https://github.com/JennieSH/eslint-config-demo) 的 Repository

![](https://i.imgur.com/CcuEZF8.png)

## 使用 ESLint Config Package

### Step 1. 安裝

可以使用下述 `local`、`github` 和 `npm` 三種方法安裝 package：

#### - local

```zsh=
// npm i -D {{ 本機檔案路徑 }}
$ npm i -D ../eslint-config-demo
```

```zsh=
$ yarn add -D ../eslint-config-demo
```

#### - github

```zsh=
// npm i -D {{ git + github 網址 }}
$ npm i -D git+https://github.com/JennieSH/eslint-config-demo.git
```

```zsh=
$ yarn add -D git+https://github.com/JennieSH/eslint-config-demo.git
```

:::info
**:bulb:補充**
如果有特定版號需求，可以在 github 網址後加指定版號

```zsh=
$ npm i -D git+https://github.com/JennieSH/eslint-config-demo.git#v.1.0.0
```

:::

#### - npm (需要先在 npmjs 上架，才能下載)

> **:bulb:補充參考**
>
> - [如何發佈 NPM Package](https://hackmd.io/tEcsYc-DQxqd5u_4onG_iw?view)
> - 已發佈的設定檔案：[`@jenniesh/eslint-config-vue`](https://github.com/JennieSH/eslint-config-vue)

```zsh=
// npm i -D {{ 套件名稱 }}
$ npm i -D eslint-config-demo
```

```zsh=
$ yarn add -D eslint-config-demo
```

:::warning
**:exclamation:注意**
如果是使用 `peerDependencies` 方法，要確定專案(宿主)內，相關依賴的的套件都需要被安裝。
:::

:::info
**:bulb:補充**
如果是在 npm 上架過的 package，且 npm 版本大於 5，可以使用 `npx install-peerdeps`，一個指令就可以自動安裝全部的 `peerDependencies`。
<br>

- npm

```bash=
npx install-peerdeps --dev eslint-config-demo
```

- yarn

```bash=
npx install-peerdeps --dev eslint-config-demo -Y
```

:::

### Step 2. 設定專案內的 `.eslintrc.js` 檔案

在專案的 ESLint 設定檔內 extends 目標套件，其 `eslint-config-*` 前綴可省略。

```js=
// .eslintrc.js

{
  ...,
  "extends": [ "demo" ]
}
```

因為在設定檔的 rules 中有設置 `"no-var": "error"`，完成 extends 設定後，就可以看到 eslint 報錯了～如果沒反應的話，VS Code 請重新啟動試試！

![](https://i.imgur.com/bkwUZMf.png)

:::info
**:bulb:補充**

![](https://i.imgur.com/NLkhZHd.png)

能在 VS Code 即時顯示 lint 的錯誤，是需要先安裝 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) Extension，如果沒有安裝的話，可以靠腳本 `yarn lint`、`npm run lint` 做檢查。
:::

### Step 3. VS Code 設定

基本的 `ESLint Config Package` 使用設定在第 2 步驟時就已經完成了。

如果想進一步，針對一些簡單錯誤，存檔後能自動修正，需要再調整 VS Code 設定。

- 確保 VS Code 有安裝 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) Extension
- 新增 `settings.json` 至 `.vscode` 資料夾

```json=
// settings.json

{
  // These are all my auto-save configs
  "editor.formatOnSave": true,
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  // show eslint icon at bottom toolbar
  "eslint.alwaysShowStatus": true,
  // tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

如果無正常運作的話，請麻煩重啟 VS Code 試試!

---

## 參考資料

1. [這可能是 vue 中 eslintrc.js 最詳細的介紹了](https://segmentfault.com/a/1190000017461203?utm_source=tag-newest)
2. [How to Create Your Own ESLint Config Package](https://www.freecodecamp.org/news/creating-your-own-eslint-config-package/)
3. [建立公司內部使用的 eslint-config package](https://medium.com/@PJCHENder?p=4b76c089848)
4. [ESLint 官網](https://eslint.org/)
5. [GitHub: eslint-config-wesbo](https://github.com/wesbos/eslint-config-wesbos)

###### tags: `ESLint`、`NPM`、`config`
