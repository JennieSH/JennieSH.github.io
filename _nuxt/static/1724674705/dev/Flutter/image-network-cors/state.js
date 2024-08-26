window.__NUXT__=(function(a,b){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1724674705",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FFlutter\u002Fimage-network-cors",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-Flutter-image-network-cors":{info:{title:b,fileName:"image-network-cors",description:"Flutter 開發之踩坑日記：在 web 開發模式下，使用 Image.network() 圖片會載入失敗。",createdAt:"2024-04-14T00:00:00.000Z",updatedAt:"2024-08-26T00:00:00.000Z",tags:["Flutter","Image","Network","CORS"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EFlutter\u003C\u002Fcode\u003E、\u003Ccode\u003EBug\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"[Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗\" title=\"[Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗\"\u003E[Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗\u003C\u002Fh1\u003E\n\u003Ch2 id=\"問題\" title=\"問題\"\u003E\u003Ca href=\"#問題\"\u003E問題\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002Fqpnv0hu.jpg\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E使用 \u003Ccode\u003EImage.network()\u003C\u002Fcode\u003E，會跑出下面的錯誤訊息，而且只在 web 下才會出現，在 iOS\u002FAndroid 圖片都會順利顯示。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E══╡ EXCEPTION CAUGHT BY IMAGE RESOURCE SERVICE ╞════════════════════════════════════════════════════\u003Cbr \u002F\u003E\nThe following ImageCodecException was thrown resolving an image codec:\u003Cbr \u002F\u003E\nFailed to load network image.\u003Cbr \u002F\u003E\nImage URL: https:…\u003Cbr \u002F\u003E\nTrying to load an image from another domain? Find answers at:\u003Cbr \u002F\u003E\n\u003Ca  href=\"https:\u002F\u002Fflutter.dev\u002Fdocs\u002Fdevelopment\u002Fplatform-integration\u002Fweb-images\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Ehttps:\u002F\u002Fflutter.dev\u002Fdocs\u002Fdevelopment\u002Fplatform-integration\u002Fweb-images\u003C\u002Fa\u003E\u003Cbr \u002F\u003E\nWhen the exception was thrown, this was the stack\u003Cbr \u002F\u003E\nImage provider: NetworkImage(“https:\u002F\u002F…”, scale:1)\u003Cbr \u002F\u003E\nImage key: NetworkImage(“https:\u002F\u002F…”, scale: 1)\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Ch2 id=\"原因\" title=\"原因\"\u003E\u003Ca href=\"#原因\"\u003E原因\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003C!--\n~~在 [Github issue](https:\u002F\u002Fgithub.com\u002Fflutter\u002Fflutter\u002Fissues\u002F73327#issuecomment-764646411) 有看到相關討論，目前推測是 CanvasKit 問題，因為 `Web renderers` 預設值為 `auto`。~~\n\n --\u003E\n\u003Cp\u003E主要原因應該是 \u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fflutter\u002Fflutter\u002Fissues\u002F73109#issuecomment-790628014\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ECORS 問題\u003C\u002Fa\u003E，它可能會受到所使用的 web renderer 影響，解決方向主要有三個：\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E直接解決根本的 CORS 問題，需要請後端協助修改 headers 相關設定\u003C\u002Fli\u003E\n\u003Cli\u003E使用代理服務器： 設置一個代理服務器來轉發 client 請求\u003C\u002Fli\u003E\n\u003Cli\u003E方向就是修改 web renderer 設定\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cp\u003E以下解法基本是圍繞的第三個方向去解的。\u003Cbr \u002F\u003E\n\u003Cbr\u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E當 \u003Ccode\u003E--web-renderer=auto\u003C\u002Fcode\u003E(預設值)，會根據使用者的裝置，自動選擇最適合的 renderer，在 desktop browser 下，預設使用的就是 CanvasKit，需要指定成 \u003Ccode\u003Ehtml\u003C\u002Fcode\u003E，才能解決。\u003C\u002Fp\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E💡 \u003Cstrong\u003EFlutter 在 \u003Ca  href=\"https:\u002F\u002Fdocs.flutter.dev\u002Fdevelopment\u002Fplatform-integration\u002Fweb\u002Frenderers#command-line-options\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EWeb 平台上的渲染引擎設定\u003C\u002Fa\u003E，有三種可選擇：\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ccode\u003Ehtml\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E：使用瀏覽器原生的 HTML、CSS、JavaScript 來渲染應用程式，\u003Cstrong\u003E支援最廣泛但效能較差\u003C\u002Fstrong\u003E。\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ccode\u003Ecanvaskit\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E：使用 Skia Graphics Engine 將 Flutter 畫面轉換成 Canvas 元素，相較於 html 有較好的效能，但相容性較差。\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003E\u003Ccode\u003Eauto\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E：根據瀏覽器的支援度自動選擇渲染引擎，預設為 canvaskit，但若瀏覽器支援度足夠高則會自動切換為 html。\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"解決方法\" title=\"解決方法\"\u003E\u003Ca href=\"#解決方法\"\u003E解決方法\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E方法一：修改 Flutter 設定檔（一勞永逸）\u003C\u002Fh3\u003E\n\u003Cp\u003E找到 web 資料夾底下的 \u003Ccode\u003Eindex.html\u003C\u002Fcode\u003E 檔案，在 initializeEngine 設定中加入\u003Ccode\u003Erenderer:'html'\u003C\u002Fcode\u003E，之後不論是用 VS code debugging 或者終端機下 \u003Ccode\u003Eflutter run --debug -d chrome\u003C\u002Fcode\u003E，都可以順利看到圖片了。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002F\u002F index.html\n\n\u003Cspan class=\"hljs-meta\"\u003E&lt;!DOCTYPE \u003Cspan class=\"hljs-keyword\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E ... \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Escript\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003Cspan class=\"language-javascript\"\u003E\n    \u003Cspan class=\"hljs-variable language_\"\u003Ewindow\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003EaddEventListener\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-string\"\u003E&#x27;load&#x27;\u003C\u002Fspan\u003E, \u003Cspan class=\"hljs-keyword\"\u003Efunction\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003Eev\u003C\u002Fspan\u003E) {\n      _flutter.\u003Cspan class=\"hljs-property\"\u003Eloader\u003C\u002Fspan\u003E.\u003Cspan class=\"hljs-title function_\"\u003EloadEntrypoint\u003C\u002Fspan\u003E({\n        \u003Cspan class=\"hljs-attr\"\u003EserviceWorker\u003C\u002Fspan\u003E: {\n          \u003Cspan class=\"hljs-attr\"\u003EserviceWorkerVersion\u003C\u002Fspan\u003E: serviceWorkerVersion,\n        },\n        \u003Cspan class=\"hljs-attr\"\u003EonEntrypointLoaded\u003C\u002Fspan\u003E: \u003Cspan class=\"hljs-keyword\"\u003Efunction\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003EengineInitializer\u003C\u002Fspan\u003E) {\n          engineInitializer.\u003Cspan class=\"hljs-title function_\"\u003EinitializeEngine\u003C\u002Fspan\u003E({\n            \u003Cspan class=\"hljs-attr\"\u003Erenderer\u003C\u002Fspan\u003E:\u003Cspan class=\"hljs-string\"\u003E&#x27;html&#x27;\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E\u002F\u002F 這邊指定 renderer\u003C\u002Fspan\u003E\n          }).\u003Cspan class=\"hljs-title function_\"\u003Ethen\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-keyword\"\u003Efunction\u003C\u002Fspan\u003E(\u003Cspan class=\"hljs-params\"\u003EappRunner\u003C\u002Fspan\u003E) {\n            appRunner.\u003Cspan class=\"hljs-title function_\"\u003ErunApp\u003C\u002Fspan\u003E();\n          });\n        }\n      });\n    });\n  \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Escript\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F6UOb2Ot.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FJSSHPih.jpg\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cbr\u002F\u003E\n\u003Ch3\u003E方法二：passing flag (適合慣用 Terminal debugging 的人)\u003C\u002Fh3\u003E\n\u003Cp\u003E將指令後面多加 \u003Ccode\u003E--web-renderer html\u003C\u002Fcode\u003E，缺點是每次都要打這段\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$flutter\u003C\u002Fspan\u003E run -d chrome --web-renderer html\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cbr\u002F\u003E\n\u003Ch3\u003E方法三：修改 VS code 設定檔 (適合慣用 VS code debugging 的人)\u003C\u002Fh3\u003E\n\u003Cp\u003E因為是針對 VS code 設定，所以缺點也很明顯，將來如果不是透過 VS code run debugging (e.g. 透過 Terminal)，圖片依舊會跑不出來；優點則是只要設定一次即可，而且可以依據需求，選擇要 by 專案或者是 by User 去做設置。\u003C\u002Fp\u003E\n\u003Cbr\u002F\u003E\n\u003Cp\u003E下面兩種作法擇一即可，效果一樣：\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Ch4\u003E\u003Ccode\u003E直接新增設定檔\u003C\u002Fcode\u003E\u003C\u002Fh4\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E在專案底下，新增 \u003Ccode\u003E.vscode\u003C\u002Fcode\u003E 資料夾和 \u003Ccode\u003Esettings.json\u003C\u002Fcode\u003E 檔案，檔案內容為：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-punctuation\"\u003E{\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003E&quot;dart.flutterWebRenderer&quot;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-punctuation\"\u003E:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;html&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-punctuation\"\u003E}\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FH4kkBzv.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\n\u003Ch4\u003E\u003Ccode\u003E透過 GUI\u003C\u002Fcode\u003E\u003C\u002Fh4\u003E\n\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E從左下齒輪，找到 \u003Ccode\u003ESettings\u003C\u002Fcode\u003E，然後搜尋 \u003Ccode\u003Eflutter renderer\u003C\u002Fcode\u003E，將原本 \u003Ccode\u003EDart: Flutter Web Renderer\u003C\u002Fcode\u003E 由預設的 \u003Ccode\u003Eauto\u003C\u002Fcode\u003E 改為 \u003Ccode\u003Ehtml\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FQv0wTYY.png\" alt=\"\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fflutter\u002Fflutter\u002Fissues\u002F73109\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EImage.network() doesn’t show some images on the web but works on android.\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fflutter\u002Fflutter\u002Fissues\u002F73327\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E[web]: NetworkImage crash while loading images\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FDart-Code\u002FDart-Code\u002Fpull\u002F3000#issue-535900813\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EAdd a setting to easily set Flutter’s web renderer in user\u002Fworkspace settings\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FLunaGao\u002Fflag_flutter\u002Fissues\u002F49#issuecomment-803008314\" target=\"_blank\" rel=\"noreferrer noopener\"\u003ECapture from onError ImageCodecException\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fdocs.flutter.dev\u002Fdevelopment\u002Fplatform-integration\u002Fweb\u002Frenderers\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EWeb renderers\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fstackoverflow.com\u002Fquestions\u002F65653801\u002Fflutter-web-cant-load-network-image-from-another-domain\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EFlutter web can’t load network image from another domain\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n",toc:{title:b,subtitles:["問題","原因","解決方法","參考資料"]}}}}}(null,"[Debug] Flutter Image.network() 在 Web 下，圖片會載入失敗"));