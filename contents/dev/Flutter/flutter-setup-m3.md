---
title: "Flutter 安裝 feat. Apple M3 Pro"
fileName: "flutter-setup-m3"
description: "第三次安裝 flutter 開發環境，設定速度越駕輕就熟，但步驟還是很繁瑣，趁這次機會記錄下來！"
createdAt: 2024-05-23
updatedAt: 2024-05-23
tags:
  - Flutter
  - install
  - MacOS
---

###### tags: `Flutter`、`install`、`MacOS`

# Flutter 安裝 feat. Apple M3 Pro

## Flutter SDK

### 硬體需求

請先確認安裝的硬體需求，設備太低階，開發會想哭...(過來人心聲)

![image](https://hackmd.io/_uploads/H19mHfK7R.png)

### Step1. 下載 SDK

到 [Flutter SDK archive](https://docs.flutter.dev/release/archive?tab=macos#stable-channel-macos) 根據電腦晶片選擇對應的版本，以筆者電腦為例，MacOS M3 Pro，選擇最新的 Stable channel (macOS) 中的 arm64 版本下載。

### Step2. 解壓縮 SDK 至新創建的 `development` 資料夾

```bash
$mkdir -p ~/development/
```

```bash
# 檔名的版本需改成當前下載的為主，此以 flutter_macos_arm64_3.22.0-stable 為例
# unzip ~/Downloads/<your_flutter_version>.zip \
#     -d ~/development/

$unzip ~/Downloads/flutter_macos_arm64_3.22.0-stable.zip \
     -d ~/development/
```

### Step3. 設定 zsh 的 Flutter Path

```bash
$vi ~/.zshenv
```

輸入 `i` 進入 insert 模式，在檔案中貼上下面這段：

```bash
export PATH=$HOME/development/flutter/bin:$PATH
```

再按 `esc`，輸入 `wq` 存檔離開後，重開啟 Terminal。

:::info
:bulb: **補充**

- 如果上一步不是設定 `development` 資料夾，$HOME 後面記得改成自定義的資料夾名稱
- 如果使用其他 Shell，請參考 [UNIX / Linux set your PATH Variable Using set or export Command](https://www.cyberciti.biz/faq/unix-linux-adding-path/)
  :::

### Step4. 檢查是否安裝成功

```bash
$flutter doctor
```

失敗的話就是 `zsh: command not found: flutter`，需要再檢查一下上面步驟是否有正確：

![install 400](https://hackmd.io/_uploads/SySJW7Y70.png)

成功的話，會有 log flutter 相關資訊：
_（Welcome 只有初次會被 log 出來，沒看到也不用緊張，正常後面都會跟著 Doctor summary....，確定有的話，安裝就是沒問題）_

![install 200](https://hackmd.io/_uploads/HJvXxXt7C.png)

:::info
:bulb: **補充**
Flutter 的醫生，下面兩個指令都可以，輸入完可以看到目前還缺哪些安裝設定，如果是要開發 APP 雙平台，需要對應安裝 **Android toolchain** (for Android) 和 **Xcode** (for iOS and macOS)，否則無法開啟手機模擬器。

如果是用 Flutter 開發 Web，可以選擇不安裝上面兩個。

```bash
$flutter doctor
```

或

```bash
$flutter doctor -v
```

![image](https://hackmd.io/_uploads/rJl6M7Km0.png)

:::

### Step5. 安裝 Rosetta

Flutter 部分組件並不支援直接跑在 [Apple silicon](https://support.apple.com/en-us/HT211814) 上，需要另外安裝 rosetta 2 解決：

```bash
$sudo softwareupdate --install-rosetta --agree-to-license
```

### Step6. 新增一個 Flutter 專案

```bash
$flutter create first_project
```

```bash
$cd first_project
```

```bash
$flutter run
```

可以選擇 `[2]: Chrome (chrome)` 後，可以開啟以下畫面，想開發 Web 的話或想先練習 Dart、基礎 Flutter 語法練習或切版，安裝設定到這步，就可以直接進開發了～

![Flutter Web](https://hackmd.io/_uploads/BJ5OOQYmR.png)

## VSCode Extension

在 Extension 搜尋 Flutter，選擇第一個安裝：

![image](https://hackmd.io/_uploads/By4hEDcmR.png)

## Android 開發環境

### Step1. 安裝 Android Studio

下載和安裝[最新的 Android Studio 版本](https://developer.android.com/studio?hl=zh-tw)，如果沒特別需求，安裝時都選擇 Next 按鈕和標準安裝即可。

### Step2. 設定 SDK Manager

點選 `More Actions` 後，選擇 `SDK Manager`，檢查 Flutter 要求的 [components](https://docs.flutter.dev/get-started/install/macos/mobile-android?tab=first-start#configure-android-development)（版本會更新，依照當下官網為主） 是否都有被安裝：

- Android SDK Platform, API 34.0.5
- Android SDK Command-line Tools
- Android SDK Build-Tools
- Android SDK Platform-Tools
- Android Emulator

如果沒有記得打勾，按 Apply 後會自動安裝。

![image](https://hackmd.io/_uploads/ryhF0Bc7A.png)

![image](https://hackmd.io/_uploads/Hkm9J8qQC.png)

![image](https://hackmd.io/_uploads/rk0hkLq70.png)

可以在輸入 `flutter doctor -v` 檢查，可以看到 `Android Studio` 那區塊已經都是綠色點點了～

![image](https://hackmd.io/_uploads/HytdL857A.png)

### Step3. 設定 Android Emulator

點選 `More Actions` 後，選擇 `Virtual Device Manager` 後，可以看到畫面，預設已經有一個 Device 了，如果想新增裝置可以按左上角 `+` 的按鈕。

![image](https://hackmd.io/_uploads/HkTEW89m0.png)

![image](https://hackmd.io/_uploads/BJgNTWL9QR.png)

:::spoiler 新增 Android Device 流程

**步驟一： 選擇新增裝置**

![image](https://hackmd.io/_uploads/rJthf85mA.png)

**步驟二： 選擇想要的 API Level** (反灰的話，點一下後，就會跑下載，此處是欲選擇 34)
![image](https://hackmd.io/_uploads/rkSQmLcmR.png)

**步驟三： 設定裝置 config**（視需求有無客製化調整）

![image](https://hackmd.io/_uploads/Sy9er8qmC.png)

最後就可以看到剛剛新增的裝置了！
![image](https://hackmd.io/_uploads/SyadBUc7A.png)
:::

<br>

點選右邊 ▶，就可以開啟 Emulator ～

![image](https://hackmd.io/_uploads/ByXxF897R.png =300x)

### Step4. 同意 SDK package licenses

執行 `flutter doctor -v` 或 `flutter run` 都會看到下面的警告：

```
Some Android licenses not accepted. To resolve this, run: flutter doctor --android-licenses
```

![image](https://hackmd.io/_uploads/ryEBs8qQA.png)

![image](https://hackmd.io/_uploads/BJIYjUq70.png)

只要輸入這行指令，並同意全部的 SDK package licenses 即可：

```bash
$flutter doctor --android-licenses
```

再使用 flutter doctor 檢查，Android 相關的都是綠色點點了！

```bash
$flutter doctor -v
```

![image](https://hackmd.io/_uploads/SJvnnUqmA.png)

## iOS 開發環境

### Step1. 安裝 Xcode

到 App Store 下載 Xcode，並開啟跑安裝流程。

![image](https://hackmd.io/_uploads/Sk8pRUqX0.png)

### Step2. 設定 Xcode

初始化設定 command-line tools 使用 Xcode 安裝的版本

```bash
$sudo sh -c 'xcode-select -s /Applications/Xcode.app/Contents/Developer && xcodebuild -runFirstLaunch'
```

並同意 Xcode license

```bash
$sudo xcodebuild -license
```

### Step3. 安裝 CocoaPods

```bash
$brew install cocoapods
```
