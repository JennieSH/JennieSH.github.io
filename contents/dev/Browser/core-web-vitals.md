---
title: "認識 Core Web Vitals"
fileName: "core-web-vitals"
description: "想要優化網站嗎？來認識一下 Core Web Vitals 吧！"
createdAt: 2024-05-17
updatedAt: 2024-05-17
tags:
  - core-web-vitals
  - LCP
  - CLS
  - FID
  - INP
---

###### tags: `core-web-vitals`、`LCP`、`CLS`、`FID`、`INP`

# 認識 Core Web Vitals

![image](https://hackmd.io/_uploads/Sk-eHSIBT.png)

## 什麼是 Web Vitals

由 Google 定義出來的專有名詞，針對優秀的使用者體驗，提供品質指標的統整指南，主要是透過量化方式，提供工程師改善網站的方向，也是影響 SEO 排名的其中一個因素。

根據網站的不同面向，Web Vitals 提供[多個指標](https://web.dev/articles/user-centric-performance-metrics?hl=zh-tw#important_metrics_to_measure)：

- 最大的內容繪製 [(LCP)](https://web.dev/articles/lcp?hl=zh-tw#what_elements_are_considered)
- 首次輸入延遲 [(FID)](https://web.dev/articles/fid?hl=zh-tw)
- 累計版面配置位移 [(CLS)](https://web.dev/articles/cls?hl=zh-tw)
- 首次位元組時間 [(TTFB)](https://web.dev/articles/ttfb?hl=en)
- 首次內容繪製 [(FCP)](https://web.dev/articles/fcp?hl=en)
- 互動時間 [(TTI)](https://web.dev/articles/tti?hl=en)
- 總封鎖時間 [(TBT)](https://web.dev/articles/tbt?hl=en)
- 與下一個顯示內容的互動 [(INP)](https://web.dev/articles/inp)

## 什麼是 Core Web Vitals

Google 的 Chrome 團隊在 2020 年提出，用來**衡量網站使用者體驗**最重要的三種指標，分別代表 UX 三個不同面向：**載入(Loading)**、**互動(Interactivity)** 與 **視覺穩定性(Visual Stability)**。

- 最大的內容繪製[(LCP)](https://web.dev/articles/lcp?hl=zh-tw#what_elements_are_considered)：評估載入效能
- 首次輸入延遲[(FID)](https://web.dev/articles/fid?hl=zh-tw)：測量互動值
- 累計版面配置位移 [(CLS)](https://web.dev/articles/cls?hl=zh-tw)：評估視覺化內容的穩定性

:::info
:bulb: **補充：**
網站體驗核心指標會隨著時間演變(指標項目或計算公式)，皆可從[官方說明文件](https://web.dev/articles/vitals)和指標的 CHANGELOG 中取得最新變更資訊。
:::

<!-- https://web.dev/articles/user-centric-performance-metrics?hl=zh-tw#important_metrics_to_measure -->

## LCP - 最大內容繪製 (Largest Contentful Paint)

![image](https://hackmd.io/_uploads/BJBXmSUHT.png)

測量使用者開始載入網頁到在 **可視區域(viewport)** 內顯示 **最大圖片或文字區塊** 之間的時間(以秒為單位)。

- 評估網頁主要內容的載入速度
- Good: 頁面初次開始載入後的 **2.5 秒內**執行 :+1:

:::info
:bulb: **補充：**

**最大的元素會隨著內容載入而改變：**

_範例一_

最初的 LCP 是左上方文字，後續加載新的 DOM 後，在第五影格時候變成了圖片。

![image](https://hackmd.io/_uploads/H11cnL8rT.png)

_範例二_

Instagram 標誌會相對提早載入，即使系統會逐步顯示其他內容，仍是最大的元素。

![image](https://hackmd.io/_uploads/rkxNa8LB6.png)
:::

### 優化方向

任何阻礙頁面渲染的因素，都會造成 LCP 分數不佳，因此可針對以下方向做優化：

1. **圖片載入時間**
   - 圖片格式 e.g. [WebP](https://caniuse.com/?search=webP)、[AVIF](https://caniuse.com/?search=avif)
   - CDN
   - 圖片尺寸
   - 預先載入 e.g. `<link rel="preload">`
2. **外部資源載入的時間（CSS、JS、Font）**
   - Lazy Loading
   - Code Splitting
   - Tree Shaking

大方向是針對第一幀內容越快載入越好，不需要的內容越晚下載越好。

## CLS - 累積佈局偏移 (Cumulative Layout Shift)

![image](https://hackmd.io/_uploads/Bkeb_jIIra.png)

評估網頁整個生命週期中每發生非預期版面配置位移：

- **視覺化內容的穩定性**
- Good: 頁面 CLS 應維持為 **0.1 以下**
- 佈局偏移分數 = 影響可視範圍比例 \* 移動距離比例

![image](https://hackmd.io/_uploads/rJa1433Lp.png)

> 可視範圍比例 50% \* 移動 25% = 0.125

### 優化方向

1. 預先指定元素大小 (Placeholder)
2. CSS 轉換動畫

## FID - 首次輸入延遲時間（First Input Delay）

![image](https://hackmd.io/_uploads/rkCYoIISp.png)

測量從使用者首次與網站互動 (點選連結、輕觸按鈕等) 到瀏覽器實際能回應互動所需的時間（單位為毫秒）。

- 評估互動
- Good: **100 毫秒以下** :+1:

:::info
:bulb: **補充：**
這個測量必須由用戶與網站的互動，因此這項測試的數據只會反應在使用者數據上，即不會出現在實驗室數據中(Lab Data)。
:::

### 優化方向

瀏覽器的主要執行緒(Main Thread)忙於執行的 JavaScript 時，會無法立即回應使用者想要的互動，所以可以朝減少 JavaScript 執行方向優化：

1. **拆分長時間的工作，最小化主執行緒的工作**
   > 拆分出能非同步處理，等瀏覽器有空時執行
2. **減少 JavaScript 執行時間**
3. **減少第三方程式的影響**

:::info
:bulb: **補充：**
可以透過 [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 的視覺化介面，快速分析出打包後的結果，含打包哪些檔案、檔案大小等，決定是否要拆分模組、動態載入，或改用較輕量的套件。
:::

:::warning
:information_source: [Interaction to Next Paint (INP)](https://web.dev/articles/inp?hl=zh-tw) 將於 2024 年 3 月取代 Core Web Vitals 中的 [First Input Delay(FID)](https://web.dev/articles/fid?hl=zh-tw)。
:::

## INP - 下次繪製互動時間 (Interaction to Next Paint)

![image](https://hackmd.io/_uploads/Hy04i3n8a.png)

觀察使用者在網頁造訪期間發生的點擊、輕觸和鍵盤互動所經歷的延遲時間，評估網頁回應使用者互動的整體效能（單位為毫秒）。

- 評估互動
- Good: **200 毫秒以下** :+1:
- 偏低表示網頁能穩定回應使用者輸入的內容

:::info
:bulb: **補充：**
滑鼠懸停 (hover) 和頁面捲動 (scrolling) 不會被納入 INP 的計算，但如果使用鍵盤捲動畫面，則可能會觸發 INP 的測量。
:::

:::info
:bulb: **FID (首次輸入延遲時間) vs. INP (下次繪製互動時間)：**

1.  互動次數
    - FID 只會計入 **「最初」** 互動
    - INP 會考量 **「所有」** 網頁互動
2.  延遲時間
    - FID ：初次互動的**輸入延遲**時間
    - INP ：**輸入延遲** + **處理延遲**(執行事件處理所需的時間) + **顯示延遲**(下一個影格繪製時間)

INP 會記錄使用者與網頁互動時發生的所有延遲，藉此全面評估回應速度，讓 INP 比 FID 更能準確反映整體回應速度。
:::

### 優化方向

針對互動三階段進行優化調整：

![image](https://hackmd.io/_uploads/ryHOzTnU6.png)

1. 輸入延遲時間 (Input Delay)
   > 同 FID 方向
2. 處理時間，計算完成事件回呼所需的時間 (Processing Time)
   > 優化 event callback，細拆分處理邏輯，如善用 `setTimeout`
3. 顯示延遲，是指瀏覽器顯示下一個頁框，包含互動結果 (Presentation Delay)
   > 最小化 DOM 大小、限制 CSS 選取器複雜度、使用 [`content-visibility`](https://web.dev/articles/content-visibility?hl=zh-tw) 屬性

## 測試工具

### 實驗室資料 (Lab Data)

在受控的環境(裝置及網路)中收集到的效能資料

#### 優點

1. 便於除錯和測試
2. 快速重現

#### 限制

1. 無法反映真實用戶的環境(使用者的裝置功能及網路狀況)
2. 無法關聯真實世界的頁面關鍵績效指標

#### 代表工具

- [Lighthouse](https://chromewebstore.google.com/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=zh-TW&pli=1)
  > 以電腦上的資源評量網站的效能指標，透過本機瀏覽器去測試網站
- [WebPageTest](https://www.webpagetest.org/)

### 場域資料/使用者資料 (Field Data)

由真實用戶收集到的效能資料，又稱 Real User Monitioring (RUM)

#### 優點

1. 反映真實世界的使用者體驗
2. 關聯到頁面關鍵績效指標

#### 限制

1. 有限的除錯能力
2. 有限的指標收集範圍

#### 代表工具

- [Chrome User Experience Report](https://developer.chrome.com/docs/crux/dashboard)
- [PageSpeed Insights](https://pagespeed.web.dev/)
  > 透過線上工具取得目標網站的效能指標，拿 Google 的 server 去測試目標網站

:::info
:bulb: 通常行動裝置分數會較電腦裝置較低
:::

### 工具清單

#### 線上

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

#### Browser Extension

- [Web Vitals](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma/related)
- [Core Web Vitals](https://chrome.google.com/webstore/detail/core-web-vitals/adeniimnihmbpgpbljmnohjpoolmgabj)
- [CLS Visualizer](https://chrome.google.com/webstore/detail/cls-visualizer/jbbeihojggidiclbcneckhcblilapahn)
- [Core Web Vitals Visualizer](https://chrome.google.com/webstore/detail/core-web-vitals-visualize/mcffmgagphgpgkdclllnilokablhjcge)

#### Browser 內建

- Lighthouse (Chromium-based)
- Performance insights (限定 Chrome)
  > 建議 undock 開發者工具 + network disabled cache + 無痕

## 結論

想要優化指標分數，靠的不只是前端，因為行銷(追蹤數據)、廣告(盈利收入)、設計(畫面/組件設計)和後端(response time)等，也會直接或間接影響到分數表現。

最後，不論指標、Lighthouse 分數、Performance insights 結果是高或低，最重要需關注的是**使用者體驗**，不需要過度追求高分數，但追求綠色標準還是有必要的。

## 參考資料

- [Web Vitals](https://web.dev/articles/vitals)
- [Core Web Vitals: An everyday explanation](https://www.youtube.com/watch?v=evrNn54UkHQ)
- [web.dev](https://web.dev/)
- [[教學] 網頁載入速度效能優化 (加速 30% 真實案例分享)](https://www.shubo.io/optimize-loading-speed/#%E5%84%AA%E5%8C%96%E8%BC%89%E5%85%A5%E9%80%9F%E5%BA%A6%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AD%A5%E5%96%84%E7%94%A8%E7%B6%B2%E9%A0%81%E6%B8%AC%E9%80%9F%E5%B7%A5%E5%85%B7)
- [TK —— Web Performance Roadmap](https://www.iamtk.co/web-performance-roadmap)
- 保哥的前端效能調校實戰課程
