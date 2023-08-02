---
title: "客製化 Terminal - Warp + Powerlevel10k"
fileName: "terminal-warp"
description: "入坑 Warp，第一步就是客製化它！"
createdAt: 2023-08-01
updatedAt: 2023-08-01
tags:
  - MacOS
  - Warp
  - terminal
  - productivity
  - powerlevel10k
---

###### tags: `MacOS`、`Warp`、`Powerlevel10k`、`terminal`、`productivity`

# 客製化 Terminal - Warp + Powerlevel10k

身為一位工程師，日常都需要跟指令列打交道，加上筆者是微顏控，需要有美美的 command line 環境，所以對 Terminal 選擇有點挑剔，轉換成 Warp 前，是使用 iTerms2 + oh-my-zsh，調成喜歡的樣式。

![iTerms2](https://hackmd.io/_uploads/BJwvkV_sh.png)

<br/>

Warp 預設樣式已經有個 70 分，highlight 等配色都很舒服，加上強大其他功能，如果對介面沒特別要求，基本就開箱即用。

![warp](https://hackmd.io/_uploads/rJXMJ4_j3.png)

<br/>

但對於用習慣 iTerms2 樣式和設定，Warp 預設已經滿足不了筆者了，手邊公司電腦有參考 [How to Configure Starship to Look Exactly Like P10K](https://dev.to/therubberduckiee/how-to-configure-starship-to-look-exactly-like-p10k-zsh-warp-h9h) 做設定，結果也是挺滿意的，但因為 iterms2 的關係， zsh config 留有 Powerlevel10k 相關設定，每次只要開啟 Warp，最上方的 prompt 就會一直跳出不支援 Powerlevel10k 提示，有點擾人 _(後來發現可在 `.zshrc` 檔案中，寫 Terminal 判斷，去關掉提示)_。

![starship](https://hackmd.io/_uploads/SJCZbPSo3.png)

好消息是新版本 [(v0.2023.06.20.08.04)](https://docs.warp.dev/getting-started/changelog#2023.06.20-v0.2023.06.20.08.04) 的 Warp，可以支援 Powerlevel10k 了！剛好趁這次機會幫自己的電腦設定一下 Warp 樣式。

## 安裝 warp

```bash
$brew install --cask warp
```

## 設定字體

`Settings` -> `Appearance` -> `Text` -> `Terminal font` 改成 `MesloGS NF`

![設定字體](https://hackmd.io/_uploads/ByAkVwSin.png)

:::info
:bulb:**補充：**

如果電腦中沒有 `MesloGS NF` 字體，請至 [Manual font installation](https://github.com/romkatv/powerlevel10k#meslo-nerd-font-patched-for-powerlevel10k) 下載，否則部分 icon 會無法正確顯示。
:::

## 打開 PS1 選項

`Settings` -> `Feature` -> `Session` -> 打開 `Honor user's custom prompt(PS1)`

![PS1 選項](https://hackmd.io/_uploads/BJ6jHvHj2.png)

## 安裝 powerlevel10k

```bash
$git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

如果之前有安裝過，記得 pull 最新版本，可參考 [p10k repo](https://github.com/romkatv/powerlevel10k#how-do-i-update-powerlevel10k)。

## 重新執行 zsh（Z Shell）

```bash
$exec zsh
```

## 設定 p10k config

接下來會有一系列 icon 有無正常顯示問題和 command line 樣式設定，依實際情況和需求回答即可。

![p10k config](https://hackmd.io/_uploads/HkXr5Prs2.png)

:::spoiler 筆者設定參考

因為之前已在 iTerm2 那邊設定過 `p10k` config 了，所以再輸入完 `exec zsh`，就直接顯示當初設定的樣式了，附上當時 iTerm2 設定選項供參考。

![](https://hackmd.io/_uploads/HkKHjvHo3.png)

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

:::

<br/>

有需要再重新客製化 p10k prompt，可以輸入：

```bash
$vi ~/.p10k.zsh
```

## 修改 Warp 的 theme

Warp 預設提供 theme 很少，如果要客製化 theme，可以到 [theme repository](https://github.com/warpdotdev/themes) 挑選自己喜歡的主題，更多 theme 設定可以參考 [Custom Themes](https://docs.warp.dev/appearance/custom-themes)。

### Step 1. 建立 themes 資料夾

```bash
$mkdir -p ~/.warp/themes/
```

### Step 2. 建立 theme yaml

```bash
$cd ~/.warp/themes/
```

主題的資料夾，依據自己選擇命名，筆者是選擇 [`tomorrow-night-eighties`](https://github.com/warpdotdev/themes/blob/fd69e302ba2cd510846644f5e75d00ee4985ee1e/base16/base16_tomorrow_night_eighties.yaml#L4)：

```bash
# mkdir <theme-folder-name>
$mkdir tomorrow-night-eighties
```

```bash
# cd <theme-folder-name>
$cd tomorrow-night-eighties
```

新增 yaml 設定：

```bash
# vi <theme-folder-name>
$vi tomorrow-night-eighties.yaml
```

再將 [`tomorrow-night-eighties`](https://github.com/warpdotdev/themes/blob/fd69e302ba2cd510846644f5e75d00ee4985ee1e/base16/base16_tomorrow_night_eighties.yaml#L4) 內容複製到 terminal 後，輸入 `:wq`

```yaml
accent: "#6699cc"
background: "#2d2d2d"
details: darker
foreground: "#cccccc"
terminal_colors:
  bright:
    black: "#999999"
    blue: "#b4b7b4"
    cyan: "#a3685a"
    green: "#393939"
    magenta: "#e0e0e0"
    red: "#f99157"
    white: "#ffffff"
    yellow: "#515151"
  normal:
    black: "#2d2d2d"
    blue: "#6699cc"
    cyan: "#66cccc"
    green: "#99cc99"
    magenta: "#cc99cc"
    red: "#f2777a"
    white: "#cccccc"
    yellow: "#ffcc66"
```

### Step 3. 重啟 warp

如果主題沒有套用，請手動至 `Appearance` -> 點選 `Current theme` -> 選擇剛剛建立的主題

![](https://hackmd.io/_uploads/r1y05uBjn.png)
![](https://hackmd.io/_uploads/SkZEiOHo3.png)

:::warning
:warning: **注意：**

設定到這邊，筆者有遇到三個問題，有踩到坑的人可以參考下方解答～

**問題一：Operation not permitted**

如果下指令有遇到 **`.: Operation not permitted`** 或者 git 資訊無顯示，要去 Settings 打開 `Files and Folders` 權限。

![Operation not permitted](https://hackmd.io/_uploads/BkffqFHjn.png)

<br/>

**問題二： prompt 的顏色和形狀，顯示會不一致**
但同一套設定檔案在 iTerms 是正常的，Warp 這邊會三角形明顯顏色不一樣：

![](https://hackmd.io/_uploads/r1PZK6Lo3.png)

解法是到 `Appearance` -> `Enforce minimum contrast` 改成 `Never`，調整完後，顏色顯示就會一致了。

![](https://hackmd.io/_uploads/HyDEYa8o2.png)

![](https://hackmd.io/_uploads/S1t-ip8ih.png)

> 相關 issue 討論：
>
> - [powerlevel10k support](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1605005256)

<br/>

**問題三： cursor 在 Warp 會直接跳新的一行，但其他 Terminal 會接續在原行**

![](https://hackmd.io/_uploads/r1v3C2Uoh.png)

不介意的話可忽略該問題，很介意就 run `exec zsh` 可以解決，但就會無法擁有 multiple cursors、completions 等 Warp 提供的功能。

> 相關 issue 討論：
>
> - [Prompt in one line](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1625048694)
> - [powerlevel10k support](https://github.com/warpdotdev/Warp/issues/2851#issuecomment-1625048694)
> - [Prompt issue with oh My Zsh and PowerLevel10k](https://github.com/warpdotdev/Warp/issues/3387)

:::

## 結語

Starship 或 Powerlevel10k 都需要花一些時間來設定，中間還踩了一些雷，但最後看到繽紛的 Terminal 就覺得值得了！

之前幫其他同事用他的電腦 debug 的時候，terminal 文字沒有 highlight，整片 log 都是白字，看著微痛苦 XD，立馬推坑他安裝 Warp，就算不客製 command line，預設樣式就屌打原本的了，又有各種提示，直接 Warp 信徒加一，希望這篇有機會推坑更多人進 Warp。

## 參考資料

- [Warp Documentation](https://docs.warp.dev/getting-started/readme)
- [[zsh] Powerlevel10k 設定心得筆記](https://www.onejar99.com/zsh-powerlevel10k-custom-config-note/)
