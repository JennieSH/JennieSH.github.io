---
title: "Mardown Test"
fileName: "markdown-test"
description: Mardown 功能測試，裡面無實質內容。
createdAt: 2020-11-11
updatedAt: 2020-11-11
tags:
  - markdown
  - test
---

# Mardown 功能測試

## Code

```typescript
// ts
interface SubjectData {
  name: string;
  articleList: string[];
  amount: number;
}
```

```html
// html
<template>
  <span class="tag">{{ tagName }}</span>
</template>
```

```scss
// scss
.app {
  @apply flex flex-col justify-between min-h-screen text-light-text dark:text-dark-text dark:bg-dark-bg;

  transition: background-color 0.5s ease-in-out;
}
```

```javascript
// js
const foo = function (bar) {
  return bar++;
};

console.log(foo(1));
```

```vue
// vue
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

<style lang="scss" scoped>
div {
  @apply bg-yellow-100;
}
</style>
```

## Alert + Emoji

### - Default

> :taiwan: :taiwan: :taiwan: 哈囉
> https://www.google.com.tw/

### - Success

:::success
:heavy_check_mark: 成功
https://www.google.com.tw/
:::

### - Info

:::info
:bulb: 補充
https://www.google.com.tw/
:::

### - Warning

:::warning
:warning: 注意
https://www.google.com.tw/
:::

### - Danger

:::danger
:exclamation: 警告

https://www.google.com.tw/
:::

### - Spoiler

:::spoiler 顯示更多
我就是`更多` ！

https://www.google.com.tw/

<img alt="test-img" title="圖片來源-unsplash" src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1858&q=80" />

```html=
<h1>Hello World</h1>
```

:::

## 表格

| Title                                                                                      | Views |
| ------------------------------------------------------------------------------------------ | ----- |
| Intro to CSS                                                                               | 858   |
| Intro to JavaScript                                                                        | 1,280 |
| A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design | 112   |
