window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1734246403",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FCSS\u002Fcss-specificity",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-CSS-css-specificity":{info:{title:b,fileName:"css-specificity",description:"css 顯示規則介紹",createdAt:c,updatedAt:c,tags:["CSS","CSS Specificity"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003ECSS\u003C\u002Fcode\u003E、\u003Ccode\u003ECSS Specificity\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"CSS Specificity (權重)\" title=\"CSS Specificity (權重)\"\u003ECSS Specificity (權重)\u003C\u002Fh1\u003E\n\u003Cp\u003ECSS Specificity 是用來決定當多個 CSS 規則作用在同一個元素時，哪一個規則會優先生效的機制，\u003Cstrong\u003E權重越高，優先級越高\u003C\u002Fstrong\u003E。\u003C\u002Fp\u003E\n\u003Ch2 id=\"CSS 權重的基本規則\" title=\"CSS 權重的基本規則\"\u003E\u003Ca href=\"#CSS 權重的基本規則\"\u003ECSS 權重的基本規則\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E相同權重時\u003C\u002Fstrong\u003E，後寫的 CSS 覆蓋先寫的 CSS。\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E不同權重時\u003C\u002Fstrong\u003E，權重高的規則優先生效。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"CSS 權重優先級順序\" title=\"CSS 權重優先級順序\"\u003E\u003Ca href=\"#CSS 權重優先級順序\"\u003ECSS 權重優先級順序\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ccode\u003E!important\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003EInline style\u003C\u002Fli\u003E\n\u003Cli\u003EID 選擇器\u003C\u002Fli\u003E\n\u003Cli\u003EClass、Pseudo-class (偽類)、Attribute (屬性選擇器)\u003C\u002Fli\u003E\n\u003Cli\u003EElement\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003E*\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch2 id=\"Specificity 的權重表示法\" title=\"Specificity 的權重表示法\"\u003E\u003Ca href=\"#Specificity 的權重表示法\"\u003ESpecificity 的權重表示法\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003ECSS Specificity 通常以四個數字的格式表示：\u003Cbr \u002F\u003E\n\u003Ccode\u003Ea-b-c-d\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003Ea\u003C\u002Fstrong\u003E: \u003Ccode\u003E!important\u003C\u002Fcode\u003E 的數量（極高優先權）\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Eb\u003C\u002Fstrong\u003E: \u003Ccode\u003Einline style\u003C\u002Fcode\u003E 的數量\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Ec\u003C\u002Fstrong\u003E: \u003Ccode\u003EID\u003C\u002Fcode\u003E 的數量\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Ed\u003C\u002Fstrong\u003E: \u003Ccode\u003Eclass\u003C\u002Fcode\u003E、\u003Ccode\u003Epseudo-class\u003C\u002Fcode\u003E、\u003Ccode\u003Eattribute\u003C\u002Fcode\u003E 和 \u003Ccode\u003Eelement\u003C\u002Fcode\u003E 的數量\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"權重範例\" title=\"權重範例\"\u003E\u003Ca href=\"#權重範例\"\u003E權重範例\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E* : \u003Ccode\u003E0-0-0-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E適用於全站的預設值，權重最低。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E* {\n    \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E\n    margin: \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E\n }\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EElement : \u003Ccode\u003E0-0-0-1\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E所有的 HTML 元素，例如 div, p, ul, li 等，每個元素的權重都是 \u003Ccode\u003E0-0-0-1\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Ediv\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E20px\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003Eclass : \u003Ccode\u003E0-0-1-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E每一個 class 的權重都是 \u003Ccode\u003E0-0-1-0\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-class\"\u003E.box\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E20px\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EPseudo-class (偽類) : \u003Ccode\u003E0-0-1-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E與 Class 相同的權重，適用於 \u003Ccode\u003E:hover\u003C\u002Fcode\u003E、\u003Ccode\u003E:focus\u003C\u002Fcode\u003E、\u003Ccode\u003E:nth-child()\u003C\u002Fcode\u003E等。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Ea\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-pseudo\"\u003E:hover\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Ecolor\u003C\u002Fspan\u003E: red;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EAttribute 選擇器：\u003Ccode\u003E0-0-1-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E屬性選擇器的權重與 Class 相同。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Einput\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-attr\"\u003E[type=\u003Cspan class=\"hljs-string\"\u003E&quot;email&quot;\u003C\u002Fspan\u003E]\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Eborder\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E1px\u003C\u002Fspan\u003E solid \u003Cspan class=\"hljs-number\"\u003E#ccc\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EID 選擇器：\u003Ccode\u003E0-1-0-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003E每個 ID 的權重為 \u003Ccode\u003E0-1-0-0\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-id\"\u003E#home\u003C\u002Fspan\u003E {\n  \u003Cspan class=\"hljs-attribute\"\u003Epadding\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E20px\u003C\u002Fspan\u003E;\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EInline Style：\u003Ccode\u003E1-0-0-0\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cp\u003Einline style 的權重為 \u003Ccode\u003E1-0-0-0\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E補充：inline style attribute 指的就是寫在 html 行內的 style。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E&quot;color:red&quot;\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003ECSS Specificity\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ediv\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E!important : 王者\u003C\u002Fh3\u003E\n\u003Cp\u003E!important 的權重非常高，能覆蓋所有其他規則。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-class\"\u003E.product\u003C\u002Fspan\u003E{\n    \u003Cspan class=\"hljs-attribute\"\u003Ewidth\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-number\"\u003E200px\u003C\u002Fspan\u003E;!important\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"練習\" title=\"練習\"\u003E\u003Ca href=\"#練習\"\u003E練習\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-selector-tag\"\u003Eul\u003C\u002Fspan\u003E&gt;\u003Cspan class=\"hljs-selector-tag\"\u003Eli\u003C\u002Fspan\u003E ：都是 element 所以加起來是 \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E2\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-tag\"\u003Ebody\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Ediv\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Eul\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Eli\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Ea\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Espan\u003C\u002Fspan\u003E ：總共 \u003Cspan class=\"hljs-number\"\u003E6\u003C\u002Fspan\u003E 個 element 所以加起來是 \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E6\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-tag\"\u003Eli\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-class\"\u003E.myclass\u003C\u002Fspan\u003E ：一個 element 加上一個 class ，所以是 \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-tag\"\u003Eli\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-class\"\u003E.myclass\u003C\u002Fspan\u003E ~ \u003Cspan class=\"hljs-selector-tag\"\u003Eli\u003C\u002Fspan\u003E ：兩個 element 加上一個 class ，所以是 \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E2\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-selector-tag\"\u003Eform\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-selector-tag\"\u003Einput\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-selector-attr\"\u003E[type=email]\u003C\u002Fspan\u003E ：兩個 element 、一個 attribute，所以是 \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E1\u003C\u002Fspan\u003E-\u003Cspan class=\"hljs-number\"\u003E2\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"結論\" title=\"結論\"\u003E\u003Ca href=\"#結論\"\u003E結論\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003ECSS 規則的優先級排列為：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003E!important &gt; Inline style &gt; ID &gt; Class\u002FPseudo-class\u002FAttribute &gt; Element &gt; *\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E善用 Specificity 計算，可以更精確地控制樣式的應用順序，避免發生樣式覆蓋問題。\u003C\u002Fp\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.oxxostudio.tw\u002Farticles\u002F201405\u002Fcss-specificity.html\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ECSS Specificity\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fithelp.ithome.com.tw\u002Farticles\u002F10196454\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ECSS 權重\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n",toc:{title:b,subtitles:["CSS 權重的基本規則","CSS 權重優先級順序","Specificity 的權重表示法","權重範例","練習","結論","參考資料"]},wordCount:564}}}}(null,"CSS Specificity (權重)","2024-12-15T00:00:00.000Z"));