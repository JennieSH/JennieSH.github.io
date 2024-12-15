---
title: "[Note] Email Template 要注意什麼"
fileName: "email-template"
description: "那些在 Email Template 的 css 地雷們！"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - CSS
  - HTML
  - email template
---

###### tags: `CSS`、`HTML`、`Email`

# [Note] Email Template

## Basic Template

<!-- > TODO: 待補圖 -->

```xml
<!DOCTYPE html>
<html lang="zh-Hant-TW" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">

    <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
    <![endif]-->
</head>

<body style="background-color:white; height: 100vh; width: 100% ; margin: 0; padding:0;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <!-- email content -->
    </table>
</body>
</html>
```

### `<html lang="..." xmlns:v="..." xmlns:o="...">`

確保 Email 在 Microsoft Office 中顯示正確

- v 命名空間用於支持舊版的 Microsoft Office 中的向量圖形（Vector Markup Language）
- o 命名空間則用於定義 Office 特定的元素和屬性

### `<meta name="x-apple-disable-message-reformatting">`

防止 Apple Mail 客戶端重新格式化電子郵件的內容

> 相關 issue 討論：[Apple Mail in iOS 10 beta doesn't always auto-scale non responsive emails](https://github.com/hteumeuleu/email-bugs/issues/18)

### `<!--[if mso]> ... <![endif]-->`

僅在 Outlook 可見，用來設定特定的 css style 或隱藏特定內容或元素，可以支援下特定版本。

```xml
<!--[if mso]>
Only Microsoft Word-based versions of Outlook will see this.
<![endif]-->

<!--[if mso 12]>
Only Outlook 2007 will see this.
<![endif]-->
```

### `<body>`

- reset padding ＆ margin to 0
- 設定背景色
- 建議設置 `min-height`
  > 未設定下，目前有遇到 Outlook APP 在 v3.30.0 顯示正常，但在 v4.2320.0 信件內容下半部直接被截掉
- 建議設置 `max-height`
  > 部分 Email Clients 會撐滿 viewport 高度，即便 `<td>` 設定 `height`，實際高度會比預期的 `height` 高，如果可接受，可忽略此項
- 建議設置 `font-family`
  > 各家 Email Clients 會有自己預設的 font，如果要維持統一的字體設定，需添加

:::info
:information_source: 目前已測試過範圍：

|                  | Gmail              | Outlook            | Yahoo              | Apple Mail         | [Temp Email](https://temp-mail.org/en/) |
| ---------------- | ------------------ | ------------------ | ------------------ | ------------------ | --------------------------------------- |
| PC Web (MacOS)   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | -                  | :heavy_check_mark:                      |
| PC APP (MacOS)   | -                  | :heavy_check_mark: | -                  | :heavy_check_mark: | -                                       |
| Mobile APP (iOS) | :heavy_check_mark: | :heavy_check_mark: | :grey_question:    | :heavy_check_mark: | -                                       |

:::

## Client-Rendering Engines

Email Clients 使用不同的 Engines 渲染 HTML Email

- **WebKit**：Apple Mail、Outlook(MAC)、Android Mail、iOS Mail
- **Internet Explorer**：Outlook 2000、2002、2003
- **Microsoft Word**：Outlook 2007、2010、2013
- **Browser’s respective engine**：Safari(WebKit)、 Chrome(Blink) 等

## Font

- 在 `<td>` 覆寫全部 `font-family`、`font-size`、 `color`

  > 如果發現在 body 設置的 `font-family` 等屬性，還是被 system fonts 設定覆寫了，再使用這招

- 不是所有 client 都有支援 Google Font，如要顯示統一字體類型，就需要設定對應的 Fallback Font。

```css=
/* 無襯線字(sans-serif) */
font-family: Arial, Helvetica, sans-serif;
```

![Font](https://hackmd.io/_uploads/S1Pmd8oOh.png)

## Images

- 部分 clients 圖片是預設不顯示，需要額外手動點擊顯示 (i.e. Outlook Desktop APP)
- 有 HTML attributes 的，優先使用

```xml
/* 這段在 Yahoo，直接被自動轉成 style="min-width: 100px"，寬度直接跑版 */
<img style="width: 100px" src="..." alt="icon"/>

/* 優先使用 HTML attributes */
<img width="100" src="..." alt="icon"/>
```

## CSS Tips

### 1. inline style

`<style>` 部分的 email clients 是不支援，支援 media queries 又更少，inline style 是比較安全的寫法

### 2. `<Table>` 切版

- flex、grid 排版基本不支援
- `<div>` 在部分 client (i.e. Outlook) 會有點問題
- 初始化 `border="0" cellpadding="0" cellspacing="0"`
- table cell 要有對應寬高，padding 盡量設在 `<td>`

### 3. 避免簡寫

部分 Email Client 對簡寫支援度不佳，建議盡量完整撰寫出來，當然如果想支援的 Email Client 簡寫都可以正常顯示，那就寫簡寫就好。

```css
/* 簡寫 */
<td style="padding: 8px 12px;">
<td style="color: #000;">
<td style="background: #fff;">

/* 完整的表達式 */
<td style="padding-top: 8px; padding-right: 12px; padding-bottom: 8px; padding-left: 12px;">
<td style="color: #000000;">
<td style="background-color: #fff;">
```

### 4. HTML attributes > CSS

HTML attributes 有提供的屬性，請優先使用

### 5. CSS Units

使用的安全優先度 px > em > rem，但還是有機率遇到 px 也會不如預期的

- `rem` 語法最新、支援度最差，在 Yahoo 直接會被移除掉
  ![Yahoo rem](https://hackmd.io/_uploads/rJm7tRjOn.png)

- `em` & `%` 部分 Email Client 也會失效

```xml
<td align="center" style="padding-left: 2em; padding-right: 2em;" height="10%">
    <a style="display:block; border-radius: 24px; width: 256px; height: 3em; ..." ...>
        重設密碼
    </a>
</td>
```

![em](https://hackmd.io/_uploads/BJrB9Cjd3.png)

### 6. Spacing

如果遇到在 `<td>` 設定 height、padding 無作用的話，可在 `<td>` 中間補上 `&nbsp;` 試試。

```xml=
<tr>
    <td align="center" style="height: 16px">&nbsp;</td>
</tr>
```

:::spoiler More
在這篇 stack overflow - [CSS padding is not working as expected in Outlook](https://stackoverflow.com/questions/21474239/css-padding-is-not-working-as-expected-in-outlook) 有不錯的範例：

```xml
<!-- With paddings (WON'T WORK IN ALL EMAIL CLIENTS!) -->
<table>
    <tr>
        <td style="padding: 10px 10px 10px 10px">
            <!-- Content goes here -->
        </td>
    </tr>
</table>


<!-- Same result with borders (assuming a white background-color) -->
<table>
    <tr>
        <td style="border: solid 10px #ffffff">
           <!-- Content goes here -->
        </td>
    </tr>
</table>


<!-- Same result using empty td/tr (A lot more html than using borders, messy on large emails) -->
<table>
    <tr>
        <td colspan="3" height="10" style="height: 10px; line-height: 1px">&nbsp;</td>
    </tr>

    <tr>
        <td width="10" style="width: 10px; line-height: 1px">&nbsp;</td>
        <td><!--Content goes here--></td>
        <td width="10" style="width: 10px; line-height: 1px">&nbsp;</td>
    </tr>

    <tr>
        <td colspan="3" height="10" style="height: 10px; line-height: 1px">&nbsp;</td>
    </tr>
</table>

<!--
With tr/td every property is needed:
- "height" must be setted both as attribute and style, same with width.
- "line-height" must be setted because the default value may be greater than the wanted height.
- The "&nbsp;" is there because some email clients won't render empty columns.
- You can remove the "colspan" and still will work, but is cleaner, especially when inspecting the element in the browser's console.
-->
```

:::

### 7. [Can I Email](https://www.caniemail.com/search/)

潮潮的 CSS3 在 email 是場悲劇，這網站可以查詢 email clients 的語法支援度，雖然還是有遇過，看到網站寫有支援，但實際不行的案例，但大部分還是可以有效參考的。

### 8. 瘋狂 Testing Email

每寫完一版，切記需要即時寄信到各式信箱（Web/APP 都要測），確定有沒有跑版，因為有時某語法或寫法，剛好 A/B 信箱沒問題，C 會破版，改了另一個寫法，換 A/B 可以，B 破版 :rage:。

如果需要支援非常多種信箱，尤其還要包含到非主流信箱，只能送上祝福了:ghost:，因為會有更多語法上的限制和更長的測試時間。

## Conclusion

條件允許的話，可以選定支援幾個[主流的 Email clients](https://www.litmus.com/email-client-market-share) 就好，這樣語法就不用太多限制，限制越多，回頭看或維護會很痛苦。

尤其對前端工程師來說，平常寫得很順的語法都無法使用，回頭看自己切出來的 Email Template，會覺得像是一坨 :poop:，需要心理上的克服。

## Resources

- [Good Email Code](https://www.goodemailcode.com/email-code/template.html)
- [An Introduction To Building And Sending HTML Email For Web Developers](https://www.smashingmagazine.com/2017/01/introduction-building-sending-html-email-for-web-developers/)
- [Responsive HTML Email Template](https://github.com/leemunroe/responsive-html-email-template)
- [Responsive Email](https://templates.mailchimp.com/development/responsive-email/)
- [從頭開始構建一個 HTML Email 模板](https://webdesign.tutsplus.com/zh-hant/articles/build-an-html-email-template-from-scratch--webdesign-12770)
