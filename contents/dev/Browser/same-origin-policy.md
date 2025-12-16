---
title: "同源政策 Same-Origin Policy"
fileName: "same-origin-policy"
description: "為什麼要有同源政策？來一起探討背後原因"
createdAt: 2025-02-17
updatedAt: 2025-02-17
tags:
  - Network
  - 同源政策
  - CORS
  - Browser
---

###### tags: `Network` `同源政策` `CORS` `Browser`

# 同源政策 Same-Origin Policy

### Why

防止**CSRF 誇站請求偽造**(Cross-site request forgery) :

利用了 web 中用戶身分驗證的一個漏洞：簡單的身分驗證只能保證請求發自某個用戶的瀏覽器，卻不能保證請求本身是用戶自願發出的。

### Rules

- 相同協議(protocol)
- 相同網域(domain)
- 相同端口(port)

### Method

#### ==CORS==

幾乎不太可能跟要接的 API 在同一 domain 下，所以為了讓不同源之間可以傳輸資料，又有另外一個規範叫 CORS。

CORS 把請求分為兩種，簡單請求跟預檢(preflight)請求。

> Server 必須在 Response 的 Header 裡面加上 Access-Control-Allow-Origin 的設定。

- **簡單請求**
  要滿足所有[判斷條件](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS#%E7%B0%A1%E5%96%AE%E8%AB%8B%E6%B1%82)，最容易分辨的是沒有自定義 Header，而且又是 GET 。

```javascript=
GET https://api.users.com/user/1 HTTP/1.1
```

- **預檢(preflight)請求**

瀏覽器會先送出 HTTP 的 OPTIONS 方法，確認 Server 的 Response 是否有 Access- Control-Allow-Origin ，確認有之後才會把我們的請求送出。

:::info
OPTIONS 是一個 HTTP/1.1 方法，這個方法用來確認來自伺服器進一步的資訊，重複執行不會造成任何影響
:::

```javascript=

const xhr = new XMLHttpRequest()
xhr.open("POST","http://api") //用post方法發請求到api網址
  xhr.addEventListener('readystatechange', function(e) {
    if (e.target.readyState === 4 && e.target.status === 200) {
      //....

    } else if (e.target.readyState === 4) {
      //....
    }
  });
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

```

## 參考資料

- [MDN 跨來源資源共享（CORS）](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
- [Web Server - 跨域請求](https://ithelp.ithome.com.tw/articles/10205069)
