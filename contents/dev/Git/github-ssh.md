---
title: "[Note] 使用 SSH 與 Github 連線"
fileName: "github-ssh"
description: "如何使用 SSH 與 GitHub 連線筆記整理"
createdAt: 2022-11-21
updatedAt: 2022-11-21
tags:
  - Git
  - GitHub
---
###### tags: `Git`、`GitHub`

# [Note] 使用 SSH 與 Github 連線

主要是參考 [Use GitHub with SSH - Complete guide including VSCode setup](https://awsm.page/git/use-github-with-ssh-complete-guide-including-vscode-setup/) 和[【Git】使用 SSH 金鑰與 GitHub 連線](https://cynthiachuang.github.io/Generating-a-Ssh-Key-and-Adding-It-to-the-Github/) 這兩篇內容，上述兩篇對步驟有都有更進一步說明，推薦閱讀，此筆記內容是著重記錄步驟。

## 設置基本訊息

```bash
git config --global user.name "YOUR_USERNAME"
git config --global user.email "YOUR_EMAIL_ADDRESS"
```



## 生成新的 SSH 密鑰

#### STEP 1. generate SSH key pair
```bash
ssh-keygen -t ed25519 -C "YOUR_GITHUB_EMAIL_ADDRESS"
```

```bash
Enter file in which to save the key (/Users/<username>/.ssh/id_ed25519): /Users/<username>/.ssh/gitub_key # 金鑰儲存的位置與檔名

Enter passphrase (empty for no passphrase) # 金鑰保護密碼
Enter same passphrase again # 再輸入一次金鑰保護密碼
```

#### STEP 2. 配置 config 檔案(optional)
因為上面有更改了金鑰的預設名稱(更改為 `github_key`，如果使用的為預設，可跳過此步驟)，需另配置一個 config 檔

```
vim ~/.ssh/config
```

檔案內需加入下面內容，IdentityFile 為剛建立的金鑰
```
 Host github.com
  HostName github.com
  User JennieShao
  IdentityFile ~/.ssh/github_key
```


## 連結至 GitHub

#### STEP 1. 檢視並複製生成的公鑰
```bash
cat ~/.ssh/github_key.pub
```

#### STEP 2. 在 GitHub 新增公鑰
點擊右上角 Avatar => `Settings` => `SSH and GPG keys` => `New SSH key`


#### STEP 3. 連線測試
```bash
ssh -T git@github.com
```


如果是第一次操作的話，可能出現[下面的錯誤訊息](https://stackoverflow.com/questions/71276591/how-to-unlink-the-previous-ssh-key-in-git)
```
The authenticity of host 'github.com (...)' can't be established.
ED25519 key fingerprint is SHA256:................
This key is not known by any other names
```
>This message has nothing to do with the key that you created. The SSH server that you connected to starts by identifying itself to your ssh client, and this message means that your client doesn't recognize the server that it connected to. You'll get a message like this the first time you connect to any SSH server.

這邊需要輸入 yes 
```bash
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

再執行一次測試指令看是否設置成功，成功的話會出現 `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`
```bash
ssh -T git@github.com
```

:::info
:bulb:**補充**

1. 如果一開始就使用 HTTPS 的傳輸協定，中途才改用 SSH，需要重新再設定 remote repository 的網址
2. 如果有設定金鑰的保護密碼，但又不想每次使用金鑰又輸入一次密碼的話，可以考慮設定 ssh-agent
 
    ```bash
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/github_key
    ```

:::


## 參考資料
1. [Use GitHub with SSH - Complete guide including VSCode setup](https://awsm.page/git/use-github-with-ssh-complete-guide-including-vscode-setup/)
2. [【Git】使用 SSH 金鑰與 GitHub 連線](https://cynthiachuang.github.io/Generating-a-Ssh-Key-and-Adding-It-to-the-Github/)