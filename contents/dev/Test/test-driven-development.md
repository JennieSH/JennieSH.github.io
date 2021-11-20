---
title: TDD - 測試驅動開發
fileName: test-driven-development
description: Test-Driven Development 介紹，是一種程式開發流程，簡單來說就是先寫測試再開發。
createdAt: 2021-11-14
updatedAt: 2021-11-14
tags:
  - Test
  - TDD
---

# TDD - 測試驅動開發

![TDD cycle](https://i.imgur.com/9HCEV2B.png)

**測試驅動開發**（Test-Driven Development），是一種程式開發流程，簡單來說就是**先寫測試再開發**。在上圖 `Red`、`Green`、`Refactor` 這三個階段做循環，直到需求都被測試條件滿足。

## TDD Lifecycle

#### `Red` : 新增一個測試案例，因還沒撰寫程式碼，當前測試結果為失敗

#### `Green` : 寫一段剛好能通過測試的程式碼

#### `Refactor` : 重構程式碼，以 clean code & pass tests 為目標

## TDD Flow

![TDD flow](https://i.imgur.com/obbaftB.png)

#### Step 1. 列出需求清單

- 列出功能需要被滿足的全部需求條件
- 一個測試對應一個需求條件，**測試只負責一個改變原因**
  > Q. 功能需求：`密碼驗證規則為英文+數字組合`
  > A. 這個將會拆成兩個測試案例，不要試圖在一個測試裡面塞全部的條件:
  >
  > 1.  密碼是否包含英文
  > 2.  密碼是否包含數字

#### Step 2. 新增測試，測試 Fail

- 依照清單，先寫一個測試
- 執行測試，**fail test** (Red)

#### Step 3. 撰寫剛好能通過測試的程式

- 只寫符合測試要求的最低限度程式碼
- 以 **pass test** (Green) 為目標，不要求優化，可使用暴力解

:::info
這個成功是 TDD 的關鍵步驟！先確保測試失敗，在這個步驟 pass 時，就可以保證這個測試是有被程式處理到的。
:::

#### Step 4. 重構程式

- 優化程式碼
- 維持 **pass test**

執行到第四（Refactor）步驟後，還有需求條件尚未滿足的話，會回到第二個步驟繼續輪迴，直到功能的需求全部都被滿足，這就是完整的 TDD 開發流程。

:::warning
在第四步驟 (`Refactor`)，不會為了要過測試，而再回頭改測試案例，如果會，代表你要再審視的測試和程式。
:::

## TDD 手把手實作

- **[範例 - Function](https://hackmd.io/7hLmf9seSreNXvjUYmREpw?view#%E7%AF%84%E4%BE%8B---Function)**
- **[範例 - Dom](https://hackmd.io/7hLmf9seSreNXvjUYmREpw?view#%E7%AF%84%E4%BE%8B---Dom)**

## TDD 優缺點

### 優點

#### 1. 帶給你信心 (私心大推 :100: )

**==開發階段==**

在開發時不會擔心受怕，會推壞掉的 code 上到 production，測試會針對程式已知的 test cases 做驗證，增加你對自己 code 的信心，可以安心的添加新的程式碼，相當多一對眼睛再幫你檢查。

**==重構階段==**

在修改程式碼的時候，最怕改 A 壞 B，尤其遇到高耦合或跨很多單元共用函式，想下手重構，怕一不小心改壞了，到時 debug 成本極高，心有餘而力不足。

要是不小心上 production 才被發現，到時就是工程師的修羅場了，debug 手都會抖，還要背負時間的壓力、身心靈的煎熬，所以這時候就會選擇抱著不重構，就不會有事的鴕鳥心態，最終這段程式成為 legacy code，在經過幾個工程師的輪替後，可能就沒人能理解這段 code 了...。

#### 2. 減少後期維護成本、Debug 時間

預防勝於治療，把有可能發生的 bug，扼殺在它們出生前，遠離 hotfix。

也因為很明確的定義每個測試案例，只要修改後跑測試，可以很清楚知道是哪一個測試案例會失敗，大大減少 Debug 的時間和範圍。

#### 3. 涵蓋大部分的需求條件

會依每個需求條件撰寫對應的測試案例，相較於產品程式，測試程式只會多不會更少，每次的 pass test 也能確保程式與預期結果是一致的。

#### 4. 可視為 spec/使用手冊 參考

有時候沒時間寫文件或維護文件的話，測試案例可以讓其他開發者很快了解該函式或組件的使用方式、傳入的參數、回傳值等資訊，而且因為測試是和函式之間基本是互相匹配，如果以後功能改需求，為了測試成功，測試一定會強迫一起被更新，永遠保持著函式最新的用法和規格。

#### 5. 訓練程式碼思考、架構能力

- 因為是針對單一需求條件為最小單位做迭代開發，更能專注在單一需求開發，不需要想中要把功能一步到位，以至於中間步驟有遺漏或做錯。

- 可以寫出比較簡潔程式，**不會寫過多內容**，因為測試案例沒有，也**不會寫過少內容**，因為至少要覆蓋到測試案例。

- 在重構的過程，會傾向易測試的方向去思考設計，再進一步推導，能寫出易測試程式，背後相對代表低耦合、減少相依性。

### 缺點

#### 1. 時間成本很高

前期：要投入時間先寫測試
後期：測試也需要維護

如果很想寫測試，時程又有限的狀況下，可以針對重點的需求條件，先寫測試，後期再慢慢補上次要的；但遇到專案時程超級趕，可能就會選擇犧牲寫測試，直接進入開發。

#### 2. 一開始需求就要明確

在開發初期，需求尚未完整 ~~(PM 未給規格)~~ 或有預期之後需求有不小的變動 ~~(需求方朝令夕改)~~，屆時功能程式要改，測試程式也要跟著改，就難感受到測試帶來的優點，開發成本也會增加，。

#### 3. 設定自動化測試

這也是額外要去做設定的，我們目前的專案有做 CICD，在 push 回 GitHub 時會自動跑測試，只有通過測試，才會被部署到網站上。

雖然這不是必要要做的，但人不可能都一直記得推 code 前要記得跑測試，如果沒有設定自動化測試，又忘記手動打指令測試，直接把壞掉的 code 推到線上，網站直接爆掉，就失去寫測試的意義了。

#### 4. 即時手動測試

如果已經很明確更動有寫測試的函式/組件，改完就要記得手動跑一下測試，再接著開發，否則等到 push 時的自動化測試，你已經在這次要推的程式碼使用到很多次該函式、組件，屆時就不是 debug 該函式/組件，連帶這次 push 內容有使用到的地方，都要跟著整個重新檢查一遍邏輯。

#### 5. 進入門檻較高

尤其當你不會寫測試，不知道測試技巧、方法，就要開始投入 TDD，挫折感跟時間成本都會再被放大，更綁手綁腳，可能寫著寫著就放棄了。

## 常見問題

### 什麼該測試？什麼不該測試？

這應該是很多初次接觸測試的人都會有的問題，讓我們先想想這個問題：

> **Do I care about this if it changes?** by Sarah Dayan

當今天函式/組件內容變了，如果你會在乎，那就寫測試，反之則否。

<br/>

### TDD 覆蓋率是 100% ?

**NO**，只能幫你把可預期的 Bug 都先預防掉，一些測試邊界條件、例外狀況、或特定情境下才會出現的 Bug，這些都比較難被測試出來。

<br/>

### TDD 值得投入嗎？

對我來說，答案是肯定的，雖然初期會花費大量時間，也可能會產生爛測試，增加後期維護的成本，但誰沒寫過糞 code 呢？每個工程師都是從 junior 慢慢長大的，沒有人一開始就是 senior。

> The more you practice the better you'll be, the harder you train the great in you they'll see
> by Alcurtis Turner

只要多練習，使用 TDD 開發速度也可以跟著提升，感覺就像在學 TypeScript，一開始不熟悉和覺得約束太多，寫起來會綁手綁腳，但習慣之後，~~真香，~~ 速度其實跟寫 JavsScript 不會差太多，但背後的利遠遠大於弊。

<br/>

### 舊程式怎麼加測試嗎？

有時候會接手到前人遺留下來的舊專案，可能會遇到**高耦合 低內聚**~~(義大利麵)~~ 的程式碼，當今天需求是加新功能，可以直接嘗試幫你新功能加測試，至少沒改動原程式碼太多，加測試還是有點信心的；但如果今天是在既有程式修 bug，可以針對 bug 寫測試就好，把握每一次處理一點點，畢竟其他部分都有線上使用者 ~~(真・QA)~~ 幫你 debug 過了。

<br/>

## 總結

寫出好的測試跟寫出好的程式一樣，都是需要大量練習的，可以從今天開始練習寫測試，朝減少技術債的道路上邁進，友善同事友善自己，

---

## 參考資料

- [TDD Flow: The Mantra in Action](https://www.slideshare.net/dionatanmoura/tdd-flow-the-mantra-in-action-san-francisco-software-craftsmanship-meetup-test-driven-developers-bay-area-meetup)
- [The Value at the Intersection of TDD, DDD, and BDD](https://medium.datadriveninvestor.com/the-value-at-the-intersection-of-tdd-ddd-and-bdd-da58ea1f3ac8)
- [What are the key principles of “Test Driven Development”?](https://marcabraham.com/2012/04/03/what-are-the-key-principles-of-test-driven-development/)
- [TDD 開發五步驟，帶你實戰 Test-Driven Development 範例](https://tw.alphacamp.co/blog/tdd-test-driven-development-example)
- [TDD 的理由](https://ithelp.ithome.com.tw/articles/10216564)
- [Test driven development with Vue.js by Sarah Dayan](https://www.youtube.com/watch?v=DD1fEhcEzY8)
- [測試驅動開發 : 3 大法則 + 5 大好處 | 程式 x 開發 | 撰寫 單元測試 速度更快 【Gamma Ray 軟體工作室】](https://www.youtube.com/watch?v=HFVjTFy42hI)
- [TDD in JavaScript | Test Driven Development](https://www.youtube.com/watch?v=89Pl2Uok8xc)

###### tags: `test`、`TDD`
