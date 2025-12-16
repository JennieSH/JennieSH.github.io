---
title: "[Note] 常見的 Web Attack"
fileName: "web-attack"
description: "常見網頁攻擊分享"
createdAt: 2025-06-17
updatedAt: 2025-06-17
tags:
  - Network
---

###### tags: `Network`

# [Note] 常見的 Web Attack

## XSS (Cross-Site Scripting)

> XSS 全稱為 Cross-Site Scripting，中譯為跨網站指令碼攻擊。

在 HTML 的標籤，撰寫一些惡意 JavaScript 的程式代碼，稱為 XSS 攻擊，使用者相信你的網頁是安全的，以為安全進入網站後反而被導向到釣魚網站、甚至被竊取帳號密碼、個人資料。

至於如何竊取資料？只要插入代碼讓它以 AJAX 方式傳送到攻擊者的伺服器即可。

<br/>

## XSS 攻擊的種類

- Stored XSS (儲存型)
- Reflected XSS (反射型)
- DOM-Based XSS (基於 DOM 的類型)

<br/>

### 1. Stored XSS (儲存型)

**會被保存在伺服器資料庫中的 JavaScript 代碼引起的攻擊即為 Stored XSS**，最常見的就是論壇文章、留言板等等，因為使用者可以輸入任意內容，若沒有確實檢查，那使用者輸入如 \<script> 等關鍵字就會被當成正常的 HTML 執行，標籤的內容也會被正常的作為 JavaScript 代碼執行。

<br/>

### 2. Reflected XSS (反射型)

Reflected 是指不會被儲存在資料庫中，而是**由網頁後端直接嵌入由前端使用者所傳送過來的內容造成的**，最常見的就是以 GET 方法傳送資料給伺服器時，伺服器未檢查就將內容回應到網頁上所產生的漏洞。

<br/>

```php=
<?php if (isset($_GET["name"])): ?>

	<h3>Hi, <?=$_GET["name"] ?></h3>

<?php else: ?>

	<h3>What is your name?</h3>
	<form method="GET">
		<input type="text" name="name" />
		<button type="submit">Say Hi</button>
	</form>

<?php endif; ?>

```

功能非常簡單，提供一個 input 讓使用者輸入名字，確定之後，網頁會出現 Hi, XXX 的訊息

![](https://i.imgur.com/cbVuuRG.jpg)

仔細注意網址會發現 GET 參數就是網址上的「 ? 」後面那串，假如我修改成「 ?name=\<script>alert(123)\</script>」：

![](https://i.imgur.com/RaCcvMg.jpg)

<br/>

這就是**因為網頁後端沒有過濾掉惡意字元，直接回傳的內容理所當然會變成正常的代碼執行**。

而此手法需透過特定網址點入，因此攻擊者通常會以釣魚手法、社交工程等方式誘騙受害者點入連結，但因為代碼都在網址上，只要細心一點就不容易受害。

<br/>

### 3. DOM-Based XSS

了解此種 XSS 類型時，務必事先了解 DOM 是什麼，DOM 全稱為 Document Object Model，用以描述 HTML 文件的表示法，它讓我們可以使用 JavaScript 動態產生完整的網頁，而不必透過伺服器。

因此 DOM-Based XSS 就是**指網頁上的 JavaScript 在執行過程中，沒有詳細檢查資料使得操作 DOM 的過程代入了惡意指令**。

```htmlmixed=
<script>
	let create_text = function(){
		let name = document.getElementById("name").value;
		document.getElementById("show_name").innerHTML = name;
	}
</script>

<h3>Hi, <span id="show_name"></span></h3>
<input id="name" type="text" />
<button onclick="create_text()">Say Hi</button>
```

正常輸入執行後，input 的內容會被代入到 \<span id="show_name"> 之中，而網頁本身並不會跳轉。

![](https://i.imgur.com/zhdF7Q6.jpg)

假如未妥善檢查內容就代入的話，輸入任意的內容都會被建立成有效的 DOM 物件，包含嵌入的代碼也會被執行，此處試著輸入「 \<img src=# onerror="alert(123)"> 」。

![](https://i.imgur.com/pa7sORG.jpg)

但這樣除非攻擊者親自到受害者電腦前輸入，否則不可能讓受害者輸入這種惡意代碼。因此通常需要搭配前兩個手法。讓內容保存在伺服器資料庫中、或是以反射型的方式製造出內容，再藉由 JavaScript 動態產生有效的 DOM 物件來運行惡意代碼。

<br/>

## 如何防範 XSS 攻擊？

### 1. Stored、Reflected 防範

前兩種 **Stored、Reflected 的類型都必須由後端進行防範**，除了必要的 HTML 代碼，任何允許使用者輸入的內容都需要檢查，刪除所有「\<script>」、「 onerror=」及其他任何可能執行代碼的字串。

若內容只是純字串呈現，基本上只要將以下左欄所有的字元替換成右欄文字就可以杜絕了。

![](https://i.imgur.com/o3tCYfB.jpg)

當瀏覽器解析時遇到右欄的文字內容，會認為是左欄的字元，但絕對不會當成代碼的部份，而是純粹的文字，所以顯示上還是會像左邊的字元。

### 2. DOM-Based 防範

**DOM-Based 則必須由前端來防範**，但基本上還是跟前面的原則相同。

- 避免使用 **innerHTML**

  > 選擇正確的方法、屬性來操作 DOM，譬如前面的示範中會產生漏洞的主要原因是「 document.getElementById('show_name').innerHTML = name; 」中的「 innerHTML 」屬性，此屬性代表插入的內容是合法的 HTML 字串，所以字串會解析成 DOM 物件。

- 使用 **innerText**
  > 使用「 innerText 」，使用此屬性插入字串時，會被保證作為純粹的文字，也就不可能被插入惡意代碼執行了

---

## CSRF (Cross Site Request Forgery)

> CSRF 全稱為 Cross Site Request Forgery，中譯為跨站域請求偽造，又稱作 one-click attack。
>
> CSRF 攻擊可以在受害者毫不知情的情況下以受害者名義偽造請求發送給受攻擊站點，從而在並未授權的情況下執行在權限保護之下的操作。

---

### 偷懶的刪除功能例子

```javascript=
<a href='https://small-min.blog.com/delete?id=3'>開始測驗</a>
```

點擊之後瀏覽器就會發送一個 GET 請求給https://small-min.blog.com/delete?id=3，並且因為瀏覽器的運行機制，一併把 small-min.blog.com 的 cookie 都一起帶上去。

Server 端收到之後檢查了一下 session，發現是小明，而且這篇文章也真的是小明發的，於是就把這篇文章給刪除了。

這就是 CSRF，你現在明明在心理測驗網站，假設是 https://test.com 好了，但是卻在不知情的狀況下刪除了 https://small-min.blog.com 的文章。

你可能會說：「可是這樣小明不就知道了嗎，不就連過去部落格了？不符合『不知情的狀況』啊！」

```javascript=
<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />
<a href='/test'>開始測驗</a>
```

在開啟頁面的同時，一樣發送一個刪除的 request 出去，但這次小明是真的完全不知道這件事情。這樣就符合了吧！

**CSRF 就是在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」**。要達成這件事也很簡單，**因為瀏覽器的機制，你只要發送 request 給某個網域，就會把關聯的 cookie 一起帶上去**。如果使用者是登入狀態，那這個 request 就理所當然包含了他的資訊（例如說 session id），這 request 看起來就像是使用者本人發出的。

### 把刪除改成 POST 不就好了嗎？

把刪除的功能做成 POST，這樣不就無法透過 \<a> 或是 \<img> 來攻擊了嗎？除非有哪個 HTML 元素可以發送 POST request！

有，正好有一個，就叫做 form。

```htmlmixed=
<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="submit" value="開始測驗"/>
</form>
```

小明點下去以後，照樣中招，一樣刪除了文章。你可能又會疑惑說，但是這樣小明不就知道了嗎？我跟你一樣很疑惑，於是我 Google 到了這篇：[Example of silently submitting a POST FORM (CSRF)](https://stackoverflow.com/questions/17940811/example-of-silently-submitting-a-post-form-csrf)

這篇提供的範例如下，網頁的世界真是博大精深：

```htmlmixed=
<iframe style="display:none" name="csrf-frame"></iframe>
<form method='POST' action='https://small-min.blog.com/delete' target="csrf-frame" id="csrf-form">
  <input type='hidden' name='id' value='3'>
  <input type='submit' value='submit'>
</form>
<script>document.getElementById("csrf-form").submit()</script>
```

開一個看不見的 iframe，讓 form submit 之後的結果出現在 iframe 裡面，而且這個 form 還可以自動 submit，完全不需要經過小明的任何操作。

到了這步，你就知道改成 POST 是沒用的。

### 那我後端改成只接收 json 呢？

聰明的你靈機一動：「既然在前端只有 form 可以送出 POST 的話，那我的 api 改成用 json 收資料不就可以了嗎？這樣總不能用 form 了吧！」

spring 的 document 告訴你：這還是沒用的！

```htmlmixed=
<form action="https://small-min.blog.com/delete" method="post" enctype="text/plain">
<input name='{"id":3, "ignore_me":"' value='test"}' type='hidden'>
<input type="submit"
  value="delete!"/>
</form>
```

這樣子會產生如下的 request body：

```json=
{
"id": 3,
"ignore_me": "=test"
}
```

但這邊值得注意的一點是，form 能夠帶的 content type 只有三種：

1. application/x-www-form-urlencoded
2. multipart/form-data
3. text/plain

在上面的攻擊中我們用的是最後一種，text/plain，如果你在你的後端 Server 有檢查這個 content type 的話，是可以避免掉上面這個攻擊的。

只是，上面這幾個攻擊我們都還沒講到一種情況：如果你的 api 接受 cross origin 的 request 呢？

意思就是，如果你的 api 的 Access-Control-Allow-Origin 設成 \* 的話，代表任何 domain 都可以發送 ajax 到你的 api server，這樣無論你是改成 json，或甚至把 method 改成 PUT, DELETE 都沒有用。

我們舉的例子是刪除文章，這你可能覺得沒什麼，那如果是銀行轉帳呢？攻擊者只要在自己的網頁上寫下轉帳給自己帳號的 code，再把這個網頁散佈出去就好，就可以收到一大堆錢。

## 如何防範 CSRF 攻擊?

### 使用者的防禦

CSRF 攻擊之所以能成立，是因為使用者在被攻擊的網頁是處於已經登入的狀態，所以才能做出一些行為。雖然說這些攻擊應該由網頁那邊負責處理，但如果你真的很怕，怕網頁會處理不好的話，你可以在**每次使用完網站就登出**，就可以避免掉 CSRF。

或者呢，**關閉執行 js 或把上面這些 pattern 的程式碼過濾掉不要執行**，也是一個方法（但應該很難判定哪些是 CSRF 攻擊的程式碼）。

所以使用者能做的其實有限，真的該做事的是 Server 那邊！

### Server 的防禦

CSRF 之所以可怕是因為 CS 兩個字：Cross Site，你可以在任何一個網址底下發動攻擊。CSRF 的防禦就可以從這個方向思考，簡單來說就是：「我要怎麼擋掉從別的 domain 來的 request」

你仔細想想，CSRF 的 reuqest 跟使用者本人發出的 request 有什麼區別？區別在於 domain 的不同，前者是從任意一個 domain 發出的，後者是從同一個 domain 發出的（這邊假設你的 api 跟你的前端網站在同一個 domain）

#### 1. 檢查 Referer

request 的 header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可。

但這個方法要注意的地方有三個:

1. 是有些瀏覽器可能不會帶 referer，
2. 第二個是有些使用者可能會關閉自動帶 referer 的這個功能，這時候你的 server 就會 reject 掉由真的使用者發出的 request。
3. 是你判定是不是合法 domain 的程式碼必須要保證沒有 bug，例如：

```javascript=
const referer = request.headers.referer;
if (referer.indexOf('small-min.blog.com') > -1) {
  // pass
}
```

你看出上面這段的問題了嗎？如果攻擊者的網頁是 small-min.blog.com.attack.com 的話，你的檢查就破功了。

所以，檢查 referer 並不是一個很完善的解法

#### 2. 加上圖形驗證碼、簡訊驗證碼

就跟網路銀行轉帳的時候一樣，都會要你收簡訊驗證碼，多了這一道檢查就可以確保不會被 CSRF 攻擊。

圖形驗證碼也是，攻擊者並不知道圖形驗證碼的答案是什麼，所以就不可能攻擊了。

這是一個很完善的解決方法，但如果使用者每次刪除 blog 都要打一次圖形驗證碼，他們應該會煩死吧！

#### 3. 加上 CSRF token

要防止 CSRF 攻擊，我們其實只要確保有些資訊「只有使用者知道」即可。那該怎麼做呢？

我們在 **form 裡面加上一個 hidden 的欄位，叫做 csrftoken，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中**。

```htmlmixed=
<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
  <input type="submit" value="刪除文章"/>
</form>
```

按下 submit 之後，server 比對表單中的 csrftoken 與自己 session 裡面存的是不是一樣的，是的話就代表這的確是由使用者本人發出的 request。**這個 csrftoken 由 server 產生，並且每一段不同的 session 就應該要更換一次**。

那這個為什麼可以防禦呢？因為攻擊者並不知道 csrftoken 的值是什麼，也猜不出來，所以自然就無法進行攻擊了。

可是有另外一種狀況，假設你的 server 支持 cross origin 的 request，會發生什麼事呢？攻擊者就可以在他的頁面發起一個 request，順利拿到這個 csrf token 並且進行攻擊。不過前提是你的 server 接受這個 domain 的 request。

接著讓我們來看看另外一種解法

#### 4. Double Submit Cookie

上一種解法需要 server 的 state，亦即 csrf token 必須被保存在 server 當中，才能驗證正確性。而現在**這個解法的好處就是完全不需要 server 儲存東西**。

這個解法的前半段與剛剛的相似，由 server 產生一組隨機的 token 並且加在 form 上面。但不同的點在於，除了不用把這個值寫在 session 以外，同時也**讓 client side 設定一個名叫 csrftoken 的 cookie，值也是同一組 token**。

```htmlmixed=
Set-Cookie: csrftoken=fj1iro2jro12ijoi1

<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
  <input type="submit" value="刪除文章"/>
</form>
```

你可以仔細思考一下 CSRF 攻擊的 request 與使用者本人發出的 request 有什麼不一樣？不一樣的點就在於，前者來自不同的 domain，後者來自相同的 domain。所以我們只要有辦法**區分出這個 request 是不是從同樣的 domain 來**，我們就勝利了。

而 Double Submit Cookie 這個解法正是從這個想法出發。

當使用者按下 submit 的時候，**server 比對 cookie 內的 csrftoken 與 form 裡面的 csrftoken，檢查是否有值並且相等，就知道是不是使用者發的了**。

為什麼呢？假設現在攻擊者想要攻擊，他可以隨便在 form 裡面寫一個 csrf token，這當然沒問題，可是**因為瀏覽器的限制，他並不能在他的 domain 設定 small-min.blog.com 的 cookie 啊！所以他發上來的 request 的 cookie 裡面就沒有 csrftoken，就會被擋下來**。

當然，這個方法看似好用，但也是有**缺點**的，可以參考：[Double Submit Cookies vulnerabilities](https://security.stackexchange.com/questions/59470/double-submit-cookies-vulnerabilities)，**攻擊者如果掌握了你底下任何一個 subdomain，就可以幫你來寫 cookie，並且順利攻擊了**。

#### 5. client side 的 Double Submit Cookie

會特別提到 client side，是因為我之前所碰到的專案是 Single Page Application，上網搜尋一下就會發現有人在問：「SPA 該如何拿到 CSRF token？」，難道要 server 再提供一個 api 嗎？這樣好像有點怪怪的。

但是呢，我認為我們可以利用 Double Submit Cookie 的精神來解決這個問題。而解決這問題的關鍵就在於：**由 client side 來生 csrf token。就不用跟 server api 有任何的互動。**

其他的流程都跟之前一樣，生成之後放到 form 裡面以及寫到 cookie。或者說如果你是 SPA 的話，也可以把這資訊直接放到 request header，你就不用在每一個表單都做這件事情，只要統一加一個地方就好。

事實上，我自己常用的 library axios 就有提供這樣的功能，你可以設置 header 名稱跟 cookie 名稱，設定好以後你每一個 request，它都會自動幫你把 header 填上 cookie 裡面的值。

```javascript=
 // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
xsrfCookieName: 'XSRF-TOKEN', // default

// `xsrfHeaderName` is the name of the http header that carries the xsrf token value
xsrfHeaderName: 'X-XSRF-TOKEN', // default
```

那為什麼由 client 來生這個 token 也可以呢？因為**這個 token 本身的目的其實不包含任何資訊，只是為了「不讓攻擊者」猜出而已，所以由 client 還是由 server 來生成都是一樣的，只要確保不被猜出來即可**。

> Double Submit Cookie 靠的核心概念是：「**攻擊者的沒辦法讀寫目標網站的 cookie，所以 request 的 csrf token 會跟 cookie 內的不一樣**」

### browser 本身的防禦

我們剛剛提到了使用者自己可以做的事、網頁前後端可以做的事情，那瀏覽器呢？之所以能成立 CSRF，是因為瀏覽器的機制所導致的，有沒有可能從瀏覽器方面下手，來解決這個問題呢？

有！而且已經有了。而且啟用的方法非常非常簡單。

Google 在 Chrome 51 版的時候正式加入了這個功能：==SameSite cookie==，對詳細運行原理有興趣的可參考：draft-west-first-party-cookies-07。

先引一下 Google 的說明：

> Same-site cookies (ne "First-Party-Only" (ne "First-Party")) allow servers to mitigate the risk of CSRF and information leakage attacks by asserting that a particular cookie should only be sent with requests initiated from the same registrable domain.

啟用這個功能有多簡單？超級無敵簡單。

你原本設置 Cookie 的 header 長這樣：

```javascript=
Set-Cookie: session_id=ewfewjf23o1;
```

你只要在後面多加一個 ==SameSite== 就好

```javascript=
Set-Cookie: session_id=ewfewjf23o1; SameSite
```

但其實 SameSite 有兩種模式，Lax 跟 Strict，默認是後者，你也可以自己指定模式：

```javascript=
Set-Cookie: session_id=ewfewjf23o1; SameSite=Strict
Set-Cookie: foo=bar; SameSite=Lax
```

- **Strict 模式**
  當你加上 SameSite 這個關鍵字之後，就代表說「**這個 cookie 只允許 same site 使用，不應該在任何的 cross site request 被加上去**」<br/>
  意思就是你加上去之後，我們上面所講的\<a href="">, \<form>, new XMLHttpRequest，只要是瀏覽器驗證不是在同一個 site 底下發出的 request，全部都不會帶上這個 cookie。<br/>
  **缺點**:
  連\<a href="..."都不會帶上 cookie 的話，當我從 Google 搜尋結果或者是朋友貼給我的連結點進某個網站的時候，因為不會帶 cookie 的關係，所以那個網站就會變成是登出狀態。這樣子的使用者體驗非常不好。<br/>
  **解法**:
  第一種是跟 Amazon 一樣，準備兩組不同的 cookie，第一組是讓你維持登入狀態，第二組則是做一些敏感操作的時候會需要用到的（例如說購買、設定帳戶等等）。第一組不設定 SameSite，所以無論你從哪邊來，都會是登入狀態。但攻擊者就算有第一組 cookie 也不能幹嘛，因為不能做任何操作。第二組因為設定了 SameSite 的緣故，所以完全避免掉 CSRF。<br/>
  第二種，就是調整為 SameSite 的另一種模式：Lax。

- **Lax 模式**
  Lax 模式放寬了一些限制，例如說\<a>, \<link rel="prerender">, \<form method="GET"> 這些都還是會帶上 cookie。但是 POST 方法 的 form，或是只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie。
  所以一方面你可以保有彈性，讓使用者從其他網站連進你的網站時還能夠維持登入狀態，一方面也可以防止掉 CSRF 攻擊。<br/>
  **缺點**:
  但 Lax 模式之下就沒辦法擋掉 GET 形式的 CSRF，這點要特別注意一下。

講到這種比較新的東西，相信大家一定都很想知道瀏覽器的支援度如何，caniuse 告訴我們說：目前只有 Chrome 支援這個新的特性（畢竟是 Google 自己推的方案，自己當然要支持一下）。

## 參考資料

1.[給網頁開發新人的 XSS 攻擊 介紹與防範](https://forum.gamer.com.tw/Co.php?bsn=60292&sn=11267) 2.[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/) 3.[SQL 資料隱碼攻擊 SQL injection](https://ithelp.ithome.com.tw/articles/10189201)
