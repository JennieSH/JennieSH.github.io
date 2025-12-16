---
title: "[Note] Event Handling"
fileName: "event-handling"
description: "JavaScript 的 Event Handling 介紹"
createdAt: 2025-07-19
updatedAt: 2025-07-19
tags:
  - JavaScript
  - event handling
---

###### tags: `JavaScript` `front-end` `Event Handling`

# [Note] Event Handling

### `addEventListener()`的參數

```typescript
addEventListener(type, listener);
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);
```

- `Event Type`：string，事件的類型，例如： click。
- `Event Listener`：function，事件執行時觸發的函式。
- `useCapture`： boolean，決定事件是以「捕獲」或「冒泡」機制執行，預設為 false （冒泡）。

### 取消事件傳遞 - `e.stopPropagation`

<img src="https://static.coderbridge.com/img/techbridge/images/huli/event/event_p2.png">

```javascript=
// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing', e.eventPhase);
  e.stopPropagation();
}, true)

// console
list capturing
1


// 若是同一個節點上有不只一個 listener，還是會被執行到
// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing');
  e.stopPropagation();
}, true)

// list 的捕獲 2
$list.addEventListener('click', (e) => {
  console.log('list capturing2');
}, true)

//console
list capturing
list capturing2
```

若是要讓其他同一層級的 listener 也不要被執行，可以改用`e.stopImmediatePropagation()`

```javascript=
// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing');
  e.stopImmediatePropagation();
}, true)

// list 的捕獲 2
$list.addEventListener('click', (e) => {
  console.log('list capturing2');
}, true)

// console
list capturing
```

### 取消預設行為 - `e.preventDefault`

- 取消瀏覽器的預設行為

```javascript=
// list_item_link 的冒泡
$list_item_link.addEventListener('click', (e) => {
  e.preventDefault();
}, false)
```

- 一旦 call 了 preventDefault，在之後傳遞下去的事件裡面也會有效果。
  在#list 的捕獲事件裡面就先寫了 e.preventDefault()，這個效果會在之後傳遞的事件裡面一直延續。因此，等之後事件傳遞到#list_item_link 的時候，你會發現點超連結一樣沒反應。

```javascript=
// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing', e.eventPhase);
  e.preventDefault();
}, true)
```

## 常見問題

### 1. 試說明事件代理 (event delegation) 的概念？

- listener 是放在父層身上。這樣透過父節點來處理子節點的事件，就叫做事件代理。

```html=
<html>
<body>
  <ul id="list">
    <li data-index="1">1</li>
    <li data-index="2">2</li>
    <li data-index="3">3</li>
  </ul>
</body>
</html>
```

```javascript=
li.dataset.index
  document.getElementById('list').addEventListener('click', (e) => {
  console.log(e.target.getAttribute('data-index'));
})

```

[Event Object 1](https://hackmd.io/YL7sONOaTeuILTgrJtbblg?view)
[Event Object 2](https://www.notion.so/3-What-is-Event-Object-How-to-Use-it-5083c7e4e9234e8eaf5bc8fc63c603c4)

---

### 2. 試說明事件處理中 `bubble`(false) 和 `capture`(true) 的差別 (事件的傳遞機制)。

兩個原則:

1. 先捕獲，再冒泡
2. 當事件傳到 target 本身，沒有分捕獲跟冒泡 ( AT_TARGET，沒有捕獲跟冒泡之分，所以執行順序就會根據你 addEventListener 的順序而定 )

事件觸發總共有三個階段：

1. Capture Phase :
   根節點開始往下傳遞到 target，這邊你將節點加上事件，就會處於 Capture Phase。
2. Target Phase :
   所點擊的目標，在 target 身上所加的 eventListenr 會是 Target Phase。
3. Bubbling Phase :
   最後，事件再往上從子節點（target）一路逆向傳回去根節點，就叫做 Bubbling Phase

<img src="https://i.stack.imgur.com/njYTe.png">

而這邊的 e 裡面就蘊含了許多這次事件的相關參數，其中有一個叫做 eventPhase，是一個數字，表示這個事件在哪一個 Phase 觸發

```javascript=
const $list = document.getElementById('list');
$list.addEventListener('click', (e) => {
  console.log(e.eventPhase);
})
```

> PhaseType
> const unsigned short CAPTURING_PHASE = 1;
> const unsigned short AT_TARGET = 2;
> const unsigned short BUBBLING_PHASE = 3;

<img src="https://static.coderbridge.com/img/techbridge/images/huli/event/event_p2.png">

```javascript=
const get = (id) => document.getElementById(id);
const $list = get('list');
const $list_item = get('list_item');
const $list_item_link = get('list_item_link');

// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing', e.eventPhase);
}, true)

// list 的冒泡
$list.addEventListener('click', (e) => {
  console.log('list bubbling', e.eventPhase);
}, false)

// list_item 的捕獲
$list_item.addEventListener('click', (e) => {
  console.log('list_item capturing', e.eventPhase);
}, true)

// list_item 的冒泡
$list_item.addEventListener('click', (e) => {
  console.log('list_item bubbling', e.eventPhase);
}, false)

// list_item_link 的捕獲
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link capturing', e.eventPhase);
}, true)

// list_item_link 的冒泡
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link bubbling', e.eventPhase);
}, false)


//console
list capturing
1
list_item capturing
1
list_item_link capturing
2
list_item_link bubbling
2
list_item bubbling
3
list bubbling
3
```

---

### 3. 什麼是事件物件 (event object)，你在程式中如何取得與使用？

當監聽事件「發生」時，瀏覽器會去執行 Event Handler，並建立 Event Object，其中會包含許多重要的資訊。以點擊事件舉例，可以注意到幾個：

- `type : click`，事件類型。
- `target : input.btn`，被點擊的對象。
- `bubbles : true`，表示這事件是否是在「冒泡」階段觸發。
- `altKey : false`，表示是否有按著 alt 鍵點擊。
- `pageX / pageY` ，表示事件觸發時，滑鼠座標在網頁的相對位置
- ...etc
  > Advantage: 熟知 event object 可以幫助你設計更多元的互動形式，利用「event.key」去判定各種使用者點擊的狀況，進而判斷不同狀況時，該做出何種反應

```javascript=
const el = document.querySelector('.btn')
el.addEventListener('click', function (event) {
  console.log(event)
})
```
