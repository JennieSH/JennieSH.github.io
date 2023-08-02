---
title: "[Note] Flutter 如何隱藏 API Key"
fileName: "flutter-env-key"
description: "介紹 Flutter 常見的 API keys 使用方法，主要有三種，可以依情境選擇需要的方式。"
createdAt: 2023-05-12
updatedAt: 2023-05-12
tags:
  - Flutter
  - env
  - key
---

###### tags: `Flutter`、`env`、`key`

# [Note] Flutter 如何隱藏 API Key

## 前言

介紹 Flutter 常見的 API keys 使用方法，主要有三種，可以依情境選擇需要的方式。

內文主要是依照 [How to Store API Keys in Flutter](https://codewithandrea.com/articles/flutter-api-keys-dart-define-env-files/) 整理出的方法，文章寫得很詳細，非常推薦閱讀 :+1:

## Hard-coding

直接把 key 值寫在 `.dart` 檔案中。

先在 `api_key.dart` 新增 API key，在需要使用的檔案中，引入 `api_key.dart`：

```dart
// api_key.dart
final apiKey = 'AIzaSyBeSYQ8cn6IIwRBbB4hPrn';
```

```dart
// Step 1. import key 所在的檔案
import 'api_key.dart';

class LocationService {
  Future<String> getPlaceId(String input) async {
     // Step 2.直接使用 key 值
    final String url =
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$input&inputtype=textquery&key=$apiKey';

    var response = await http.get(Uri.parse(url));
    var json = convert.jsonDecode(response.body);

    var placeId = json['candidates'][0]['place_id'] as String;
    return placeId;
  }

}
```

需要注意的地方就是，**千萬不要把 `api_key.dart` commit 進 git**，需要另外把 `api_key.dart` 加入 `.gitignore` 檔案中：

```.gitignore
# 在 .gitignore 中的檔案，都不會進入 git 版控紀錄
api_key.dart
```

### 優點

- 快速使用

### 缺點

- 無法根據環境去 mapping 對應的 key
- key 以明文方式儲存(plaintext)，安全性不高
- 可能會因失誤，造成 key 值外洩 e.g. 忘記加進 `.gitignore`

:::warning
:warning: **提醒：**

`api_key.dart` 如曾經被 commit 進 git，後續再把它加入到 `.gitignore`，也沒用，因為都可以在 git history 找到相關 key 資訊，唯一能做的就是銷毀原先的 key，再新增一個新的。
:::

## --dart-define / --dart-define-from-file

在編譯階段，使用 `--dart-define` 或 `--dart-define-from-file` 將 key 傳入程式中使用。

### --dart-define

在程式中使用 `String.fromEnvironment(<key-name>)` 取得 key，並改用下面指令去 run 程式，將 key 傳入進程式：

```dart
class LocationService {
  Future<String> getPlaceId(String input) async {
    // get api key
    const apiKey = String.fromEnvironment('API_KEY');
    if (apiKey.isEmpty) {
      throw AssertionError('API_KEY is not set');
    }

    // use api key
    final String url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$input&inputtype=textquery&key=$apiKey';
    ...
}
```

```bash
$flutter run --dart-define API_KEY=AIzaSyBeSYQ8cn
```

#### 優點

- source code 不會存在 Hard-coding key

#### 缺點

- 複數 keys 時，難以管理
  ```bash
  $flutter run \
    --dart-define A_API_KEY= ... \
    --dart-define B_API_KEY= ... \
    --dart-define C_API_KEY= ...
  ```
- 在編譯後，key 仍然會被嵌入到發佈版本（release binary）的二進制文件中

  > 針對發佈版本（release binary）需要對 Dart 代碼進行混淆（混淆可以讓代碼難以被理解和解讀），降低被反向破譯的風險，可以參考[官方推薦做法](https://docs.flutter.dev/deployment/obfuscate)。

<br/>

### `--dart-define-from-file`

在 `Flutter 3.7` 後，可以將 API keys 存成一個 json 檔案（需要進 `.gitignore`），再改用下面指令去 run 程式，將 json 內容傳入進程式：

```json
// api-keys.json
{
  "GOOGLE_MAP_KEY": "...",
  "A_API_KEY": "...",
  "B_API_KEY": "..."
}
```

```bash
$flutter run --dart-define-from-file=api-keys.json
```

程式中一樣使用 `String.fromEnvironment(<key-name>)` 取得 key 值：

```dart
const apiKey = String.fromEnvironment('GOOGLE_MAP_KEY');
if (apiKey.isEmpty) {
  // handle error
}

// use api key
...
```

<br/>

#### `--dart-define-from-file` 與 `launch.json` 組合技 (VSCode)

在 `.vscode/launch.json` 中的 `args`(會代入在 command line)，加入下列參數：

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Development",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      // add here
      "args": ["--dart-define-from-file", "api-keys.json"]
    }
  ]
}
```

也可以針對環境，有不一樣的 API keys，i.e. Production 環境使用 `api-keys.prod.json`：

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Development",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "args": ["--dart-define-from-file", "api-keys.json"]
    },
    {
      "name": "Launch Production",
      "request": "launch",
      "type": "dart",
      "program": "lib/main.dart",
      "args": ["--dart-define-from-file", "api-keys.prod.json"]
    }
  ]
}
```

:::spoiler 關於 launch.json(組態檔)
**`launch.json`** 是定義調試過程中所需的各種設定，如程式入口、命令列參數、環境變數等。

除了手動新增檔案，也可以透過 VSCode 自動生成一個，點選 `Run and Debug` > `create a launch.json file` > `Dart & Flutter`：

![](https://hackmd.io/_uploads/HydUmehE2.png)

新增的檔案內容與上面範例有點不同，因為這份檔案把 [flutterMode](https://docs.flutter.dev/testing/build-modes) 三個運行模式(`debug`/`profile`/`release`) 都列出來了，要加上各個環境 keys 的版本如下：

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "flutter-appworks",
      "request": "launch",
      "type": "dart",
      "args": ["--dart-define-from-file", "api-keys.json"]
    },
    {
      "name": "flutter-appworks (profile mode)",
      "request": "launch",
      "type": "dart",
      "flutterMode": "profile",
      "args": ["--dart-define-from-file", "api-keys.json"]
    },
    {
      "name": "flutter-appworks (release mode)",
      "request": "launch",
      "type": "dart",
      "flutterMode": "release",
      "args": ["--dart-define-from-file", "api-keys.prod.json"]
    }
  ]
}
```

**[補充 QA]**
Q. `version` 為什麼是 0.2.0 呢？

> 目前沒找到確切為什麼會是 0.2.0 的原因，但[官網範例](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)也都是使用 0.2.0 版本，應該是目前 default 值。
>
> 最後也有詢問 chatGPT，指出如果使用的是舊版本的 VSCode 或希望使用不同的配置文件語法，可以將 "version" 更改為 "0.1.0" 或其他版本號。
> :::

<br/>

:::info
:bulb: **補充**
如果是使用其他 IDE，例如 IntelliJ 或 Android Studio，可參考 [Run/debug configurations](https://www.jetbrains.com/help/idea/run-debug-configuration.html)。
:::

#### 優點

- 方便管理多組 keys
- 可針對不同環境(dev/prod)，設置不同 key 的 json 檔案

#### 缺點

- json 檔案需要加入 `.gitignore` 清單中 (json 中的 key 也是屬於 hardcode)

## .env 檔案定義 key

把 key 值統一管理在 `.env` 檔案中，會需要配合額外的 package，例如： [`envied`](https://pub.dev/packages/envied)

### Step 1. 安裝 [envied](https://pub.dev/packages/envied) 套件

`envied` 可以幫助我們生成一個 Dart class，包含 `.env` 檔案中的值。

```bash
$ flutter pub add envied
$ flutter pub add --dev envied_generator
$ flutter pub add --dev build_runner
```

### Step 2. 新增 `.env`

```.env
# .env
API_KEY=AIzaSyBeSYQ8cn6IIwRBbB4hPrn
```

### Step 3. 新增 `env.dart`

`env.g.dart` 後面會用指令產生，目前會報錯，可以忽略：

```dart
// lib/env.dart
import 'package:envied/envied.dart';

part 'env.g.dart';

@Envied(path: '.env')
abstract class Env {
  @EnviedField(varName: 'API_KEY')
  static const apiKey = _Env.apiKey;
}
```

以上寫法已經足夠使用了，但為了提高安全性，可以使用套件提供的混淆(Obfuscation)功能，需要在 `@EnviedField` 加上 `obfuscate: true`：

```dart
// lib/env.dart
import 'package:envied/envied.dart';

part 'env.g.dart';

@Envied(path: '.env')
abstract class Env {
  // Add here
  @EnviedField(varName: 'API_KEY', obfuscate: true)
  static final apiKey = _Env.apiKey;
}
```

:::info
:bulb: **補充：**
如果使用 `obfuscate` flag，需要將 `const` 改成 `final`，否則會報錯。
:::

### Step 4. 產生 `env.g.dart`

```bash
$flutter pub run build_runner build --delete-conflicting-outputs
```

執行完後，會產生一份 `env.g.dart`：

```dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'env.dart';

// **************************************************************************
// EnviedGenerator
// **************************************************************************

class _Env {
  static const List<int> _enviedkeyapiKey = [
    2433719592,
    1273530568,
    ....
  ];
  static const List<int> _envieddataapiKey = [
    2433719657,
    1273530497,
    ....
  ];
  static final apiKey = String.fromCharCodes(
    List.generate(_envieddataapiKey.length, (i) => i, growable: false)
        .map((i) => _envieddataapiKey[i] ^ _enviedkeyapiKey[i])
        .toList(growable: false),
  );
}
```

:::info
:bulb: **補充：**

如果不在 `@EnviedField` 加上 `obfuscate: true`，產出來的 `env.g.dart` 內容如下：

```dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'env.dart';

// **************************************************************************
// EnviedGenerator
// **************************************************************************

class _Env {
  static const apiKey = 'AIzaSyBeSYQ8cn6IIwRBbB4hPrn';
}
```

這樣 `apiKey` 會以明碼方式存在於 dart 檔案中。

:::

### Step 5. 將 `*.env*` 與 `env.g.dart` 加入 `.gitignore`

這兩份檔案基本都有 key 的資訊，都需要加入 `.gitignore` 內：

```gitignore
# .gitignore
env.g.dart
*.env*
```

### Step 6. 程式內使用 API keys

引入 `env.dart` 檔案，使用 `Env.<key-name>` 取得 key 的值：

```dart
// 引入 env.dart
import 'package:flutter_appworks/env.dart';

class LocationService {
  // use api key
  final key = Env.apiKey;

  Future<String> getPlaceId(String input) async {
    final String url =
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$input&inputtype=textquery&key=$key';

    var response = await http.get(Uri.parse(url));
    var json = convert.jsonDecode(response.body);

    var placeId = json['candidates'][0]['place_id'] as String;
    return placeId;
  }
```

:::info
:bulb: **補充：**

[**`envied`**](https://pub.dev/packages/envied#usage) v.s. [**`flutter_dotenv`**](https://pub.dev/packages/flutter_dotenv)

這兩個套件都可以用來處理 flutter 環境變數的需求，差別是使用 `env` 檔案的方式：

- **`envied`**
  code generation + 程式碼混淆功能，可以讓 API keys 更加安全
- **`flutter_dotenv`**
  將 `env` 加入 assets 資料夾中，在 runtime 時候讀取，因此有機會可以從 APK 獲取 API keys

如果 `env` 沒放什麼重要的 key，那麼兩個套件都可以使用，反之，就直接選擇 `envied` 了。
:::

### 優點

- 安全度高 (code obfuscation)
- API keys 集中管理
- 可支持多個環境設定
  > 尚未親測過，但根據該 [issue](https://github.com/petercinibulk/envied/issues/16) 討論，作者回應是可以做得到的。

### 缺點

- 步驟比較繁複：增加環境變數時，class 要手動新增項目和重新產 `env.g.dart`

  > 因為筆者是寫前端，所以是跟 web 做比較，web 也是用 `.env` 管理環境變數，新增變數時，只要重新 run 專案，不需要再手動做什麼了。

## 總結

如果需要接第三方的 API，都會遇到如何在 client 去管理這些 API Key 的問題，基本只需要謹記這兩點，再依自己需求去做選擇即可：

- 重要的 key 檔案，加入 `.gitignore`，不進版控
- release version 需要做程式碼混淆(code obfuscation)

另外有些套件是需要分別在 Android 和 iOS 的 `AndroidManifest.xml`、`AppDelegate.swift` 寫入 key 值，例如： [Google Maps](https://codelabs.developers.google.com/codelabs/google-maps-in-flutter#3)，這時候可以考慮選擇 `--dart-define`，支持只定義一次 key，就讓雙平台可以從設定檔中讀取到 key，可以參考這篇文章的做法 - [How to setup dart-define for keys and secrets on Android and iOS in Flutter apps](https://medium.com/flutter-community/how-to-setup-dart-define-for-keys-and-secrets-on-android-and-ios-in-flutter-apps-4f28a10c4b6c)。

## 參考資料

1. [How to Store API Keys in Flutter: --dart-define vs .env files](https://codewithandrea.com/articles/flutter-api-keys-dart-define-env-files/)
2. [Obfuscating Dart code](https://docs.flutter.dev/deployment/obfuscate)
3. [dotenv doc](https://www.dotenv.org/docs/security/env)
