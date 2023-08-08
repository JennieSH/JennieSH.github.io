---
title: "CSS Units - px、％、em、rem"
fileName: "css-units"
description: "一起認識 css 中常見的單位和它們的使用時機。"
createdAt: 2023-06-06
updatedAt: 2023-06-06
tags:
  - CSS
  - CSS Units
---

###### tags: `CSS`、`CSS Units`、`px`、`％`、`em`、`rem`

# CSS Units - px、％、em、rem

## Absolute Units vs. Relative Units

### Absolute Units 絕對單位

- 不受父元素或視窗大小影響，在**任何裝置和瀏覽器，始終保持相同尺寸**
- 如果不是做響應式網站/專案或 window 始終是固定尺寸，沒縮放需求，可以考慮使用
- 常見的單位為： `px`、`pt`、`cm`、`in` 等

> 網頁開發最常用絕對單位為 `px`，剩下的比較常用於印刷排版領域，所以在開發時會比較少見

### Relative Units 相對單位

- 相對於父元素或視窗大小進行縮放（取決於使用的單位）
- 適合開發響應式網站
- 常見的單位為： `%`、`em`、`rem`、`vw`、`vh` 等

## 常見單位介紹

### px

- 絕對單位
- 尺寸在不同裝置要都顯示一樣，可以直接使用

```css
/* 手機或電腦上預覽，字體大小都會是一樣(16px) */
.text {
  font-size: 16px;
}
```

### %

- 相對單位：**相對於父元素的大小**
- 常用於調整 container 內的子元素大小或位置

```css
/* 子元素寬度永遠是父元素的 30%，父層寬度只要一改變，子元素寬度也會一起更新 */
.child {
  width: 30%;
}
```

### em

- 相對單位：視使用的情境，會有不同計算方式
  - **`font-size`**： **相對於元素的父元素的字體大小**
    i.e. 子元素的 `font-size: 0.5em`，該子元素字體大小即為父元素的 0.5 倍
  - **`other properties`(非字型大小的屬性)**：**相對於元素的當前字體大小**
    i.e. 元素的字體大小為`16px`，則 `width: 2em` 將等於 `32px` (元素未設定字體大小，則繼承父元素的字體大小)
- 方面實現元素內部組件之間的比例關係
  i.e. 想基於父元素字體大小，客製內部大/中/小相對字體

```css
html {
  font-size: 16px;
}

.grandparent {
  font-size: 24px;
}

.parent {
  font-size: 20px;
}

.child {
  /* child 實際字體大小： 20px * 1.5 = 30px */
  font-size: 1.5em;
  /* child 內距(非字型大小的屬性，與本身的 font-size 相關)： 30px * 2 = 60px */
  padding: 2em;
}
```

<br/>

如果父元素未指定字型大小的值，則會在 DOM tree 向上尋找。如果一直到根元素（`<html>`）都沒有指定字型大小，則瀏覽器將使用預設值 `16px`。

```css
html {
  font-size: 16px;
}

.grandparent {
  font-size: 24px;
}

/* .parent {
  font-size: 20px;
} */

.child {
  /* child 實際字體大小(往外找到 .grandparent)： 24 * 1.5 = 36px */
  font-size: 1.5em;
  /* child 內距： 36px * 2 = 72px */
  padding: 2em;
}
```

### rem (root em)

> 這邊基本關係就是： root = 根元素 = `<html>`，`<html>` 未設定則瀏覽器將使用預設值 `16px`。

- 相對單位：**相對於根元素的字型大小**，根元素的字型大小為 `1rem`
- 不受父元素的字體大小影響，解決 `em` 缺點
  i.e. 當標題設定為 `font-size: 2rem`，使用在畫面任何一地方，標題大小都會相同

### vw

- 相對單位：**相對於 viewport 的高度**，`1vw` = viewport 高度的 1/100
- 元素如果需要針對 viewport/window 大小、位置有特殊需求可使用

### vh

- 相對單位：**相對於 viewport 的寬度**，`1vh` = viewport 寬度的 1/100
- 元素如果需要針對 viewport/window 大小、位置有特殊需求可使用
  i.e. 畫面如果要撐滿整個視窗，高度可設置 100vh

## em 和 rem 如何選擇

如果沒有特殊需求要使用絕對單位 i.e. `px`，大部分會選擇相對單位開發響應式頁面，即可以隨著頁面大小自適應。

大多數瀏覽器 `1rem` 和 `1em` 都等於 `16px` (root element)，但因為 em 會自動繼承其父元素字體大小，如果 DOM 層級過深，很容易會發生預期以外的效果，所以通常網頁開發會優先選擇 `rem`，來保持一致性和可預測性，如 [tailwindcss](https://tailwindcss.com/docs/width) 用 `rem` 來制定寬度標準。

除非是在需要只考慮附近父元素字體大小，才會選擇 `em`，否則一率優先考慮 `rem`，總歸一句，先釐清設計需求，再進一步選擇需要的單位。

### em

```css
.parent {
  font-size: 10px;
}
.child {
  font-size: 2em;
}
```

```xml
<div class="parent">
  第一層 - 10px
  <div class="child">
    第二層 - 20px
    <div class="child">
      第三層 - 40px
      <div class="child">
        第四層 - 80px
      </div>
    </div>
  </div>
</div>
```

<div style="font-size: 10px;">
  第一層 - 10px
  <div style="font-size: 2em;">
  第二層 - 20px
    <div style="font-size: 2em;">
   第三層 - 40px
      <div style="font-size: 2em;">
         第四層 - 80px
      </div>
    </div>
  </div>
</div>

### rem

```css
html {
  font-size: 16px;
}
.parent {
  font-size: 10px;
}
.child {
  font-size: 2rem;
}
```

```xml
<div class="parent">
  第一層 - 10px
  <div class="child">
    第二層 - 16px
    <div class="child">
      第三層 - 16px
      <div class="child">
        第四層 - 16px
      </div>
    </div>
  </div>
</div>
```

<div style="font-size: 10px;">
  第一層 - 10px
  <div style="font-size: 16px;">
   第二層 - 16px
    <div style="font-size: 16px;">
     第三層 - 16px
      <div style="font-size: 16px;">
       第四層 - 16px
      </div>
    </div>
  </div>
</div>
