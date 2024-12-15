---
title: Vitest - 介紹和建置
fileName: vitest-setup
description: 什麼是 Vitest？
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
  - Vitest
---

# Vitest - 介紹和建置

## 什麼是 Vitest ?

Vitest 是一個基於 Vite 構建的測試框架，不僅可以與 Vite 搭配使用，統一開發、測試、建構的設定，也可以**獨立使用，不需要依賴 Vite**。功能包括單元測試時，最常見的模擬、快照和覆蓋率報告等。

與前端另外一個常見的單元測試框架 Jest 相比，是個急起直追的後起之秀，並解決使用 Jest 遇到的幾個痛點，也高兼容了 Jest 的 API。

> Vitest 啟發於在 Vite 開發測試時，現有單元測試框架中，想用來測試 Vite 都會存在一些問題，無法完美被解決，所以才有誕生 Vitest 的想法，可以參考 Vitest 團隊中 Anthony Fu 在 [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI) 2:45 的訪談。

## Vitest v.s. Jest

### 1\. Performance（效能）

- **Vitest**：支援熱模組替換（HMR）和 ESM，不需要經過 bundle，測試執行速度通常比 Jest 更快。
- **Jest**：模組解析較複雜，功能較多，可能在大型專案中稍慢。需要額外的轉換步驟來處理程式碼，且不支援 async 轉換和 ESM，需維護兩套設定檔。

### 2\. Payload（負載）

- **Vitest**：約 26 MB / 61 個依賴套件
- **Jest**：約 32 MB / 196 個依賴套件

### 3\. API

- 兩者 API 高度相似，間接降低遷移的難度。

### 4\. Configuration（配置）

- **Vitest**：較為簡單，如果有使用 Vite，甚至可以共用設定文件。
- **Jest**：較為靈活，但相對複雜，需要單獨的設定文件。

範例：

- 使用 TypeScript，Vitest 可以開箱即用，但 Jest 需要再做轉譯的設定。
- Vitest 在開發環境下跑測試時，預設為監聽模式（watch mode），在 CI 階段自動轉換為單次運行模式（single run mode），Jest 則需要另外加參數設定。

### 5\. ESM Support（ESM 支援）

- **Vitest**：原生支持 ESM。
- **Jest**：尚未支援，[相關功能](https://github.com/jestjs/jest/issues/9430)還在開發中。在瀏覽器環境下，模組需先轉換成 CommonJS 才能執行。

### 6\. Community（社群）

- **Vitest**：社群相對較新，文件和教學文略少於 Jest。
- **Jest**：老牌測試框架，擁有大量的插件、教學文和豐富的生態系，遇到問題時更容易找到解決方案。

## 環境建置

### 安裝

```bash
npm install -D vitest
```

如果想直接創新的專案練習，可以改用下面的指令，或使用[線上版 Vitest](https://stackblitz.com/edit/vitest-dev-vitest-1f6vvm?file=README.md&initialPath=__vitest__/)**：**

```bash
# 使用 vite 創建一個新專案
npm create vite
# 選擇完專案設定後，再安裝 vitest
npm install -D vitest
```

> **\[補充\]：**
>
> - 版本要求： Vite >=v5.0.0 和 Node >=v18.0.0

### 新增測試指令

在 `package.json`，新增測試指令：

```json
// package.json
{
    "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest", // 新增這行
  },
  ...
}
```

### 新增 Vitest 設定檔

在根目錄中新增 `vitest.config.ts` 檔案，並在 `test` 屬性下，新增相關的測試設定：

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
      ...  // 在此新增測試相關的設定
  },
})
```

**常見的設定：**

- **global** - 預設為 `false`

預設使用時，Vitest 並沒有直接提供全域 API，都需要指定 import。如果要把 API 暴露在全域，可以新增 `globals: true`：

```ts
export default defineConfig({
  test: {
      ...,
      globals: true, // 當 API 調用時，不需要再指定引入
    },
})
```

為了讓全域 API 可以支援 TypeScript，需要將 `vitest/globals` 添加到 `tsconfig.json` 中的 `types` 的選項中：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

- **environment -** 預設為 `node`

測試的執行環境，如果是寫前端，可以使用 jsdom 或 happy-dom：

```ts
export default defineConfig({
  test: {
      ...,
      environment: "jsdom",
    },
})
```

> **\[補充\]** > [environmentMatchGlobs](https://cn.vitest.dev/config/#environmentmatchglobs) 可以針對不同檔案跑在不同環境上。

> **\[補充\]**
> 如果專案有使用 Vite，Vitest 會自動讀取根目錄的 `vite.config.ts`，可與 Vite 共用統一的設定檔。如果想配置不同設定，可以另外新增 `vitest.config.ts`，該檔案優先級為最高。

> 更多設定可參考 @[Configuring Vitest](https://vitest.dev/config/#configuring-vitest)

## 測試檔案名規則

測試檔案文件名，需要包含 `.test.` 或 `.spec.`，例如：`sum.test.js`。

## 運行測試

在開發環境下預設為**監聽模式(watch mode)**，當修改源程式碼或測試文件時，**只會自動重新運行相關的測試**。

```bash
npm run test
```

## 測試覆蓋率 - Coverage

### 安裝套件

要覆蓋率報告，需要另外安裝相應套件包：

```bash
# For v8
npm i -D @vitest/coverage-v8

# For istanbul
npm i -D @vitest/coverage-istanbul
```

### 常用設定

- `provider` - 覆蓋率報告的提供者，預設是 v8
- `reporter` - 覆蓋率報告輸出的類型
- `reportsDirectory` - 覆蓋率報告檔案的位置，預設是在根目錄創建一個 `coverage` 的資料夾存放

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // 支援 istanbul 或自定義
      reporter: ["json", "html"],
      reportsDirectory: "./tests/unit/coverage"
    },
  },
  ...
})
```

> 更多覆蓋率報告的設定可參考 @[Vitest Coverage](https://vitest.dev/config/#coverage)

### 產生覆蓋率報告

```bash
npx vitest --coverage
```

## **VS Code** Extension

如果不習慣用終端機下指令，推薦安裝官方 VScode 套件 - [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)，錯誤會直接顯示 VScode 上。

![](https://i.ibb.co/bJCbCf2/202203292020.gif)

## **參考資料**

- [Vitest 官方](https://vitest.dev/)
- [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI)
- [How to use Vitest with Jest-DOM and React Testing Library](https://www.youtube.com/watch?v=G-4zgIPsjkU)
- [Switching From Jest To Vitest - Should You Take The Step?](https://www.youtube.com/watch?v=adBPXEUhj6Q)
