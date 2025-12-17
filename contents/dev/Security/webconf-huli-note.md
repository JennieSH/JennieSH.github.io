---
title: "[WebConf 筆記] Huli - 從冷知識到漏洞：你不懂的 Web，駭客懂"
fileName: "webconf-huli-note"
description: "Huli 大大在 2025 WebConf 演講主題的重點整理筆記"
createdAt: 2025-12-14
updatedAt: 2025-12-14
tags:
  - webconf
  - security
---

###### tags: `security`

# [WebConf 筆記] Huli - 從冷知識到漏洞：你不懂的 Web，駭客懂

這篇是 2025 Webconf 的筆記整理～

> [Huli - 從冷知識到漏洞：你不懂的 Web](https://webconf.tw/agenda/17) ｜ [簡報](https://speakerdeck.com/aszx87410/cong-leng-zhi-shi-dao-lou-dong-ni-bu-dong-de-web-hai-ke-dong-huli-at-webconf-taiwan-2025) ｜[共筆](https://hackmd.io/@webconf/HJiwwqnxZe/%2FkqRzuYEES9-RuzuW0FLsBg)

漏洞分三種

1. 已知 bug，但時間來不及
2. 好像有碰過，但忘記了
3. 不知道這樣寫有問題

這次例子會聚焦討論第三種～

## Case 1. user.email 一定會與 email 相等嗎？

```javascript
async function forgotPassword(req, res) {
  const email = req.body.email.toLowerCase();
  const user = await safeSQL(
    "select * from users where email = ?",
    [email] // 用 email 找出 user
  );

  if (user) {
    userService
      .sendResetLink({
        link: userService.generateLink(user.id),
        to: email // 寄重置密碼信給 user
      })
      .catch(console.error);
  }

  return res.status(204).end();
}
```

![image](https://hackmd.io/_uploads/ByKbaQeXWl.png)

\
MySQL 不是直接用「字元的實際編碼值」來比較字串，而是先把字元轉換成 **權重（weight）**，再用權重比較。

> 不同的 DB 背後比較方式不同，不是每個 DB 都會這樣。

![image](https://hackmd.io/_uploads/S14Haml7Wl.png)

### 如何攻擊？

![image](https://hackmd.io/_uploads/Hy6Upmg7Zx.png)

解法：

```javascript
async function forgotPassword(req, res) {
  const email = req.body.email.toLowerCase();
  const user = await safeSQL(
    "select * from users where email = ?",
    [email] // 用 email 找出 user
  );

  if (user) {
    userService
      .sendResetLink({
        link: userService.generateLink(user.id),
        to: email // fix: fix: user.email
      })
      .catch(console.error);
  }

  return res.status(204).end();
}
```

### 結論：不同 context 的相等就是不相等

## Case 2. 在 AI 取代人之前，先小心你的字串被取代

```javascript
const tmpl = '<button value="{{value}}">click</button>';
const value = new URL(location.href).searchParams.get("v");
const safeValue = value.replace(/[<>"]/g, ""); // 移除特殊字元
document.body.innerHTML = tmpl.replace("{{value}}", value); // 取代
```

**But** ! 這是 JavaScript，當使用在正則表示式（RegExp）中，用「字串」作為取代時，可以使用的特殊替換符號`$`：

![image](https://hackmd.io/_uploads/HJhYT7em-x.png)

### 如何攻擊？

![image](https://hackmd.io/_uploads/Hyt2TQxQbg.png)

這是前端典型前端 XSS 攻擊，可以透過 `<button>` + `onClick`，塞入想要攻擊的程式碼。

### 結論：字串取代要小心

## Case 3. Clean 不是真的 Clean，Join 不是真的 Join

### Go 的 Clean

```go
func main() {
    filename := "test.js" // user-controlled
    pluginFilePath := filepath.Join("/etc/plugins", filename)
    fmt.Printf("Output: %q/n", pluginFilePath) // /etc/plugins/test.js
}
```

```go
// 會往外面資料夾查找
func main() {
    filename := "../../etc/hosts" // user-controlled
    pluginFilePath := filepath.Join("/etc/plugins", filename)
    fmt.Printf("Output: %q/n", pluginFilePath) // /etc/plugins/../../etc/hosts
}
```

```go
func main() {
    filename := filepath.Clean("../../etc/hosts")
    pluginFilePath := filepath.Join("/etc/plugins", filename)
    fmt.Printf("Output: %q/n", pluginFilePath) // "/etc/hosts"
}
```

#### 重點：加了 Clean 也一樣會被穿越

以為「先 Clean 就安全」，但不對：

Clean 只是在整理字串，沒有限制結果一定留在 /etc/plugins 底下。

> Go - [Clean Doc](https://pkg.go.dev/path/filepath#Clean)
>
> 1. Replace multiple [Separator](https://pkg.go.dev/path/filepath#Separator) elements with a single one.
> 2. Eliminate each . path name element (the current directory).
> 3. Eliminate each **inner .. path** name element (the parent directory) along with the non-.. element that precedes it.
> 4. Eliminate .. elements that **begin a rooted path**: that is, replace "/.." by "/" at the beginning of a path, assuming Separator is '/'.
>
> ⇒ filepath.Join 不會限制你一定要留在 /etc/plugins 裡，它只負責算出「合理的路徑」。

如果後面拿 pluginFilePath 去 os.Open / ReadFile，就**不是 plugins，而是系統檔案**，這就是典型目錄穿越 (path traversal) 風險。

#### 攻擊例子：[Grafana path traversal](https://github.com/grafana/grafana/security/advisories/GHSA-8pjx-jj86-j47p)

![image](https://hackmd.io/_uploads/SklxA7emZg.png)

有其他的 Go 開發者想發 PR 解決這問題，但目前 PR 進度從 2020 年還停留在 In Progress :

![image](https://hackmd.io/_uploads/HJbWAQlQbl.png)

### Python 的 Join

```python
import os

filename = '../../etc/hosts'
if '..' in filename:
    raise ValueError('invalid filename')

result = os.path.join('/tmp/test', filename)
print(result)  # ValueError: invalid filename
```

這個例子在 `../` 開頭檔案名沒問題，會直接報錯誤，接下來再看看傳入 `/etc/hosts`，居然不是預期出現的 `/tmp/test/etc/hosts`。

```python
import os

filename = '/etc/hosts'
if '..' in filename:
    raise ValueError('invalid filename')

result = os.path.join('/tmp/test', filename)
print(result)  # /etc/hosts
```

因為在 Python 裡，`os.path.join(base, path)` 的規則，如果後面的參數是 **絕對路徑**（以 `/` 開頭），前面的路徑會被 **直接忽略**：

> [os.path.**join**(_path_, _/_, _\*paths_)](https://arc.net/l/quote/ttslaxed)
>
> Join one or more path segments intelligently. The return value is the concatenation of _path_ and all members of _\*paths_, with exactly one directory separator following each non-empty part, except the last. That is, the result will only end in a separator if the last part is either empty or ends in a separator. **If a segment is an absolute path (which on Windows requires both a drive and a root), then all previous segments are ignored and joining continues from the absolute path segment.**

### 結論：要看官方文件和寫好測試，確保 output 是對的

## Case 4. React is

```jsx
function App() {
  // 把網址 query string（?a=1&b=2）轉成物件
  const params = new URLSearchParams(window.location.search);
  const obj = Object.fromEntries(params);

  return <div {...obj}>Hello</div>;
}
```

### 如何攻擊？

#### dangerouslySetInnerHTML ?

不會有危險，因為要執行 dangerouslySetInnerHTML 的條件：

1. prop 名字 **必須是 `dangerouslySetInnerHTML`**
2. value **必須是物件**
3. 物件 key **必須是 `__html`**

```jsx
<div dangerouslySetInnerHTML={{ __html: "<img onerror=alert(1)>" }} />
```

例子中 URLSearchParams 的特性是：

1. 所有值都是字串
2. 沒有巢狀結構

即使使用者傳入：

```jsx
?dangerouslySetInnerHTML=<img src=x onerror=alert(1)>
```

最後變成：

```jsx
{
  dangerouslySetInnerHTML: "<img src=x onerror=alert(1)>"
}

// React 看到的
<div dangerouslySetInnerHTML="...">
```

React 會把它當成「一個普通、未知的 attribute」，**不會執行**。

#### onclick / onClick ?

**`onclick`**：HTML attribute（小寫）在 React 也不會變成可執行事件，只當作一般 attribute。

![image](https://hackmd.io/_uploads/B1wN07xXbl.png)

**`onClick`**：React 事件，**必須是 function**，不能是字串。

```jsx
// 只會是字串
obj = { onClick: "alert(1)" };

// React 看到的
<div onClick="alert(1)">Hello</div>;
```

![image](https://hackmd.io/_uploads/H1LrRQeXZg.png)

#### web-component ?

```jsx
function App() {
  const obj = {
    is: "huli",
    onclick: "alert(1)"
  };

  return <div {...obj}>Hello</div>;
}
```

這是 React 為了支援 custom component 而做的邏輯

![image](https://hackmd.io/_uploads/B19dA7xmZx.png)

只要加入 is ，就會忽略 L105 的 o/O/n/N 的檢查：

![image](https://hackmd.io/_uploads/rkU5R7lX-x.png)

不過在 React 19 版本後改掉了～

### 結論：絕對不要把使用者的輸入照單全收

## Case 5. 小心使用 regex

```jsx
// 嘗試判斷字串中是否「看起來像 HTML tag」，用來避免 XSS
function isUnsafeString(str) {
  // 只要字串中「同時出現 <，而且後面某處出現 > 或 =」，就當成不安全
  const regex = /.*[<].*[>=].*/s;
  return regex.test(str);
}

isUnsafeString("<svg>"); // true
isUnsafeString("<svg onload=alert()"); // true
isUnsafeString("<svg onload=alert()>"); // true
isUnsafeString("hello <3"); // false
```

### 如何攻擊 ？

```jsx
function isUnsafeString(str) {
  const regex = /.*[<].*[>=].*/s;
  return regex.test(str);
}

console.time("test");
isUnsafeString("<svg>" + "<".repeat(50000));
console.timeEnd("test");
// test: 1.218s
```

透過設計過的字串，讓正則跑得非常慢，直接卡死主執行緒，這就是 ReDoS(Regular Expression Denial of Service)。

> 可參考簡報例子的[配對講解](https://speakerdeck.com/aszx87410/cong-leng-zhi-shi-dao-lou-dong-ni-bu-dong-de-web-hai-ke-dong-huli-at-webconf-taiwan-2025?slide=68)

> \[補充\] 更深入的 ReDoS 文章 - [正規表達式沒寫好會怎樣？淺談 ReDoS：利用 regexp 的攻擊](https://blog.huli.tw/2023/06/12/redos-regular-expression-denial-of-service/)

不過**不同的程式語言的配對引擎不同**，效能表現可能差很多：

**Elixir：**

```plain
defmodule TimeTest do
  def is_unsafe_string(str) do
    Regex.match?(~r/.*[<].*[>=].*/is, str)
  end

  def run_test do
    str = "<svg>" <> String.duplicate("<", 50_000)

    {time_microseconds, _result} =
      :timer.tc(fn -> is_unsafe_string(str) end)

    IO.puts("test: #{time_microseconds / 1_000_000}s")
    # 0.098338s
  end
end

TimeTest.run_test()
```

**PHP**：

```php
<?php

function isUnsafeString($str) {
    $regex = '/.*[<].*[>=].*/s';
    return preg_match($regex, $str);
}

$start = microtime(true);
isUnsafeString('<svg>' . str_repeat('<', 50000));
$end = microtime(true);

$time = $end - $start;
echo number_format($time, 3) . "s\n";
// 0.001s

?>
```

**不過這樣就沒問題了嗎？**

Elixir 實際上它沒有執行完，是設計了一個 backtracking 的上限，到達上限時就不繼續配對。

![image](https://hackmd.io/_uploads/ryenR7emWg.png)

PHP 如果正則在運算過程中碰到限制或錯誤（如 backtrack 次數上限），`preg_match()` 會回傳 **`false`**，表示「regex 執行失敗」，而不是「沒匹配」。

> [preg_match() returns 1 if the pattern matches given subject, 0 if it does not, or false on failure.](https://www.php.net/manual/en/function.preg-match.php#refsect1-function.preg-match-returnvalues)

![image](https://hackmd.io/_uploads/B1_0Amembl.png)

如果程式寫成下方這樣，**攻擊者就可以用超長輸入把 regex 打到失敗，讓檢查「自動放行」**，繞過程式的安全檢查。

```php
if (!isUnsafeString($input)) {
  // 當成安全
}
```

### 結論：使用線上 regex checker 或 AI 幫忙

## 總結

1. MySQL unicode => context 的不相等
2. JS replace 時請小心謹慎
3. Clean 不是真的 clean，join 不是真的 join
4. React is => 不要全盤相信使用者輸入
5. 小心使用 regex
