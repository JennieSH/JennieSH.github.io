---
title: "CSS Specificity (權重)"
fileName: "css-specificity"
description: "css 顯示規則介紹"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - CSS
  - CSS Specificity
---

###### tags: `CSS`、`CSS Specificity`

# CSS Specificity (權重)

CSS Specificity 是用來決定當多個 CSS 規則作用在同一個元素時，哪一個規則會優先生效的機制，**權重越高，優先級越高**。

## CSS 權重的基本規則

- **相同權重時**，後寫的 CSS 覆蓋先寫的 CSS。
- **不同權重時**，權重高的規則優先生效。

## CSS 權重優先級順序

1. `!important`
2. Inline style
3. ID 選擇器
4. Class、Pseudo-class (偽類)、Attribute (屬性選擇器)
5. Element
6. `*`

## Specificity 的權重表示法

CSS Specificity 通常以四個數字的格式表示：  
`a-b-c-d`

- **a**: `!important` 的數量（極高優先權）
- **b**: `inline style` 的數量
- **c**: `ID` 的數量
- **d**: `class`、`pseudo-class`、`attribute` 和 `element` 的數量

## 權重範例

### \* : `0-0-0-0`

適用於全站的預設值，權重最低。

```css
* {
    padding: 0
    margin: 0
 }
```

### Element : `0-0-0-1`

所有的 HTML 元素，例如 div, p, ul, li 等，每個元素的權重都是 `0-0-0-1`。

```css
div {
  padding: 20px;
}
```

### class : `0-0-1-0`

每一個 class 的權重都是 `0-0-1-0`。

```css
.box {
  padding: 20px;
}
```

### Pseudo-class (偽類) : `0-0-1-0`

與 Class 相同的權重，適用於 `:hover`、`:focus`、`:nth-child()`等。

```css
a:hover {
  color: red;
}
```

### Attribute 選擇器：`0-0-1-0`

屬性選擇器的權重與 Class 相同。

```css
input[type="email"] {
  border: 1px solid #ccc;
}
```

### ID 選擇器：`0-1-0-0`

每個 ID 的權重為 `0-1-0-0`。

```css
#home {
  padding: 20px;
}
```

### Inline Style：`1-0-0-0`

inline style 的權重為 `1-0-0-0`。

> 補充：inline style attribute 指的就是寫在 html 行內的 style。

```html
<div style="color:red">CSS Specificity</div>
```

### !important : 王者

!important 的權重非常高，能覆蓋所有其他規則。

```css
.product{
    width: 200px;!important
}
```

## 練習

```css=
ul>li ：都是 element 所以加起來是 0-0-0-2

body div ul li a span ：總共 6 個 element 所以加起來是 0-0-0-6

li.myclass ：一個 element 加上一個 class ，所以是 0-0-1-1

li.myclass ~ li ：兩個 element 加上一個 class ，所以是 0-0-1-2

form input[type=email] ：兩個 element 、一個 attribute，所以是 0-0-1-2
```

## 結論

CSS 規則的優先級排列為：

`!important > Inline style > ID > Class/Pseudo-class/Attribute > Element > *`

善用 Specificity 計算，可以更精確地控制樣式的應用順序，避免發生樣式覆蓋問題。

## 參考資料

1. [CSS Specificity](https://www.oxxostudio.tw/articles/201405/css-specificity.html)
2. [CSS 權重](https://ithelp.ithome.com.tw/articles/10196454)
