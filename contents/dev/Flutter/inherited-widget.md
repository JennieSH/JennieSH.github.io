---
title: "[Note] Inherited Widget"
fileName: "inherited-widget"
description: "Inherited Widget 是 Flutter 用於處理資料共享的方法之一。"
createdAt: 2024-12-15
updatedAt: 2024-12-15
tags:
  - Flutter
  - Inherited Widget
---

###### tags: `Flutter`、`InheritedWidget`

# [Note] Inherited Widget

## 基本概念

`Inherited Widget` 是一個可以向下傳遞資料的 Widget，在特定父 widget 通過 `Inherited Widget` 共享了一份資料，就可以在其任意子 widget 中來獲取該共享的資料。

下面會用簡單的範例來實作 `Inherited Widget`。

## 需求

- 點擊 `change color` 按鈕(`OutlinedButton`)會改變底下兩個 `GO PageX` 按鈕(`ElevatedButton`)的背景色
  ![](https://i.imgur.com/Yd8rTsF.png)

- Widget Tree(同顏色為同一層)，右半部灰底，有另外抽成一個 widget(`RedirectButtons`)
  ![](https://i.imgur.com/lwFE6Ow.png)

## 實作

> 範例原始碼：[Repo 網址](https://github.com/JennieSH/flutter-appworks/tree/feature/inherited-widget)

### Step1. 創建一個 Inherited Widget 的 Class

新增 `TextColor` 檔案：

- `TextColor` 繼承 `InheritedWidget`
- 定義 `Color? color` 屬性，需要在子 widget 共享的資料
- 定義 `of` 方法，可以在子 widget 中取得共享的資料
- 當 color 改變時候，`updateShouldNotify` 會通知子 widget tree 中，有依賴到 color 的 widget 重新 build

```dart=
// text_color.dart

// extend InheritedWidget
class TextColor extends InheritedWidget {
  TextColor({
    super.key,
    required super.child,
    required this.color,
  });

  // shared data
  Color? color;

  // return text color to widget
  static Color of(BuildContext context) {
    final Color? textColor =
        context.dependOnInheritedWidgetOfExactType<TextColor>()!.color;

    return textColor!;
  }

// this will notify all child widgets when there is a changes
  @override
  bool updateShouldNotify(TextColor oldWidget) {
    return color != oldWidget.color;
  }
}

```

### Step2. 使用 `InheritedWidgets` 實例，包覆父 Widget

- 使用 `TextColor` 包覆 Homepage 的 body
- 傳入參數
  - `color`：要共享的資料
  - `child`：會使用到共享資料的子 widget tree

```dart=
// page_home.dart

class _HomePageState extends State<HomePage> {
  int _index = 0;
  List<Color> _colorList = [Colors.green, Colors.red, Colors.blue];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("InheritedWidget"),
      ),
      // create InheritedWidgets
      // when color in TextColor change, all child Widget changed
      // now let's create a button for multiple color changing
      body: TextColor(
        color: _colorList[_index % 3],
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            OutlinedButton.icon(
              onPressed: () {
                // press button to change color in list
                setState(() {
                  _index++;
                });
              },
              icon: const Icon(Icons.loop),
              label: const Text('change color'),
            ),
            const RedirectButtons(),
          ],
        ),
      ),
    );
  }
}
```

### Step2. 子 Widget 取得共享資料

- 透過 `of` 方法（`TextColor.of(context)`） 取得共享資料

```dart=
// redirect_buttons.dart

class _RedirectButtonsState extends State<RedirectButtons> {
  @override
  Widget build(BuildContext context) {
    // receive data from TextColor
    final _color = TextColor.of(context);

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        ElevatedButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => PageA(color: _color),
                ),
              );
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all(_color),
            ),
            child: const Text('Go Page A')),
        ...
      ],
    );
  }
}
```

## 解決了什麼問題？

主要**解決跨 widget 共享資料問題**，以上面例子來看，一般做法會在 page 層定義變數 color，當最底下的 `ElevatedButton` 也需要使用到 color，color 會被當作 prop 一路往目標子 widget 傳遞：

![](https://i.imgur.com/ELK9pD5.png)

經過改寫過後，`RedirectButtons` 內部可以透過 `Inherited Widget` 直接拿到 page 層的 color 資料：

![](https://i.imgur.com/68GXFEM.png)

看似只節省一層傳遞（`RedirectButtons` 不需要再接收父層的 color），但如果現實 page 層和 `RedirectButtons` 中間隔了很多 widgets，且這些 widgets 也用不到變數 color，這功能就變得非常方便，因為大大**解決 prop 傳遞過深問題**。

![](https://i.imgur.com/B9fGCml.png)

## 注意事項

1. `Inherited Widget` 只有在資料發生變化時才會進行更新，如果需要強制更新，可以使用 setState 或者其他方法來實現
2. 需要共享不同的資料，可以定義不同的 `Inherited Widget`，從而達到不同的共享資料的目的 (e.g. dialog 顯示狀態、toast 顯示狀態)

## 參考資料

- [InheritedWidget class](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html)
- [Flutter InheritedWidget](https://www.youtube.com/watch?v=tIAhnXXNB3w)
- [數據共享（InheritedWidget）](https://book.flutterchina.club/chapter7/inherited_widget.html#_7-2-1-inheritedwidget)
