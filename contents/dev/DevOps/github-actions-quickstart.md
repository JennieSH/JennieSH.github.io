---
title: "GitHub Actions - Creating My First Workflow (CI/CD)"
fileName: "github-actions-quickstart"
description: 能躺著就不要坐著，能坐著就不要站著，能一個指令解決的，就不要用兩個！利用 GitHub Actions 打造專案的 CI/CD。
createdAt: 2021-11-19
updatedAt: 2021-11-19
tags:
  - GitHub
  - GitHub Action
  - GitHub Page
  - CI/CD
  - DevOps
---

# GitHub Actions - Creating My First Workflow (CI/CD)

`CI/CD` 幾乎是公司每個專案的標配了，但因為都是初期就要設定完成，所以基本上接手的專案都已經有設定檔，沒什麼機會自己寫，藉由這次架部落格的機會，練習使用 `GitHub Action`，為自己的專案設定自動化流程。

條列出這次想透過 `GitHub Action` 解決的需求，文章中會紀錄如何寫出對應的 Workflow 設定檔。

**流程主要需求：**

1. `git push` 到主分支時自動測試
2. 測試成功時，產生靜態檔案
3. 使用靜態檔案自動部署 `GitHub Page`

![Github Actions flow](https://i.imgur.com/ueoi8QH.png)

## What is CI/CD ?

`CI/CD` 分別代表持續整合 (`Continuous Integration`) 和持續部署 (`Continuous Deployment`)，簡單來說就是將程式的流程自動化，可以降低人員操作疏失的風險和減少手動操作的重複步驟，常見有 [`Travis CI`](https://travis-ci.org/)、[`Jenkins`](https://www.jenkins.io/)、[`AWS CodePipeline`](https://aws.amazon.com/codepipeline/) 等。

### - 持續整合 (`Continuous Integration`)

當程式被合併到分支時，會開始自動化 `build`、自動化測試，確保此次提交的程式異動都有通過測試，也可以指定環境版本，避免不同電腦的開發環境不同，而造成功能異常。

### - 持續部署 (`Continuous Deployment`)

在 CI 流程過後，只要不失敗，程式碼屬於可被部署的狀態，接著就會自動化執行部署的動作。

## What is Github Actions ?

透過在 `repository` 內配置檔案，能夠彈性客製各種自動化的工作流程，當然也包括 `CI/CD`，而且在 `GitHub` 內就可以看到即時的自動化結果和報告，不需要透過第三方工具。

## 如何添加設定檔？

`Github Actions` 設定文件會放在根目錄的 `.github/workflows` 下，檔名可自取，內容需要以 YAML 語法來撰寫，可以有一個以上的 `workflow` 設定檔。

```
── .github
    └── workflows
        ├── cicd.yml
        └── slack-notification.yml
```

## 基本概念

設定檔使用到的 `Workflow`、`Job`、`Step`、`Action`，是存在從屬關係的，需要先稍微理解這塊。

![Github Actions Elements](https://i.imgur.com/dqGfdz7.png)

### - Workflow (工作流程)

指一個完整的自動化過程，會涵蓋一個以上的 `Job`

- **`name`** (optional)： 在 `Actions` 的 `Workflows` 下，會顯示設定的 `Workflow name`，預設為檔名
- **`on`** ：指定特定的 `event` 來觸發 `Workflow`

![Workflow-name](https://i.imgur.com/xvEJKHI.png)

```yaml=
name: Deploy

on:
  # 在對 main branch 發 PR 或 git push 時，會觸發 workflow
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

  # 每天在 5:30 和 17:30 UTC，會觸發 workflow
  schedule:
    - cron:  '30 5,17 * * *'

  # git push 至啟用的 GitHub Pages 的分支（page_build 事件)，會觸發 workflow
  page_build:

```

:::info
:link: **補充**

更多 `events` 可以參考 [Events that trigger workflows](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows)
:::

:::warning
:exclamation: **注意**

`Workflow` 設定檔案 (`.yml`) 需要存在於 `default branch`，才會觸發整個自動化流程。
:::

### - Job（工作項目 / 任務）

`Workflow` 可以包括一個或多個 `Job`，`Job` 預設是**同時**執行。

- [**`runs-on`**](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on)：指定運行的虛擬機環境 (`Runners`)
- [**`needs`**](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds) : 用於設定有依賴項的 `Job`，如果某個 `Job` 作業失敗，則所有需要它的 `Job` 都會被跳過，除非設置[條件表達式](https://docs.github.com/cn/actions/learn-github-actions/expressions#job-status-check-functions)。

```yaml=
# 要求按照順序且相關 Job 要執行成功
# 執行順序： job1 => job2 => job3
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```

```yaml=
# 只要求按照順序
# job3 使用 always() 條件表達式，因此他始終在 job1 和 job2 完成後執行，但不管它們是否成功。
jobs:
  job1:
  job2:
    needs: job1
  job3:
    if: ${{ always() }}
    needs: [job1, job2]
```

### - Step（步驟）

`Job` 可以包括一個以上的 `Step`，步驟會**依序執行**，只要其中一個步驟失敗，後面步驟皆不會被執行。

- [**`run`**]()：用於在虛擬機使用 `shell comman`
- [**`uses`**]()：用於使用別人寫好的 `Action` 檔案

`Step` 因為處於同一個虛擬機環境，所以在同一個 `Job` 下的步驟，彼此可以共享 data。

```yaml=
jobs:
  # job name
  github-action-example:

    # job 運行的虛擬機
    runs-on: ubuntu-latest

    steps:
      # 使用別人寫好的 action - actions/checkout@v2
      - uses: actions/checkout@v2

      # 設定 node 環境並指定版本
      - uses: actions/setup-node@v2
        with:
          node-version: '14'

      # 執行指令
      - run: npm install
```

### - Action (動作)

`Step` 可以依序執行一個以上的 `Action`。

```yaml=
jobs:
  workflow-command-job:
    runs-on: ubuntu-latest
    steps:
      - name: disable workflow commands
        run: |
          echo '::warning:: this is a warning'
          echo "::stop-commands::`echo -n ${{ github.token }} | sha256sum | head -c 64`"
          echo '::warning:: this will NOT be a warning'
          echo "::`echo -n ${{ github.token }} | sha256sum | head -c 64`::"
          echo '::warning:: this is a warning again'
```

:::info
:bulb: **補充**

GitHub 有提供 [marketplace](https://github.com/marketplace)，裡面存放了許多別人寫好的 `Action`，相當於 `Action` 版的 `GitHub`，把一些常用的步驟指令都打包好了，可以直接 `uses` 做使用。
:::

## 實作

再回憶一下這次自動化想包含的需求：

1. `git push` 到主分支時自動測試
2. 測試成功時，產生靜態檔案
3. 使用靜態檔案自動部署 `GitHub Page`

<br/>

轉成 `Workflow` 設定檔的完整原始碼：

```yaml=
name: Deploy

on:
  push:
    branches:
      - master
    paths-ignore:
      - 'README.md'

jobs:
  deploy-github-page:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Setup node env
        uses: actions/setup-node@v2

      - name: Install dependencies with Yarn
        run: yarn --frozen-lockfile

      - name: Run test with Jest
        run: yarn test

      - name: Generate Static Site
        run: yarn generate

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages # The branch the action should deploy to.
          folder: dist # The folder the action should deploy.
```

### Step 1. Workflow

1. `git push origin master` 會觸發 `Workflow`
2. 使用 `paths-ignore` 過濾特定路徑，即如果單獨更改 `README.md`，即使推到 `master` 分支，也不會觸發自動化

```yaml=
# Workflow 名字
name: Deploy

on:
  push:
    branches:
      - master
    paths-ignore:
      - 'README.md'
```

### Step 2. Job

1. 指定虛擬機環境 `ubuntu-latest`

```yaml=
jobs:
  # Job 名字
  deploy-github-page:
    runs-on: ubuntu-latest
```

### Step 3. Step & Action

1. `Checkout`:
   使用 [`actions/checkout@v2`](https://github.com/marketplace/actions/checkout)，它會下載一份專案程式碼至運行的虛擬機上。

   如果工作流程有涉及使用到專案原始碼，或執行定義在專案上的 script，都是需要使用 `checkout action`。

2. `Setup node env` + `Install dependencies with Yarn`：
   使用 [setup-node@v2](https://github.com/marketplace/actions/setup-node-js-environment) 設置 node 環境，並依據 `yarn.lock` 安裝專案依賴套件 [(npm 可參考這裡)](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs-or-python)

3. `Run test with Jest`：
   使用定義在專案內的 test script

4. `Generate Static Site` + `Deploy`：
   產生靜態檔案並部署至 Github Page，CD 直接使用 [JamesIves/github-pages-deploy-action@4.1.5](https://github.com/marketplace/actions/deploy-to-github-pages)

```yaml=
steps:
     - name: Checkout
       uses: actions/checkout@v2

     - name: Setup node env
       uses: actions/setup-node@v2

     - name: Install dependencies with Yarn
       run: yarn --frozen-lockfile

     - name: Run test with Jest
       run: yarn test

     - name: Generate Static Site
       run: yarn generate

     - name: Deploy
       uses: JamesIves/github-pages-deploy-action@4.1.5
       with:
         branch: gh-pages # 指定要 deploy 的分支
         folder: dist # 指定要 deploy 的資料夾
```

### 實際測試

#### :heavy_check_mark: Case: 單元測試成功

在 Actions 頁面可以看到整個 Workflow，以及每個步驟的執行狀態，因為單元測試是成功的，後續網站也有順利被部署。

![run test action](https://i.imgur.com/lKkrg3q.png)

Repository 的首頁也可以看到成功的綠色小勾勾 :heavy_check_mark:

![run test home](https://i.imgur.com/MVFcVdV.png)

<br/>

#### :negative_squared_cross_mark: Case: 單元測試失敗

接著試試單元測試失敗的情境，可以看到 `Run test with Jest` 這個步驟失敗後，後續的 `Generate Static Site` 和 `Deploy` 直接不執行。

點開 `Run test with Jest` 詳細訊息，也可以看到是哪個測試出錯和整個測試報告。

![fail test](https://i.imgur.com/2jbtqOD.png)

<br/>

:::info
:bulb: 補充

我在 `README.md` 有添加 **`workflow status badge`**，可以看到 Workflow 的狀態，但它不是即時更新，跑完 Workflow 後，需要再等個幾分鐘。

支援 `query parameters`，可以顯示特定 `branch` 或 `event` 的 Workflow 狀態，詳細設定可參見[官網](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)。

![workflow status badge](https://i.imgur.com/No01pI0.png)

```markdown
<!-- 基本語法 -->

![example workflow](https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg)

<!-- 範例 -->

![Deploy](https://github.com/JennieSH/github-action-demo/actions/workflows/deploy.yml/badge.svg)
```

:::

## 總結

[GitHub Actions 官方文件](https://docs.github.com/en/actions) 還有超級多設定可以使用，因為這次需求也沒很複雜，作為初探 Action，是還不錯的經驗 :tada:，下次有機會，會再嘗試建立其他的 Workflow。

---

## 參考資料

1. [GitHub Actions Docs](https://docs.github.com/en/actions)
2. [GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
3. [實作開源小工具，與 Github Actions 的第一次相遇！](https://medium.com/starbugs/%E5%AF%A6%E4%BD%9C%E9%96%8B%E6%BA%90%E5%B0%8F%E5%B7%A5%E5%85%B7-%E8%88%87-github-actions-%E7%9A%84%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%9B%B8%E9%81%87-3dd2d70eeb)

###### tags: `DevOps`、`CI/CD`、`GitHub`、`GitHub Action`、`GitHub Page`
