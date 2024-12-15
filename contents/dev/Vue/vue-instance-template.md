---
title: "[Note] Vue (part 1) - Instance & Template"
fileName: vue-instance-template
description: Vue 的學習筆記 part 1
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Vue
---

###### tags: `Vue`

# [Note] Vue (part 1) - Instance & Template

## 安裝套件

1. CDN

```htmlmixed
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

2. NPM

```
npm install vue
```

### Vue Devtools

Vue 開發者必裝！可以再開發者工具查看 Vue 各項資料和調試

- [vue-devtools repo](https://github.com/vuejs/vue-devtools#vue-devtools)

## Declarative Rendering 聲名式渲染

- Vue app 會將其掛載到一個 DOM 元素上，然後對其進行完全控制。HTML **(el : '#app')** 是我們的入口，但其餘都會發生在新創建的 Vue 實例內部。
- 讓 data 與 HTML 牽起友誼的小手，做到即時更新

### DOM 文本 : 雙花括號 {{ text }}

```htmlmixed=
<div id="app">
  {{ message }}
</div>
```

```javascript=
let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

### attribute: v-bind:attribute="args"

> 前綴 v- 開頭字為 Vue 指令，表示 Vue 提供的特殊 attribute，它們會在渲染的 DOM 上應用特殊的響應式行為。

```htmlmixed=
<div id="app-2">
  <span v-bind:title="message">
    Hover your mouse over me for a few seconds
    to see my dynamically bound title!
  </span>
</div>
```

```javascript=
let app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date().toLocaleString()
  }
})
```

### Two-way Binding 雙向綁定: v-model

實現表單輸入和應用狀態之間的雙向綁定

```htmlmixed=
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```javascript=
let app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```

### DOM 結構: Conditionals and Loops 條件與循環

#### - 條件： v-if="agrs"

控制切換一個元素是否顯示

```htmlmixed=
<div id="app-3">
  <p v-if="seen">Now you see me</p>
</div>
```

```javascript=
let app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

#### - 循環： v-for="todo in todos"

綁定數組的數據來渲染一個項目列表

```htmlmixed=
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```javascript=
let app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
```

## Event Listeners 事件監聽器

用 v-on 指令添加一個事件監聽器，通過它調用在 Vue instances 中定義 methods

### v-on:[action]="funcName"

> 注意在 reverseMessage 方法中，我們更新了應用的狀態，但沒有觸碰 DOM——所有的 DOM 操作都由 Vue 來處理，你編寫的代碼只需要關注邏輯層面即可。

```htmlmixed=
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```javascript=
let app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

## Composing with Components 組件化應用構建

組件系統允許我們使用小型、獨立和通常可複用的組件構建大型應用。

### component 使用

#### 1. 註冊 component

```javascript=
// In Vue, a component is essentially a Vue instance with pre-defined options.

// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

let app = new Vue(...)
```

#### 2. 應用 component

```htmlmixed=
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
```

### props down

- 父組件透過 props 向下對子組件傳遞資料
- 子組件 component 需要用 props 去聲明它所獲得的資料
- **[ 注意 ]:** 父組件的 template 模板中，傳送 data 的屬性名需要用串燒命名撰寫
  > [props 補充](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/231848/)

```javascript=
Vue.component('todo-item', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['todo'], // 子組件 component 聲明接收到的 props
  template: '<li>{{ todo.text }}</li>'
})
```

搭配 v-bind 屬性綁定，改寫如下：

> **[ 注意 ]:** v-for 記得搭配 key

```htmlmixed=
<div id="app-7">
  <ol>
    <!--
      Now we provide each todo-item with the todo object
      it's representing, so that its content can be dynamic.
      We also need to provide each component with a "key"
    -->
    <todo-item
      v-for="(item, index) in groceryList"
      v-bind:todo="item"
      v-bind:key="index"
    ></todo-item>
  </ol>
</div>
```

```javascript=
Vue.component('todo-item', { // 子組件
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

let app7 = new Vue({  // 父組件
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})
```

## Vue Instance 實例

### 建立 Vue Instance

所有的 Vue 組件都是 Vue Instance，都是通過用 Vue 函數創建。

```javascript=
let vm = new Vue({
  // options
})
```

### Data & Methods

當一個 Vue Instance 被創建時，它將 data object 中的所有的 property 加入到 Vue 的**響應式系統**中。當這些 property 的值發生改變時，視圖將會產生“響應”，即匹配更新為新的值。

```javascript=
// data object
ley data = { a: 1 }

// 該對象被加入到一個 Vue instance
let vm = new Vue({
  data: data
})

// Getting the property on the instance
// returns the one from the original data
vm.a == data.a // => true

// 更改 Vue Instance 的 property，會影響原始 data
vm.a = 2
data.a // => 2

// 反之亦然
data.a = 3
vm.a // => 3
```

> **[ 注意 ]**: **只有**當 Instance 被創建時就已經存在於 data 中的 property 才是**響應式**的，當這些 data 改變時，view 會進行重新渲染。

> 也就是說你添加一個新的 property，比如：
>
> ```javascript=
> vm.b = 'hi'
> ```
>
> 那麼對 b 的改動將不會觸發任何 view 的更新。

#### 進階應用

- 初始值設定

但是一開始它為空或不存在，那麼你僅需要設置一些初始值。
例如：

```javascript=
data: {
  newTodoText: '',
  visitCount: 0,
  hideCompletedTodos: false,
  todos: [],
  error: null
}
```

- Object.freeze()

阻止修改現有的 property，也意味著響應系統無法再追踪變化。

```javascript=
let obj = {
  foo: 'bar'
}

Object.freeze(obj)

new Vue({
  el: '#app',
  data: obj
})
```

```htmlmixed=
<div id="app">
  <p>{{ foo }}</p>
  <!-- this will no longer update `foo`! -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
```

- Vue 內建的 instance properties 和 methods
  它們都有前綴$，以便與用戶定義的 property 區分開來。
  > [API 參考](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B-property)

```javascript=
let data = { a: 1 }
let vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch is an instance method
vm.$watch('a', function (newValue, oldValue) {
  // This callback will be called when `vm.a` changes
})
```

### Lifecycle Diagram

<img src="https://vuejs.org/assets/lifecycle.MuZLBFAS.png" width=600>

> 圖片來源：[Vue 官方](https://vuejs.org/guide/essentials/lifecycle#lifecycle-diagram)

### Instance Lifecycle Hooks

每個 Vue Instance 在被創建時都要經過一系列的初始化過程——例如，需要**設置數據監聽**、**編譯模板**、將**實例掛載到 DOM**並在數據變化時**更新 DOM**等。在不同生命階段，可以調用不同的 Lifecycle Hooks。

Lifecycle Hooks 的 this 上下文指向調用它的 Vue Instance。

```javascript=
// created 可以用來在一個 Instance 被創建之後執行代碼：
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm instance
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

> **[ 注意 ]：**
>
> 不要在選項 property 或 callback 上使用**箭頭函數**，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。
>
> 因為箭頭函數並沒有 this，this 會作為變量一直向上級詞法作用域查找，直至找到為止，經常導致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之類的錯誤。

## Template Syntax 模板語法

Vue.js 使用了基於 HTML 的模板語法，Vue 將模板編譯成虛擬 DOM 渲染函數。結合響應系統，Vue 能計算出最少需要重新渲染多少組件，並把 DOM 操作次數減到最少。

> 如果你熟悉虛擬 DOM 並且偏愛 JavaScript 的原始力量，你也可以不用模板，直接寫渲染(render)函數，使用可選的 JSX 語法。

### Interpolations 插值

1. `Text 文本 - {{ text }}`

   - 綁定的 property 與插值處的內容是連動的，一有變化都會即時更新
   - 使用“Mustache”語法(雙大括號) 的文本插值

```javascript=
<span>Message: {{ text }}</span>
```

- `v-once`

執行一次性地插值，當數據改變時，插值處的內容不會更新。但請留心這會影響到該節點上的其它數據綁定。

```javascript=
<span v-once>This will never change: {{ msg }}</span>
```

<br/>

2. 原始 HTML - `v-html`

   雙大括號會將數據解釋為普通文本，而非 HTML 代碼。為了輸出真正的 HTML，你需要使用 **v-html** 指令：

```htmlmixed
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>

<!--- Using mustaches: <span style="color:red">This should be red.</span>
      Using v-html directive: This should be red. --->
```

> **[ 注意 ]:**
> 你的站點上動態渲染的任意 HTML 可能會非常危險，因為它很容易導致\*_XSS 攻擊_，絕不要對用戶提供的內容使用插值。

<br/>

3. Attribute - `v-bind:[attri]="args"`

   Mustache 語法不能作用在 HTML attribute 上，遇到這種情況應該使用**v-bind**指令：

```javascript=
<div v-bind:id="dynamicId"></div>
```

- v-bind + boolean
  - 如果 isButtonDisabled 的值是 null、undefined 或 false，則 disabledattribute 甚至不會被包含在渲染出來的\<button>元素中。

4. 使用 JavaScript 表達式

```htmlmixed=
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

但有個限制就是，每個綁定都只能包含單個表達式，所以下面的例子都不會生效。

```javascript=
<!-- 這是語句，不是表達式 -->
{{ var a = 1 }}

<!-- 流程控制也不會生效，要改用三元運算子 -->
{{ if (ok) { return message } }}
```

> **[ 注意 ]：** Vue 有一個有一個[全局變量白名單](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)，如 Math 和 Date 。你不應該在模板表達式中試圖訪問用戶定義的全局變量。

### Directives 指令

- 帶有 `v-` 前綴的特殊 attribute
- 值預期是單個 JavaScript 表達式 ( v-for 是例外)
- 當表達式的值

#### Argument 參數

> 一些指令能夠接收一個“參數”，在指令名稱之後以冒號表示。

- attribute 綁定

```htmlmixed
<!-- v-bind 指令可以用於響應式地更新 HTML attribute -->
<a v-bind:href="url">...</a>
```

- 監聽 DOM 事件

```htmlmixed=
<!-- 這裡的參數是監聽的事件名 -->
<a v-on:click="doSomething"> ... </a>
```

#### Dynamic Arguments 動態參數

> 從 2.6.0 開始，可以用方括號括起來的 JavaScript 表達式作為一個指令的參數

- attribute 動態綁定

  attributeName 會被作為一個 JavaScript 表達式進行動態求值，求得的值將會作為最終的參數來使用。

  例如，如果你的 Vue 實例有一個 dataproperty attributeName，其值為 "href"，那麼這個綁定將等價於 v-bind:href。

```htmlmixed
<!-- Note that there are some constraints to the argument expression -->
<a v-bind:[attributeName]="url"> ... </a>
```

- 事件名處理函數動態綁定

  當 eventName 的值為"focus"時，v-on:[eventName] 將等於 v-on:focus。

```htmlmixed
<a v-on:[eventName]="doSomething"> ... </a>
```

- 動態參數的值的約束

  - 動態參數預期會求出一個字符串，異常情況下值為 null。這個特殊的 null 值可以被顯性地用於移除綁定。

  - 非字符串類型的值都將會觸發一個警告

- 動態參數表達式的約束

1. 某些字符，如空格和引號，放在 HTML attribute 名里是無效的

```htmlmixed=
<!-- 會觸發編譯警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>

```

> **[ Solution ] :** 使用沒有空格或引號的表達式，或用計算屬性替代這種複雜表達式。

2. 在 DOM 中使用模板時(直接在一個 HTML 文件裡撰寫模板)，還需要**避免使用大寫字符來命名鍵名，因為瀏覽器會把 attribute 名全部強制轉為小寫。**

```htmlmixed
<!--
在 DOM 中使用模板時這段代碼會被轉換成 `v-bind:[someattr]`。

除非在實例中有一個名為“someattr”的 property，否則代碼不會作用。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

#### Modifiers 修飾符

修飾符 ( modifier ) 是以半角句號 ==.== 指明的特殊後綴，用於指出一個指令應該以特殊方式綁定。

> .prevent 修飾符告訴 v-on 指令對於觸發的事件調用 event.preventDefault()：

```htmlmixed=
<form v-on:submit.prevent="onSubmit">...</form>
```

### Shorthands 縮寫

#### v-bind 縮寫

```htmlmixed
<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>

<!-- shorthand with dynamic argument (2.6.0+) -->
<a :[key]="url"> ... </a>
```

#### v-on 縮寫

```htmlmixed
<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>

<!-- shorthand with dynamic argument (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```
