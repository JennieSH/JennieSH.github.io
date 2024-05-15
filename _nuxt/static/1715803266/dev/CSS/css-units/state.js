window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1715803266",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FCSS\u002Fcss-units",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-CSS-css-units":{info:{title:b,fileName:"css-units",description:"一起認識 css 中常見的單位和它們的使用時機。",createdAt:c,updatedAt:c,tags:["CSS","CSS Units"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003ECSS\u003C\u002Fcode\u003E、\u003Ccode\u003ECSS Units\u003C\u002Fcode\u003E、\u003Ccode\u003Epx\u003C\u002Fcode\u003E、\u003Ccode\u003E％\u003C\u002Fcode\u003E、\u003Ccode\u003Eem\u003C\u002Fcode\u003E、\u003Ccode\u003Erem\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"CSS Units - px、％、em、rem\" title=\"CSS Units - px、％、em、rem\"\u003ECSS Units - px、％、em、rem\u003C\u002Fh1\u003E\n\u003Ch2 id=\"Absolute Units vs. Relative Units\" title=\"Absolute Units vs. Relative Units\"\u003E\u003Ca href=\"#Absolute Units vs. Relative Units\"\u003EAbsolute Units vs. Relative Units\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003EAbsolute Units 絕對單位\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E不受父元素或視窗大小影響，在\u003Cstrong\u003E任何裝置和瀏覽器，始終保持相同尺寸\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E如果不是做響應式網站\u002F專案或 window 始終是固定尺寸，沒縮放需求，可以考慮使用\u003C\u002Fli\u003E\n\u003Cli\u003E常見的單位為： \u003Ccode\u003Epx\u003C\u002Fcode\u003E、\u003Ccode\u003Ept\u003C\u002Fcode\u003E、\u003Ccode\u003Ecm\u003C\u002Fcode\u003E、\u003Ccode\u003Ein\u003C\u002Fcode\u003E 等\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E網頁開發最常用絕對單位為 \u003Ccode\u003Epx\u003C\u002Fcode\u003E，剩下的比較常用於印刷排版領域，所以在開發時會比較少見\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch3\u003ERelative Units 相對單位\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對於父元素或視窗大小進行縮放（取決於使用的單位）\u003C\u002Fli\u003E\n\u003Cli\u003E適合開發響應式網站\u003C\u002Fli\u003E\n\u003Cli\u003E常見的單位為： \u003Ccode\u003E%\u003C\u002Fcode\u003E、\u003Ccode\u003Eem\u003C\u002Fcode\u003E、\u003Ccode\u003Erem\u003C\u002Fcode\u003E、\u003Ccode\u003Evw\u003C\u002Fcode\u003E、\u003Ccode\u003Evh\u003C\u002Fcode\u003E 等\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"常見單位介紹\" title=\"常見單位介紹\"\u003E\u003Ca href=\"#常見單位介紹\"\u003E常見單位介紹\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003Epx\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E絕對單位\u003C\u002Fli\u003E\n\u003Cli\u003E尺寸在不同裝置要都顯示一樣，可以直接使用\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F* 手機或電腦上預覽，字體大小都會是一樣(16px) *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-selector-class\"\u003E.text\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E16px\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E%\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對單位：\u003Cstrong\u003E相對於父元素的大小\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E常用於調整 container 內的子元素大小或位置\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F* 子元素寬度永遠是父元素的 30%，父層寬度只要一改變，子元素寬度也會一起更新 *\u002F\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-selector-class\"\u003E.child\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Ewidth\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E30%\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003Eem\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對單位：視使用的情境，會有不同計算方式\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ccode\u003Efont-size\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E： \u003Cstrong\u003E相對於元素的父元素的字體大小\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\ni.e. 子元素的 \u003Ccode\u003Efont-size: 0.5em\u003C\u002Fcode\u003E，該子元素字體大小即為父元素的 0.5 倍\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ccode\u003Eother properties\u003C\u002Fcode\u003E(非字型大小的屬性)\u003C\u002Fstrong\u003E：\u003Cstrong\u003E相對於元素的當前字體大小\u003C\u002Fstrong\u003E\u003Cbr \u002F\u003E\ni.e. 元素的字體大小為\u003Ccode\u003E16px\u003C\u002Fcode\u003E，則 \u003Ccode\u003Ewidth: 2em\u003C\u002Fcode\u003E 將等於 \u003Ccode\u003E32px\u003C\u002Fcode\u003E (元素未設定字體大小，則繼承父元素的字體大小)\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E方面實現元素內部組件之間的比例關係\u003Cbr \u002F\u003E\ni.e. 想基於父元素字體大小，客製內部大\u002F中\u002F小相對字體\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Ehtml\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E16px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.grandparent\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E24px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.parent\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E20px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.child\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F* child 實際字體大小： 20px * 1.5 = 30px *\u002F\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E1.5em\u003C\u002Fspan\u003E;\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F* child 內距(非字型大小的屬性，與本身的 font-size 相關)： 30px * 2 = 60px *\u002F\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E2em\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cbr\u002F\u003E\n\u003Cp\u003E如果父元素未指定字型大小的值，則會在 DOM tree 向上尋找。如果一直到根元素（\u003Ccode\u003E&lt;html&gt;\u003C\u002Fcode\u003E）都沒有指定字型大小，則瀏覽器將使用預設值 \u003Ccode\u003E16px\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Ehtml\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E16px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.grandparent\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E24px\u003C\u002Fspan\u003E;\n}\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F* .parent {\n  font-size: 20px;\n} *\u002F\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-class\"\u003E.child\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F* child 實際字體大小(往外找到 .grandparent)： 24 * 1.5 = 36px *\u002F\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E1.5em\u003C\u002Fspan\u003E;\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F* child 內距： 36px * 2 = 72px *\u002F\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E2em\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003Erem (root em)\u003C\u002Fh3\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E這邊基本關係就是： root = 根元素 = \u003Ccode\u003E&lt;html&gt;\u003C\u002Fcode\u003E，\u003Ccode\u003E&lt;html&gt;\u003C\u002Fcode\u003E 未設定則瀏覽器將使用預設值 \u003Ccode\u003E16px\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對單位：\u003Cstrong\u003E相對於根元素的字型大小\u003C\u002Fstrong\u003E，根元素的字型大小為 \u003Ccode\u003E1rem\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E不受父元素的字體大小影響，解決 \u003Ccode\u003Eem\u003C\u002Fcode\u003E 缺點\u003Cbr \u002F\u003E\ni.e. 當標題設定為 \u003Ccode\u003Efont-size: 2rem\u003C\u002Fcode\u003E，使用在畫面任何一地方，標題大小都會相同\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003Evw\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對單位：\u003Cstrong\u003E相對於 viewport 的高度\u003C\u002Fstrong\u003E，\u003Ccode\u003E1vw\u003C\u002Fcode\u003E = viewport 高度的 1\u002F100\u003C\u002Fli\u003E\n\u003Cli\u003E元素如果需要針對 viewport\u002Fwindow 大小、位置有特殊需求可使用\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch3\u003Evh\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E相對單位：\u003Cstrong\u003E相對於 viewport 的寬度\u003C\u002Fstrong\u003E，\u003Ccode\u003E1vh\u003C\u002Fcode\u003E = viewport 寬度的 1\u002F100\u003C\u002Fli\u003E\n\u003Cli\u003E元素如果需要針對 viewport\u002Fwindow 大小、位置有特殊需求可使用\u003Cbr \u002F\u003E\ni.e. 畫面如果要撐滿整個視窗，高度可設置 100vh\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"em 和 rem 如何選擇\" title=\"em 和 rem 如何選擇\"\u003E\u003Ca href=\"#em 和 rem 如何選擇\"\u003Eem 和 rem 如何選擇\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E如果沒有特殊需求要使用絕對單位 i.e. \u003Ccode\u003Epx\u003C\u002Fcode\u003E，大部分會選擇相對單位開發響應式頁面，即可以隨著頁面大小自適應。\u003C\u002Fp\u003E\n\u003Cp\u003E大多數瀏覽器 \u003Ccode\u003E1rem\u003C\u002Fcode\u003E 和 \u003Ccode\u003E1em\u003C\u002Fcode\u003E 都等於 \u003Ccode\u003E16px\u003C\u002Fcode\u003E (root element)，但因為 em 會自動繼承其父元素字體大小，如果 DOM 層級過深，很容易會發生預期以外的效果，所以通常網頁開發會優先選擇 \u003Ccode\u003Erem\u003C\u002Fcode\u003E，來保持一致性和可預測性，如 \u003Ca  href=\"https:\u002F\u002Ftailwindcss.com\u002Fdocs\u002Fwidth\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Etailwindcss\u003C\u002Fa\u003E 用 \u003Ccode\u003Erem\u003C\u002Fcode\u003E 來制定寬度標準。\u003C\u002Fp\u003E\n\u003Cp\u003E除非是在需要只考慮附近父元素字體大小，才會選擇 \u003Ccode\u003Eem\u003C\u002Fcode\u003E，否則一率優先考慮 \u003Ccode\u003Erem\u003C\u002Fcode\u003E，總歸一句，先釐清設計需求，再進一步選擇需要的單位。\u003C\u002Fp\u003E\n\u003Ch3\u003Eem\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-class\"\u003E.parent\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E10px\u003C\u002Fspan\u003E;\n}\n\u003Cspan class=\"hljs-selector-class\"\u003E.child\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E2em\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;parent&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  第一層 - 10px\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    第二層 - 20px\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      第三層 - 40px\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n        第四層 - 80px\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv style=\"font-size: 10px;\"\u003E\n  第一層 - 10px\n  \u003Cdiv style=\"font-size: 2em;\"\u003E\n  第二層 - 20px\n    \u003Cdiv style=\"font-size: 2em;\"\u003E\n   第三層 - 40px\n      \u003Cdiv style=\"font-size: 2em;\"\u003E\n         第四層 - 80px\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003Erem\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Ehtml\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E16px\u003C\u002Fspan\u003E;\n}\n\u003Cspan class=\"hljs-selector-class\"\u003E.parent\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E10px\u003C\u002Fspan\u003E;\n}\n\u003Cspan class=\"hljs-selector-class\"\u003E.child\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Efont-size\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E2rem\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;parent&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  第一層 - 10px\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    第二層 - 16px\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n      第三層 - 16px\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;child&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n        第四層 - 16px\n      \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv style=\"font-size: 10px;\"\u003E\n  第一層 - 10px\n  \u003Cdiv style=\"font-size: 16px;\"\u003E\n   第二層 - 16px\n    \u003Cdiv style=\"font-size: 16px;\"\u003E\n     第三層 - 16px\n      \u003Cdiv style=\"font-size: 16px;\"\u003E\n       第四層 - 16px\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fdiv\u003E\n",toc:{title:b,subtitles:["Absolute Units vs. Relative Units","常見單位介紹","em 和 rem 如何選擇"]}}}}}(null,"CSS Units - px、％、em、rem","2023-06-06T00:00:00.000Z"));