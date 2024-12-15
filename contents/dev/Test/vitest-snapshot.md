---
title: Vitest - Snapshot
fileName: vitest-snapshot
description: Snapshot 方法介紹
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Test
  - Vitest
  - mock
  - snapshot
---

# Vitest - Snapshot

快照(Snapshot)是首次運行測試時，將輸出的結果保存，與第二次運行結果做匹配。兩次快照結果不匹配的話，即為測試失敗，如為預期修改造成的測試失敗，可以將快照版本更新。

- 快照檔案**需要進版控**
- 自動比較前一份快照，不用手動維護 input / output

> @[Vitest Snapshot Doc](https://vitest.dev/guide/snapshot.html)
> @[Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI) - 19:40

## 預設快照 (Snapshot)

使用 `toMatchSnapshot` API，運行完，會自動產生一份獨立的快照檔案，存放在測試旁邊的 `__snapshots__`資料夾中。

```ts
describe("updateUserData(Snapshot)", () => {
  test("loads user data as expected", async () => {
    const user = await updateUserData("Jennie");
    // 會自動生成一個 .snap 檔案
    expect(user).toMatchSnapshot();
  });
});
```

運行完：

![image](https://hackmd.io/_uploads/HJK8ll3Vyl.png)

## 行內快照 (Inline Snapshot)

使用 `toMatchInlineSnapshot` API，運行完，會測試檔案中自動生成快照。

```ts
describe("updateUserData(Inline Snapshot)", () => {
  test("loads user data as expected", async () => {
    const user = await updateUserData("Jennie");
    // 會在此檔案中字自動生成快照
    expect(user).toMatchInlineSnapshot();
  });
});
```

運行完：

橘框部分為自動產生的快照。

![image](https://hackmd.io/_uploads/H1F_el2Nkx.png)

相較於預設快照的優點就是**在測試檔案中就能直接看到預期結果，不需要再另開啟 snapshot 檔案，減少跨檔案查看的時間**。

## 更新快照

### 手動更新

在監聽模式下，可以在終端機按 `u` 鍵手動更新快照

### 自動更新

改用下面指令，可以進入快照更新模式，任何修改都會觸發自動更新快照：

```bash
# -u 和 -update 都可以，擇一即可
npx vitest -u
npx vitest --update
```

自動更新在以下兩情境中很好用：

- 當測試複雜邏輯的函式或組件時，只要修改傳入的參數，就能快速看到返回的結果
- 在功能還在開發中，例如多加一個欄位，測試資料會自動補齊

## 參考資料

- [Vitest](https://vite.dev/)
- [Fast Unit Testing With Vitest](https://www.youtube.com/watch?v=FDEf3iWEgFI)
