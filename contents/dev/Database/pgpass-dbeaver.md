---
title: Pgpass 連線 Dbeaver feat. GCP
fileName: pgpass-dbeaver
description: 如何使用 Pgpass 連線 Dbeaver
createdAt: 2025-11-15
updatedAt: 2025-11-15
tags:
  - database
  - postgresql
  - dbeaver
---

# Pgpass 連線 Dbeaver feat. GCP

## 安裝

### 1\. 安裝 dbeaver

```bash
brew install --cask dbeaver-community
```

### 2\. 安裝 GCP CLI

前往官方網站下載 SDK：[https://cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install?hl=zh-cn#installation_instructions)

下載後執行安裝（請先 `cd` 至檔案所在位置）：

```bash
./google-cloud-sdk/install.sh
```

### 3\. 安裝 GCP Cloud SQL Proxy

下載至 Home 目錄並設權限：

```bash
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.15.2/cloud-sql-proxy.darwin.arm64
```

```bash
chmod +x cloud-sql-proxy
```

重新載入環境變數設定：

```bash
source ~/.zshrc
```

登入 GCP 帳號：

```bash
gcloud auth application-default login
```

| 你要做的事                               | 建議用哪個指令                          |
| ---------------------------------------- | --------------------------------------- |
| 想在 CLI 操作 GCP                        | `gcloud auth login`                     |
| 在 Python、Node.js 寫 code 存取 GCP 資源 | `gcloud auth application-default login` |

## Pgpass 設定

### 1\. 建立 `.pgpass` 檔案

```
touch ~/.pgpass
```

```
vi ~/.pgpass
```

檔案內容格式如下：

```
localhost:{PORT}:{DB name}:{email}:__TOKEN__
```

說明：

- `PORT` 可自訂，但需與 DBeaver 設定一致
- `DB name` 根據實際使用的環境命名
- `email` 請填入你自己的帳號（如 `xxx.xxx@test.com.tw`）

範例：

```
localhost:5433:dev:{email}:__TOKEN__
localhost:5434:uat:{email}:__TOKEN__
```

### 2\. 設定 alias 與自動更新 token

建立 alias 設定檔：

```
touch ~/.oh-my-zsh/custom/alias.zsh
```

```
vi ~/.oh-my-zsh/custom/alias.zsh
```

加入以下內容：

```bash
export GCLOUD_EMAIL=xxx.xxx@test.com.tw

function pg_update_iam() {
  if [[ -z "$GCLOUD_EMAIL" ]]; then
    echo "GCLOUD_EMAIL is not set. Please add 'export GCLOUD_EMAIL=your_email' to alias.zsh"
    return 1
  fi

  local token=$(gcloud auth print-access-token --account="$GCLOUD_EMAIL")

  if [[ -z "$token" ]]; then
    echo "Failed to get token for $GCLOUD_EMAIL"
    return 1
  fi

  sed -i "" "s|^localhost:5433:ktw_dev:$GCLOUD_EMAIL:.*$|localhost:5433:ktw_dev:$GCLOUD_EMAIL:$token|" ~/.pgpass
  sed -i "" "s|^localhost:5434:ktw_uat:$GCLOUD_EMAIL:.*$|localhost:5434:ktw_uat:$GCLOUD_EMAIL:$token|" ~/.pgpass
}

alias pg_proxy_dev='pg_update_iam && ~/cloud-sql-proxy dev-everything:asia-east1:ktw-dev --port=5433'
alias pg_proxy_uat='pg_update_iam && ~/cloud-sql-proxy uat-everything:asia-east1:ktw-uat --port=5434'
```

套用 alias 設定：

```bash
source ~/.zshrc
```

## 開啟 SQL proxy

開啟 proxy，讓 DB 可被連線：

```bash
pg_proxy_dev  # 開啟 Dev 的 proxy
pg_proxy_uat  # 開啟 UAT 的 proxy
```

## DBeaver 設定

1. `Port` 設為 `.pgpass` 中對應的 port

2. `DB name` 依據環境命名（如 `dev`、`uat`）

3. 選擇 PostgreSQL PgPass 模式和`Username` 填入 emai

4. 測試是否連線成功，無問題後，點擊 Finish

![image](https://hackmd.io/_uploads/rJU9aRa-Zl.png)

接著可執行 SQL 測試資料(依自己測試資料)是否正常返回：

```sql
SELECT * FROM product.title
```

**補充：** 設定 Default Schema

可於 DBeaver 設定 default schema 後，簡化查詢語法：

![image](https://hackmd.io/_uploads/SylmTCpbbl.png)

```sql
SELECT * FROM title
```

## 後記

連線方式比較：

### 使用帳號密碼連線（直連 GCP）

**需求：**

- GCP DB 的 public IP
- 使用者帳號與密碼

**缺點：**

- 存在資安風險，會洩露資料庫的真實 IP

### 使用 Cloud SQL Proxy + Pgpass

**流程：**

- DBeaver → 透過本地 `.pgpass` 連線
- Proxy → 連接至 GCP Cloud SQL，使用 IAM token 驗證

**優點：**

- 不需暴露 GCP 資料庫 IP
- 使用動態 Token，安全性更高
- 可自動更新 Token，維護方便

> ### Proxy
>
> - Dbeaver ⇒ Pgpass：
>
>   連接 dbeaver 到 local 設定
>
> - Pgpass ⇒ GCP：
>
>   連接 local 設定到 GCP
>
> Dbeaver : 設定 pgpass 方式，須與 pgpass port 設定一致
>
> Pgpass：存放 gcp token 地方 + 設定 local db port
