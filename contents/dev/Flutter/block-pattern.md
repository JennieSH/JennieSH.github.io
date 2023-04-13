---
title: "[Note] BLoC Pattern"
fileName: "block-pattern"
description: "Flutter 用於處理 State Management 的設計模式之一，將業務邏輯與 View 邏輯拆開，更易於開發與維護。"
createdAt: 2023-04-14
updatedAt: 2023-04-14
tags:
  - Flutter
  - Bloc Pattern
  - Bloc
  - Stream
---

###### tags: `Flutter`、`Bloc Pattern`、`Bloc`、`Stream`

# [Note] BLoC Pattern

## 前言

BLoC（Business Logic Component）Pattern 是一種用於 Flutter 開發的設計模式，它將應用程序分成三個主要部分：界面、資料層和業務邏輯，並利用 Streams 管理資料流，以實現組件之間的解耦和資料共享。

用原生 widgets 就可以實作，也有基於 BLoC Pattern 而開發的套件 - [**flutter_bloc**](https://pub.dev/packages/flutter_bloc)，將方法封裝更容易維護和開發。

首先要先了解 Stream 概念，因為 BLoC Pattern 核心是 Streams。

## Stream

Flutter 用來管理非同步的處理事件序列的概念，可想像 Stream 是一條河流或是通道，`Sender` 經由 Stream 傳遞任何東西給 `Receiver`，`Receiver` 不會知道 `Sender` 送的東西什麼時候會到和送什麼東西，只有能被動等東西到達。

- **`Shipped Data`**：可以是任何形式 data/event
- **`Sender`**：傳送資料(傳遞的源頭)
- **`Receiver`**：接收資料(傳遞的終點)，無法預期何時接收到資料
- **非同步行為**，因為傳遞會需要消耗時間
- 有順序性，**先進先出**

![](https://i.imgur.com/fSoh33V.png)

用 Stream 專有名詞表示：

- 這條河流 :arrow_right: **`StreamController`**
- `Sender` :arrow_right: **`Sink`**
  - `StreamController` 的入口
  - 使用 `add` 方法，將要傳送東西傳送出去
- `Receiver` :arrow_right: **`Stream`**，
  - `StreamController` 的出口
  - 使用 `listen` 方法，監聽是否接收到東西

![](https://i.imgur.com/pOoN5Q8.png)

## BLoC Pattern 優點

1. **解耦**：界面、業務邏輯和資料層分開，使它們可以獨立開發、測試和維護
2. **可測試性**：業務邏輯分離到單獨的組件中，可以方便地進行 Unit Test
3. **code 共用性**：將業務邏輯分離到單獨的組件中，可以在多個 View 中重用
4. **易維護**：有良好的結構和清晰的職責分工，易於維護和擴展功能

## BLoC pattern 實作

> 範例原始碼：[Repo 網址](https://github.com/JennieSH/flutter-appworks/tree/feature/bloc-pattern)

### 目標

![](https://i.imgur.com/KxNUqct.png)

- 實作簡單的 Counter
- 支援 `加一`、`減一`、`Reset`，這三個功能
- 由兩個 `StreamController` 組成 (`State StreamController` & `Event StreamController`)。

首先專注做 `State StreamController` 和`加一` 功能。

![](https://i.imgur.com/6fWkPYS.png)

![](https://i.imgur.com/XUCjA0Y.png)

### Step1. 新增 Bloc 檔案，建立 State StreamController

- 定義 `StreamController`，因為預期 in/out 皆為數字， Type 為 `int`
- `_XXXStreamController.sink` 可取得 Input proterty
- `_XXXStreamController.stream` 可取得 Output proterty

```dart=
// counter_bloc.dart
class CounterBloc {
  // pipe
  final _stateStreamController = StreamController<int>();

  // input
  StreamSink<int> get counterSink => _stateStreamController.sink;
  // output
  Stream<int> get counterStream => _stateStreamController.stream;
}
```

### Step2. 按鈕點擊時，利用 `counterSink` 的 `add` 方法，傳遞 `_counter` 值

```dark
counterBloc.counterSink.add(_counter);
```

> 此時點擊 "+"，數字不會增加，即使 onPressed 會觸發 \_counter++，讓 `_counter` 值增加，但因為沒有使用如 `setState` 等方法，去強迫 rebuild wiget，所以 Text 的內容永遠都會初次 mounted 的值，即為 0。

```dart=
// main.dart
class Counter extends StatefulWidget { ... }

class _CounterState extends State<Counter> {
  int _counter = 0;

  // 1. 宣告 counterBloc
  final counterBloc = CounterBloc();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ...,
      body: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('$_counter'),
          const SizedBox(
            height: 16,
          ),
          IconButton(
            onPressed: () {
              _counter++;
              // 2. add state
              counterBloc.counterSink.add(_counter);
            },
            icon: const Icon(Icons.add_circle),
            iconSize: 36,
          )
        ]),
      ),
    );
  }
}
```

### Step3. 使用 `StreamBuilder`，監聽 `_counter` 值

`StreamBuilder` 中的參數:

- `stream`：傳入(欲 listen) target stream，只要監聽的資料改變，會 rebuild widget
- `builder`：回傳 widget

> 當在點擊 "+" 按鈕時，顯示的數字已經會如預期往上加了

```dart=
// main.dart
class Counter extends StatefulWidget { ... }

class _CounterState extends State<Counter> {
  int _counter = 0;

  final counterBloc = CounterBloc();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ...,
      body: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          // 1. wrap with StreamBuilder
          StreamBuilder(
            // 2. use builder and return widget
            stream:
                counterBloc.counterStream,
            builder: (context, snapshot) => Text(
              '$_counter',
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(
            height: 16,
          ),
          IconButton(
            onPressed: () {
              _counter++;
              counterBloc.counterSink.add(_counter);
            },
            icon: const Icon(Icons.add_circle),
            iconSize: 36,
          )
        ]),
      ),
    );
  }
}
```

<br/>
<br/>

接下來是建立 `Event StreamController`，並實作 `減一`、`Reset` 倆功能。

大致流程如下：

1. 點擊 Button 會傳送 **`CounterAction`** _(@ widget)_
2. **`eventStream`** 監聽 **`CounterAction`** _(@ CounterBloc)_
3. **`counterSink`** 傳遞 **`counter`** 值 _(@ CounterBloc)_
4. widget 使用 **`snapshot.data`**，取得 **`counter`** 值 _(@ widget)_

在`Event StreamController` stream 接收到的資料會直接由 `State StreamController` sink 傳入，這段是在 `CounterBloc` 內實作，外面使用的 widget 都不需要知道實作細節。

![](https://i.imgur.com/6DuL2fC.png)

![](https://i.imgur.com/KxNUqct.png)

### Step4. `CounterBloc` 內建立 Event StreamController

- 新增 action 的 enum
  > action 和 event 這邊概念是共通的，也可取名叫 CounterAction
- 宣告 counter 變數
- **`eventStream`** 使用 listen 方法，監聽 **`CounterAction`**
- **`counterSink`** 使用 add 方法，傳遞運算過後 **`counter`** 值

```dart=
// counter_bloc.dart

// 定義出 counter actions
enum CounterAction { INCREMENT, DECREMENT, RESET }

class CounterBloc {
  late int counter;

  final _stateStreamController = StreamController<int>();
  StreamSink<int> get counterSink => _stateStreamController.sink;
  Stream<int> get counterStream => _stateStreamController.stream;

  final _eventStreamController = StreamController<CounterAction>();
  StreamSink<CounterAction> get eventSink => _eventStreamController.sink;
  Stream<CounterAction> get eventStream => _eventStreamController.stream;

  CounterBloc() {
    counter = 0;

    // listen change in the stream (CounterAction)
    eventStream.listen((event) {
      if (event == CounterAction.INCREMENT) {
        counter++;
      } else if (event == CounterAction.DECREMENT) {
        counter--;
      } else if (event == CounterAction.RESET) {
        counter = 0;
      }

      // 傳遞運算過後的 counter 值
      counterSink.add(counter);
    });
  }
}

```

### Step5. 按鈕點擊時，利用 `eventSink` 的 `add` 方法，傳遞 `CounterAction`

- 移除 widget 內的 `_counter`，新增 **`initialData`**
  > `initialData`：初始值，不設定的話，一開始會為 null
- 從 **`StreamBuilder`** 的 **`snapshot.data`** 取得 **`counter`** 值
- onPress 觸發的函式，改成由 **`eventSink`** 傳遞 **`CounterAction`**

```dart=
// main.dart
class Counter extends StatefulWidget {...}

class _CounterState extends State<Counter> {
  final counterBloc = CounterBloc();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      ...,
      body: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          StreamBuilder(
            stream: counterBloc.counterStream,
            // 不給 init data，一開始會拿到 null
            initialData: 0,
            // get value via snapshot.data
            builder: (context, snapshot) => Text(
              '${snapshot.data}',
              style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(
            height: 16,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                onPressed: () {
                  // INCREMENT 事件
                  counterBloc.eventSink.add(CounterAction.INCREMENT);
                },
                icon: const Icon(Icons.add_circle),
                iconSize: 36,
              ),
              IconButton(
                onPressed: () {
                  // DECREMENT 事件
                  counterBloc.eventSink.add(CounterAction.DECREMENT);
                },
                icon: const Icon(Icons.remove_circle),
                iconSize: 36,
              ),
              IconButton(
                onPressed: () {
                 // RESET 事件
                  counterBloc.eventSink.add(CounterAction.RESET);
                },
                icon: const Icon(Icons.loop_outlined),
                iconSize: 36,
              ),
            ],
          )
         ]
        ),
      ),
    );
  }
}

```

## 參考資料

- [BLoC Pattern with Flutter](https://www.youtube.com/watch?v=K6ETAfGZl4k)
- [Introduction to "BLoC - from Zero To HERO" Series](https://www.youtube.com/watch?v=w6XWjpBK4W8&list=PLptHs0ZDJKt_T-oNj_6Q98v-tBnVf-S_o&index=1)
- [Flutter | 状态管理探索篇——BLoC(三)](https://juejin.cn/post/6844903689082109960)
