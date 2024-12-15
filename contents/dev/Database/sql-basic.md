---
title: SQL 介紹和基本語法(CRUD)
fileName: sql-basic
description: 什麼是 SQL？
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - database
  - postgresql
---

# SQL 介紹和基本語法(CRUD)

## 什麼是資料庫？

資料庫是一種用於儲存、管理和檢索資料的系統，其核心運作通常由資料庫管理系統（Database Management System, DBMS）支援，負責實現資料的建立、讀取、更新和刪除（CRUD）等功能。

## 什麼是 SQL ?

關聯式資料庫廣泛使用結構化查詢語言（Structured Query Language, SQL）來操作和管理資料。使用者（Client）透過 SQL 與資料庫進行溝通互動，執行資料的查詢和操作需求。

## 資料庫結構

### 資料表 (Table)

整體資料，包含所有相關的資料

### 欄位 (Columns)

定義資料的屬性和類型 (Data Type)

### 資料列 (Rows)

橫向資料的集合，代表一筆完整資料

## 資料的型態

| **資料型態** | **描述**                                   | **使用情境**   | **範例欄位**          | **範例**               |
| ------------ | ------------------------------------------ | -------------- | --------------------- | ---------------------- |
| INTEGER      | 整數                                       | ID、數量       | `count INTERGER`      | 1, 2, 100              |
| VARCHAR(n)   | 字串 (n=字串長度)                          | 名稱、描述     | 'Jennie'              | `name VARCHAR(50)`     |
| TIMESTAMP    | 日期時間                                   | 建立/刪除時間  | '2025-01-01 00:00:01' | `created_at TIMESTAMP` |
| DECIMAL(p,s) | 精確小數(p=精度，數字的總位數；s=小數位數) | 金額           | 10\.99                | `price DECIMAL(10,2)`  |
| BOOLEAN      | 布林值                                     | 狀態           | true, false           | `is_Adult false`       |
| JSON         | JSON 資料                                  | 彈性的資料結構 | '{ "age": "18"}'      | `profile JSON`         |

> **\[補充\] :**
>
> 字串會嚴謹設定字元數，原因之一是考量資訊安全，防止有心人不當使用資料庫，進而導致資料庫當機。網頁出現錯誤訊息時，攻擊者可能從中得知一些敏感資訊，如 IP 位置，進而增加資料被入侵的風險。

## **SQL 基本語法**

### 通用規則

- SQL 關鍵字：通常採用**大寫**（例如：`CREATE TABLE`、`VALUES`），這是約定俗成的風格，用於方便區分 SQL 提供的關鍵字與自定義的內容。

- 建立順序：Table → Columns → Rows

- `;` ： 分號代表整個 SQL 指令結束，需加在最末尾
- `,` ： 多筆資料使用逗號隔開
- `--`：單行註解
- `/*` _\+_ `*/`：多行註解
- `'`：單引號用於字串值
- `"`：雙引號用於標識符，包括資料表名、欄位名或別名

  ```sql
  -- 錯誤寫法：
  -- 'RD department' 被解釋為字串常數，但 AS 別名要求的是標識符，因此導致語法錯誤
  SELECT COUNT(*) as 'RD department'

  -- 正確寫法：
  -- "RD department" 是一個合法的標識符，定義了查詢結果中該欄位的名稱
  SELECT COUNT(*) AS "RD department"
  ```

> 線上練習 SQL 指令網址 ： [pg-sql](https://pg-sql.com/)

### 建立資料表

- `CREATE TABLE`：建立 Table 指令

```sql
-- 格式
CREATE TABLE 資料表名稱 (
  欄位名 欄位資料型態,
);

-- 範例
CREATE TABLE users (
  name VARCHAR(50),
  email VARCHAR(100),
  age INTEGER
);
```

### 新增資料

- `INSERT INTO`：插入欄位至 Table
- `VALUES`：插入欄位對應的值

```sql
-- 單筆格式
INSERT INTO 資料表名稱 (欄位名 A, 欄位名 B, 欄位名 C)
VALUES (欄位值 A, 欄位值 B, 欄位值 C);
-- 多筆格式
INSERT INTO
  users (name, email, age)
VALUES
  (欄位值 A1, 欄位值 B1, 欄位值 C1),
  (欄位值 A2, 欄位值 B2, 欄位值 C2),
  (欄位值 A3, 欄位值 B3, 欄位值 C3);

-- 單筆範例：
INSERT INTO users (name, email, age)
VALUES ('Jennie', 'hello@world.com', 18);
-- 多筆範例：
INSERT INTO
  users (name, email, age)
VALUES
  ('Jennie', 'hello@world.com', 18),
  ('Joy', 'hello2@world.com', 20),
  ('Jack', 'hello3@world.com', 22);
```

### 查詢資料

- `SELECT` + `FROM`：從 Table 中，選擇查詢的欄位名
  - `*`：不指定欄位，表示全部
- `AS`：可將欄位名變成指定的別名

> **\[補充\]：**
>
> 實務上避免用 `*` 查詢，會有效能影響。

```sql
-- 格式
SELECT 欄位名 FROM 資料表名稱;

-- 範例：
-- 不指定欄位
SELECT * FROM users;
-- 單個特定欄位
SELECT email FROM users;
-- 多個特定欄位
SELECT name,age FROM users;
-- 別名 (除了幫原欄位改別名，也可以多顯示虛擬欄位，不會影響原資料表)
SELECT
  name,
  age AS real_age,
  age + 1 AS korean_age
FROM
  users;
```

### 尋找資料(Where)

- `WHERE`：查詢的條件範圍
- 執行順序：找資料表(`FROM`) → 篩選範圍(`WHERE`) → 取得對應欄位(`SELECT`)
- 英文字會區分大小寫(case sensitivity)

```sql
-- 格式
SELECT 欄位名 FROM 資料表名稱
WHERE 條件範圍

-- 範例：查詢商品分類為 3C 的商品名
-- 執行順序是 2 -> 3 -> 1 (範圍大到小)
SELECT         -- 1
  name
FROM           -- 2
  products
WHERE          -- 3
  category = '3C'
```

- 比較運算子

| **運算子** | **描述** |
| ---------- | -------- |
| =          | 等於     |
| \>         | 大於     |
| <          | 小於     |
| \>=        | 大於等於 |
| <=         | 小於等於 |

```sql
-- 範例：查詢價格大於 100 的商品名稱
SELECT
  name
FROM
  products
WHERE
  price > 100;
```

- 邏輯運算子

| **運算子** | **描述**               |
| ---------- | ---------------------- |
| AND        | 且，兩個條件需同時成立 |
| OR         | 或，其中一個條件成立   |

```sql
-- 範例：查詢價格大於 100 且庫存大於 0 的商品名稱
SELECT
  name
FROM
  products
WHERE
  price > 100 AND stock > 0;

-- 範例：查詢下架或庫存等於 0 的商品名稱
SELECT
  name
FROM
  products
WHERE
  status = 'inactive' OR stock = 0;
```

### 更新資料

- `UPDATE`：更新目標的資料表(Table)
- `SET`：更新欄位值
- 執行順序：更新資料表(`UPDATE`) → 篩選範圍(`WHERE`) → 更新對應欄位值(`SET`)

```sql
-- 格式
UPDATE 資料表名稱
SET 欄位名 = 欄位值
WHERE 條件範圍

-- 範例：更新 iPhone 庫存為 1
-- 執行順序是 1 -> 3 -> 2
UPDATE
  products         -- 1
SET
  stock = 1        -- 2
WHERE
  name = 'iPhone'; -- 3

-- 範例(多筆更新)：更新 iPhone 庫存為 3、價錢為 55,000
UPDATE
  products
SET
  stock = 3, price = 55000
WHERE
  name = 'iPhone';
```

### 刪除資料

- `DELETE FROM`：刪除目標的資料表

```sql
-- 格式
DELETE FROM 資料表名稱
WHERE 條件範圍

-- 範例：刪除庫存等於 0 的商品
DELETE FROM products
WHERE stock = 0;
```

> **\[補充\]**
>
> 實務上通常不會直接刪除資料庫的資料，而是使用`軟刪除` 方式，即為透過另外一個欄位(例如：`deleteAt`)實作刪除標記，避免意外導致資料救不回來。
