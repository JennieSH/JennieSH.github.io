window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1715799250",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FMac\u002Fmac-setup",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-Mac-mac-setup":{info:{title:b,fileName:"mac-setup",description:"記錄剛拿到新電腦時，如何一步步調教成自己的熟悉開發環境！",createdAt:"2022-11-21T00:00:00.000Z",updatedAt:"2024-05-03T00:00:00.000Z",tags:["MacOS",c,"nvm","VScode"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EMacOS\u003C\u002Fcode\u003E、\u003Ccode\u003EHomebrew\u003C\u002Fcode\u003E、\u003Ccode\u003Envm\u003C\u002Fcode\u003E、\u003Ccode\u003EVScode\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"Mac 環境、工具建置\" title=\"Mac 環境、工具建置\"\u003EMac 環境、工具建置\u003C\u002Fh1\u003E\n\u003Cp\u003E因為最近剛換 MacBook Pro 14，趁這次機會，把自己順手的環境設定和工具整理一下，以後換電腦或工作，就能快速的把新電腦調教成熟悉的開發環境了🍺\u003C\u002Fp\u003E\n\u003Cp\u003E這系列懶人包會拆成好幾章，主要都是筆記步驟，如果更了解工具，基本都會附上相關連結，方便有興趣的人進一步去研究。\u003C\u002Fp\u003E\n\u003Ch2 id=\"Homebrew\" title=\"Homebrew\"\u003E\u003Ca href=\"#Homebrew\"\u003EHomebrew\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E用來管理 MacOS 上的軟體安裝，強推安裝 👍\u003C\u002Fp\u003E\n\u003Ch3\u003EStep 1. 安裝 Homebrew\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u002Fbin\u002Fbash -c \u003Cspan class=\"hljs-string\"\u003E&quot;\u003Cspan class=\"hljs-subst\"\u003E$(curl -fsSL https:\u002F\u002Fraw.githubusercontent.com\u002FHomebrew\u002Finstall\u002FHEAD\u002Finstall.sh)\u003C\u002Fspan\u003E&quot;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep 2. 設定 config\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002F1P1P7Cp.png\" alt=\"hombrew\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E雖然跑出 Installaltion successfull 訊息，但整個流程尚未結束，需要跟著下方提示三個步驟依序輸入(記得改成自己電腦的 username)：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-built_in\"\u003Eecho\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&#x27;# Set PATH, MANPATH, etc., for Homebrew.&#x27;\u003C\u002Fspan\u003E &gt;&gt; \u002FUsers\u002F{YOUR USER NAME}\u002F.zprofile\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-built_in\"\u003Eecho\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&#x27;eval $(\u002Fopt\u002Fhomebrew\u002Fbin\u002Fbrew shellenv)&#x27;\u003C\u002Fspan\u003E &gt;&gt; \u002FUsers\u002F{YOUR USER NAME}\u002F.zprofile\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-built_in\"\u003Eeval\u003C\u002Fspan\u003E $(\u002Fopt\u002Fhomebrew\u002Fbin\u002Fbrew shellenv)\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E可輸入指令，確認有無安裝成功，成功的話會出面版本訊息：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ebrew --version\n\u003Cspan class=\"hljs-comment\"\u003E#Homebrew 3.6.11\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-comment\"\u003E#Homebrew\u002Fhomebrew-core (git revision c5924a8dadc; last commit 2022-11-20)\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-comment\"\u003E#Homebrew\u002Fhomebrew-cask (git revision 94fa14b0a3; last commit 2022-11-20)\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E💡 \u003Cstrong\u003E補充\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E如果忘記輸入 \u003Ccode\u003ENext steps\u003C\u002Fcode\u003E 那三個步驟的話，後續使用 homebrew 指令時，會遇到 \u003Ca  href=\"https:\u002F\u002Fstackoverflow.com\u002Fquestions\u002F36657321\u002Fafter-installing-homebrew-i-get-zsh-command-not-found-brew\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Cstrong\u003E\u003Ccode\u003Ezsh: command not found: brew\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E 問題，遇到時，再補執行步驟即可。\u003C\u002Fp\u003E\n\u003Cp\u003E執行完畢後，在 terminal 輸入 \u003Ccode\u003Ebrew help\u003C\u002Fcode\u003E 或 \u003Ccode\u003Ebrew --version\u003C\u002Fcode\u003E，確認有沒有執行成功，只要不會再出現 \u003Ccode\u003Ezsh: command not found: brew\u003C\u002Fcode\u003E，就大功告成了。\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"Google Chrome\" title=\"Google Chrome\"\u003E\u003Ca href=\"#Google Chrome\"\u003EGoogle Chrome\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003EGoogle 家的瀏覽器，基本筆者開發常駐使用就是 chrome ＆ safari，也可選擇自己喜歡的瀏覽器安裝\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ebrew install --cask google-chrome\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"Git\" title=\"Git\"\u003E\u003Ca href=\"#Git\"\u003EGit\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E版本控制軟體，必裝清單之一\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ebrew install git\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"iTerms2 + oh-my-zsh\" title=\"iTerms2 + oh-my-zsh\"\u003E\u003Ca href=\"#iTerms2 + oh-my-zsh\"\u003EiTerms2 + oh-my-zsh\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Cstrong\u003EiTerms2\u003C\u002Fstrong\u003E 比 MAC 原生的 Terminal 提供\u003Ca  href=\"https:\u002F\u002Fapple.stackexchange.com\u002Fquestions\u002F25143\u002Fwhat-is-the-difference-between-iterm2-and-terminal\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E更多功能\u003C\u002Fa\u003E，可取代原生的終端機使用\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Cstrong\u003Eoh-my-zsh\u003C\u002Fstrong\u003E 為 zsh 的 framework，可用來管理 zsh 設定\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003Cp\u003E主要會安裝這兩個組合的最大原因，是為了美美的 command line 環境！！每次輸入指令時候，心情就會非常美麗～～\u003Cs\u003E我的快樂就是這麼樸實無華\u003C\u002Fs\u003E\u003C\u002Fp\u003E\n\u003Cp\u003Ep.s. 因為步驟比較多，設定會另外開一篇文章記錄\u003C\u002Fp\u003E\n\u003Ch2 id=\"VS code\" title=\"VS code\"\u003E\u003Ca href=\"#VS code\"\u003EVS code\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E微軟家的免費 IDE，另外常見 IDE 還有 \u003Ccode\u003EWebStorm\u003C\u002Fcode\u003E、\u003Ccode\u003ESublime\u003C\u002Fcode\u003E 等，一樣選擇自己喜歡的安裝即可～\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ebrew install --cask visual-studio-code\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"nvm - Node Version Manager\" title=\"nvm - Node Version Manager\"\u003E\u003Ca href=\"#nvm - Node Version Manager\"\u003Envm - Node Version Manager\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E可以使用 nvm 進行 node.js 版本管理，強推安裝 👍，可以優雅地在不同版本的 node.js 間切換 (因為有些舊專案，用新版的 node.js 執行會有問題，所以有時需要視專案，切換到舊版本)\u003C\u002Fp\u003E\n\u003Ch3\u003EStep 1. 安裝 nvm\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Ebrew install nvm\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003EStep 2. 設定 nvm\u003C\u002Fh3\u003E\n\u003Cp\u003E安裝完成後，依照提示依序完成初始步驟：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fi.imgur.com\u002FpSj0Uo5.png\" alt=\"nvm\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Cstrong\u003E新建 \u003Ccode\u003E.nvm\u003C\u002Fcode\u003E 目錄\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$mkdir\u003C\u002Fspan\u003E ~\u002F.nvm\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Col start=\"2\"\u003E\n\u003Cli\u003E\u003Cstrong\u003E設定 \u003Ccode\u003E\u002F.zshrc \u003C\u002Fcode\u003E 配置文件\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$vim\u003C\u002Fspan\u003E ~\u002F.zshrc\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E先輸入 \u003Ccode\u003Ei\u003C\u002Fcode\u003E 進入編輯，再貼上下面這段，輸入 \u003Ccode\u003E:wq\u003C\u002Fcode\u003E，存檔後離開\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Eexport NVM_DIR=&quot;$HOME\u002F.nvm&quot;\n[ -s &quot;\u002Fopt\u002Fhomebrew\u002Fopt\u002Fnvm\u002Fnvm.sh&quot; ] &amp;&amp; \\. &quot;\u002Fopt\u002Fhomebrew\u002Fopt\u002Fnvm\u002Fnvm.sh&quot;  # This loads nvm\n[ -s &quot;\u002Fopt\u002Fhomebrew\u002Fopt\u002Fnvm\u002Fetc\u002Fbash_completion.d\u002Fnvm&quot; ] &amp;&amp; \\. &quot;\u002Fopt\u002Fhomebrew\u002Fopt\u002Fnvm\u002Fetc\u002Fbash_completion.d\u002Fnvm&quot;  # This loads nvm bash_completion\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Col start=\"3\"\u003E\n\u003Cli\u003E\u003Cstrong\u003E使用 \u003Ccode\u003Esource\u003C\u002Fcode\u003E 重新執行初始化的配置\u003C\u002Fstrong\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$source\u003C\u002Fspan\u003E ~\u002F.zshrc\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E管理 node.js 版本\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003Envm ls-remote  \u003Cspan class=\"hljs-comment\"\u003E# 列出可安裝的版本\u003C\u002Fspan\u003E\nnvm \u003Cspan class=\"hljs-built_in\"\u003Els\u003C\u002Fspan\u003E  \u003Cspan class=\"hljs-comment\"\u003E# 列出本機已安裝的版本\u003C\u002Fspan\u003E\nnvm install &lt;version&gt; \u003Cspan class=\"hljs-comment\"\u003E# 安裝特定版本\u003C\u002Fspan\u003E\nnvm use &lt;version&gt; \u003Cspan class=\"hljs-comment\"\u003E# 切換特定版本\u003C\u002Fspan\u003E\nnode -v \u003Cspan class=\"hljs-comment\"\u003E# 查看目前使用的版本\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"Yarn\" title=\"Yarn\"\u003E\u003Ca href=\"#Yarn\"\u003EYarn\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E套件管理工具， 常見的有 \u003Ccode\u003Enpm\u003C\u002Fcode\u003E、\u003Ccode\u003Epnpm\u003C\u002Fcode\u003E 等，可擇一安裝使用\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$brew\u003C\u002Fspan\u003E install yarn\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Col\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fbrew.sh\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHomebrew\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fwww.google.com\u002Fintl\u002Fzh-TW\u002Fchrome\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGoogle Chrome\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgit-scm.com\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EGit\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fcode.visualstudio.com\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EVS code\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fnvm-sh\u002Fnvm\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Envm - Node Version Manager\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fclassic.yarnpkg.com\u002Fen\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EYarn\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fiterm2.com\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EiTerms2\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fohmyz.sh\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003Eoh-my-zsh\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fonejar99.com\u002Fmac-homebrew-homebrew-cask-mac\u002F#_Homebrew_Homebrew-Cask\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHomebrew 與 Homebrew-Cask —— 更快速、簡潔、優雅地管理你的 Mac 軟體套件\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fqizhanming.com\u002Fblog\u002F2020\u002F07\u002F29\u002Fhow-to-install-node-using-nvm-on-macos-with-brew\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EmacOS 上使用 brew 安裝 NVM 管理 node.js\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fpjchender.dev\u002Fnodejs\u002Fnvm\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E[NodeJS] 透過 NVM 安裝與使用 Node.js\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Fol\u003E\n",toc:{title:b,subtitles:[c,"Google Chrome","Git","iTerms2 + oh-my-zsh","VS code","nvm - Node Version Manager","Yarn","參考資料"]}}}}}(null,"Mac 環境、工具建置","Homebrew"));