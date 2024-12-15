---
title: "前端常見測試類型"
fileName: "frontend-testing"
description: "初探前端測試的世界～"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
---

###### tags: `Test`

# 前端常見測試類型

## 前言

針對功能性測試（Functional Testing）類型有很多種，`Unit Testing`、`End-to-End (E2E) Testing` 、`Integration Testing`、`Snapshot Testing` …等。

以前端來說，最常見功能性測試會被劃分成這三個，組成一個測試金字塔：

<img decoding="async" loading="lazy" src="https://semaphoreci.com/wp-content/uploads/2022/03/pyramid-cost.jpg" alt="Testing Pyramid" class="img_ev3q">

> 圖片來源： [Integration Testing With Keploy](https://keploy.io/docs/concepts/reference/glossary/integration-testing/#heading)

## 單元測試 - Unit Testing

針對個別單元（或程式碼區塊）進行的測試，這些單元可以是函式、React 中的 Hook、Vue 中的 Composable，或是某個元件。

此類測試具有範圍小、成本低、效率高、執行快速等特點。透過練習撰寫單元測試，也可以幫助撰寫出更容易測試的程式碼（e.g. 盡量撰寫 Pure 的 Function，並避免 Side Effects 的產生），間接提升程式的易讀性與可維護性。

### **撰寫時機**

- 當對功能沒有信心時或邏輯複雜到無法一眼看透

### **推薦工具**

- [Jest](https://jestjs.io/)
- [Vitest](https://vite.dev/)

## 整合測試 - Integration Testing

測試多個單元如何協同工，可以是元件、API 呼叫和函式的組合測試。可以更貼近使用者實際操作和互動，注重測試個別的 User Flow。

### **撰寫時機**

- 需要組件間互動後的預期結果(模擬點擊等事件、API 回傳資料後畫面…)

### **推薦工具**

如果需要測試到 DOM 渲染， 除了上面 unit test 本身套件外，依照專案使用的前端框架，要再安裝對應的相關套件：

- [jsdom](https://www.npmjs.com/package/jsdom) / [happy-dom](https://www.npmjs.com/package/happy-dom)：提供 Browser API 模擬瀏覽器環境
- 前端框架測試套件
  - React - [React Testing Library](https://testing-library.com/)
  - Vue - [Vue Test Utils](https://test-utils.vuejs.org/)

## 端對端測試 - End-to-End (E2E)

模擬真實用戶場景的環境中(瀏覽器)的用戶流程。有時候單元和整合測試獨立測試都沒問題，但是各種交互後，有預期以外的情境發生，但因為是黑箱測試關係，有時候會比較難快速找到問題點，可搭配其他測試，加快 debug 速度。

### **撰寫時機**

- 測試完整 user 操作流程(從開啟瀏覽器開始)

### **推薦工具**

- [Cypress](https://www.cypress.io/)
- [Playwright](https://playwright.dev/)

## 結語

如果想開始寫第一個測試，沒有頭緒或時間有限下，可以挑選功能很重要的來寫測試，如註冊、購買等，接下來再慢慢補齊其他的測試。
