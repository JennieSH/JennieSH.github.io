---
title: 手把手一起 TDD
fileName: tdd-implementation
description: Test-Driven Development 在 JS 和 DOM 實作。
createdAt: 2021-11-14
updatedAt: 2021-11-14
tags:
  - Test
  - TDD
---

# 手把手一起 TDD

![TDD cycle](https://i.imgur.com/9HCEV2B.png)

想了解更多 TDD，可以參考 [TDD - 測試驅動開發](https://hackmd.io/2QXKK978Sei4LMHQWhN-gQ)，此篇是實作篇，手把手帶你體驗 TDD :dash::dash:

## TDD Flow

再看一眼 TDD 流程，稍微有個印象，我們就繼續往下看 ～
![TDD flow](https://i.imgur.com/obbaftB.png)

#### Step 1. 列出需求清單

#### Step 2. 新增測試，測試 Fail

#### Step 3. 撰寫剛好能通過測試的程式

#### Step 4. 重構程式

## 範例 - Function

### `目標：Function - validatePassword`

要開發一個密碼驗證的函式，會先請列一下密碼要被滿足的條件。

**需求清單**：

1. Test 1 - 長度至少 8 碼
2. Test 2 - 至少含 1 個數字
3. Test 3 - 至少含 1 個英文字母(大寫/小寫)

### Fixture：先準備好測試環境

```js=
// validate.js

/**
 * 密碼驗證
 * @param string $paramter ,ex: 'a12345678'
 * @return boolean 回傳結果 true 有效密碼, false 無效密碼
 * @example validatePassword('a12345678') => true
 */

const validatePassword = () => {};

export default validatePassword;
```

```javascript
// validate.spec.js

describe("validatePassword", () => {
  // 1. 至少 8 碼
  // 2. 至少含 1 個數字
  // 3. 至少含 1 個英文字母(大寫/小寫)
});
```

![TDD Function fixture](https://i.imgur.com/FcZOQUS.png)

### TDD cycle

#### Red - [ Test 0 防呆 ]

在驗證的時候，基本都會有個防呆，只要值是 `""`、`undefined`、`null`，永遠都會被視為 `invalid value`，在第一行就會被 return 了，程式不會再往下跑，所以我們可以把這當作最簡單的開局測試案例。

- 在 `validate.spec.js` 新增傳入空字串要返回 `false` 的測試。
- `yarn test` => **fail test**

```js=
// validate.spec.js

it("return false given an empty string", () => {
    expect(validatePassword("")).toBe(false);
});
```

![TDD Red 0](https://i.imgur.com/lrwP0l1.png)

#### Green - [ Test 0 防呆 ]

- 新增無腦解，呼叫 `validatePassword` 直接 `return false`
- `yarn test` => **pass test**

```js=
// validate.js

const validatePassword = () => {
  return false;
};
```

![TDD Green 0](https://i.imgur.com/Wa1kiNC.png)

#### Refactor - [ Test 0 防呆 ]

Skip，目前還沒有重構必要。

<br/>

---

<br/>

#### Red - [ Test 1 長度至少 8 碼 ]

- 在 `validate.spec.js` 中，新增密碼長度要大於 8 碼的測試
- `yarn test` => **fail test**

:::info
:information_source: 這邊第一個一定會過測試參數 `a12345678`，建議可以直接使用 PM 規格書提供的成功範例當做測試參數，永遠保證這個一定是合法密碼。
:::

```js=
// validate.spec.js

it("at least 8 characters long", () => {
    expect(validatePassword("a12345678")).toBe(true);
});
```

![TDD Red 1](https://i.imgur.com/95MNuxI.png)

#### Green - [ Test 1 長度至少 8 碼 ]

- `validate.js` 新增檢查參數大於 8 的判斷式
- `yarn test` => **pass test**

```js=
// validate.js

const validatePassword = (password) => {
  if (password.length >= 8) {
    return true;
  }
  return false;
};
```

![TDD Green 1](https://i.imgur.com/5HZodu7.png)

#### Refactor - [ Test 1 長度至少 8 碼 ]

Skip，目前還沒有重構必要，程式碼還算易懂。

<br/>

---

<br/>

#### Red - [ Test 2 至少含 1 個數字 ]

- 在 `validate.spec.js` 中，新增是否含數字的測試
- `yarn test` => **fail test**

```js=
// validate.spec.js

it("contains at least one number", () => {
    expect(validatePassword("ABCDEFGHIJ")).toBe(false);
});
```

![TDD Red 2](https://i.imgur.com/txLSZdu.png)

#### Green - [ Test 2 至少含 1 個數字 ]

- `validate.js` 新增檢查數字的正則
- `yarn test` => **pass test**

```js=
// validate.js

const validatePassword = (password) => {
  if (password.length >= 8 && /[0-9]/g.test(password)) {
    return true;
  }
  return false;
};
```

:::info
:information_source: 正則測試方法可參考 [MDN - `regexObj.test(str)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
:::

![TDD Green 2](https://i.imgur.com/4UdIAWx.png)

#### Refactor - [ Test 2 至少含 1 個數字 ]

- 目前 `長度大於 8 碼` 和 `數字正則` 擠在同一個 if 判斷式裡，降低易讀性，可將兩個拆開，各用變數做代表做重構
- `yarn test` => **pass test**

```js=
// validate.js

const validatePassword = (password) => {
  const validLength = password.length >= 8;
  const containsNumber = /[0-9]/g.test(password);

  return validLength && containsNumber;
};
```

![TDD Refactor 2](https://i.imgur.com/fDfWhnC.png)

<br/>

---

<br/>

#### Red - [ Test 3 至少含 1 個英文字母(大寫/小寫) ]

- 在 `validate.spec.js` 中，新增是否含英文字母的測試
- `yarn test` => **fail test**

```js=
// validate.spec.js

it("contains at least one letter", () => {
    expect(validatePassword("123456789")).toBe(false);
});
```

![TDD RED 3](https://i.imgur.com/OsrfSHE.png)

#### Green - [ Test 3 至少含 1 個英文字母(大寫/小寫) ]

- `validate.js` 新增檢查英文字母的正則
- `yarn test` => **pass test**

```js=
// validate.js

const validatePassword = (password) => {
  const validLength = password.length >= 8;
  const containsNumber = /[0-9]/g.test(password);
  const containsLetter = /[a-z]/g.test(password);
  return validLength && containsNumber && containsLetter;
};
```

![TDD Green 3-1](https://i.imgur.com/Qd1snYu.png)

因為英文字母這邊當初條件有列，要可接受大小寫，我們可以多增加幾個 assert，以確保需求條件都滿足。

- 在 `validate.spec.js` 中，新增內有含以**小寫英文字母的參數**的測試
- `yarn test` => **pass test**

目前程式可接受小寫英文字母輸入的，接著試另一個大寫英文字母的測試案例。

```js=
// validate.spec.js

it("contains at least one letter", () => {
    expect(validatePassword("123456789")).toBe(false);
    expect(validatePassword("a123456789")).toBe(true);
});
```

![TDD Green 3-2](https://i.imgur.com/SX3sNXK.png)

#### Red - [ Test 3 至少含 1 個英文字母(大寫/小寫) ]

- 在 `validate.spec.js` 中，新增內有含以**大寫英文字母的參數**的測試
- `yarn test` => **fail test**

這是測試居然失敗！這時候就會回頭檢視功能程式，是不是沒考慮到英文字母為大寫的情境。

```js=
// validate.spec.js

it("contains at least one letter", () => {
    expect(validatePassword("123456789")).toBe(false);
    expect(validatePassword("a123456789")).toBe(true);
    expect(validatePassword("A123456789")).toBe(true);
});
```

![TDD Red 3-2](https://i.imgur.com/1FpS334.png)

#### Green - [ Test 3 至少含 1 個英文字母(大寫/小寫) ]

- `validate.js` 補上檢查大寫英文字母的正則
- `yarn test` => **pass test**

驗證通過後，以 TDD 流程開發的密碼驗證函式就完成了 :clap:

```js=
// validate.js

const containsLetter = /[aA-zZ]/g.test(password);
```

![TDD Green 3-3](https://i.imgur.com/V3G0JDb.png)

### Final Code

```js=
// validate.js

const validatePassword = (password) => {
  const validLength = password.length >= 8;
  const containsNumber = /[0-9]/g.test(password);
  const containsLetter = /[aA-zZ]/g.test(password);

  return validLength && containsNumber && containsLetter;
};

export default validatePassword;
```

```js=
// validate.spec.js

import validatePassword from "./validate";

describe("validatePassword", () => {
  // 1. 至少 8 碼
  // 2. 至少含 1 個數字
  // 3. 至少含 1 個英文字母(大寫/小寫)

  it("return false given an empty string", () => {
    expect(validatePassword("")).toBe(false);
  });

  it("at least 8 characters long", () => {
    expect(validatePassword("a12345678")).toBe(true);
  });

  it("contains at least one number", () => {
    expect(validatePassword("ABCDEFGHIJ")).toBe(false);
  });

  it("contains at least one letter", () => {
    expect(validatePassword("123456789")).toBe(false);
    expect(validatePassword("a123456789")).toBe(true);
    expect(validatePassword("A123456789")).toBe(true);
  });
});
```

![Final Code - Function](https://i.imgur.com/d3bAwPZ.png)

- 技術使用： vue-test-utils + Jest
- 範例來源：[TDD in JavaScript | Test Driven Development](https://www.youtube.com/watch?v=89Pl2Uok8xc)

## 範例 - Dom

### Target Dom - rating stars

一個顯示星等的 component，下方有顯示其分數。

**需求清單**：

- Test 1 - 五個星星
- Test 2 - 星星 active 數量
- Test 3 - 顯示的數字

![](https://i.imgur.com/ILwofUB.png)

### Fixture

準備好組件`(Rating.vue)`和測試檔案`(Rating.spec.js)`，並寫一些測試的起手式 code。

> **`wrapper`**：代表 Dom
> **`beforeEach`**：每次測試時都會執行，可在此階段建立測試資料、Dom
> **`afterEach`**：每次測試後都會執行，可在此階段移除測試資料、Dom
>
> 上面方法都是 **Jest** 提供的，可以參考 [Jest - Setup and Teardown](https://jestjs.io/docs/setup-teardown)。

```vue
// Rating.vue

<template>
  <div></div>
</template>

<script></script>
```

```js=
// Rating.spec.js

import { shallowMount } from "@vue/test-utils";
import Rating from "@/components/Rating.vue";

let wrapper = null;

// mount component before each test
beforeEach(() => {
  wrapper = shallowMount(Rating);
});

// destroy component after each test
afterEach(() => {
  wrapper.destroy();
});

describe("Rating", () => {
  it("renders the stars",() => {})
});
```

![TDD Vue](https://i.imgur.com/HLiP41E.png)

### TDD cycle

#### Red - [ Test 1 五個星星 ]

- 在 `Rating.spec.js` 中，新增有 **className `.star` 數量要有五個**的測試。
- `yarn test` => **fail test**

```js=
// Rating.spec.js

describe("Rating", () => {
  it("renders the stars", () => {
    const stars = wrapper.findAll(".star");
    expect(stars.length).toBe(5);
  });
});
```

![TDD Vue Red](https://i.imgur.com/acGeVie.png)

#### Green - [ Test 1 五個星星 ]

- 新增無腦解 `<li class="star">` \*5
- `yarn test` => **pass test**

```vue
// Rating.vue
<template>
  <div>
    <ul>
      <li class="star" />
      <li class="star" />
      <li class="star" />
      <li class="star" />
      <li class="star" />
    </ul>
  </div>
</template>
```

![TDD Vue Green](https://i.imgur.com/QsneYEm.png)

#### Refactor - [ Test 1 五個星星 ]

如果今天需求改成要 10 顆星星呢？再複製五個 `<li>` 貼上？那實在太對不起工程師這職業了，所以我們要把這段 hard code 重構一下，讓最大星星數量由外面當作 `props` 傳進來。

- `Rating.vue` 新增 `props` 參數 `maxStars`
- `Rating.vue` 中的 `<li>` 用 `v-for` 改寫
- `Rating.spec.js` 再 Mount 時傳入 `propsData`
- `yarn test` => **pass test**

保持通過測試狀態！Awesome！第一個 `TDD cycle` 就完成了:clap:
接下來就再依照需求清單，進行下一個 `Red-Green-Refactor`。

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li v-for="star in maxStars" :key="star" class="star" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 0
    }
  }
};
</script>
```

```js=
// Rating.spec.js

beforeEach(() => {
  wrapper = shallowMount(Rating, {
    propsData: {
      maxStars: 5
    }
  });
});
```

![TDD Vue Refactor](https://i.imgur.com/G3dPayZ.png)

<br/>

---

<br/>

#### Red - [ Test 2 星星 active 數量 ]

- 在 `Rating.spec.js` 中，新增 3 個 `active` 星星數的測試
- `yarn test` => **fail test**

```js=
// Rating.spec.js

describe("Rating", () => {
  it("renders the stars", () => {
    const stars = wrapper.findAll(".star");
    expect(stars.length).toBe(5);
  });

  it("renders the active stars", () => {
    const active = wrapper.findAll(".star.active");
    expect(active.length).toBe(3);
  });
});
```

![TDD Vue Red 2](https://i.imgur.com/Xnl9kC5.png)

#### Green - [ Test 2 星星 active 數量 ]

- 在 `Rating.vue` 中，className 條件判斷寫 `star <= 3` 時，className 會自動新增 `active`
- `yarn test` => **pass test**

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= 3
        }"
      />
    </ul>
  </div>
</template>
```

![TDD Vue Green 2](https://i.imgur.com/yuHnCaW.png)

#### Refactor - [ Test 2 星星 active 數量 ]

active 星數，一般是由使用者或後端產生的，所以一樣要改成由外面用 props 方式傳入。

- 在 `Rating.vue`、`Rating.spec.js` 新增 `props` 參數 `initGrade`
- className 的條件判斷，改用參數
- `yarn test` => **pass test**

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= initGrade
        }"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 0
    },
    initGrade: {
      type: Number,
      default: 0
    }
  }
};
</script>
```

```js
// Rating.spec.js

beforeEach(() => {
  wrapper = shallowMount(Rating, {
    propsData: {
      maxStars: 5,
      initGrade: 3
    }
  });
});
```

![TDD Vue Refactor 2](https://i.imgur.com/7Z3c3bm.png)

---

#### Red - [Test 3 顯示的數字]

最後一個測試了，下方需顯示當前 active 星數和全部星數的資訊。

- 在 `Rating.spec.js` 中新增測試，條件為一個 `.summary` 的 dom，內容文字為前星數的資訊
- `yarn test` => **fail test**

```js
// Rating.spec.js

describe("Rating", () => {
  it("renders the stars", () => {
    const stars = wrapper.findAll(".star");
    expect(stars.length).toBe(5);
  });

  it("renders the active stars", () => {
    const active = wrapper.findAll(".star.active");
    expect(active.length).toBe(3);
  });

  it("renders a summary", () => {
    const summary = wrapper.find(".summary");
    expect(summary.text()).toBe("2 of 5");
  });
});
```

![TDD Vue Red 3](https://i.imgur.com/svpVyJT.png)

> [vue-test-utils]: find did not return .summary, cannot call text() on empty Wrapper[color=#ff0000]
>
> 意即在目前組件內找不到 `.summary` 的 dom，無法呼叫 text() 方法。

#### Green - [ Test 3 顯示的數字 ]

- 先新增 `<div class="summary" />`
- `yarn test` => **fail test**，雖然還沒通過測試，但這邊也可以發現 error message 已經改變了，可以找到 `.summary`，只是文字訊息不對。

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= initGrade
        }"
      />
    </ul>
    <div class="summary" />
  </div>
</template>
```

![TDD Vue Green - 1](https://i.imgur.com/kdrV4eJ.png)

> Expected: "2 of 5"
> Received: ""[color=#ff0000]

- 在 `Rating.vue` 直接把文字寫跟測試案例一模一樣 `3 of 5`
- `yarn test` => **pass test**

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= initGrade
        }"
      />
    </ul>
    <div class="summary">3 of 5</div>
  </div>
</template>
```

![TDD Vue Green - 2](https://i.imgur.com/nQrsIdq.png)

#### Refactor - [ Test 3 顯示的數字 ]

- `.summary` 內的文字顯示改用 `props` 參數
- `yarn test` => **pass test**

Bravo ! 整個 TDD 流程完成了！

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= initGrade
        }"
      />
    </ul>
    <div class="summary">{{ initGrade }} of {{ maxStars }}</div>
  </div>
</template>
```

![TDD Vue Refactor](https://i.imgur.com/4iXT529.png)

### Final Code

```vue
// Rating.vue

<template>
  <div>
    <ul>
      <li
        v-for="star in maxStars"
        :key="star"
        class="star"
        :class="{
          active: star <= initGrade
        }"
      />
    </ul>
    <div class="summary">{{ initGrade }} of {{ maxStars }}</div>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 0
    },
    initGrade: {
      type: Number,
      default: 0
    }
  }
};
</script>
```

```js
// Rating.spec.js
import { shallowMount } from "@vue/test-utils";
import Rating from "@/components/Rating.vue";

let wrapper = null;

// mount component before each test
beforeEach(() => {
  wrapper = shallowMount(Rating, {
    propsData: {
      maxStars: 5,
      initGrade: 3
    }
  });
});

// destroy component after each test
afterEach(() => {
  wrapper.destroy();
});

describe("Rating", () => {
  it("renders the stars", () => {
    const stars = wrapper.findAll(".star");
    expect(stars.length).toBe(5);
  });

  it("renders the active stars", () => {
    const active = wrapper.findAll(".star.active");
    expect(active.length).toBe(3);
  });

  it("renders a summary", () => {
    const summary = wrapper.find(".summary");
    expect(summary.text()).toBe("3 of 5");
  });
});
```

![TDD Result](https://i.imgur.com/LEanr6L.png)

- 技術使用： vue-test-utils + Jest

---

## 參考資料

- 範例來源：[Test driven development with Vue.js by Sarah Dayan](https://www.youtube.com/watch?v=DD1fEhcEzY8)

###### tags: `test`、`TDD`
