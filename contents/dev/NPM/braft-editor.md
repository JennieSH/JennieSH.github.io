---
title: "富文本編輯器 - Braft Editor"
fileName: "braft-editor"
description: "Braft Editor 踩坑記，先說結論，可以考慮別的富文本編輯器套件。"
createdAt: 2024-05-17
updatedAt: 2024-05-17
tags:
  - braft-editor
  - draftjs
  - rich text editor
---

###### tags: `braft-editor`、`draftjs`、`rich text editor`

# 富文本編輯器 - Braft Editor

基於 [Draft.js](https://draftjs.org/) 開發，可以到 [Braft Editor](https://braft.margox.cn/) 官網體驗一下功能，有別於 Draft 非常裸，功能很多需自己實現，這款算是真的即開即用，官方 API 文件也寫得不錯，對於時程有壓力或者是只需要基本功能的編輯器的話，這套滿推薦的。

## 使用

### Step 1. 安裝套件

```bash
yarn add braft-editor
```

### Step 2. 引入編輯器和樣式

可以依據需要的功能做篩選和顯示，可參考[官方文件教學](https://www.yuque.com/braft-editor/be/gz44tn)

```jsx
// Editor.tsx

// 引入編輯器樣式
import "braft-editor/dist/index.css";

import BraftEditor, { EditorState } from "braft-editor";
import { useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] =
    useState < EditorState > BraftEditor.createEditorState("");

  return (
    <BraftEditor
      value={editorState}
      onChange={setEditorState}
      placeholder="# braft editor"
      language="zh-hant"
      stripPastedStyles={true}
    />
  );
};
```

![](https://i.imgur.com/Ahfgtlo.png)

## 踩坑

針對環境和 `braft-editor` 套件的坑，分別做紀錄下來:

### 1. 組件使用問題 - Braft Editor

#### - 繁體翻譯不完全

為了解決繁體翻譯的詞彙不達意和媒體庫沒支援到繁體問題，可以新增語言翻譯設定檔，搭配 Braft Editor 提供的 `language` API 傳入設定檔。

> [編輯器 (braft-editor)](https://github.com/margox/braft-editor/blob/master/src/languages/zh-hant.js) 和 [媒體庫 (braft-finder)](https://github.com/margox/braft-finder/blob/master/src/languages/zh.js) 語言設定檔是不同的，自己的 `languageConfig` 需同時包含這個兩個所需的設定檔資料。
>
> `braft-finder` 雖然 GitHub 看起來有繁體設定檔案，但不知道為什麼沒吃到設定，可以參考我的 `languageConfig`，有順利解決繁體的問題！

<br/>

```jsx
<BraftEditor
  ...
  language={() => languageConfig}
/>
```

改完後順利顯示熟悉的繁體～ :clap:

![繁體 bug](https://i.imgur.com/QsNg5A0.png)

#### - React Warning

控制台會有 `react_devtools_backend.js:4061 Warning: findDOMNode is deprecated in StrictMode.` 的警告，目前無解，有看到相關 [issues 討論](https://github.com/margox/braft-editor/search?q=componentWillMount&type=issues)，尚未被 close，待作者維護更新 :cry:

![React Warning](https://i.imgur.com/VhNMJDw.png)

<br/>

### 工具問題 - Vite

如果有使用 Vite 打包工具來開發，會遇到 `Uncaught ReferenceError: global is not defined` 的問題，可以在 `vite.config.ts` 定義 global

![vite global](https://i.imgur.com/ukH6Mbr.png)

```typescript
// vite.config.ts

// https://github.com/vitejs/vite/discussions/3859
export default defineConfig({
  ...,
  define: {
    global: "window"
  }
});
```

<br/>

### 2. 型別問題 - TypeScript

遇到 `Cannot find module 'braft-utils' or its corresponding type declarations.`，需自行為 `braft-utils` 新增型別聲明檔 `(*.d.ts)`

![editor.d.ts](https://i.imgur.com/LQQKnta.png)

```typescript
// editor.d.ts

// https://chocolate.blog.csdn.net/article/details/120787808
declare module "braft-utils" {
  const ContentUtils: any;
  export { ContentUtils };
}
```

<br/>

### 3. 環境問題 - NextJS

正常引入 `BraftEditor`，因為 SSR 關係，同時會 Server 和 Client 環境，在 Server 底下是沒有 window，所以會出現 `window is not defined`。

![ssr error](https://i.imgur.com/mml10Me.png)

```jsx
// Editor.tsx
import BraftEditor, { EditorState } from "braft-editor";
import { useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] =  useState<EditorState>(BraftEditor.createEditorState(''))

  return (
    <BraftEditor .../>
  )
}
```

<br/>

一開始先試 `if (typeof window !== "undefined")` 想繞開 Server，但依舊無效，放棄這條路。

第二次嘗試把 `BraftEditor` 用 dynamic import 方式，延遲載入 `<BraftEditor />` component，解決了 window 的 error，但得到了另一個 error `TypeError: BraftEditor.createEditorState is not a function`。

```tsx
const BraftEditor = dynamic(import("../components/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});
```

![dynamic error](https://i.imgur.com/SPOb4sT.png)

<br/>

這是為什麼？把滑鼠 hover 到 `BraftEditor` 可以看到 `const BraftEditor: ComponentType<Props>`，此時 `BraftEditor` 是代表一個 Component，而非原本 Class，導致在 useState 初始化時，無法使用 `createEditorState` 這個由 Class 提供的方法。

```tsx
// BraftEditor 是 Class 物件，擁有完整功能
import BraftEditor from "braft-editor";
```

```tsx
// BraftEditor 只是 component
const BraftEditor = dynamic(import('../components/Editor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})

const Editor = () => {
  // BraftEditor 不存在 createEditorState 方法
  const [editorState, setEditorState] =  useState<EditorState>(BraftEditor.createEditorState(''))
  ...
}
```

<br/>

最後解決方法是，在 `Editor.tsx` 是用 static import，父層使用 dynamic import，既可以繞過 Server，也同時讓 `BraftEditor` 擁有完整 Class 功能和兼具 Component 的角色。

```tsx
// index.tsx
const Editor = dynamic(import("../components/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const Home: NextPage = () => {
  const [text, setText] = useState("");

  return (
    <main>
      <Editor />
      ...
    </main>
  );
};
```

```tsx
// Editor.tsx
import BraftEditor, { EditorState } from "braft-editor";
import { useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    BraftEditor.createEditorState("")
  );

  return <BraftEditor value={editorState} onChange={setEditorState} />;
};
```

## 總結

### **優點：**

1. 可針對原有功能 icon 客製化，icon 也可接受 JSX 格式
2. 客製化 Toolbar 功能選項，也支援擴充新功能
3. 支援多語系
4. 支援客製化 Toolbar 和編輯區 css
5. 同時可支援圖片/影片/音源上傳

### **缺點**

1. Toolbar 位置無法自訂，與編輯區無法分離
2. npm 最後一版更新是在 2019，看 issues 別人提到作者目前沒太多時間可以維護
3. 超連結、媒體庫的 Model 樣式無法自訂
4. 繁體翻譯與台灣慣用詞彙不同，媒體庫的 Model 沒支援到繁體翻譯
5. 如有使用到更進階開發功能，會使用 `braft-utils` 等套件，TypeScript 支援度不好

針對後面兩點都有解決方案，但如果需要選擇有持續維護的套件就要慎入，或者主產品是編輯器的，強烈考慮使用 [Lexical](https://lexical.dev/)，是 Facebook 開發維護的，或 [Quill.js](https://quilljs.com/)，目前兩個都有持續更新 :+1:。

<br/>

在 Survey 編輯器期間，發現這其實是一個大坑，主要是很多套件，距離上一次更新都很久了，但其實現在手機各平台版本、瀏覽器版本、前端框架版本一直在推陳出新，如果編輯器版本更新跟不上，簡直是場災難。

<br/>

當初選擇 `braft-editor` 是因為底層是用 [Draft.js](https://draftjs.org/) 開發，包裝的功能也很完整，且想說如果 `braft-editor` 作者不維護的話，退一步還可以用 [Draft.js](https://draftjs.org/) (Facebook 家的)寫出想要功能，這樣轉移的痛感會比較低，想不到不到一年，Facebook 直接放棄開發 [Draft.js](https://draftjs.org/)，改推 [Lexical](https://lexical.dev/)，人算不如天算！不過根據朋友從 [Draft.js](https://draftjs.org/) 跳坑到 [Lexical](https://lexical.dev/) 經驗分享，體驗上是給予高度讚賞的，推薦入坑。
