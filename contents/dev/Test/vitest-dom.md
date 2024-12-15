---
title: Vitest - DOM 測試
fileName: vitest-dom
description: DOM 測試注意事項
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
  - Vitest
  - dom
  - jest-dom
  - user-event
---

# Vitest - DOM 測試

## Setup

### 安裝套件

以 React 來說，如果要進一步測試元件，除了 Vitest 本身，還需要安裝其他套件，才能解析 React 元件和模擬互動：

1. [jsdom](https://www.npmjs.com/package/jsdom) / [happy-dom](https://www.npmjs.com/package/happy-dom)：提供 Browser API 模擬瀏覽器環境

   - jsdom ： 功能較完善穩定，速度相較於 happy-dom 慢
   - happy-dom ： 輕量級，執行速度較快，但缺少一些 API

2. [testing-library/react](https://www.npmjs.com/package/@testing-library/react)(RTL)：用於測試 React 組件的渲染和交互
3. [testing-library/dom](https://www.npmjs.com/package/@testing-library/dom)：為 Testing Library 的核心，提供查詢 DOM 方法和模擬用戶行為(fireEvent)

   > **補充：** RTL v16 後，`testing-library/dom` 需要一起安裝。

 <br>
 
```bash
npm install -D jsdom @testing-library/react @testing-library/dom

# 如果沒有的話，需要安裝，用來支援 React

npm install -D @vitejs/plugin-react

````

> **補充：** 如果專案沒有 `@vitejs/plugin-react` 也需要安裝，用來處理 React 相關的文件和功能。

### 設置設定檔

在 `vite.config.ts` 設定：

1. 設定 plugin 設定 (如果專案是用 vite 起的，這段建立時就會有了)
2. 設定執行的環境

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // 1. 新增 plugin 設定
  test: {
    environment: "jsdom", // 2. 指定 environment
    }
  }
});
````

## 原則

1. 當內部邏輯過於複雜時，可以抽出邏輯變成 hook，**元件就專注於測試本身行為**，另外對 hook 做邏輯測試
2. 以**使用者角度關注元件**上預期的結果
3. 元件有呼叫到 API 時，測試專注於元件接受到內容的渲染結果或行為，API 返回資料可以透過 mock 方式提供，確認元件有符合預期即可

## 常用 API

### **`render`**

將 React 元件或組件渲染到虛擬 DOM 中，使測試能夠在瀏覽器環境模擬中運行。

```ts
test("render a component", () => {
  render(<button>Click Me</button>);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});
```

在不重新建立測試環境的情況下，可以使用 `rerender` 更新已渲染的元件，**適合測試相同元件在不同屬性或狀態下的行為**

```ts
const { rerender } = render(<NumberDisplay number={1} />);

// re-render the same component with different props
rerender(<NumberDisplay number={2} />);
```

### **`screen`**

提供一個全局訪問虛擬 DOM 的 API。

```ts
test("use screen to find an element", () => {
  render(<input placeholder="Enter your name" />);
  expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
});
```

### **`getByRole`**

用來根據元素的 `角色` 屬性來查找節點，例如按鈕、標題等，官方推薦優先使用，幾乎可以涵蓋所有需求。

```ts
test("get element by role", () => {
  render(<button>Submit</button>);
  expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
});
```

> **補充：**
>
> - 節點查找 API 選擇 @[Which query should I use?](https://testing-library.com/docs/queries/about#priority)
> - MDN 的 Roles @[list of roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Roles)

### **`getByText`**

根據元素內的文本來查找節點，**找不到元素會拋出錯誤**，適合用於**尋找特定顯示文本**的元素，。

```ts
test("get element by text", () => {
  render(<p>Hello World</p>);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
```

### **`queryByText`**

與 `getByText` 類似，但如果**找不到元素時**，不會拋出錯誤，而是**返回 `null`**，**適合用於確認元素是否不存在**。

```ts
test("query element by text", () => {
  render(<p>Hello World</p>);
  expect(screen.queryByText("Goodbye")).toBeNull();
});
```

### **`fireEvent`**

用來手動觸發 DOM 事件來**模擬使用者行為**的方法，例如 `click` 或 `input` 事件。

```ts
test("fire a click event", () => {
  const handleClick = vi.fn();
  render(<button onClick={handleClick}>Click Me</button>);
  fireEvent.click(screen.getByText("Click Me"));
  expect(handleClick).toHaveBeenCalled();
});
```

### **`cleanup`**

在每個測試後清除渲染的 DOM，**防止測試之間的狀態污染**。

```ts
afterEach(() => {
  cleanup();
});
```

> **補充：** 搭配 Vitest 的設定參考 @[Auto Cleanup in Vitest ](https://arc.net/l/quote/bajthlbg)

### **`renderHook`**

用來**測試 React 自訂 Hook 的函式**。它將 Hook 渲染在虛擬環境中，使開發者能驗證其邏輯和行為。

```ts
test("returns logged in user", () => {
  const { result } = renderHook(() => useLoggedInUser());
  expect(result.current).toEqual({ name: "Alice" });
});
```

### **`act`**

React 的更新是非同步的，`act` 可以**確保所有相關的狀態更新、重繪和副作用在測試執行之前完成**，讓斷言不會出現不一致的情況。

```ts
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useState } from "react";

test("use act to handle state updates", () => {
  const Counter = () => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p data-testid="count">{count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
      </div>
    );
  };

  render(<Counter />);

  // 初始值的斷言
  expect(screen.getByTestId("count").textContent).toBe("0");

  // 使用 act 確保狀態更新完成
  act(() => {
    screen.getByText("Increase").click();
  });

  // 測試點擊按鈕後的狀態
  expect(screen.getByTestId("count").textContent).toBe("1");
});
```

:::spoiler Q. 為什麼不需要 rerender，直接撰寫 expect(screen.getByTestId('count').textContent).toBe('1') 測試會過？

**A.** act 模擬 React 的更新機制，確保所有狀態變化和相關的 DOM 更新完成後，測試才能繼續執行。

- 當狀態更新（例如 setState 或 setCount）觸發 DOM 變更時，React 需要時間計算虛擬 DOM 的變化並更新實際 DOM。

- act 會等待這些操作完成後，讓測試斷言可以直接驗證最新的 DOM 狀態。

在範例中，按鈕點擊觸發 setCount，React 重新渲染了 Counter 組件，`screen.getByTestId('count')` 將自動返回更新後的內容，因為 DOM 已經在 act 的控制下完成了更新。
:::

### **`waitFor`**

用於等待非同步操作或渲染的完成。它會反覆執行傳入的回呼函數，直到回調內的條件滿足或超時，**適合測試需等待的元素渲染或狀態改變**。

```ts
test("wait for async updates", async () => {
  const Component = () => {
    const [text, setText] = React.useState("Loading...");
    useEffect(() => {
      setTimeout(() => setText("Loaded"), 1000);
    }, []);
    return <p>{text}</p>;
  };

  render(<Component />);

  await waitFor(() => expect(screen.getByText("Loaded")).toBeInTheDocument());
});
```

## 其他常用套件

### [jest-dom](https://github.com/testing-library/jest-dom)

為一個擴展 Jest matchers 的套件，提供許多的 custom matchers，使得測試斷言更加直觀和易讀，例如：`toBeInTheDocument`、`toBeDisabled`、`toHaveClass`。

> 相關的 API @ [Custom matchers](https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers)

> **補充：**雖然名字中有 jest，但不一定需要安裝 Jest，只需要引入 `@testing-library/jest-dom`，就可以使用它提供的 custom matchers。

**安裝套件**

```ts
npm install -D @testing-library/jest-dom
```

**更新設定檔案**

1. 新增 `vitest-setup.ts` 檔案，並加入至 `vitest.config.ts` 的設定中：

```ts
// vitest-setup.js
import "@testing-library/jest-dom/vitest";
```

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'], // 加入剛剛新增的檔案
  },
```

> **補充：** 如果省略這步驟一，那撰寫測試時需要每次都手動 import `'@testing-library/jest-dom'` 套件。

2. 更新 `tsconfig.json`

```ts
 // tsconfig.json
  "compilerOptions": {
    ...
    "types": ["vitest/globals", "@testing-library/jest-dom"] // 新增此段
  },
  "include": [
    ...
    "./vitest.setup.ts" // 新增此段
  ],
```

**範例使用**

```ts
expect(getByText("Visible Details Example")).toBeVisible();
```

### [user-event](https://github.com/testing-library/user-event)

提供模擬使用者事件，對比內建的 `fireEvent` 方法，更貼近真實使用者的操作行為。

> 相關 API @ [user-event API](https://testing-library.com/docs/user-event/v13/#api)

**安裝套件**

```ts
npm install -D @testing-library/user-event
```

**範例使用**

```ts
// v13 寫法
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MyComponent from "./MyComponent";

test("renders MyComponent and interacts with it", () => {
  render(<MyComponent />);
  const input = screen.getByLabelText("Username");
  // 模擬使用者輸入
  userEvent.type(input, "testuser");
  expect(input).toHaveValue("testuser");

  const button = screen.getByText("Submit");
  // 模擬使用者點擊
  userEvent.click(button);
  expect(screen.getByText("Submitted")).toBeInTheDocument();
});
```

- v14 推薦寫法：渲染元件之前，調用 `userEvent.setup()`

> **補充：** v14 兼容 v13 寫法，但這主要是為了從 v13 過渡到 v14 提供便利，以及用於簡單測試。

> **補充：** 避免在 `before`/`after` hook 使用任何 `userEvent` 函數，可參考 ["Avoid Nesting When You're Testing"](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)。

```ts
// v14 推薦寫法 - inlining
import userEvent from '@testing-library/user-event'

test('trigger some awesome feature when clicking the button', async () => {
  const user = userEvent.setup()
  render(<MyComponent />)

  await user.click(screen.getByRole('button', { name: /click me!/i }))
  ...
})
```

```ts
// v14 推薦寫法 - setup function
import userEvent from '@testing-library/user-event'

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  }
}

test('render with a setup function', async () => {
  const {user} = setup(<MyComponent />)
  ...
})
```

**`user-event`** v.s **`fireEvent`**

| 比較項目             | `fireEvent`                                                        | `user-event`                                                         |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **模擬範圍**         | 單一 DOM 事件（如 click、input、keydown）                          | 完整使用者互動過程（如按鍵輸入、滑鼠點擊、表單填寫等）               |
| **事件觸發數量**     | 一次觸發單一事件                                                   | 一次模擬多個相關事件（如 mousedown、focus、mouseup、click）          |
| **檢查與限制**       | 不檢查目標元素的狀態，可強制觸發事件（即使元素不可見或被禁用）     | 檢查目標元素是否可見、可互動（如隱藏元素不能點擊、禁用元素不能輸入） |
| **自動處理**         | 必須手動處理互動過程中的細節（如 focus、值變更 change、失焦 blur） | 自動處理互動過程中的細節，模擬瀏覽器行為                             |
| **適合使用情境**     | - 測試特定的低階 DOM 事件<br>- `user-event` 尚未實現的特殊場景     | 測試真實的使用者互動，特別是多步驟操作（如表單填寫、拖曳等）         |
| **使用難度**         | 需要手動撰寫所有事件及細節，較為繁瑣                               | 自動模擬瀏覽器邏輯，開發者只需描述互動，使用更簡單                   |
| **是否貼近真實互動** | 不貼近真實使用者行為，僅觸發事件本身                               | 高度貼近真實使用者互動，考慮瀏覽器行為限制                           |

使用 `fireEvent`：

```ts
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./MyComponent";
import { fireEvent } from "@testing-library/react";

test("使用 fireEvent 測試輸入", () => {
  render(<Input />);
  const input = screen.getByRole("textbox");
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "Hello" } });
  fireEvent.blur(input);
});
```

使用 `user-event`：

模擬使用者點擊 input 的行為後再去做輸入。

```ts
import userEvent from "@testing-library/user-event";

test("使用 user-event 測試輸入", async () => {
  const user = userEvent.setup();
  render(<Input />);
  const input = screen.getByRole("textbox");
  await user.type(input, "Hello");
});
```

## **參考資料**

- [Testing Library](https://testing-library.com/)
- [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI)
- [「你知道這是什麼嗎？」小白也能輕鬆瞭解的 Vue3 單元測試！Feat. Vitest + Vue Test Utils](https://ithelp.ithome.com.tw/users/20119062/ironman/5554)
