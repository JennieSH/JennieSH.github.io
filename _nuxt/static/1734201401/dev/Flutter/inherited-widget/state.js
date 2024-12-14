window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1734201401",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FFlutter\u002Finherited-widget",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-Flutter-inherited-widget":{info:{title:b,fileName:"inherited-widget",description:"Inherited Widget 是 Flutter 用於處理資料共享的方法之一。",createdAt:c,updatedAt:c,tags:["Flutter","Inherited Widget"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EFlutter\u003C\u002Fcode\u003E、\u003Ccode\u003EInheritedWidget\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"[Note] Inherited Widget\" title=\"[Note] Inherited Widget\"\u003E[Note] Inherited Widget\u003C\u002Fh1\u003E\n\u003Ch2 id=\"基本概念\" title=\"基本概念\"\u003E\u003Ca href=\"#基本概念\"\u003E基本概念\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E 是一個可以向下傳遞資料的 Widget，在特定父 widget 通過 \u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E 共享了一份資料，就可以在其任意子 widget 中來獲取該共享的資料。\u003C\u002Fp\u003E\n\u003Cp\u003E下面會用簡單的範例來實作 \u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Ch2 id=\"需求\" title=\"需求\"\u003E\u003Ca href=\"#需求\"\u003E需求\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Cp\u003E點擊 \u003Ccode\u003Echange color\u003C\u002Fcode\u003E 按鈕(\u003Ccode\u003EOutlinedButton\u003C\u002Fcode\u003E)會改變底下兩個 \u003Ccode\u003EGO PageX\u003C\u002Fcode\u003E 按鈕(\u003Ccode\u003EElevatedButton\u003C\u002Fcode\u003E)的背景色\u003Cbr \u002F\u003E\n\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FYd8rTsF.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003Cli\u003E\n\u003Cp\u003EWidget Tree(同顏色為同一層)，右半部灰底，有另外抽成一個 widget(\u003Ccode\u003ERedirectButtons\u003C\u002Fcode\u003E)\u003Cbr \u002F\u003E\n\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FlwFE6Ow.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Ch2 id=\"實作\" title=\"實作\"\u003E\u003Ca href=\"#實作\"\u003E實作\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E範例原始碼：\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FJennieSH\u002Fflutter-appworks\u002Ftree\u002Ffeature\u002Finherited-widget\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ERepo 網址\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch3\u003EStep1. 創建一個 Inherited Widget 的 Class\u003C\u002Fh3\u003E\n\u003Cp\u003E新增 \u003Ccode\u003ETextColor\u003C\u002Fcode\u003E 檔案：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003ETextColor\u003C\u002Fcode\u003E 繼承 \u003Ccode\u003EInheritedWidget\u003C\u002Fcode\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E定義 \u003Ccode\u003EColor? color\u003C\u002Fcode\u003E 屬性，需要在子 widget 共享的資料\u003C\u002Fli\u003E\n\u003Cli\u003E定義 \u003Ccode\u003Eof\u003C\u002Fcode\u003E 方法，可以在子 widget 中取得共享的資料\u003C\u002Fli\u003E\n\u003Cli\u003E當 color 改變時候，\u003Ccode\u003EupdateShouldNotify\u003C\u002Fcode\u003E 會通知子 widget tree 中，有依賴到 color 的 widget 重新 build\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F text_color.dart\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F extend InheritedWidget\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003ETextColor\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Eextends\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EInheritedWidget\u003C\u002Fspan\u003E \u003C\u002Fspan\u003E{\n  TextColor({\n    \u003Cspan class=\"hljs-keyword\"\u003Esuper\u003C\u002Fspan\u003E.key,\n    \u003Cspan class=\"hljs-keyword\"\u003Erequired\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Esuper\u003C\u002Fspan\u003E.child,\n    \u003Cspan class=\"hljs-keyword\"\u003Erequired\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Ethis\u003C\u002Fspan\u003E.color,\n  });\n\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F shared data\u003C\u002Fspan\u003E\n  Color? color;\n\n  \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F return text color to widget\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-keyword\"\u003Estatic\u003C\u002Fspan\u003E Color of(BuildContext context) {\n    \u003Cspan class=\"hljs-keyword\"\u003Efinal\u003C\u002Fspan\u003E Color? textColor =\n        context.dependOnInheritedWidgetOfExactType&lt;TextColor&gt;()!.color;\n\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E textColor!;\n  }\n\n\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F this will notify all child widgets when there is a changes\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-meta\"\u003E@override\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-built_in\"\u003Ebool\u003C\u002Fspan\u003E updateShouldNotify(TextColor oldWidget) {\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E color != oldWidget.color;\n  }\n}\n\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep2. 使用 \u003Ccode\u003EInheritedWidgets\u003C\u002Fcode\u003E 實例，包覆父 Widget\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E使用 \u003Ccode\u003ETextColor\u003C\u002Fcode\u003E 包覆 Homepage 的 body\u003C\u002Fli\u003E\n\u003Cli\u003E傳入參數\n\u003Cul\u003E\n\u003Cli\u003E\u003Ccode\u003Ecolor\u003C\u002Fcode\u003E：要共享的資料\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ccode\u003Echild\u003C\u002Fcode\u003E：會使用到共享資料的子 widget tree\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F page_home.dart\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003E_HomePageState\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Eextends\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EState\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-title\"\u003EHomePage\u003C\u002Fspan\u003E&gt; \u003C\u002Fspan\u003E{\n  \u003Cspan class=\"hljs-built_in\"\u003Eint\u003C\u002Fspan\u003E _index = \u003Cspan class=\"hljs-number\"\u003E0\u003C\u002Fspan\u003E;\n  \u003Cspan class=\"hljs-built_in\"\u003EList\u003C\u002Fspan\u003E&lt;Color&gt; _colorList = [Colors.green, Colors.red, Colors.blue];\n\n  \u003Cspan class=\"hljs-meta\"\u003E@override\u003C\u002Fspan\u003E\n  Widget build(BuildContext context) {\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E Scaffold(\n      appBar: AppBar(\n        title: \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E Text(\u003Cspan class=\"hljs-string\"\u003E&quot;InheritedWidget&quot;\u003C\u002Fspan\u003E),\n      ),\n      \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F create InheritedWidgets\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F when color in TextColor change, all child Widget changed\u003C\u002Fspan\u003E\n      \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F now let&#x27;s create a button for multiple color changing\u003C\u002Fspan\u003E\n      body: TextColor(\n        color: _colorList[_index % \u003Cspan class=\"hljs-number\"\u003E3\u003C\u002Fspan\u003E],\n        child: Column(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            OutlinedButton.icon(\n              onPressed: () {\n                \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F press button to change color in list\u003C\u002Fspan\u003E\n                setState(() {\n                  _index++;\n                });\n              },\n              icon: \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E Icon(Icons.loop),\n              label: \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E Text(\u003Cspan class=\"hljs-string\"\u003E&#x27;change color&#x27;\u003C\u002Fspan\u003E),\n            ),\n            \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E RedirectButtons(),\n          ],\n        ),\n      ),\n    );\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep2. 子 Widget 取得共享資料\u003C\u002Fh3\u003E\n\u003Cul\u003E\n\u003Cli\u003E透過 \u003Ccode\u003Eof\u003C\u002Fcode\u003E 方法（\u003Ccode\u003ETextColor.of(context)\u003C\u002Fcode\u003E） 取得共享資料\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F redirect_buttons.dart\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-class\"\u003E\u003Cspan class=\"hljs-keyword\"\u003Eclass\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003E_RedirectButtonsState\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-keyword\"\u003Eextends\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-title\"\u003EState\u003C\u002Fspan\u003E&lt;\u003Cspan class=\"hljs-title\"\u003ERedirectButtons\u003C\u002Fspan\u003E&gt; \u003C\u002Fspan\u003E{\n  \u003Cspan class=\"hljs-meta\"\u003E@override\u003C\u002Fspan\u003E\n  Widget build(BuildContext context) {\n    \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F receive data from TextColor\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-keyword\"\u003Efinal\u003C\u002Fspan\u003E _color = TextColor.of(context);\n\n    \u003Cspan class=\"hljs-keyword\"\u003Ereturn\u003C\u002Fspan\u003E Row(\n      mainAxisAlignment: MainAxisAlignment.center,\n      children: [\n        ElevatedButton(\n            onPressed: () {\n              Navigator.of(context).push(\n                MaterialPageRoute(\n                  builder: (context) =&gt; PageA(color: _color),\n                ),\n              );\n            },\n            style: ButtonStyle(\n              backgroundColor: MaterialStateProperty.all(_color),\n            ),\n            child: \u003Cspan class=\"hljs-keyword\"\u003Econst\u003C\u002Fspan\u003E Text(\u003Cspan class=\"hljs-string\"\u003E&#x27;Go Page A&#x27;\u003C\u002Fspan\u003E)),\n        ...\n      ],\n    );\n  }\n}\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"解決了什麼問題？\" title=\"解決了什麼問題？\"\u003E\u003Ca href=\"#解決了什麼問題？\"\u003E解決了什麼問題？\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E主要\u003Cstrong\u003E解決跨 widget 共享資料問題\u003C\u002Fstrong\u003E，以上面例子來看，一般做法會在 page 層定義變數 color，當最底下的 \u003Ccode\u003EElevatedButton\u003C\u002Fcode\u003E 也需要使用到 color，color 會被當作 prop 一路往目標子 widget 傳遞：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FELK9pD5.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E經過改寫過後，\u003Ccode\u003ERedirectButtons\u003C\u002Fcode\u003E 內部可以透過 \u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E 直接拿到 page 層的 color 資料：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F68GXFEM.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E看似只節省一層傳遞（\u003Ccode\u003ERedirectButtons\u003C\u002Fcode\u003E 不需要再接收父層的 color），但如果現實 page 層和 \u003Ccode\u003ERedirectButtons\u003C\u002Fcode\u003E 中間隔了很多 widgets，且這些 widgets 也用不到變數 color，這功能就變得非常方便，因為大大\u003Cstrong\u003E解決 prop 傳遞過深問題\u003C\u002Fstrong\u003E。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FB9fGCml.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"注意事項\" title=\"注意事項\"\u003E\u003Ca href=\"#注意事項\"\u003E注意事項\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E 只有在資料發生變化時才會進行更新，如果需要強制更新，可以使用 setState 或者其他方法來實現\u003C\u002Fli\u003E\n\u003Cli\u003E需要共享不同的資料，可以定義不同的 \u003Ccode\u003EInherited Widget\u003C\u002Fcode\u003E，從而達到不同的共享資料的目的 (e.g. dialog 顯示狀態、toast 顯示狀態)\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fapi.flutter.dev\u002Fflutter\u002Fwidgets\u002FInheritedWidget-class.html\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EInheritedWidget class\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=tIAhnXXNB3w\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EFlutter InheritedWidget\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fbook.flutterchina.club\u002Fchapter7\u002Finherited_widget.html#_7-2-1-inheritedwidget\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E數據共享（InheritedWidget）\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n",toc:{title:b,subtitles:["基本概念","需求","實作","解決了什麼問題？","注意事項","參考資料"]},wordCount:735}}}}(null,"[Note] Inherited Widget","2024-12-15T00:00:00.000Z"));