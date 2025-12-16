---
title: "JavaScript - This"
fileName: "js-this"
description: "JavaScript 愛恨交織的 this"
createdAt: 2025-07-17
updatedAt: 2025-07-17
tags:
  - JavaScript
  - event handling
---

###### tags: `JavaScript` `front-end` `this`

# JavaScript - This

## this 與前後文本 (context) 綁定的基本四大原則

- 預設綁定 (Default Binding)
- 隱含式綁定 (Implicit Binding)
- 顯式綁定 (Explicit Binding)
- 「new」關鍵字綁定

### **1. 預設綁定 (Default Binding)**

意即不屬於任何物件的方法、沒有使用 bind、call、apply 或 new，就套用預設綁定，此時 this 的值就是預設值全域物件，在瀏覽器環境底下是 window。

```javascript=
var a = 123;
console.log( window.a );

function foo(){
  // this === window
  console.log( this.a );
}

foo(); // 123
```

同樣的情況，若是加上 "use strict" 宣告成嚴格模式後，原本預設將 this 綁定至全域物件的行爲，會轉變成 undefined，因為在 ES5 的嚴格模式下，會禁止 this 自動指定為全域物件。

```javascript=
var a = 123;
console.log( window.a );

function foo(){
  "use strict";
  // this === undefined
  console.log( this.a );
}

foo(); // TypeError: Cannot read property 'a' of undefined
```

### **2. 隱含式綁定 (Implicit Binding)**

即使 function 被宣告的地方是在 global scope 中，只要它成為某個物件的參考屬性 (reference property)，在執行的階段 this 就會被綁定至該物件。

```javascript=
function func() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: func
};

func();       // undefined
obj.foo();    // 2
```

根據 「預設綁定」的原則，直接呼叫 func() 的情況下，此時的 this.a 實際上會指向 window.a，所以結果是 undefined。

在 obj 物件中，將 foo 這個屬性指到 func() 的時候，再透過 obj 來呼叫 obj.foo() 的時候，雖然實際上仍是 func() 被呼叫， 但此時的 this 就會指向至 obj 這個 owner 的物件上，於是此時的 this.a 就會是 obj.a 也就是 2 。

那麼此時，我們宣告另一個變數 func2 指向 obj.foo，猜猜看呼叫 func2() 的結果為何呢？

```javascript=
function func() {
  console.log( this.a );
}

var obj = {
  a: 2,
  foo: func
};

obj.foo();  // 2

var func2 = obj.foo;
func2();    // ??
```

答案是 undefined

當我們宣告 var func2 = obj.foo; 的時候，實際上 func2 就是 window.func2，而你在執行 func2() 的時候，等同於執行 window.func2()，那麼此時的 this 就會是 window。

決定 this 的關鍵**不在於它屬於哪個物件，而是在於 function「呼叫的時機點」**，當你透過物件呼叫某個方法 (method) 的時候，此時 this 就是那個物件 (owner object)。

### **3. 顯式綁定 (Explicit Binding)。**

透過 bind() / call() / apply() 這類直接指定 this 的 function 都可被歸類至顯式綁定的類型。

```javascript=
function func() {
  console.log( this.a );
}

var obj = {
  a: 2
};

func();             // undefined
func.call(obj);     // 2
```

##### 「隱含式綁定」與「顯式綁定」衝突時，此時 this 會以「顯式綁定」為主

```javascript=
function func() {
  console.log( this.a );
}

var obj1 = { a: 2, foo: func };

var obj2 = { a: 3, foo: func };

// 隱含式綁定
obj1.foo();  // 2
obj2.foo();  // 3

// 顯式綁定
obj1.foo.call( obj2 );  // 3
obj2.foo.call( obj1 );  // 2
```

### **4. 「new」關鍵字綁定**

function 前面帶有 new 被呼叫時，會發生：

- 產生一個新的物件 (物件被建構出來)
- this 會指向 new 出來的物件。
- 除非這個 function 指定回傳 (return) 了它自己的替代物件，否則這個透過 new 產生的物件會被自動回傳。

```javascript=
function foo(a) {
  this.a = a;
}

var obj = new foo( 123 );
console.log( obj.a );      // 123
```

## 總結

- **判斷順序：**
  1. new 綁定
  2. 顯示綁定
  3. 隱含式綁定
  4. 預設綁定
- **決定 this 是誰的關鍵：**

  1. this 是 function 執行時所屬的物件，this 是在執行時期做綁定，其值和函式在哪裡被呼叫有關
  2. function 透過 call() 或 apply() 來呼叫時， this 會指向第一個參數，且會立即被執行
  3. function 透過 bind() 來指定 this
  4. ES6 箭頭函數內建 .bind() 特性，此時 this 無法複寫。
