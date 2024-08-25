---
title: "[Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗"
fileName: "image-network-cors"
description: "Flutter 開發之踩坑日記：在 web 開發模式下，使用 Image.network() 圖片會載入失敗。"
createdAt: 2024-04-14
updatedAt: 2024-04-14
tags:
  - Flutter
  - Image
  - Network
  - CORS
---

###### tags: `Flutter`、`Bug`

# [Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗

## 問題

![](https://i.imgur.com/qpnv0hu.jpg)

使用 `Image.network()`，會跑出下面的錯誤訊息，而且只在 web 下才會出現，在 iOS/Android 圖片都會順利顯示。

> ══╡ EXCEPTION CAUGHT BY IMAGE RESOURCE SERVICE ╞════════════════════════════════════════════════════
> The following ImageCodecException was thrown resolving an image codec:
> Failed to load network image.
> Image URL: https:...
> Trying to load an image from another domain? Find answers at:
> https://flutter.dev/docs/development/platform-integration/web-images
> When the exception was thrown, this was the stack
> Image provider: NetworkImage("https://...", scale:1)
> Image key: NetworkImage("https://...", scale: 1)

## 原因

<!--
~~在 [Github issue](https://github.com/flutter/flutter/issues/73327#issuecomment-764646411) 有看到相關討論，目前推測是 CanvasKit 問題，因為 `Web renderers` 預設值為 `auto`。~~

 -->

主要原因應該是 [CORS 問題](https://github.com/flutter/flutter/issues/73109#issuecomment-790628014)，它可能會受到所使用的 web renderer 影響，解決方向主要有三個：

1. 第一個直接解決根本的 CORS 問題，需要請後端協助修改 headers 相關設定
2. 使用代理服務器： 設置一個代理服務器來轉發 client 請求
3. 第二個方向就是修改 web renderer 設定，下面解法基本是圍繞的第二個方向去解的。
   > The HTML renderer can load cross-origin images without extra configuration. so you could use these commands to run and build the app

<br/>

當 `--web-renderer=auto`(預設值)，會根據使用者的裝置，自動選擇最適合的 renderer，在 desktop browser 下，預設使用的就是 CanvasKit，需要指定成 `html`，才能解決。

:::info
:bulb: **Flutter 在 [Web 平台上的渲染引擎設定](https://docs.flutter.dev/development/platform-integration/web/renderers#command-line-options)，有三種可選擇：**

- **`html`**：使用瀏覽器原生的 HTML、CSS、JavaScript 來渲染應用程式，**支援最廣泛但效能較差**。
- **`canvaskit`**：使用 Skia Graphics Engine 將 Flutter 畫面轉換成 Canvas 元素，相較於 html 有較好的效能，但相容性較差。
- **`auto`**：根據瀏覽器的支援度自動選擇渲染引擎，預設為 canvaskit，但若瀏覽器支援度足夠高則會自動切換為 html。
  :::

## 解決方法

### 方法一：修改 Flutter 設定檔（一勞永逸）

找到 web 資料夾底下的 `index.html` 檔案，在 initializeEngine 設定中加入`renderer:'html'`，之後不論是用 VS code debugging 或者終端機下 `flutter run --debug -d chrome`，都可以順利看到圖片了。

```html=
// index.html

<!DOCTYPE html>
<html>
<head> ... </head>
<body>
  <script>
    window.addEventListener('load', function(ev) {
      _flutter.loader.loadEntrypoint({
        serviceWorker: {
          serviceWorkerVersion: serviceWorkerVersion,
        },
        onEntrypointLoaded: function(engineInitializer) {
          engineInitializer.initializeEngine({
            renderer:'html' // 這邊指定 renderer
          }).then(function(appRunner) {
            appRunner.runApp();
          });
        }
      });
    });
  </script>
</body>
</html>
```

![](https://i.imgur.com/6UOb2Ot.png)

![](https://i.imgur.com/JSSHPih.jpg)

<br/>

### 方法二：passing flag (適合慣用 Terminal debugging 的人)

將指令後面多加 `--web-renderer html`，缺點是每次都要打這段

```bash
$flutter run -d chrome --web-renderer html
```

<br/>

### 方法三：修改 VS code 設定檔 (適合慣用 VS code debugging 的人)

因為是針對 VS code 設定，所以缺點也很明顯，將來如果不是透過 VS code run debugging (e.g. 透過 Terminal)，圖片依舊會跑不出來；優點則是只要設定一次即可，而且可以依據需求，選擇要 by 專案或者是 by User 去做設置。

<br/>

下面兩種作法擇一即可，效果一樣：

- #### `直接新增設定檔`

在專案底下，新增 `.vscode` 資料夾和 `settings.json` 檔案，檔案內容為：

```json=
{
  "dart.flutterWebRenderer": "html"
}
```

![](https://i.imgur.com/H4kkBzv.png)

- #### `透過 GUI`

從左下齒輪，找到 `Settings`，然後搜尋 `flutter renderer`，將原本 `Dart: Flutter Web Renderer` 由預設的 `auto` 改為 `html`。

![](https://i.imgur.com/Qv0wTYY.png)

## 參考資料

- [Image.network() doesn't show some images on the web but works on android.](https://github.com/flutter/flutter/issues/73109)
- [[web]: NetworkImage crash while loading images](https://github.com/flutter/flutter/issues/73327)
- [Add a setting to easily set Flutter's web renderer in user/workspace settings](https://github.com/Dart-Code/Dart-Code/pull/3000#issue-535900813)
- [Capture from onError ImageCodecException](https://github.com/LunaGao/flag_flutter/issues/49#issuecomment-803008314)
- [Web renderers](https://docs.flutter.dev/development/platform-integration/web/renderers)
- [Flutter web can't load network image from another domain](https://stackoverflow.com/questions/65653801/flutter-web-cant-load-network-image-from-another-domain)
