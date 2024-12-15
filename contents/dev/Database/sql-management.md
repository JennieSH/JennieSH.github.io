---
title: 資料表 (Tables) 管理 feat. PostgreSQL
fileName: sql-management
description: 主鍵和外來鍵介紹
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - database
  - postgresql
---

# 資料表 (Tables) 管理 feat. PostgreSQL

## 主鍵 ( Primary Key, PK)

- 每個資料表都要有一個主
- 主鍵值必須是唯一值，不能重複，設定後不應該再更動
- 主鍵不能為 Null
- 命名通常使用 `id`、`資料表_id` 命名，值為整數或 uuid

## 外來鍵 (Foreign Key, FK)

- 值來自於外部的資料，當該資料表需要關聯到其他資料表時使用
- 一張資料表可以擁有多個外來鍵
- 外來鍵必須對應到被參考資料表的主鍵
- 外來鍵可以為 Null
- 命名通常使用 `參考資料表_id`

<img alt="what is a foreign key visual explanation" loading="lazy"  decoding="async" style="color:transparent" src="https://images.ctfassets.net/00voh0j35590/2K1mVD8aEwDgRcE0eEuCR8/279085dae1b34b30e32d43c9641b7df3/what_is_a_foreign_key_visual_explanation.jpg">

> 圖片來源 [What is a foreign key?](https://www.cockroachlabs.com/blog/what-is-a-foreign-key/)

例如：表中的 `user_id` 為 users 資料表的主鍵，為 orders 資料表的外來鍵。

## 建立主鍵

- `PRIMARY KEY`：設定為主鍵，在新增 Table 時，加在欄位型態後面

```sql
-- 格式
CREATE TABLE 資料表名稱 (
  欄位名 欄位資料型態 PRIMARY KEY,
);

-- 範例：將 id 設為 Table users 的主鍵
CREATE TABLE users(id INTEGER PRIMARY KEY, name VARCHAR(50));

-- 第一次新增執行會成功
INSERT INTO
  users(id, name)
VALUES
  (1, 'Jennie');

-- 使用相同的 id 再新增一次，執行會失敗，因為主鍵的值不能重複
-- error message 為 duplicate key value violates unique constraint "users_pkey"
INSERT INTO
  users(id, name)
VALUES
  (1, 'Jennie2');
```

- `SERIAL`：設定自動產生 ID

```sql
-- 格式
CREATE TABLE 資料表名稱 (
  欄位名 欄位資料型態 SERIAL PRIMARY KEY,
);

-- 範例：將 id 設為 Table users 的主鍵，並透過 SERIAL 設定，讓 id 自動產生
CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(50));
INSERT INTO
  users(name) -- 不需要再傳入 id 欄位值了
VALUES
  ('Jennie');
```

## 關聯外來鍵

- 先設定外來鍵的欄位
- `FOREIGN KEY`：設定關聯外來鍵，後面用小括號綁定剛新增外來鍵欄位名
- `REFERENCES`：設定欲關聯的資料表(Table)和其底下的主鍵(PK)

```sql
-- 格式
CREATE TABLE 資料表名稱 (
  欄位名 欄位資料型態 PRIMARY KEY,
  外來鍵欄位名 欄位資料型態
  FOREIGN KEY (外來鍵欄位名) REFERENCES 資料表名稱 A(A 的主鍵)
);

-- 範例：將 order_id 設定為 Table users 的外來鍵
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                      -- users 的主鍵
    name VARCHAR(50),
    order_id INTEGER,                           -- 設定 users 的外來鍵
    FOREIGN KEY (order_id) REFERENCES orders(id) -- 關聯外來鍵
);
```

## 排序資料 (Order By)

- `ORDER BY`：選取排序規則
- `ASC`：由小到大
- `DESC`：由大到小
- `LIMIT`：optional，顯示的筆數

```sql
-- 格式
SELECT 欄位名
FROM 資料表名稱
ORDER BY 欄位名 排序條件
LIMIT 數量;

-- 範例：價格由低到高排序
SELECT displayName , price
FROM products
ORDER BY price ASC;
```

## PostgreSQL 函數

### Null

- `NOT NULL`：欄位值為 required
- `NULL`：欄位為 optional，未提供值時，其值會設為 `NULL`

```sql
-- 格式
CREATE TABLE 資料表名稱 (
  欄位名 欄位資料型態 NOT NULL,
  欄位名 欄位資料型態 NULL,
);

-- 範例：
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- 不可為空值
    email VARCHAR(100) DEFAULT NULL   -- 預設值為空值
);

-- 只新增 name 時會成功，email 欄位會自動設為 null：
INSERT INTO users(name)
VALUES ('Jennie');

-- 只新增 email 時會直接顯示錯誤：
-- null value in column "name" of relation "users" violates not-null constraint
INSERT INTO users(email)
VALUES ('hello@com');
```

> **\[補充\]：**
>
> 在 SQL 中，並沒有像某些編程語言（如 JavaScript）那樣的 `undefined`。
>
> - 沒有提供值且欄位允許 `NULL`，SQL 會將其值設定為 `NULL`。
>
> - 但這並不等同於 `undefined`，因為 `NULL` 是一種特定的 SQL 狀態，表示「無值」或「未知值」。

> **\[補充\]：** `email VARCHAR(100) NULL` v.s `email VARCHAR(100) DEFAULT NULL` 寫法區別
> | 實例 | `email VARCHAR(100) NULL` | `email VARCHAR(100) DEFAULT NULL` |
> | ----------------- | --------------------------- | ---------------------------------- |
> | **允許空值** | 是 | 是 |
> | **預設值** | 隱式為 `NULL` | 顯式為 `NULL` |
> | **表結構可讀性** | 稍微模糊，需依默認行為解釋 | 明確表明欄位預設值為 `NULL` |
>
> **差異重點**：
>
> - **技術上**：兩者的**行為和結果完全相同**，因為未指定 `DEFAULT` 時，資料庫會將允許 `NULL` 的欄位的預設值設為 `NULL`。
>
> - **語意上**：`DEFAULT NULL` 更加明確，有助於避免未來誤解或潛在問題。

### count

- `COUNT()`：計算資料列的數量，括號內可傳入欄位名或表達式
  - `(*)`：計算所有資料列數量，忽略 `NULL` 或非 `NULL`
  - `(欄位名)`：計算某欄位中非 `NULL` 的資料列數量
  - `(DISTINCT 欄位名)`：計算某欄位中不同且非 `NULL` 的值的數量

```sql
-- 格式
SELECT COUNT(欄位名或表達式) FROM 資料表名稱;

-- 計算總共有幾個員工
SELECT COUNT(*) FROM employees;

-- 計算開發部有幾個員工
SELECT COUNT(*) as "RD department"
FROM users
WHERE department_name = 'RD';
```

### AVG、SUM、MAX、MIN 函數

- `AVG`：平均
- `SUM`：總和
- `MAX`：最高 / 最大
- `MIN`：最低 / 最小

```sql
-- 範例
SELECT
  MAX(score) AS "最高分數",
  MIN(score) AS "最低分數",
  AVG(score) AS "平均分數",
  SUM(score) AS "總分數"
FROM
  students
```

## 參考

- [PostgreSQL 正體中文使用手冊](https://docs.postgresql.tw/)
