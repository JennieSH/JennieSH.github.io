---
title: "Mac 環境、工具建置"
fileName: "mac-setup"
description: "記錄剛拿到新電腦時，如何一步步調教成自己的熟悉開發環境！"
createdAt: 2022-11-21
updatedAt: 2024-05-03
tags:
  - MacOS
  - Homebrew
  - nvm
  - VScode
---

###### tags: `MacOS`、`Homebrew`、`nvm`、`VScode`

# Mac 環境、工具建置

因為最近剛換 MacBook Pro 14，趁這次機會，把自己順手的環境設定和工具整理一下，以後換電腦或工作，就能快速的把新電腦調教成熟悉的開發環境了:beer:

這系列懶人包會拆成好幾章，主要都是筆記步驟，如果更了解工具，基本都會附上相關連結，方便有興趣的人進一步去研究。

## Homebrew

用來管理 MacOS 上的軟體安裝，強推安裝 :+1:

### Step 1. 安裝 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2. 設定 config

![hombrew](https://i.imgur.com/1P1P7Cp.png)

雖然跑出 Installaltion successfull 訊息，但整個流程尚未結束，需要跟著下方提示三個步驟依序輸入(記得改成自己電腦的 username)：

```bash
echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/{YOUR USER NAME}/.zprofile
```

```bash
echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/{YOUR USER NAME}/.zprofile
```

```bash
eval $(/opt/homebrew/bin/brew shellenv)
```

可輸入指令，確認有無安裝成功，成功的話會出面版本訊息：

```bash
brew --version
#Homebrew 3.6.11
#Homebrew/homebrew-core (git revision c5924a8dadc; last commit 2022-11-20)
#Homebrew/homebrew-cask (git revision 94fa14b0a3; last commit 2022-11-20)
```

:::info
:bulb: **補充**

如果忘記輸入 `Next steps` 那三個步驟的話，後續使用 homebrew 指令時，會遇到 [**`zsh: command not found: brew`**](https://stackoverflow.com/questions/36657321/after-installing-homebrew-i-get-zsh-command-not-found-brew) 問題，遇到時，再補執行步驟即可。

執行完畢後，在 terminal 輸入 `brew help` 或 `brew --version`，確認有沒有執行成功，只要不會再出現 `zsh: command not found: brew`，就大功告成了。
:::

## Google Chrome

Google 家的瀏覽器，基本筆者開發常駐使用就是 chrome ＆ safari，也可選擇自己喜歡的瀏覽器安裝

```bash
brew install --cask google-chrome
```

## Git

版本控制軟體，必裝清單之一

```bash
brew install git
```

## iTerms2 + oh-my-zsh

- **iTerms2** 比 MAC 原生的 Terminal 提供[更多功能](https://apple.stackexchange.com/questions/25143/what-is-the-difference-between-iterm2-and-terminal)，可取代原生的終端機使用
- **oh-my-zsh** 為 zsh 的 framework，可用來管理 zsh 設定

主要會安裝這兩個組合的最大原因，是為了美美的 command line 環境！！每次輸入指令時候，心情就會非常美麗～～~~我的快樂就是這麼樸實無華~~

p.s. 因為步驟比較多，設定會另外開一篇文章記錄

## VS code

微軟家的免費 IDE，另外常見 IDE 還有 `WebStorm`、`Sublime` 等，一樣選擇自己喜歡的安裝即可～

```
brew install --cask visual-studio-code
```

## nvm - Node Version Manager

可以使用 nvm 進行 node.js 版本管理，強推安裝 :+1:，可以優雅地在不同版本的 node.js 間切換 (因為有些舊專案，用新版的 node.js 執行會有問題，所以有時需要視專案，切換到舊版本)

### Step 1. 安裝 nvm

```
brew install nvm
```

### Step 2. 設定 nvm

安裝完成後，依照提示依序完成初始步驟：

![nvm](https://i.imgur.com/pSj0Uo5.png)

1. **新建 `.nvm` 目錄**

```bash
$mkdir ~/.nvm
```

2. **設定 `/.zshrc ` 配置文件**

```bash
$vim ~/.zshrc
```

先輸入 `i` 進入編輯，再貼上下面這段，輸入 `:wq`，存檔後離開

```
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

3. **使用 `source` 重新執行初始化的配置**

```bash
$source ~/.zshrc
```

### 管理 node.js 版本

```bash
nvm ls-remote  # 列出可安裝的版本
nvm ls  # 列出本機已安裝的版本
nvm install <version> # 安裝特定版本
nvm use <version> # 切換特定版本
node -v # 查看目前使用的版本
```

## Yarn

套件管理工具， 常見的有 `npm`、`pnpm` 等，可擇一安裝使用

```bash
$brew install yarn
```

## 參考資料

1. [Homebrew](https://brew.sh)
2. [Google Chrome](https://www.google.com/intl/zh-TW/chrome/)
3. [Git](https://git-scm.com/)
4. [VS code](https://code.visualstudio.com/)
5. [nvm - Node Version Manager](https://github.com/nvm-sh/nvm)
6. [Yarn](https://classic.yarnpkg.com/en/)
7. [iTerms2](https://iterm2.com/)
8. [oh-my-zsh](https://ohmyz.sh/)
9. [Homebrew 與 Homebrew-Cask —— 更快速、簡潔、優雅地管理你的 Mac 軟體套件](https://onejar99.com/mac-homebrew-homebrew-cask-mac/#_Homebrew_Homebrew-Cask)
10. [macOS 上使用 brew 安裝 NVM 管理 node.js](https://qizhanming.com/blog/2020/07/29/how-to-install-node-using-nvm-on-macos-with-brew)
11. [[NodeJS] 透過 NVM 安裝與使用 Node.js](https://pjchender.dev/nodejs/nvm/)
