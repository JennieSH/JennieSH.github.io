---
title: "[Note] Flutter 新增字體"
fileName: "flutter-font"
description: "示範如何在 Flutter 新增字體"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Flutter
  - font
---

###### tags: `Flutter`、`font`

# [Note] Flutter 新增字體

## 下載字體

到 [Google Fonts](https://fonts.google.com) 選擇喜歡的字體，然後下載到電腦裡，e.g. 以下載 `Nanum Pen Script` 做示範：

![](https://i.imgur.com/Y0cbVTR.png)

![](https://i.imgur.com/AuF1I5W.png)

<br/>
<br/>

解壓縮後，資料夾中會有字體的檔案(`.ttf` / `.otf`)。

![](https://i.imgur.com/xx7LsLP.png)

## 新增 fonts 資料夾

專案底下新增 fonts 資料夾，並將剛剛字體檔案移過來

![](https://i.imgur.com/aD5POCp.png)

## 修改 `pubspec.yaml`

在 `pubspec.yaml` 找到 fonts 相關註解，把註解打開，將相關設定改成剛剛下載的字體：

```yaml=
fonts:
  - family: NanumPenScript # 字體名稱
    fonts:
      - asset: fonts/NanumPenScript-Regular.ttf # 字體檔案路徑
```

![](https://i.imgur.com/2bPwspd.png)

## 使用字體

使用 `fontFamily` 屬性，指定需要字體名稱 `fontFamily: 'NanumPenScript'`（字體名與 `pubspec.yaml` 設定的 `family` 相同）。

可以依據需求，套用在全域或者獨立的文字 Widget 上：

### 全域字體

```dart=
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        fontFamily: 'NotoSansTC', // 全域 fontFamily
      ),
      ...
    );
  }
}

```

### 獨立 Widget

```dart=
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(
        children: const [
          Text( // 預設字體
            'Hello',
            style: TextStyle(fontSize: 40.0),
          ),
          Text( // NanumPenScript 字體
            "Hello",
            style: TextStyle(fontSize: 40.0, fontFamily: 'NanumPenScript'),
          )
        ],
      )),
    );
  }
}

```

![](https://i.imgur.com/MPzLuqE.png)

:::info
:bulb: **更多字體設定：**

如果本身字體，有 **`weight`** / **`style`** 等設置，可以照著原本 `pubspec.yaml` 提供的範例來修改。

以下是以 **思源體 (NotoSansTC)** 來當例子：
除了 Regular，有另外下載 Light 和 Bold 兩個，檔案一樣放入 fonts folder，`pubspec.yaml` 依照現有狀況分別添加 `weight` 設定。

![](https://i.imgur.com/NFSJFPU.png)

```yaml=
  fonts:
    - family: NanumPenScript
      fonts:
        - asset: fonts/NanumPenScript-Regular.ttf

    - family: NotoSansTC
      fonts:
        - asset: fonts/NotoSansTC-Regular.otf
        - asset: fonts/NotoSansTC-Light.otf
          weight: 300
        - asset: fonts/NotoSansTC-Bold.otf
          weight: 700
```

實際使用時，字體一樣是用 `fontFamily`，指定想要的字體，粗細的話，可以用 `fontWeight` 去指定想要的 `weight`。

```dart=
class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Column(
        children: const [
          Text(
            '哈囉 - 預設',
            style: TextStyle(fontSize: 40.0),
          ),
          Text(
            "哈囉 - 思源",
            style: TextStyle(fontSize: 40.0, fontFamily: 'NotoSansTC'),
          ),
          Text(
            "哈囉 - 思源 bold",
            style: TextStyle(
                fontSize: 40.0,
                fontFamily: 'NotoSansTC',
                fontWeight: FontWeight.bold, // 粗體
            ),
          )
        ],
       ),
      ),
    );
  }
}
```

![](https://i.imgur.com/0lh0qeP.png)

思源字體是有載入成功的，可以觀察 `哈` 左邊口字，預設與思源不一樣的。
:::
