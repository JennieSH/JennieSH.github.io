---
title: "客製化 command line - Warp + Starship"
fileName: "warp-terminal-starship"
description: "入坑 Warp，第一步就是客製化它！ 第二彈 feat. Starship"
createdAt: 2024-05-16
updatedAt: 2024-05-16
tags:
  - MacOS
  - Warp
  - terminal
  - productivity
  - Starship
---

###### tags: `MacOS`、`Warp`、`Starship`、`terminal`、`productivity`

# 客製化 command line - Warp + Starship

此篇文章是參考 [How to Configure Starship to Look Exactly Like P10K](https://dev.to/therubberduckiee/how-to-configure-starship-to-look-exactly-like-p10k-zsh-warp-h9h) 來設定樣式，因原文章有段時間了，所以這次跑安裝流程也有踩到一些坑，順手紀錄一下如何使用 Starship 來客製化 Warp 的 command line。

![warp](https://hackmd.io/_uploads/rJXMJ4_j3.png)

![warp](https://hackmd.io/_uploads/BJE0vOzXR.png)

上面兩張圖分別是 Before(預設) 和 After(Starship)～

## 安裝 Warp

```bash
$brew install --cask warp
```

## 設定字體

為了順利顯示各種 icons，字體需要更改成 Nerd Font：

**`Settings` -> `Appearance` -> `Text` -> `Terminal font` 改成 `MesloGS NF`**

> 筆者是使用 `MesloGS Nerd Font`，可自行選擇下載的版本。

![設定字體](https://hackmd.io/_uploads/ByAkVwSin.png)

:::info
:bulb: **Nerd Font 相關下載點：**

- [`DroidSansMono Nerd Font`](https://eng.m.fontke.com/font/24637081/)
- [`MesloGS Nerd Font`](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k)
  :::

## 安裝 Starship

筆者環境是使用 [Homebrew](https://brew.sh/) (套件管理器)＋ Zsh (Shell)，如果是使用其他的，可以參考 [Starship](https://starship.rs/zh-TW/) 的安裝設定。

### 1. 安裝

```bash
$brew install starship
```

### 2. 初始化腳本 (script)

```bash
$vi ~/.zshrc
```

先輸入 `i` 進入 insert 模式，將以下內容放在最底部：

`eval "$(starship init zsh)"`

按 `esc` 結束編輯，輸入 `wq`，存檔離開。

:::warning
:warning: **注意**

如果之前電腦設定過 iTerms + powerlevel10k，這邊會踩到一個坑，zsh 會一直套用 powerlevel10k，沒辦法看到 Starship prompt。

解決辦法是[針對 Warp Terminal，去執行對應的動作](https://github.com/warpdotdev/Warp/issues/1518#issuecomment-1415410776)：

```bash
$vi ~/.zshrc
```

將原本這段

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"

....

eval "$(starship init zsh)"
```

改成

```bash
if [[ $TERM_PROGRAM == "WarpTerminal" ]]; then
  ZSH_THEME="robbyrussell"
else
  ZSH_THEME="powerlevel10k/powerlevel10k"
fi

...

if [[ $TERM_PROGRAM == "WarpTerminal" ]]; then
 eval "$(starship init zsh)"
fi
```

存檔後，再重新執行 zsh 設定檔即可

```bash
source ~/.zshrc
```

:::

### 3. 更改 Prompt 選項

**`Settings` -> `Appearance` -> 點擊 `Prompt` -> 選擇 `Shell prompt(PS1)`**

![Edit prompt](https://hackmd.io/_uploads/BJfdfMlfR.png)

## 設定 Starship prompt config

### 1. 新增 `starship.toml`

```bash
$mkdir -p ~/.config && touch ~/.config/starship.toml
```

```bash
$vi ~/.config/starship.toml
```

先輸入 `i` 進入 insert 模式，將以下內容寫入後按 `esc` 結束編輯，輸入 `wq`，存檔離開。

> 這邊是 starship 相關設定，更多可以參考[官方的 Document](https://starship.rs/zh-TW/config/)。

```toml
format = """\
[](bg:#030B16 fg:#7DF9AA)\
[ ](bg:#7DF9AA fg:#090c0c)\
[](fg:#7DF9AA bg:#1C3A5E)\
$time\
[](fg:#1C3A5E bg:#6699cc)\
$directory\
[](fg:#6699cc bg:#ffcc66)\
$git_branch\
$git_status\
$git_metrics\
[](fg:#ffcc66 bg:#030B16)\
$character\
"""

[directory]
format = "[  $path ]($style)"
style = "fg:#000000 bg:#6699cc"

[git_branch]
format = '[ $symbol$branch(:$remote_branch) ]($style)'
symbol = "  "
style = "fg:#000000 bg:#ffcc66"

[git_status]
ahead = "⇡${count} "
diverged = "⇡${ahead_count}⇣${behind_count} "
behind = "⇣${count} "
modified = "!${count} "
untracked = "?${count} "
staged = "+${count} "
format = '[$all_status]($style)'
style = "fg:#000000 bg:#ffcc66"

[hg_branch]
format = "[ $symbol$branch ]($style)"
symbol = " "

[cmd_duration]
format = "[ ◷ $duration ]($style)"
style = "fg:bright-white bg:18"

[character]
success_symbol = '[ ➜](bold green) '
error_symbol = '[ ✗](#E84D44) '

[time]
disabled = false
time_format = "%R" # Hour:Minute Format
style = "bg:#1d2230"
format = '[[ 󱑍 $time ](bg:#1C3A5E fg:#8DFBD2)]($style)'
```

<!-- format = '[[󱑍 $time ](bg:#1C3A5E fg:#8DFBD2)]($style)' -->

接著就會看到設定好的 prompt 了 :beer: ~

![image](https://hackmd.io/_uploads/BJ8xmfgf0.png)

:::warning
:warning: **注意**

如果遇到色塊有跑版，可以至 `Setting` > `Appearance` 中的 `Text`，調整 Line Height，筆者的設定是 `Font size: 14` 和 `Line height: 1.2`。

![image](https://hackmd.io/_uploads/BkKnNfgGA.png)

:::

## 設定 Warp theme

### 1. 新增 themes 資料夾

```bash
$mkdir -p ~/.warp/themes/ && cd ~/.warp/themes/
```

### 2. 新增 theme yaml

```bash
$mkdir -p 'coolnight' && cd coolnight
```

```bash
$vi coolnight.yaml
```

將下方內容貼上後，記得儲存後離開，這邊是參考 [theRubberDuckiee 原設定](https://github.com/theRubberDuckiee/dev-environment-files/blob/main/coolnight.yaml)，更多設定可以參考 [Warp Document](https://docs.warp.dev/appearance/custom-themes)。

```yaml
accent: "#38ff9c"
background: "#010b17"
foreground: "#ebddf4"
details: "darker"
terminal_colors:
  normal:
    black: "#0b3b61"
    red: "#ff3a3a"
    green: "#52ffcf"
    yellow: "#fff383"
    blue: "#1376f8"
    magenta: "#c792ea"
    cyan: "#ff5dd4"
    white: "#15fca2"
  bright:
    black: "#62686c"
    red: "#ff54b0"
    green: "#73ffd8"
    yellow: "#fcf4ad"
    blue: "#378dfe"
    magenta: "#ae81ff"
    cyan: "#ff69d7"
    white: "#5ffbbe"
```

### 3. 選擇自定義 Theme

到 `Settings` > `Appearance` 中的 Themes，點選 `Current theme`，接著在左邊找出剛剛新增的主題，點選後就會直接套用了。

![image](https://hackmd.io/_uploads/Syp5_GlzA.png)

## 結語

沒有特別追求樣式的話，其實 Warp 預設已經輾壓原生的 Terminal 太多太多了～

但如果你是每次打開 Terminal，看到親手裝飾的樣式，心情都會被療癒一下，這篇可以當作是入門 Starship 的第一步～

因為筆者在 P10K 和 Starship 選擇不出來，所以公司和私人電腦的 Warp 各搭配一種 :laughing:
有興趣 Warp 搭配 P10K，可以參考筆者另一篇文章 [客製化 Terminal - Warp + Powerlevel10k](https://jenniesh.github.io/dev/Terminal/terminal-warp#%E5%AE%A2%E8%A3%BD%E5%8C%96%20Terminal%20-%20Warp%20+%20Powerlevel10k)

## 參考資料

- [Starship](https://starship.rs/zh-TW/)
- [How to Configure Starship to Look Exactly Like P10K](https://dev.to/therubberduckiee/how-to-configure-starship-to-look-exactly-like-p10k-zsh-warp-h9h)
