---
title: "[Note] Vue (part 2) - Computed Properties & Watchers"
fileName: vue-computed-watchers
description: Vue 的學習筆記 part 2
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Vue
---

# [Note] Vue (part2) - Computed Properties & Watchers

## Computed Properties 計算屬性

- 處理複雜邏輯
- 計算屬性的 getter 函數是沒有副作用(side effect)的
  > **注意 :** 這裡是屬性，不是函式，不需要 `()`
- 有緩存機制，只觀察他所觀察的屬性，其屬性有變化才會執行對應的 func
- 效能比 `method` 好
- `computed` 屬性中的 `function` 無法使用參數，要使用參數改用 `method`

### Basic Example

- 聲明了一個計算屬性 `reversedMessage`
- 提供的函數將用作 property `vm.reversedMessage` 的

```htmlmixed=
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript=
let vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

Vue 知道 `vm.reversedMessage` 依賴於 `vm.message`，因此當 `vm.message` 發生改變時，所有依賴 `vm.reversedMessage` 的綁定也會更新。

```javascript=
console.log(vm.reversedMessage) // => 'olleH'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // => 'eybdooG'
```

### Computed Caching vs Methods 計算屬性緩存 vs 方法

```htmlmixed=
<!-- 寫法一：屬性 -->
<p>Reversed message: "{{ reversedMessage }}"</p>

<script>
// 在组件中
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
</script>


<!-- 寫法二：方法 -->
<p>Reversed message: "{{ reversedMessage() }}"</p>

<script>
// 在组件中
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    }
</script>
```

#### 相同：

- 可以將同一函數定義為一個方法而不是一個計算屬性。兩種方式的最終結果確實是完全相同的

#### 相異：

- **計算屬性是基於它們的響應式依賴進行緩存的**。只在相關響應式依賴發生改變時它們才會重新求值
  > **Computed:** 只要 message 還沒有發生改變，多次訪問 reversedMessage 計算屬性會立即返回之前的計算結果，而不必再次執行函數。
  >
  > **Methods:** 每當觸發重新渲染時，調用方法將總會再次執行函數。

#### Why：

假設我們有一個性能開銷比較大的計算屬性 A，它需要遍歷一個巨大的數組並做大量的計算。然後我們可能有其他的計算屬性依賴於 A。如果沒有緩存，我們將不可避免的多次執行 A 的 getter！

#### 注意：

- 資料沒響應式依賴又要時常更新的，勿放 Computed

```javascript=
// 計算屬性將不再更新，因為Date.now()不是響應式依賴：
computed: {
  now: function () {
    return Date.now()
  }
}
```

- 不希望有緩存，請用方法來替代

### Computed vs Watched Property 計算屬性 vs 偵聽屬性

**偵聽屬性 :** 觀察和響應 Vue 實例上的數據變動

> **[ 注意 ]：** 但如果有一些數據需要隨著其它數據變動而變動時，很容易濫用`watch` >**[ 解法 ]：** 使用計算屬性而不是命令式的 watch callback

```htmlmixed=
<div id="demo">{{ fullName }}</div>
```

```javascript=
 // 偵聽屬性
 //是命令式且重複的

let vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

```javascript=
// 計算屬性
// better
let vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

### Computed Setter 計算屬性的 setter

計算屬性默認只有 getter，不過在需要時你也可以提供一個 setter:

```javascript=
computed: {
  fullName: { // object 形式
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

現在再運行 `vm.fullName = 'John Doe'` 時，setter 會被調用，`vm.firstName` 和 `vm.lastName` 也會相應地被更新。

## Watchers

- 用於數據變化時執行異步（ex 打 API）或開銷較大的操作

```htmlmixed=
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```

```htmlmixed=
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 發生改變，這個函數就會運行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一個通過 Lodash 限制操作頻率的函數。

    // 在這個例子中，我們希望限制訪問 yesno.wtf/api 的頻率
    // AJAX 請求直到用户輸入完畢才會發出。

    // `_.debounce` 函數 (及其近親 `_.throttle`) 的知識，
    // 請參考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
</script>
```

使用 watch 選項允許我們執行異步操作(訪問一個 API)，限制我們執行該操作的頻率，並在我們得到最終結果前，設置中間狀態。這些都是計算屬性無法做到的。

除了 `watch` 之外，還可以使用命令式的 [vm.$watch API](https://cn.vuejs.org/v2/api/#vm-watch)。
