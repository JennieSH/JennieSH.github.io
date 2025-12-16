---
title: "[Note] 網址輸入後發生什麼事？"
fileName: "url-journey"
description: "想知道當在瀏覽器輸入的 URL 會發生什麼事情嗎？"
createdAt: 2025-09-17
updatedAt: 2025-09-17
tags:
  - browser
---

###### tags: `browser`

# [Note] 網址輸入後發生什麼事？

## 輸入網址

在瀏覽器網址列上輸入 URL：

> https://www.example.com

## DNS 解析

瀏覽器輸入的 URL 實際上無法找到伺服器的地址，這些字母只是方便使用者記憶，每個網址都會有相對應的 IP 地址，但 IP 地址是由數字組成，不方便人類記憶，所以需要 DNS 轉換為機器可讀取的 IP 地址。

把 URL 地址解析成 IP 地址，這一個過程就叫 DNS 解析，得到 IP 地址，就能找到指定的伺服器。

> https://www.test.com → **DNS** → 192.0.2.44

> \[補充\] [DNS 如何將流量路由到 Web 應用程式？](https://arc.net/l/quote/orxasqnf)

## TCP 三次握手**（Three-way Handshake）**

正式對伺服器發送資料前，會先建立 TCP 連接，等同於建立了 Server 和 Client 的聯絡通道，在建立通道前，會進行三次握手：

### 1\. Client 發送 SYN 封包

- 請求連接

### 2\. Server 響應 SYN + ACK 封包

- 表示同意建立連接

### 3\. Client 發送 ACK 封包

- 表示成功連接

![image](https://hackmd.io/_uploads/HynOKCaZWx.png)

## 發送 HTTP 請求

| **請求行**   | `method: POST authority: api.example.com path: /v1/upload` | 告訴伺服器「你想做什麼、對哪個資源做」     |
| ------------ | ---------------------------------------------------------- | ------------------------------------------ |
| **請求標頭** | `content-type: application/json`                           | 提供額外資訊給伺服器，說明請求的細節與設定 |
| **空行**     |                                                            | 分隔「請求標頭」與「請求資料（Body）」     |
| **請求資料** | `{ "filename": "photo.png", "size": 2048 }`                | 送給伺服器的內容                           |

### 請求行（Request Line）

告訴伺服器「你想做什麼、對哪個資源做」。

- **HTTP 方法（Method）**：`GET`、`POST`、`PUT`、`DELETE` 等

- **請求地址（Path / URL）**：如 `/v1/upload`

- **HTTP 協議版本（Version）**：如 `HTTP/1.1`

### 請求標頭（Request Headers）

提供額外資訊給伺服器，說明請求的細節與設定。

常見項目：

- `content-type: application/json`（請求內容格式）

- `user-agent: Mozilla/5.0`（瀏覽器或客戶端資訊）

- `authorization: Bearer token`（驗證資訊）

- `accept-language: zh-TW`（希望伺服器回應的語言）

### 空行（Blank Line）

分隔「請求標頭」與「請求資料（Body）」。

常見項目：

- JSON

- 表單資料（`form-data`）

- 純文字

- 二進位資料（檔案上傳）

### 請求資料（Body / Request Data）

送給伺服器的內容，例如註冊資料、表單內容、上傳檔案等。

## 響應 HTTP 請求

| **狀態行**   | `status: 200 ok`                                | 告訴客戶端「這次請求的結果如何」                               |
| ------------ | ----------------------------------------------- | -------------------------------------------------------------- |
| **響應標頭** | `content-type: application/html; charset=utf-8` | 描述回應的格式、編碼、緩存方式等資訊，讓瀏覽器知道怎麼處理內容 |
| **空行**     |                                                 | 分隔「響應標頭」與「回應主體」                                 |
| **響應資料** | `{ "id": "1", "name": "jennie" }`               | 傳給使用者的資料內容                                           |

### 狀態行（Status Line）

用來告訴客戶端「這次請求的結果如何」。

- **HTTP 版本** e.g.： HTTP/1.1

- **狀態碼**（Status Code）e.g.： 200、404、500 等

- **狀態訊息**（Reason Phrase）e.g.：OK

### 標頭（Headers）

描述回應的各種資訊，例如格式、編碼、緩存方式等，讓瀏覽器知道怎麼處理內容。

常見項目：

- `content-type: application/json`（回應內容格式）

- `content-length: xxx`（資料大小）

- `set-cookie: xxx`（伺服器送 cookie）

### 回應資料（Body / Response Data）

傳給使用者的資料內容。

常見項目：

- JSON（API 最常用）

- HTML（網頁內容）

- 圖片、檔案、文字

## 畫面渲染

解析接受到的 HTML、CSS 和 JavaScript 等文件，然後 Web 瀏覽器就會顯示該頁面。

## 參考資料

1. [在浏览器输入 URL 回车之后发生了什么？](https://www.youtube.com/watch?v=5yGNJ4GNQS8)

2. [什麼是 DNS?](https://aws.amazon.com/tw/route53/what-is-dns/)

3. [互聯網協議 | TCP 三次握手 四次揮手](https://ichigoichie.medium.com/%E4%BA%92%E8%81%AF%E7%B6%B2%E5%8D%94%E8%AD%B0-tcp-%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B-%E5%9B%9B%E6%AC%A1%E6%8F%AE%E6%89%8B-1e5f5f87fc9)
