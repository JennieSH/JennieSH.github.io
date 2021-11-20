---
title: "程式碼守門員 - Husky + Lint-Staged"
fileName: "husky-lint-staged"
description: Don't let 💩 slip into your code base! 如何在專案中使用 husky 和 lint-staged，在提交 commit 前就找出錯誤！
createdAt: 2021-11-17
updatedAt: 2021-11-17
tags:
  - NPM
  - package
  - husky
  - lint-staged
  - ESLint
  - Stylelint
---

# 程式碼守門員 - Husky + Lint-Staged

**Don't let 💩 slip into your code base!** 這段話出自 [`lint-staged`](https://www.npmjs.com/package/lint-staged)，非常符合這篇文章想傳達的主旨。

此文是紀錄我在專案上如何使用 `husky` + `lint-staged`，主要需求有：

1. 每次 `git commit` 前自動執行
2. 自動修正 lint 錯誤和程式碼排版
3. 檢查失敗且不能自動修復時，不要 commit

## 介紹

### - [`husky`](https://www.npmjs.com/package/husky) :dog:

可以讓我們在如 `git commit`、`git push` 執行前，預先處理我們指定的任務

### - [`lint-staged`](https://www.npmjs.com/package/lint-staged) :no_entry_sign: :poop:

集中檢查範圍，只針對有變動的檔案，而非整個專案，也可以依據檔案類型，分別設置不同指令。

## Installation

```bash
npm install husky lint-staged -D
```

## husky 設定

### - 初始化設定:

專案最初設定一次即可，會在根目錄下產生一個 `.husky` 資料夾，存放 husky 的相關腳本

```bash
npm set-script prepare "husky install"
npm run prepare
```

### - 增加 hook:

指定在 `git commit` 前先跑過 `npx lint-staged` 腳本，如果失敗的話，`git commit` 不會被執行。

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

輸入完上面指令後，會在 `.husky` 資料夾下面產生一個 `pre-commit` 檔案，如果有想到其他腳本想加入，比如說單元測試腳本，都可以直接在下一行增加。

```bash=
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

:::info
:bulb: 補充
如果對其他的 git hooks 有興趣的話，可以參考 [git 官網文件](https://git-scm.com/docs/githooks#_hooks)。
:::

## lint-staged 設定

這邊設定是根據檔案類型，分別需要經過 linter 檢查和 prettier format，可依照自己的需求調整。

提供兩種設置方法，擇一即可。

### 1. `package.json`

```json=
// package.json

 "lint-staged": {
    "*.{ts,js,vue}": [
      "eslint --fix"
    ],
    "*.{html,scss,css,vue}": [
      "prettier --write",
      "stylelint --fix"
    ]
 },
```

### 2. `.lintstagedrc.json`

```json=
// .lintstagedrc.json

{
    "*.{ts,js,vue}": [
      "eslint --fix"
    ],
    "*.{html,scss,css,vue}": [
      "prettier --write",
      "stylelint --fix"
    ]
}
```

## Usage

每次 `git commit` 就會自動觸發，程式碼都要符合 `eslint`、`stylelint` 的設定檔規則，確保程式碼都是跟團隊規範保持一致的。

<br/>

我們可以先打一段可怕的程式碼試試，可以看到 `eslint` 哀嚎不已。

![](https://i.imgur.com/vQgu8v3.png)

<br/>

接著把這份檔案直接 `git commit` 後，排版自動變整齊，error 也被自動修復了 :tada:。

![](https://i.imgur.com/LwLf8br.png)

<br/>

但也是有不能被自動修復的情境，例如下圖中 `bar` 值宣告了，卻沒有使用，這時會顯示錯誤訊息，此次 `git commit` 就會失敗，不會進入 `git log` 中，需要手動修正 error。

主要也是要阻擋這類的程式碼進入 `git log` 中，因為現在幾乎都會設定 `vscode` 在存檔時，自動修正和 format，大部分的錯誤在開發中就會被解決了，但這類的檔案，只要檔案沒被開啟，vscode linter 插件就無法及時提供警告。

![](https://i.imgur.com/qml0GDx.png)

## 總結

`husky` + `lint-staged` 的搭配，相當多了位 `Code Reviewer` 把關程式碼，也可以減輕團隊 code review 的壓力，確保不會有 error 會被推到 repository，且程式碼也是符合團隊規範。

如果一開始就能修正，後期維護會輕鬆些，不然隨著專案變大，錯誤和警告數量一多，也是很頭疼的。

---

## 參考資料

1. [husky GitHub](https://github.com/typicode/husky)
2. [lint-staged GitHub](https://github.com/okonet/lint-staged)
3. [使用 ESLint, Prettier, Husky, Lint-staged 以及 Commitizen 提升專案品質及一致性](https://medium.com/@danielhu95/set-up-eslint-pipeline-zh-tw-990d7d9eb68e)

###### tags: `linter`、`NPM`、`package`、`lint-staged`、`husky`、`ESLint`、`stylelint`
