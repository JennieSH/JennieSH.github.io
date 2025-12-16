---
title: "Primitive Data Type v.s. Reference Data Type"
fileName: "js-data-type"
description: "JavaScript 的 Data Type 介紹"
createdAt: 2025-07-18
updatedAt: 2025-07-18
tags:
  - JavaScript
  - data type
  - Immutable
---

###### tags: `JavaScript` `front-end` `data type` `Immutable`

# [Note] Primitive Data Type v.s. Reference Data Type

## Javascript 的資料型態

| Primitive values | Reference values |
| ---------------- | ---------------- |
| `Undefined`      | `Object`         |
| `Null`           | `Function`       |
| `Number`         | `Array`          |
| `BigInt`         | `Array`          |
| `Boolean`        | ...              |
| `String`         |                  |
| `Symbol(ES 6)`   |                  |

## Primitive Data Type (Immutable)

所有的原始資料型態都是**不可改變的(Immutable)**，也就是說它們的值無法更改，一旦創建，無法直接改變其內容。

根據 [MDN](https://arc.net/l/quote/gmjlirpm) 中，目前 ECMAScript 標準定義了七種資料型別，除此之外都是物件：

- `Boolean`
- `Null`
- `Undefined`
- `Number`
- `BigInt`
- `String`
- `Symbol`

```javascript
// number
let a = 3;
let b = a;
b = b + 4;
console.log("b = ", b); //  7
console.log("a = ", a); //  3

// string
let c = "This is original string";
let d = c;
d = "Now change the string";
console.log("d = ", d); // Now change the string
console.log("c = ", c); // This is original string
```

## Reference Data Type (Mutable)

### 物件 Object

- 用於存儲鍵值對（key-value pair）的資料結構

```javascript
// for object
let e = { name: "John", age: 40, title: "Engineer" };
let f = e;
f.title = "Manager";
console.log("f = ", f); // { name: 'John', age: 40, title: 'Manager' }
console.log("e = ", e); // { name: 'John', age: 40, title: 'Manager' }
```

#### new 一個物件的過程

```javascript
let g = { name: "Mary", age: 38, title: "Engineer" };
let h = Object.assign({}, g, { title: "Manager" });
console.log("h = ", h); // { name: 'Mary', age: 38, title: 'Manager' }
console.log("g = ", g); // { name: 'Mary', age: 38, title: 'Engineer'}
```

使用 `Object.assign()` 來產生一個新的物件，它的語法是 `Object.assign(target, ...sources)`，target 是一個新的空的物件 `{}`, sources 是 g 跟 `{title: 'Manager'}`，將 sources 結合後放入 target 中。這樣產生出來的變數 h 就跟原來的 g 脫勾了。

### 陣列 Array

- 用於存儲有序集合

```
const fruits = ["apple", "banana", "cherry"];

```

#### 陣列的操作

```javascript
// array
let i = [1, 2, 3, 4];
let j = i;
j.push(5);
console.log("j = ", j); // [1, 2, 3, 4, 5]
console.log("i = ", i); // [1, 2, 3, 4, 5]

// immutable array
let k = [1, 2, 3, 4];
let l = [...k, 5];
console.log("l = ", l); // [1, 2, 3, 4, 5]
console.log("k = ", k); // [1, 2, 3, 4]
```

Javascript 的陣列是特殊的物件，當然也是 Mutable，比較特殊的是陣列有些 Operators 是 immutable 的，例如 `.map` `.filter` `.concat`...，這些 Operators 會**產生新的陣列**，不會影響舊的陣列，我們可以直接用在純函數中。

然而有一些 Operator 是 mutable 的，例如 `.push` `.pop` `.sort`...，這些會**直接改變原本的陣列**，我們在純函數中就不該使用。

### Function 函式

- 一種可調用的物件，用於封裝邏輯

```typescript
function greet() {
  console.log("Hello!");
}
```

## 參考資料

1. [Data Type PPT](https://drive.google.com/file/d/10I-TJbXSf6PNcM4V6D8Nc3MuczvW_Ola/view)
2. [Javascript Mutable 跟 Immutable 資料型態](https://ithelp.ithome.com.tw/articles/10193474)
