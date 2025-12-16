---
title: "[Note] 瀏覽器渲染頁面的流程"
fileName: "browser-rendering"
description: "網頁畫面如何無中生有"
createdAt: 2025-09-17
updatedAt: 2025-09-17
tags:
  - browser
---

###### tags: `browser`

# [Note] 瀏覽器渲染頁面的流程

> 本文章圖片皆截圖於 [浏览器渲染页面的流程](https://www.bilibili.com/video/BV18f4y1H7Zu?spm_id_from=333.999.0.0)

## 流程圖

![流程圖](https://i.imgur.com/ekgRij6.png)

- 依據 JS 有無額外的設置，默認要等 CSSOM 構建完成
- 如果 JS 有修改到 DOM/CSSOM，後面三步驟會在執行一次

## DOM

先請求 Server 得到 HTML 文件，會先得到字節版的 HTML，接著轉化開發人員平常熟悉的字符版，接著瀏覽器會再轉成機器看得懂的 Token 版本(Token = 符號標籤)，即將字符 `Token 化`，不同字符就會變得有不同的特殊意義。

> 因 HTML 是標記語言，裡面有很多 `<`、`>`，可以用來識別不同的結構，

這些 Token 會轉變成物件，可視為是一個節點，這些物件都有自己的屬性和方法，將這些節點連接起來就成為一個樹狀的結構，即為 DOM(文件物件模型)。

DOM 可以理解爲是瀏覽器自己的語言，因為樹狀的結構關係，每個節點相連會形成父子關係(Parent and Child)和兄弟關係(Siblings)。

![DOM](https://i.imgur.com/RB80abq.png)

## CSSOM

> CSS 解析可以與 DOM 解析同進行

通常 CSS 樣式會以 `<link rel="stylesheet" type="text/css" href="index.css">` 放在 HTML 的 `<head>` 中，所以當瀏覽器在解析構建 DOM 時，遇到 `<link>` 標籤，會向 Server 發起 request 取得 css 檔案。

拿到檔案後跟解析 HTML 差不多，一樣先把字節轉字符再轉成 token，token 在轉換成節點，唯一不一樣是最後一步，節點最後會結合為 CSS 物件模型，即為 CSSOM。

![CSSOM](https://i.imgur.com/BQoFSLx.png)

## Rendering Tree - 渲染樹

會匹配 DOM 和 CSSOM 的節點，留下可見元素，即螢幕上顯示的所有可見內容，同時也包含相應的樣式資訊。

- HTML DOM: 只留下 `<body>` 內容，`<head>` 不會被渲染到畫面上
- CSSOM: 會濾掉 `display: none` 等樣式

![渲染樹](https://i.imgur.com/pcZuuCO.png)

## Layout - 佈局

獲取渲染樹的結構、節點位置和大小，計算每個可視元素的版面配置。

佈局過程依據「盒子模型」進行，這個模型可精確說明每個元素在畫面中的準確位置和大小: 所有相對度量單位都會轉換為螢幕上的絕對像素位置。

![佈局](https://i.imgur.com/5NqyDD5.png)

## Paint - 繪製

佈局完成後，瀏覽器會觸發「Paint Setup」和「Paint」事件，將渲染樹轉化為螢幕上的實際像素。

## 渲染 HTML + CSS + JS

**JS 與 CSS**
如果 JS 文件較 CSS 文件先返回並解析執行完成，會發生阻塞，所以不能先執行 JS 文件，且 JS 可操控 CSSOM，所以需要等 **CSSOM 構建完成才能執行 JS 文件**，但可以先進行解析 JS 文件

**JS 與 HTML**
JS 會間接阻塞 HTML 解析，因為 JS 可操控 DOM，如果不等 JS 執行完，先解析 DOM 且會繪製出來，可能會造成網頁內容出現了又消失，所以需要等 JS 解析執行完再構建 DOM（指 `</script>` 後的 DOM）。

![渲染 HTML + CSS + JS](https://i.imgur.com/B8qRuW8.png)

在執行 JS 完成前，畫面是沒有東西的，直到 JS 執行完成後，繼續完成後續 DOM 解析，直到畫面被繪製出來。

> JS 檔案有設置 Async
> ![JS Async](https://i.imgur.com/nSNOLw3.png)

### `<script>` 標籤 defer 和 async 的區別

**兩者皆只適用於外部腳本**

|                | defer                  | async            |
| -------------- | ---------------------- | ---------------- |
| 場景           | 與 DOM 關聯的腳本      | 第三方腳本       |
| 阻塞 HTML 解析 | 不阻塞                 | 不阻塞           |
| 執行時間       | 會等 HTML 解析完才執行 | 加載後會立即執行 |

![](https://i.imgur.com/zOadq3e.png)

:::info
**:bulb:補充**

- DOM
  > 但可以部分解析
- CSSOM
  > 不能部分解析，會造成樣式災難，因為樣式會後蓋前或權重問題，所以真正呈現的樣式會以解析完整份 css 檔案為主。
  > ![CSSOM 全部解析](https://i.imgur.com/ZPH0yfQ.png =300x)
  > :::

## 優化

**瀏覽器執行的所有步驟：**

1. 處理 HTML 標記，產生 DOM 樹狀結構
2. 處理 CSS 標記，產生 CSSOM 樹狀結構
3. 將 DOM 樹狀結構和 CSSOM 樹狀結構合併為渲染樹 (Render-tree)
4. 對渲染樹進行版面配置，計算每個節點的幾何形狀
5. 在螢幕上繪製各個節點

能讓使用者更快看到畫面內容，重點就是儘可能**縮短上述第 1 步到第 5 步所花費的總時間**

## 參考

1. [浏览器渲染页面的流程](https://www.bilibili.com/video/BV18f4y1H7Zu?spm_id_from=333.999.0.0)
2. [渲染樹的形成原理你真的很懂嗎?](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/719042/)
3. [轉譯樹狀結構的建構、版面配置和繪製](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=zh-tw)
