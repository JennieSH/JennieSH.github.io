---
title: "[Debug] Vue 生命週期的坑"
fileName: "vue-store-bug"
description: "Vue 在註冊 Store 時，因為 lifecycle 踩到的坑！"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Vue
  - store
  - lifecycle
---

###### tags: `Vue`、`store`、`lifecycle`

# [Debug] Vue 生命週期的坑 - 註冊 Store

## 註冊 Store 機制遇到 bug

### 已知條件

- `/zh`、`/en` 兩路徑共用同一組件 `Index.vue`
- `Index.vue` 在 `setup` 時註冊 store，在 `onBeforeUnmount` 移除該註冊 store

```javascript=
// router/index.js
const routes = [
  {
    path: '/zh',
    component: { render: c => c('router-view') },
    // path : /zh
    children: [{
      path: '',
      name: 'Index',
      component: Index
    }]
  },
  {
    path: '/en',
    component: { render: c => c('router-view') },
    // path : /en
    children: [{
      path: '',
      name: 'Index',
      component: Index
    }]
  },
  {
    path: '*',
    redirect: '/zh'
  }
]

```

```javascript=
// Index.vue
setup (props, context) {
    const { $store, $registerModule, $unregisterModule } = context.root

    // setup 註冊 store
    console.log('setup - registerModule')
    $registerModule($store, { index: StoreModule })

    console.log('setup - get count from index store')
    const count = computed(() => $store.state.index.count)

    onMounted(() => { console.log('onMounted') })

    // onBeforeUnmount 移除註冊 store
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount - unregisterModule')
      $unregisterModule($store, ['index'])
    })

    return {
      count
    }
}
```

### Runtime Error

當 `/zh` 經由 router push 到 `/en`，`/en` 由 `store` 取出的 `count` 會得到 `undefined`。

![](https://i.imgur.com/EaWvryy.png)

### 原因

由印出來的結果看到， `/zh` 在 `onBeforeUnmount` 移除註冊的 store，順序比 `/en` 的 `setup` 來得慢，因為兩者個路徑是共用 `Index.vue` 的 store，當 `/zh` 觸發移除 `Index.vue` 的 store，`/en` 在 Mount 時會拿不到 store 中 count 的值，就報錯了。

![](https://i.imgur.com/dz4sVYj.png)

:::info
補充：
Options API 一樣會有錯誤。
`Index.vue` 在 `beforeCreate` 時註冊 store，在 `beforeDestroy` 移除該註冊 store。

![](https://i.imgur.com/1uzRntT.png)
:::

:::info
補充：
在上面圖中，第二次的 `setup - wonder to registerModule` 並未再重新註冊，因為在程式內有檢查，有註冊的話就不在重新註冊，會共用先前註冊的同名 store，在各時機點加更精確的描述，圖如下。
![](https://i.imgur.com/DjUb6dV.png)
:::

:::info
補充：
`/zh` 使用的是 `Index.vue` 組件，`/zh/cat` 使用的是 `Cat.vue`，雖然 `/zh/cat` setup 晚於 `/zh` 的`onBeforeUnmount`，但兩個路徑**不共用同一個 store**，基本上就跟平常用法一樣，不受影響。

![](https://i.imgur.com/OITqBiQ.png)
:::

### 小結論

- 應該可以排除註冊 `registerModule` 機制的問題，由結果可知是 **Vue Lifecycle Hooks** 問題比較大。但這錯誤情境目前只遇到發生在建立**明確的不同路徑** (即上面 `router/index` 那樣的寫法)，使用同一個組件，並**換路徑時試圖移除前一個同名 store 再註冊一個新的同名 store** 時會遇到 。

- 本來看到最後 `onMounted` 會比上面的 `onBeforeUnmount` 還晚發生，所以想把 `registerModule` 改成放在 `Mounted` 階段，但後來想，這樣在第一次 `setup` 裡面的變數如果是需從 store 取得，也一樣會報錯，此法不通 :negative_squared_cross_mark:。

### 解法

> 情境: 不同路徑共用同一個組件註冊的 store，且可直接互相跳轉路徑

~~\* 解法一： **`beforeRouteLeave`** - 適用情境為，不同路徑**不想要共享 store 內資料** - 在組件內直接調用 `beforeRouteLeave`，在此階段 `unregisterModule`，強制取消註冊的 store~~

- 解法二：**動態命名 store**

  - 適用情境為，不同路徑**不想要共享 store 內資料**
  - 對每個路徑，客製化命名 store（e.g. `zh-index`），雖共用同組件，但每個路徑的 store 都為獨立的
  - 缺點為暫時性會有兩個 store 同時存在，要額外多寫一點程式碼。
    > 還有命名問題，為每個 store 客製化名字同時，也要思考如果別的 component 取該 store 資料時，如何知道目標的 store 名字。

- 解法三：**動態路由**

  - 適用情境為，不同路徑**想要共享 store 內資料**
  - 優點是**擴充性加**，以後有更多路徑需求也不需要手動新增 (e.g. `/jp`)，也解決原 registerModule 在 Vue 中遇到生命週期的問題。
  - 可透過 `context.root.$route.params` 拿到網址中的 params
    <br/>
    > 原來的**組件實例會被複用**。因為兩個路由都渲染同個組件，比起銷毀再創建，**複用則顯得更加高效**。不過，這也意味著組件的生命週期鉤子不會再被調用。 -[Vue.js 官方 - 響應路由參數的變化](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)

- 解法四：**先反註冊，再註冊**
  - **適用**以上**兩種情境**，即想共享或不想共享 store 內的資料皆可
  - 註冊 store、移除 store 時，都要接收一個參數(e.g. `uuid`)來檢查。不同路徑在註冊階段會針對先前已註冊的同名 store 先移除，再註冊。（翻譯：限制組件只能 `unregisterModule` 自己 `registerModule` 的 store）
  - 缺點是每次使用時要多傳入可識別的 id 和多一個地方存每個 store 的名字
    > 原本打算使用 Vue Component 的 uid，但[官方不推薦使用](https://github.com/vuejs/vue/issues/5886)，如真要採用，可以用[套件](https://www.npmjs.com/package/uuidv4)或自己實作 uuid。
    >
    > The vm \_uid is reserved for internal use and it's important to keep it private (and not rely on it in user code) so that we keep the flexibility to change its behavior for potential future use cases.
    >
    > For userland use cases, I'd suggest generating UIDs yourself - you can write a simple module/service that generates uids and import it into your components, or, if you want it for every component, make it a (global) mixin. - Evan You
  * 無法滿足頁面會同時存在兩個會註冊同 store 名的相同組件情境
    > e.g. 兩個相同組件 (Index.vue) 同時都會註冊名為 index 的 store，永遠都只保留最後一個組件註冊的。

## ~~beforeRouteLeave~~ (有坑，暫不考慮，除非防呆寫得好，可以一試)

只需在組件內原本在 `onBeforeUnmount` 做的 `unregisterModule`，改由在 `beforeRouteLeave` 時執行。

```javascript=
// Index.vue
export default defineComponent({
  name: 'Index',
  setup (props, context) {
    const { $store, $registerModule } = context.root

    console.log('setup - wonder to registerModule')
    $registerModule($store, { index: StoreModule })

    ...
  },
  beforeRouteLeave (to, from, next) {
    console.log('index beforeRouterLeave.')
    console.log('beforeRouteLeave - unregisterModule')
    this.$unregisterModule(this.$store, ['index'])
    next()
  }
})
```

![](https://i.imgur.com/4IB4evz.png)

### 棄用原因

雖然看似美好，在 `/en` setup 前就先 `unregisterModule`，但實際 runtime 一樣會報錯。

![](https://i.imgur.com/pxuzG6G.png)

原因是因為在 `beforeRouteLeave` 時移除了共有的 index store，但 `/zh` 的 `Index.vue` 組件被卸載的時間點晚於 `unregisterModule` 時間點，由於 count 剛好依賴 store 內的資料且組件尚未移除，此時 store 被拔除，直接報錯。

## 動態命名 store

在 `registerModule`，依據路徑不同，給予不同 store 名，視同各自擁有自己獨立的 store，`/zh` 移除註銷 store 就不影響 `/en`。

```javascript=
setup (props, context) {
    const { $store, $router, $registerModule, $unregisterModule } = context.root
    const currentRouteParams = $router.currentRoute.path.split('/')[1]
    const lang = `${currentRouteParams}-index`

    console.log('setup - wonder to registerModule')
    $registerModule($store, { [lang]: StoreModule })

    console.log('setup - get count from index store')
    const count = computed(() => $store.state[lang].count)

    onMounted(() => { console.log('onMounted') })

    onBeforeUnmount(() => {
      console.log('index - onBeforeUnmount')
      $unregisterModule($store, [lang])
    })
    return {
      count
    }
}
```

![](https://i.imgur.com/Zeh668U.png)

可用 Vue DevTools 更清楚看到順序和 store 的名字。

![](https://i.imgur.com/nOaiUYk.png)

## 動態路由

只需要修改 `router/index.js` 中 `routes` 設定：

```javascript=
const routes = [
  {
    path: '/:lang',
    component: { render: c => c('router-view') },
    // path - /:lang
    children: [{
      path: '',
      name: 'Index',
      component: Index
    }]
  },
  {
    path: '*',
    redirect: '/zh'
  }
]
```

```javascript=+
// 如果還有子路徑可以設置如下：
const routes = [
  {
    path: '/:lang',
    component: { render: c => c('router-view') },
    // path : /:lang
    children: [{
      path: '',
      name: 'Index',
      component: Index
    },
    // path : /:lang/cat
    {
      path: 'cat',
      name: 'Cat',
      component: () =>
        import(/* webpackChunkName: "cat" */ '../containers/Cat/index.vue')
    }]
  },
  {
    path: '*',
    redirect: '/zh'
  }
]
```

再看一下當路徑切換時，`Index.vue` 的活動：

- 路徑在切換（`/zh` -> `/en`）時只做 router push 動作
- 此階段不會移除 store，兩個路徑一樣共用同 store

![](https://i.imgur.com/v3lHuBT.png)

- 只有進入到不同組件時，`Index.vue` 才會被 `unregisterModule`
  > `/en` 頁面組件為 `<Index>`，`/en/cat` 頁面組件為 `<Cat>`

![](https://i.imgur.com/0U71jt2.png)

## 先反註冊，再註冊

由印出來的步驟可發現，原本方法和反註冊方法，走的流程都是一模一樣的，**在 `Index.vue` 使用方法也一樣**，在 `setup` 時註冊 store，在 `onBeforeUnmount` 移除該 store，但很明顯，原來的方法，會 runtime error，。

![](https://i.imgur.com/Oc9n512.png)

用 Vue DevTools 可以更清楚看出差異處，原本 `unregisterModule` 是由 `/zh` 執行，改成 `/en` 在 `registerModule` 前執行掉了，這樣就不存在 `/en` 會使用到的 store，因生命週期的不如預期而造成 `/zh` 在 `onBeforeUnmount` 將之誤移除情境。

![](https://i.imgur.com/XGco5ot.png)

### 作法

#### 1. `store name`-`component uid` Map

在全域會建立一個 `store name` 和 `component uid` 的 `currentStoreNameMap`。

#### 2. registerModule

每次呼叫 `registerModule` 方法時，會先去取得當前呼叫這方法的 component 中的`uid`，再檢查該 `store name` 是否存在在 `currentStoreNameMap` 中，**如果存在，先卸除該 store**，再建立一個新 store，接著把 `store name` 和呼叫的 `component uid` 存回 `currentStoreNameMap` 。

#### 3. unregisterModule

在真正卸載 store 前，會先拿當前呼叫這方法(`unregisterModule`)的 component 中的`uid`，與 `currentStoreNameMap` 對應 `store name` 的 `uid` 做比較，如果為同一個 `uid` 且存在的 store 就執行卸除，即**確保預移除的 store name 跟呼叫 unregisterModule 是必須是相同一個組件**，就不發生 Page A 誤移除到 Page B 中的同名 store。

## 參考資料

1. [Vue3.x 生命週期 和 Composition API 核心語法理解](https://iter01.com/467302.html)
   > 詳細比較 Vue3 和 Vue2 + Composition API Lifecycle Hooks 順序，如混用需注意順序，結論是不要混用。
2. [Vuex 官網](https://vuex.vuejs.org/)、[Vue Router 官網](https://router.vuejs.org/zh/api/)
3. [Vue 的生命週期(Lifecycle)](https://medium.com/@fabien705cccc/vue-%E7%9A%84%E7%94%9F%E5%91%BD%E9%80%B1%E6%9C%9F-lifecycle-3522c481e63f)
4. [Router 與生命週期](https://ithelp.ithome.com.tw/articles/10214921)
5. [Vuex 模块动态注册的一些实践经验](https://juejin.cn/post/6844903635873185806)
6. [Vuejs：如何為每个元件例項設置唯一 ID？](https://t.codebug.vip/questions-33383.htm)
