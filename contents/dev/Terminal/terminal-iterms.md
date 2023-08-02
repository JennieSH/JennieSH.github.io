---
title: "客製化 Terminal - iTerms2 + oh-my-zsh"
fileName: "terminal-iterms"
description: "分享剛拿到新電腦，如何利用 iTerms2 和 oh-my-zsh，打造自己喜歡的 command line 環境"
createdAt: 2022-11-21
updatedAt: 2022-11-21
tags:
  - MacOS
  - iTerms2
  - oh-my-zsh
  - VScode
  - Powerlevel10k
---

###### tags: `MacOS`、`iTerms2`、`oh-my-zsh`、`VScode`、`terminal`、`Powerlevel10k`

# 客製化 Terminal - iTerms2 + oh-my-zsh

- **iTerms2** 比 MAC 原生的 Terminal 提供[更多功能](https://apple.stackexchange.com/questions/25143/what-is-the-difference-between-iterm2-and-terminal)，可取代原生的終端機使用
- **oh-my-zsh** 為 zsh 的 framework，可用來管理 zsh 設定

主要會安裝這兩個組合的最大原因，是為了美美的 command line 環境！！每次輸入指令時候，心情就會非常美麗～～~~我的快樂就是這麼樸實無華~~

## 安裝 iTerms2

```bash
$brew install --cask iterm2
```

## 安裝 oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

![oh-my-zsh](https://i.imgur.com/nCLQtrw.png)

## 安裝 zsh theme Powerlevel10k

### 1. 安裝 powerlevel10k

```bash
$git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

### 2. 修改 zsh 主題 (zsh theme)

```bash
$vim ~/.zshrc
```

- **ZSH 主題**： `ZSH_THEME="robbyrussell"` -> `powerlevel10k/powerlevel10k`
- **command line 左邊想顯示的內容**： `POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir)`

找到 `ZSH_THEME="robbyrussell"` 這行，先輸入 `i` 進入 insert 模式，將 `robbyrussell` 改為 `powerlevel10k/powerlevel10k`，按 `esc` 結束編輯，輸入 `wq`，存擋離開。

```text
...

## 修改 theme 的名稱為 powerlevel10k/powerlevel10k
ZSH_THEME="powerlevel10k/powerlevel10k"

...
```

![edit-theme](https://i.imgur.com/bScP5pT.png)

### 3. 重新執行 `.zshrc` 設定檔

```bash
source ~/.zshrc
```

### 4. 依據 prompt 去設定 `p10k` config

重新執行 `.zshrc` 設定檔後，會進入 `p10k` 設定流程：

- 是否要安裝 `Meslo Nerd Font`
  如果之前沒裝過才會出現這個畫面，為了讓 icon 正常顯示，一定要裝，選「y」。

![](https://i.imgur.com/xxTn2Xw.png)

- 一系列 icon 有無正常顯示問題，依實際情況回答即可

![](https://i.imgur.com/ALP7KTL.png)

- 設定 command line 樣式，依自己需求選擇即可

![](https://i.imgur.com/RHM7sEz.png)

:::spoiler 筆者設定參考

> Q1. Prompt Style? `(3) Rainbow.`
> Q2. Character Set? `(1) Unicode.`
> Q3. Show current time? `(2) 24-hour format.`
> Q4. Prompt Separators? `(1) Angled.`
> Q5. Prompt Heads? `(1) Sharp.`
> Q6. Prompt Tails? `(1) Flat.`
> Q7. Prompt Height? `(1) One line.`
> Q8. Prompt Spacing? `(1) Compact.`
> Q9. Icons? `(2) Many icons.`
> Q10. Prompt Flow? `(1) Concise.`
> Q11. Enable Transient Prompt? `(n) No.`
> Q12. Instant Prompt Mode? `(1) Verbose (recommended).`
> Q13. Apply changes to ~/.zshrc? `y`

如果是跟著上述選項設定，完成後畫面會長這樣：

![](https://i.imgur.com/WJ7rjiL.png)
:::

<br/>

:::info
:bulb:**補充：**

1. 如果想重新跑 p10k 的設定檔，可輸入下面指令，上面設定流程會再重新跑一次

```bash
p10k configure
```

2. 如果要手動增加 font 字體，可參考 [Manual font installation](https://github.com/romkatv/powerlevel10k#manual-font-installation)
   :::

## 修改 iTerm2 的 color scheme

### 1. 下載 scheme

iTerm2 預設提供樣式很少，要更多漂亮的樣式，可以先到 [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) clone repo

### 2. import 樣式

打開 iTerm2 的 color scheme 的設定，路徑為：
`Preferences > Profiles > Colors > Color Presets`，import 剛剛 repo 中的 color scheme

![](https://i.imgur.com/A3w7Bmq.png)
![](https://i.imgur.com/RshVR79.png)

### 3. 選擇樣式

還需要手動選擇剛剛 import 的 scheme
(筆者選擇的是 `Tomorrow Night Eighties`)

![選擇樣式](https://i.imgur.com/J1K2kRj.png)

這時候開啟 iTerm2，就是美麗的 command line 了 :beers:
![](https://i.imgur.com/yzeqCDy.png)

## 解決原生 Terminal 亂碼問題

現在開啟原生 Terminal，會出現 icon 無法順利顯示，雖然不影響功能，大部分也基本是開 iTerms2，但看到那堆問號框框，就非常難受，主要原因是 Terminal 預設字型無法支援顯示出 icon，可以透過修改成跟 iTerms2 一樣的字型來解決。

![](https://i.imgur.com/LD45upO.png)

### iTerms2 字體設定為 `MesloLGS NF`：

![](https://i.imgur.com/mHAiFKj.png)

#### 1. 打開 Terminal 的 Text 的設定，路徑為：

`Terminal > Preferences > Profiles > Text > font > change...`

![](https://i.imgur.com/5Ws0BgJ.png)

#### 2. 選擇 `MesloLGS NF` 字體

![](https://i.imgur.com/N38wn2i.png)

順利解決 :tada::tada:，終於不用在看見問號框框了！

![](https://i.imgur.com/Q2cakgf.png)

## 設定 VScode

VScode 目前打開也是有 icon 變成方框問題，另外除了 iTerms2，VScode 的 Terminal 也是筆者常輸入指令的地方，所以希望這裡的 command line 也像 iTerms2 這麼繽紛！

![](https://i.imgur.com/6gmcpQK.png)

主要會分成兩個步驟來設定：

### Step 1. 修改字體

#### 方法一：

`左下齒輪 > Settings > Features > Terminal > Integrated: Font Family`，字體改成 `MesloLGS NF`

![](https://i.imgur.com/OR6dLtQ.png)

#### 方法二：

`左下齒輪 > Settings > Extensions > JSON > Schemas > Edit in settings.json`，新增 `"terminal.integrated.fontFamily": "MesloLGS NF"` 至 `settings.json` 內容中

![](https://i.imgur.com/7tDLhco.png)

```json=
// settings.json
{
    ...,
    // 新增這段
    "terminal.integrated.fontFamily": "MesloLGS NF",
}
```

icon 問題就解決了！

![](https://i.imgur.com/b48Xjxp.png)

### Step 2. 修改主題樣式

`左下齒輪 > Settings > Extensions > JSON > Schemas > Edit in settings.json`，多新增 `"workbench.colorCustomizations"` 設定，這邊顏色設定，筆者是直接參考 [Tomorrow Night Eighties.json](https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/vscode/Tomorrow%20Night%20Eighties.json)。

```json
// settings.json
{
    ...,
    "terminal.integrated.fontFamily": "MesloLGS NF",
    // 新增這段
    "workbench.colorCustomizations": {
        "terminal.foreground": "#cccccc",
        "terminal.background": "#2d2d2d",
        "terminal.ansiBlack": "#000000",
        "terminal.ansiBlue": "#6699cc",
        "terminal.ansiCyan": "#66cccc",
        "terminal.ansiGreen": "#99cc99",
        "terminal.ansiMagenta": "#cc99cc",
        "terminal.ansiRed": "#f2777a",
        "terminal.ansiWhite": "#ffffff",
        "terminal.ansiYellow": "#ffcc66",
        "terminal.ansiBrightBlack": "#000000",
        "terminal.ansiBrightBlue": "#6699cc",
        "terminal.ansiBrightCyan": "#66cccc",
        "terminal.ansiBrightGreen": "#99cc99",
        "terminal.ansiBrightMagenta": "#cc99cc",
        "terminal.ansiBrightRed": "#f2777a",
        "terminal.ansiBrightWhite": "#ffffff",
        "terminal.ansiBrightYellow": "#ffcc66",
        "terminal.selectionBackground": "#515151",
        "terminalCursor.foreground": "#cccccc"
    }
}
```

最後效果，掌聲鼓勵鼓勵～～～:clap::clap:
![](https://i.imgur.com/z54PVbc.png)

:::info
:bulb:**補充：**

VScode 還可以有很多地方可以客製顏色，可以參考 [Theme Color](https://code.visualstudio.com/api/references/theme-color)，像是筆者還有另外設置 statusBar 顏色呢！

![](https://i.imgur.com/sHfgtiU.png)

:::

## 參考資料

- [超簡單！十分鐘打造漂亮又好用的 zsh command line 環境](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)
- [【分享】Oh My Zsh + powerlevel10k 快速打造好看好用的 command line 環境](https://holychung.medium.com/%E5%88%86%E4%BA%AB-oh-my-zsh-powerlevel10k-%E5%BF%AB%E9%80%9F%E6%89%93%E9%80%A0%E5%A5%BD%E7%9C%8B%E5%A5%BD%E7%94%A8%E7%9A%84-command-line-%E7%92%B0%E5%A2%83-f66846117921)
