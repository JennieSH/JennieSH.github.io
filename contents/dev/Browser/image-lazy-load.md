---
title: "網頁圖片載入優化－懶加載（Lazy Loading）"
fileName: "image-lazy-load"
description: "常見圖片載入優化手段之一，一起來了解什麼是懶加載"
createdAt: 2025-12-10
updatedAt: 2025-12-10
tags:
  - browser
  - image
---

###### tags: `browser` `image`

# 網頁圖片載入優化－懶加載（Lazy Loading）

## 什麼是懶加載？

懶加載是一種常見的前端效能優化技術，概念是在**需要的時候**才載入資源，以提升網頁的載入速度與使用者體驗。常見應用包含圖片、影片，以及動態載入的模組或元件。本文將以圖片懶加載為主要討論對象。

由於使用者螢幕的可視範圍有限，頁面初始載入時，僅先下載首屏（可視範圍內）會出現的圖片，其餘尚未進入視窗的圖片則延後載入。當使用者往下捲動頁面時，再即時載入對應的圖片資源，可有效加快首屏呈現速度。

### 優點

- 加快頁面載入速度，讓使用者更快看到內容
- 提升使用者體驗（UX），降低跳出率
- 減少不必要的流量消耗

## 何時需要使用懶加載？

通常適用於圖片數量較多的頁面，例如：列表頁、首頁或內容型網站。

## 常見實作方式

### Image HTML Tag

原生 HTML 的 `<img>` 元素已支援圖片懶加載，只要透過設定 `loading="lazy"` 屬性，即可指示瀏覽器延後載入圖片。

此方式適合簡單的使用情境；但若需要更細緻的載入控制（例如：提早載入、搭配動畫效果），則需搭配 JavaScript 進一步實作。

> [MDN - ](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)`[<img> ](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)`[loading lazy](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)

```html
<img loading="lazy" src="swing-400.jpg" alt="Kettlebell Swing" />
```

### 監聽 Scroll Event

監聽 `scroll` 事件，並在每次捲動時檢查圖片是否進入可視範圍；若符合條件，就把 `data-src` 指定給 `src` 觸發圖片載入。

```html
<div>
  <img data-src="1.png" alt="image 1" />
  <img data-src="2.png" alt="image 2" />
  <img data-src="3.png" alt="image 3" />
  ... ...
</div>
```

```javascript
const images = document.querySelectorAll("img");

window.addEventListener("scroll", (e) => {
  images.forEach((image) => {
    const imageTop = image.getBoundingClientRect().top;

    // 若希望「提早載入」，可以加上 offset，例如：window.innerHeight + 100
    if (imageTop < window.innerHeight) {
      const data_src = image.getAttribute("data-src");
      image.setAttribute("src", data_src);
    }
  });
});
```

#### 缺點

1. **需要自行計算可視範圍**：寫法相對不直覺；若要做「提早載入」還得加入 offset 計算，降低可讀性。
2. **scroll 觸發頻繁**：即使圖片已載入，捲動時仍會一直跑迴圈檢查。
3. **圖片數量多時成本更高**：每次捲動都遍歷所有圖片，容易造成主執行緒負擔增加，影響捲動流暢度。

⇒ 會更推薦使用原生的 [InterSection Observer ](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

### InterSection Observer

Intersection Observer 是瀏覽器提供的 Web API，可用來觀察目標元素與可視視窗之間是否產生交集，並在進入或離開可視範圍時執行對應的邏輯。

相較於自行監聽 `scroll` 事件並計算元素位置，使用方式更直覺且效能友善，瀏覽器會在適當時機觸發 callback，且目前主流瀏覽器都支援。

#### 基本用法

`IntersectionObserver` 建立時會接收兩個參數：：

- **callback** - 當觀察目標進入或離開可視範圍時，會觸發 callback，用來處理對應的邏輯。
- **options**
  - `root`：用來決定「以誰的視角」來觀察元素是否進入可視範圍，預設為 `null`，代表以瀏覽器視窗（viewport）作為觀察範圍。
  - `rootMargin`：用來控制「提早或延後多久」才算進入可視範圍，常用於預先載入圖片。
  - `threshold`：用來決定「元素露出多少比例時」才觸發 callback。

```javascript
const observer = new IntersectionObserver(callback, {
  // 圖片距離視窗 200px 時開始進入觀察範圍，
  // 且圖片實際顯示超過 25% 時，才會觸發 callback
  root: null,
  rootMargin: "200px 0px",
  threshold: 0.25
});

// 開始觀察指定 DOM 元素
observer.observe(domNode);

// 取消觀察指定 DOM 元素
observer.unobserve(domNode);
```

#### 應用

```html
<div>
  <img data-src="1.png" alt="image 1" />
  <img data-src="2.png" alt="image 2" />
  <img data-src="3.png" alt="image 3" />
  ... ...
</div>
```

```javascript
const images = document.querySelectorAll("img");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      // 元素進入可視範圍
      if (entry.isIntersecting) {
        // 目標元素
        const img = entry.target;
        const dataSrc = img.getAttribute("data-src");

        if (dataSrc) {
          img.setAttribute("src", dataSrc);
          // 圖片載入後停止觀察，避免重複觸發
          observer.unobserve(img);
        }
      }
    });
  },
  {
    // 可視範圍外提前載入（預載）
    rootMargin: "100px 0px"
  }
);

images.forEach((img) => observer.observe(img));
```

> \[補充\] Intersection Observer 除了圖片懶加載，也適合用於無限捲動、曝光追蹤等情境。

### 第三方套件

- react-lazyload
- vue-lazyload

## LCP / CLS 注意事項

### 1\. 首屏圖片不建議使用懶加載

懶加載可能會延後圖片實際下載時機，進而影響 LCP（Largest Contentful Paint），所以首屏的圖片建議維持優先載入(`<img>` 預設為 loading 為 [eager](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#eager))。

### 2\. 不管圖片是否有做懶加載，記得預留圖片渲染空間

無論圖片是否使用懶加載，都應預先保留圖片的顯示空間，例如設定 `width`、`height`，或使用 Loading Skeleton，以避免版面跳動，影響 CLS（Cumulative Layout Shift）。

## 參考資料

1. [JavaScript 图片懒加载](https://www.youtube.com/watch?v=R_TqNVgD3G4)
