---
title: Vitest - 語法與常用 Matchers
fileName: vitest-matchers
description: 語法與常用 Matchers 介紹
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
  - Vitest
---

# Vitest - 語法與常用 Matchers

## 基本語法

### test / it

定義一個測試案例(test case)的最小單位，`it` 為 `test` 的別名，可替代使用。

```ts
import { expect, test } from "vitest";

test("should work as expected", () => {
  expect(Math.sqrt(4)).toBe(2);
});
```

### describe

會形成一個作用域(scope)，可以將同一個測試情境(test suite)的相關性測試案例(test case)集中起來。

```ts
import { describe, test, expect } from "vitest";

describe("Input 組件", () => {
  test("沒有輸入文字前，應該顯示 xxx placeholder",  () => {...});
  test("輸入文字後，搜尋按鈕要 enable",  () => {...});
  test("輸入字數超過最大字數限制時，應該顯示錯誤訊息",  () => {...});
});
```

### vi

是 vitest 提供的輔助工具，可以提供模擬 Modules、函式、物件和時間等功能。

> **補充：** vi 是對應 Jest 的 jest API。

```ts
import { expect, test, vi } from "vitest";

test("Element render correctly", async () => {
  // 等到 element 出現在頁面上，再對 element 做操作
  const element = await vi.waitUntil(() => document.querySelector(".element"), {
    timeout: 500, // default is 1000
    interval: 20 // default is 50
  });

  // do something with the element
  expect(element.querySelector(".element-child")).toBeTruthy();
});
```

## **斷言語法和常見** Matchers

斷言(Assertion) 是在測試中用來檢查程式碼是否按預期運行的語句，驗證某個條件是否為真或假(true/false)。根據測試比對的東西類型，所搭配使用的 Matchers 選擇也不同。

### expect

用於創建斷言，程式碼執行結果與斷言設定一致的話，就會通過測試，支援 `chai` 和 `Jest` 斷言寫法。

```ts
expect(Math.sqrt(4)).to.equal(2); // chai API
expect(Math.sqrt(4)).toBe(2); // jest API
```

> **補充：**
>
> 如果想檢查 type，可使用 `expectTypeOf` 或 `assertType` ，或者使用 `expect` + `toBeTypeOf`。
>
> ```ts
> expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>();
> expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 });
>
> // 泛型檢查
> function concat(a: string, b: string): string;
> function concat(a: number, b: number): number;
> function concat(a: string | number, b: string | number): string | number;
>
> assertType<string>(concat("a", "b"));
> assertType<number>(concat(1, 2));
>
> // expect + toBeTypeOf
> test("stock is type of string", () => {
>   expect("stock").toBeTypeOf("string");
> });
> ```

### 純值

- **`toBe`**

  斷言值或斷言物件的 reference 是否相等。

  > **補充：**
  >
  > - JavaScript 有浮點數精算問題，浮點數的計算要使用 `toBeCloseTo`
  >
  > - 想檢查物件(Object)的結構是否相等，要使用 `toEqual`

  ```ts
  const stock = {
    type: "apples",
    count: 13
  };

  test("stock has 13 apples", () => {
    expect(stock.type).toBe("apples");
    expect(stock.count).toBe(13);
  });

  test("stocks are the same", () => {
    const refStock = stock; // same reference

    expect(stock).toBe(refStock);
  });
  ```

- **`toBeDefined`** / **`toBeUndefined`**

  斷言值是否為 undefined。

- **`toBeNull`**、**`toBeNaN`**

  斷言值是否為 null / NaN。

- **`toBeTruthy`** / **`toBeFalsy`**

  斷言值的 boolean 檢查。

  > **補充：**`null`、`undefined`、`NaN`、`0`、`-0`、`0n`、`""` 和 `document.all` 皆為 falsy 的種類。

- **`toMatch`**

  斷言字符串的字串匹配和正則表達式檢查。

  ```ts
  test("top fruits", () => {
    expect("top fruits include apple, orange and grape").toMatch(/apple/);
    expect("applefruits").toMatch("fruit"); // toMatch also accepts a string
  });
  ```

- **`toBeGreaterThan`** / **`toBeGreaterThanOrEqual`** / **`toBeLessThan`** /**`toBeLessThanOrEqual`**

  斷言值與接收值的大小比較。

### 陣列

- **`toContain`**

  斷言值是否在陣列中。

  ```ts
  test("the fruit list contains orange", () => {
    expect(getAllFruits()).toContain("orange");
  });
  ```

- **`toContainEqual`**

  斷言物件是否在陣列中，物件結構和值必須完全相等(會遞迴比較)。

  ```ts
  test("apple available", () => {
    expect(getFruitStock()).toContainEqual({ fruit: "apple", count: 5 });
  });
  ```

- **`toMatchObject`**

  斷言物件是否有匹配的到另一個物件的部份屬性。

  ```ts
  const johnInvoice = {
    customer: {
      first_name: "John",
      last_name: "Doe"
    },
    items: [
      {
        type: "apples",
        quantity: 10
      },
      {
        type: "oranges",
        quantity: 5
      }
    ]
  };

  const johnDetails = {
    customer: {
      first_name: "John",
      last_name: "Doe"
    }
  };

  test("invoice has john personal details", () => {
    expect(johnInvoice).toMatchObject(johnDetails);
  });
  ```

  > **補充：**
  >
  > `toMatchObject` 也可以接收陣列，用來檢查兩個陣列中的元素數量是否相等。
  >
  > ```ts
  > test("the number of elements must match exactly", () => {
  >   // Assert that an array of object matches
  >   expect([{ foo: "bar" }, { baz: 1 }]).toMatchObject([
  >     { foo: "bar" },
  >     { baz: 1 }
  >   ]);
  > });
  > ```

- **`toHaveLength`**

  檢查字串、陣列的長度。

### 物件

- **`toEqual`**

  檢查斷言物件的值與接收到的物件的值是否相同結構(會遞迴比較)。

  > **補充：**如果物件結構裡面，欄位的值連出現 undefined 都要嚴格相等比較時，要選擇 `toStrictEqual`。

  ```ts
  // toEqual 與 toBe 比較
  const stockBill = {
    type: "apples",
    count: 13
  };

  const stockMary = {
    type: "apples",
    count: 13
  };

  test("stocks have the same properties", () => {
    expect(stockBill).toEqual(stockMary);
  });

  test("stocks are not the same", () => {
    expect(stockBill).not.toBe(stockMary);
  });
  ```

- **`toStrictEqual`**

  檢查斷言物件的值與接收到的物件的值是否相同結構和值(會遞迴比較)。

  ```ts
  // toStrictEqual 與 toEqual 比較
  test("structurally the same, but semantically different", () => {
    expect({ a: undefined, b: 2 }).toEqual({ b: 2 });
    expect({ a: undefined, b: 2 }).not.toStrictEqual({ b: 2 });
  });
  ```

- **`toHaveProperty`**

  斷言物件是否有包含有特定的 key，第二個可選參數可傳入該 key 預期的值(會遞迴比較)。

  ```ts
  const invoice = {
    isActive: true,
    "P.O": "12345",
    customer: {
      first_name: "John",
      last_name: "Doe",
      location: "China"
    },
    total_amount: 5000,
    items: [
      {
        type: "apples",
        quantity: 10
      },
      {
        type: "oranges",
        quantity: 5
      }
    ]
  };

  test("John Doe Invoice", () => {
    // 純檢查 key 值是否存在
    expect(invoice).toHaveProperty("isActive");
    // 檢查 key 和 value
    expect(invoice).toHaveProperty("total_amount", 5000);

    // 使用 `.`，取得物件底下的 key 和該 value
    expect(invoice).toHaveProperty("customer.first_name");
    expect(invoice).toHaveProperty("customer.last_name", "Doe");
    expect(invoice).not.toHaveProperty("customer.location", "India");

    // Array key 取法，可以用 array[index] 或 [keyPath]
    expect(invoice).toHaveProperty("items[0].type", "apples");
    expect(invoice).toHaveProperty("items.0.type", "apples");

    expect(invoice).toHaveProperty(["items", 0, "type"], "apples");
    expect(invoice).toHaveProperty(["items", "0", "type"], "apples"); // string notation also works
  });
  ```

### 函式

- **`toHaveReturnedWith`**

  斷言函式至少被呼叫一次，並且成功返回帶有特定參數的值，需要將一個 spy 函式傳遞給 expect。

  ```ts
  function add(a, b) {
    return a + b;
  }

  describe("add function", () => {
    it("should return the correct sum", () => {
      // 創建一個間諜函數
      const spy = vi.fn(add);

      spy(1, 2);

      expect(spy).toHaveReturnedWith(3);
    });
  });
  ```

- **`toHaveBeenCalled`**

  斷言函式函式至少被呼叫一次，需要將一個 spy 函式傳遞給 expect。

  ```ts
  const market = {
    buy(subject: string, amount: number) { ... },
  }

  test('spy function', () => {
    const buySpy = vi.spyOn(market, 'buy')

    expect(buySpy).not.toHaveBeenCalled()

    market.buy('apples', 10)

    expect(buySpy).toHaveBeenCalled()
  })
  ```

### Error

- **`toThrowError`**

  斷言函式在被調用時是否會拋出錯誤，別名可用 `toThrow`，expect 裡面**必須包裝成一個函式**。

  ```ts
  function getFruitStock(type: string) {
    if (type === 'pineapples') {
      throw new Error('Pineapples are not in stock')
    }

  test('throws on pineapples', () => {
    //  error msg 必須包含 stock 字串
    expect(() => getFruitStock('pineapples')).toThrowError(/stock/)
    expect(() => getFruitStock('pineapples')).toThrowError('stock')

     //  利用正則表達式檢查 error msg 是否完全相等
    expect(() => getFruitStock('pineapples')).toThrowError(
      /^Pineapples are not in stock$/
    )

    expect(() => getFruitStock('pineapples')).toThrowError(
      new Error('Pineapples are not in stock'),
    )
    expect(() => getFruitStock('pineapples')).toThrowError(expect.objectContaining({
      message: 'Pineapples are not in stock',
    }))
  })
  ```

  如果是非同步函式，需要搭配 `rejects`：

  ```ts
  function getAsyncFruitStock() {
    return Promise.reject(new Error("empty"));
  }

  // 非同步因為是回傳 promise，所以需要 async / await
  test("throws on pineapples", async () => {
    await expect(() => getAsyncFruitStock()).rejects.toThrowError("empty");
  });
  ```

## 生命週期

下面這些 API 可以掛鉤到測試的生命週期，**避免重複的前置準備和後續清理**。

執行範圍會根據撰寫所在的範疇(context)，如果是在 top-level 使用，則適用於整個文件；如果在 describe 區塊內使用，則適用於區塊內測試。

```ts
beforeAll(() => {
  // 在所有測試前建立一次性的測試環境
  db = initializeDatabase();
});

afterAll(() => {
  // 在所有測試後清理測試環境
  db.close();
});

describe("Database tests", () => {
  beforeEach(() => {
    // 在每個測試前重置數據庫
    db.reset();
  });

  afterEach(() => {
    // 在每個測試後清理數據庫
    db.cleanup();
  });

  it("should insert a record", () => {
    db.insert({ id: 1, name: "Test" });
    expect(db.find(1)).toEqual({ id: 1, name: "Test" });
  });

  it("should delete a record", () => {
    db.insert({ id: 1, name: "Test" });
    db.delete(1);
    expect(db.find(1)).toBeNull();
  });
});
```

### **beforeEach**

在當前範疇(context)的每個測試執行前呼叫。`beforeEach` 還接受一個 optional 的清理函式（相當於 `afterEach`）。

適用情境：

在每個測試執行前需要進行一些重複的設置工作，例如：初始化數據庫連接、設置測試數據、重置變數等。

```ts
beforeEach(async () => {
  // 每個測試前都會執行
  await prepareSomething();

  // 每個測試後都會執行
  // clean up function
  return async () => {
    await resetSomething();
  };
});
```

### **afterEach**

在當前範疇(context)的每個測試執行後呼叫。

適用情境：

在每個測試執行後需要進行一些清理工作，例如：清理數據庫、重置全局狀態、釋放資源等。

### **beforeAll**

在當前範疇(context)的全部測試執行前呼叫。`beforeAll` 也還接受一個 optional 的清理函式（相當於 `afterAll`）。

適用情境：

在所有測試執行前需要進行一次性的設置工作，例如：建立一次性的測試環境、載入配置文件、初始化外部服務等。

### **afterAll**

在當前範疇(context)的全部測試執行後呼叫。

適用情境：

在所有測試執行後需要進行一次性的清理工作，例如：釋放全局資源、關閉伺服器、清理測試環境等。

## **參考資料**

- [Vitest API](https://vitest.dev/api/)
- [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI)
