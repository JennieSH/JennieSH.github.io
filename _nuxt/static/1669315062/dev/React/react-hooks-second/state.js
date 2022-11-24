window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1669315062",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FReact\u002Freact-hooks-second",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-React-react-hooks-second":{info:{title:b,fileName:"react-hooks-second",description:"內容為 useRef、useContext、useReducer 的整理。",createdAt:c,updatedAt:c,tags:["React","React Hooks"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EReact\u003C\u002Fcode\u003E、\u003Ccode\u003EReact Hooks\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"[Note] React Hooks 整理 (下)\" title=\"[Note] React Hooks 整理 (下)\"\u003E[Note] React Hooks 整理 (下)\u003C\u002Fh1\u003E\n\u003Cp\u003E此篇是關於 \u003Ccode\u003EuseRef\u003C\u002Fcode\u003E、\u003Ccode\u003EuseContext\u003C\u002Fcode\u003E、\u003Ccode\u003EuseReducer\u003C\u002Fcode\u003E 的介紹，其他 Hooks 可以參考上篇～\u003C\u002Fp\u003E\n\u003Cbr\u002F\u003E\n\u003Ctable\u003E\n\u003Cthead\u003E\n\u003Ctr\u003E\n\u003Cth\u003E文章\u003C\u002Fth\u003E\n\u003Cth\u003EHooks\u003C\u002Fth\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Fthead\u003E\n\u003Ctbody\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ca  href=\"https:\u002F\u002Fjenniesh.github.io\u002Fdev\u002FReact\u002Freact-hooks-first\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EReact Hooks 整理 (上)\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EuseState、useEffect、useLayoutEffect、useMemo、useCallback\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003Ctr\u003E\n\u003Ctd\u003E\u003Ca  href=\"https:\u002F\u002Fjenniesh.github.io\u002Fdev\u002FReact\u002Freact-hooks-second\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EReact Hooks 整理 (下)\u003C\u002Fa\u003E\u003C\u002Ftd\u003E\n\u003Ctd\u003EuseRef、useContext、useReducer\u003C\u002Ftd\u003E\n\u003C\u002Ftr\u003E\n\u003C\u002Ftbody\u003E\n\u003C\u002Ftable\u003E\n\u003Ch2 id=\"useRef\" title=\"useRef\"\u003E\u003Ca href=\"#useRef\"\u003EuseRef\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E使用方法\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 語法： const refContainer = useRef(初始值);\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E refCount = \u003Cspan class=\"hljs-title function_\"\u003EuseRef\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E);\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E重點\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E回傳一個 ref object，相當於 \u003Ccode\u003E{current: value}\u003C\u002Fcode\u003E，每次 render 時都會回傳\u003Cstrong\u003E同一個的 ref object\u003C\u002Fstrong\u003E，在 component 的生命週期將保持不變\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E.current\u003C\u002Fcode\u003E 值改變後，不會觸發重新 render\u003C\u002Fli\u003E\n\u003Cli\u003E使用情境：\n\u003Cul\u003E\n\u003Cli\u003E取得 dom\u003C\u002Fli\u003E\n\u003Cli\u003E紀錄前一次 render 的資料\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E範例\u003C\u002Fh3\u003E\n\u003Ch4\u003E情境一：取得 dom element\u003C\u002Fh4\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 點選按鈕後，input 框要 focus\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003ETextBlock\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F step 1: 宣告 inputEl 並使用 useRef\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E inputEl = \u003Cspan class=\"hljs-title function_\"\u003EuseRef\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-literal\"\u003Enull\u003C\u002Fspan\u003E);\n\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EonButtonClick\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n    \u003Cspan class=\"hljs-variable language_\"\u003Econsole\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003Elog\u003C\u002Fspan\u003E(inputEl.\u003Cspan class=\"hljs-property\"\u003Ecurrent\u003C\u002Fspan\u003E); \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F &lt;input type=&quot;text&quot;&gt;\u003C\u002Fspan\u003E\n    inputEl.\u003Cspan class=\"hljs-property\"\u003Ecurrent\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003Efocus\u003C\u002Fspan\u003E();\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n    \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;&gt;\u003C\u002Fspan\u003E\n      \u002F\u002F step 2: 使用 ref 綁在想取得的 dom\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Einput\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eref\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{inputEl}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;text&quot;\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonClick\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{onButtonClick}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EFocus the input\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cbr\u002F\u003E\n\u003Ch4\u003E情境二：紀錄前一次 render 的值 e.g. 想計算出總共 render 幾次\u003C\u002Fh4\u003E\n\u003Cul\u003E\n\u003Cli\u003E使用 useState 🚫\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 錯誤示範(導致無窮迴圈)： 使用 useState\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EName\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [name, setName] = \u003Cspan class=\"hljs-title function_\"\u003EuseState\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E);\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [renderCount, setRenderCount] = \u003Cspan class=\"hljs-title function_\"\u003EuseState\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E);\n\n  \u003Cspan class=\"hljs-title function_\"\u003EuseEffect\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E() =&gt;\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 在 useEffect 使用 setRenderCount 更新 renderCount\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 會造成無窮回圈： update state =&gt; compoment rerender =&gt; update state again =&gt; compoment rerender again =&gt; ..... =&gt; infinite loop\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-title function_\"\u003EsetRenderCount\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003EprevCount\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E prevCount + \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E);\n  });\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n    \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Einput\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Evalue\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{name}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;text&quot;\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonChange\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{e\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E setName(e.target.value)} \u002F&gt;\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{name}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EIt has been rendered {renderCount} times\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E使用 useRef\u003C\u002Fp\u003E\n\u003Cp\u003E利用 \u003Ccode\u003E.current\u003C\u002Fcode\u003E 值改變後，\u003Cstrong\u003E不會觸發重新 render\u003C\u002Fstrong\u003E，這一個特點，使用 \u003Ccode\u003E.current\u003C\u002Fcode\u003E 值來記錄和更新\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 使用 useRef\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EName\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [name, setName] = \u003Cspan class=\"hljs-title function_\"\u003EuseState\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E);\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E renderCount = \u003Cspan class=\"hljs-title function_\"\u003EuseRef\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E);\n\n  \u003Cspan class=\"hljs-title function_\"\u003EuseEffect\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E() =&gt;\u003C\u002Fspan\u003E {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F update state =&gt; compoment rerender =&gt; update renderCount.current\u003C\u002Fspan\u003E\n    renderCount.\u003Cspan class=\"hljs-property\"\u003Ecurrent\u003C\u002Fspan\u003E += \u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E;\n  },[name]);\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n    \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Einput\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Evalue\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{name}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;text&quot;\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonChange\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{e\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E setName(e.target.value)} \u002F&gt;\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{name}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EIt has been rendered {renderCount.current} times\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F0XnVYcJ.gif\" alt=\"useRef\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"useContext\" title=\"useContext\"\u003E\u003Ca href=\"#useContext\"\u003EuseContext\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E使用方法\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 語法： const value = useContext( 自訂的 Context );\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E value = \u003Cspan class=\"hljs-title function_\"\u003EuseContext\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-title class_\"\u003EMyContext\u003C\u002Fspan\u003E);\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E重點\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E在 \u003Ccode\u003EMyContext\u003C\u002Fcode\u003E provider (\u003Ccode\u003E&lt;MyContext.Provider value={value}&gt;\u003C\u002Fcode\u003E)內的組件，都可以透過 \u003Ccode\u003EuseContext\u003C\u002Fcode\u003E 取得 \u003Ccode\u003EMyContext\u003C\u002Fcode\u003E value 值\u003C\u002Fli\u003E\n\u003Cli\u003E可以跨組件取值，解決需要用 props 一層層傳值下去的問題\u003Cbr \u002F\u003E\n(組件 A ➡️ 組件 B ➡️ 組件 C，C 需要 A 傳入的 props，但 B 卻不需要 A 傳入的 props)\u003C\u002Fli\u003E\n\u003Cli\u003E呼叫 \u003Ccode\u003EuseContext\u003C\u002Fcode\u003E 的組件會在 context 值更新時重新渲染\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E範例\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E initDarkThemeStatus = \u003Cspan class=\"hljs-literal\"\u003Efalse\u003C\u002Fspan\u003E;\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 1. 先 createContext\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title class_\"\u003EThemeContext\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-title function_\"\u003EcreateContext\u003C\u002Fspan\u003E(initDarkThemeStatus);\n\n\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Child Component\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EChild\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 3. 在子組件使用 useContext，取得 value\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E darkTheme = \u003Cspan class=\"hljs-title function_\"\u003EuseContext\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-title class_\"\u003EThemeContext\u003C\u002Fspan\u003E);\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E theme = {\n    \u003Cspan class=\"hljs-attr\"\u003Ecolor\u003C\u002Fspan\u003E: darkTheme ? \u003Cspan class=\"hljs-string\"\u003E&quot;white&quot;\u003C\u002Fspan\u003E : \u003Cspan class=\"hljs-string\"\u003E&quot;black&quot;\u003C\u002Fspan\u003E,\n    \u003Cspan class=\"hljs-attr\"\u003EbackgroundColor\u003C\u002Fspan\u003E: darkTheme ? \u003Cspan class=\"hljs-string\"\u003E&quot;black&quot;\u003C\u002Fspan\u003E : \u003Cspan class=\"hljs-string\"\u003E&quot;white&quot;\u003C\u002Fspan\u003E\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{theme}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EChild Component\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E;\n};\n\n\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Parent Component\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EParent\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [darkTheme, setDarkTheme] = \u003Cspan class=\"hljs-title function_\"\u003EuseState\u003C\u002Fspan\u003E(initDarkThemeStatus);\n\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EtoggleTheme\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n    \u003Cspan class=\"hljs-title function_\"\u003EsetDarkTheme\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003EprevDarkTheme\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E !prevDarkTheme);\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n      \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 2. 在父組件使用 Provider，並傳入 value\u003C\u002Fspan\u003E\n     \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003EThemeContext.Provider\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Evalue\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{darkTheme}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n       \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonClick\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{toggleTheme}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EToggle Theme\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n       \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003EChild\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n     \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003EThemeContext.Provider\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"useReducer\" title=\"useReducer\"\u003E\u003Ca href=\"#useReducer\"\u003EuseReducer\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E使用方法\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 語法： const [state, dispatch] = useReducer(reducer, initialArg, init);\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [state, dispatch] = \u003Cspan class=\"hljs-title function_\"\u003EuseReducer\u003C\u002Fspan\u003E(reducer, { \u003Cspan class=\"hljs-attr\"\u003Ecount\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E });\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E重點\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E進階版的 \u003Ccode\u003EuseState\u003C\u002Fcode\u003E (p.s. \u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Ffacebook\u002Freact\u002Fblob\u002F5f06576f51ece88d846d01abd2ddd575827c6127\u002Fpackages\u002Freact-reconciler\u002Fsrc\u002FReactFiberHooks.js#L336\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003EuseState\u003C\u002Fcode\u003E\u003C\u002Fa\u003E 底層是用 \u003Ccode\u003EuseReducer\u003C\u002Fcode\u003E 實現)\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Edispatch =&gt; reducer =&gt; state\u003C\u002Fcode\u003E，集中在 \u003Ccode\u003Ereducer\u003C\u002Fcode\u003E 執行 state 修改，組件內不直接對 state 操作\u003C\u002Fli\u003E\n\u003Cli\u003Ereducer 與組件間傳參數：\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 組件 - 傳 name\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-title function_\"\u003Edispatch\u003C\u002Fspan\u003E({ \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EADD_TODO\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-attr\"\u003Epayload\u003C\u002Fspan\u003E: { name }});\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F reducer - 接收 name\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003Ereducer\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003Estate, action\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Eswitch\u003C\u002Fspan\u003E (action.\u003Cspan class=\"hljs-property\"\u003Etype\u003C\u002Fspan\u003E) {\n    \u003Cspan class=\"hljs-keyword\"\u003Ecase\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EADD_TODO\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E [...state, \u003Cspan class=\"hljs-title function_\"\u003EnewTodo\u003C\u002Fspan\u003E(action.\u003Cspan class=\"hljs-property\"\u003Epayload\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Ename\u003C\u002Fspan\u003E)];\n    ...,\n    \u003Cspan class=\"hljs-attr\"\u003Edefault\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E state;\n  }\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cul\u003E\n\u003Cli\u003E可傳入\u003Ca  href=\"https:\u002F\u002Fzh-hant.reactjs.org\u002Fdocs\u002Fhooks-reference.html#lazy-initialization\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E第三個參數(function)\u003C\u002Fa\u003E\n\u003Cul\u003E\n\u003Cli\u003E計算初始 state 的邏輯提取到 reducer 外\u003C\u002Fli\u003E\n\u003Cli\u003E方便重置 state\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E適用\u003Cstrong\u003E複雜的 state 邏輯修改\u003C\u002Fstrong\u003E情境 e.g. 計算機可以使用加減乘除修改原先的值、同列表排序(更新時間、創建時間、名字 etc.)\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003E範例\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Todos.jsx\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E = {\n  \u003Cspan class=\"hljs-attr\"\u003EADD_TODO\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;add-todo&quot;\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003ETOGGLE_TODO\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;toggle_todo&quot;\u003C\u002Fspan\u003E,\n  \u003Cspan class=\"hljs-attr\"\u003EDELETE\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-string\"\u003E&quot;delete-todo&quot;\u003C\u002Fspan\u003E\n};\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EnewTodo\u003C\u002Fspan\u003E = name =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E { \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-title class_\"\u003EDate\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003Enow\u003C\u002Fspan\u003E(), \u003Cspan class=\"hljs-attr\"\u003Ename\u003C\u002Fspan\u003E: name, \u003Cspan class=\"hljs-attr\"\u003Ecomplete\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-literal\"\u003Efalse\u003C\u002Fspan\u003E };\n};\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 2. 撰寫 reducer\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003Ereducer\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003Estate, action\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Eswitch\u003C\u002Fspan\u003E (action.\u003Cspan class=\"hljs-property\"\u003Etype\u003C\u002Fspan\u003E) {\n    \u003Cspan class=\"hljs-keyword\"\u003Ecase\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EADD_TODO\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E [...state, \u003Cspan class=\"hljs-title function_\"\u003EnewTodo\u003C\u002Fspan\u003E(action.\u003Cspan class=\"hljs-property\"\u003Epayload\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Ename\u003C\u002Fspan\u003E)];\n    \u003Cspan class=\"hljs-keyword\"\u003Ecase\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003ETOGGLE_TODO\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E state.\u003Cspan class=\"hljs-title function_\"\u003Emap\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003Etodo\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E {\n        \u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E (todo.\u003Cspan class=\"hljs-property\"\u003Eid\u003C\u002Fspan\u003E === action.\u003Cspan class=\"hljs-property\"\u003Epayload\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eid\u003C\u002Fspan\u003E) \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E { ...todo, \u003Cspan class=\"hljs-attr\"\u003Ecomplete\u003C\u002Fspan\u003E: !todo.\u003Cspan class=\"hljs-property\"\u003Ecomplete\u003C\u002Fspan\u003E };\n        \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E todo;\n      });\n    \u003Cspan class=\"hljs-keyword\"\u003Ecase\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EDELETE\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E state.\u003Cspan class=\"hljs-title function_\"\u003Efilter\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-function\"\u003E\u003Cspan class=\"hljs-params\"\u003Etodo\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E todo.\u003Cspan class=\"hljs-property\"\u003Eid\u003C\u002Fspan\u003E !== action.\u003Cspan class=\"hljs-property\"\u003Epayload\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003Eid\u003C\u002Fspan\u003E);\n    \u003Cspan class=\"hljs-attr\"\u003Edefault\u003C\u002Fspan\u003E:\n      \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E state;\n  }\n};\n\n\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003ETodos\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 1. 使用 useReducer，並傳入初始值\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [todos, dispatch] = \u003Cspan class=\"hljs-title function_\"\u003EuseReducer\u003C\u002Fspan\u003E(reducer, []);\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E [name, setName] = \u003Cspan class=\"hljs-title function_\"\u003EuseState\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E);\n\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EhandleSubmit\u003C\u002Fspan\u003E = e =&gt; {\n    e.\u003Cspan class=\"hljs-title function_\"\u003EpreventDefault\u003C\u002Fspan\u003E();\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Step 3. dispatch action\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-title function_\"\u003Edispatch\u003C\u002Fspan\u003E({ \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EADD_TODO\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-attr\"\u003Epayload\u003C\u002Fspan\u003E: { name } });\n    \u003Cspan class=\"hljs-title function_\"\u003EsetName\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&quot;&quot;\u003C\u002Fspan\u003E);\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EhandleToggle\u003C\u002Fspan\u003E = id =&gt; {\n    \u003Cspan class=\"hljs-title function_\"\u003Edispatch\u003C\u002Fspan\u003E({ \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003ETOGGLE_TODO\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-attr\"\u003Epayload\u003C\u002Fspan\u003E: { id } });\n    \u003Cspan class=\"hljs-variable language_\"\u003Econsole\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003Elog\u003C\u002Fspan\u003E(todos);\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003EhandleDelete\u003C\u002Fspan\u003E = id =&gt; {\n    \u003Cspan class=\"hljs-title function_\"\u003Edispatch\u003C\u002Fspan\u003E({ \u003Cspan class=\"hljs-attr\"\u003Etype\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-variable constant_\"\u003EACTION\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-property\"\u003EDELETE\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-attr\"\u003Epayload\u003C\u002Fspan\u003E: { id } });\n  };\n\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n    \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Eform\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonSubmit\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{handleSubmit}\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n        \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Einput\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Evalue\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{name}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonChange\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{e\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E setName(e.target.value)} \u002F&gt;\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Eform\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n      {todos.map(todo =&gt; (\n        \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003ETodo\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ekey\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{todo.id}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Etodo\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{todo}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EhandleToggle\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{handleToggle}\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EhandleDelete\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{handleDelete}\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n      ))}\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F Todo.jsx\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title function_\"\u003ETodo\u003C\u002Fspan\u003E = (\u003Cspan class=\"hljs-params\"\u003E{ todo, handleToggle, handleDelete }\u003C\u002Fspan\u003E) =&gt; {\n  \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E (\n    \u003Cspan class=\"language-xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{{\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ecolor:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Etodo.complete\u003C\u002Fspan\u003E ? &quot;\u003Cspan class=\"hljs-attr\"\u003Egreen\u003C\u002Fspan\u003E&quot; \u003Cspan class=\"hljs-attr\"\u003E:\u003C\u002Fspan\u003E &quot;\u003Cspan class=\"hljs-attr\"\u003Ered\u003C\u002Fspan\u003E&quot; }}&gt;\u003C\u002Fspan\u003E{todo.name}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Espan\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonClick\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{()\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E handleToggle(todo.id)}&gt;Toggle\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003EonClick\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E{()\u003C\u002Fspan\u003E =&gt;\u003C\u002Fspan\u003E handleDelete(todo.id)}&gt;Delete\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebutton\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n  );\n};\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Freactjs.org\u002Fdocs\u002Fgetting-started.html\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EReact 官方文件\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.youtube.com\u002Fplaylist?list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EWeb Dev Simplified - React Hooks\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n",toc:{title:b,subtitles:["useRef","useContext","useReducer","參考資料"]}}}}}(null,"[Note] React Hooks 整理 (下)","2021-12-08T00:00:00.000Z"));