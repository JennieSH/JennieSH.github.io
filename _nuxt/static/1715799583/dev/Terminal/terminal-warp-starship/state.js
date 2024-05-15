window.__NUXT__=(function(a,b,c){return {staticAssetsBase:"\u002F_nuxt\u002Fstatic\u002F1715799583",layout:"default",error:a,serverRendered:true,routePath:"\u002Fdev\u002FTerminal\u002Fterminal-warp-starship",config:{_app:{basePath:"\u002F",assetsPath:"\u002F_nuxt\u002F",cdnURL:a}},globalRefs:{},ssrRefs:{"articleMatter-Terminal-terminal-warp-starship":{info:{title:b,fileName:"terminal-warp-starship",description:"入坑 Warp，第一步就是客製化它！ 第二彈 feat. Starship",createdAt:c,updatedAt:c,tags:["MacOS","Warp","terminal","productivity","Starship"]},content:"\u003Ch6\u003Etags: \u003Ccode\u003EMacOS\u003C\u002Fcode\u003E、\u003Ccode\u003EWarp\u003C\u002Fcode\u003E、\u003Ccode\u003EStarship\u003C\u002Fcode\u003E、\u003Ccode\u003Eterminal\u003C\u002Fcode\u003E、\u003Ccode\u003Eproductivity\u003C\u002Fcode\u003E\u003C\u002Fh6\u003E\n\u003Ch1 id=\"客製化 command line - Warp + Starship\" title=\"客製化 command line - Warp + Starship\"\u003E客製化 command line - Warp + Starship\u003C\u002Fh1\u003E\n\u003Cp\u003E此篇文章是參考 \u003Ca  href=\"https:\u002F\u002Fdev.to\u002Ftherubberduckiee\u002Fhow-to-configure-starship-to-look-exactly-like-p10k-zsh-warp-h9h\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHow to Configure Starship to Look Exactly Like P10K\u003C\u002Fa\u003E 來設定樣式，因原文章有段時間了，所以這次跑安裝流程也有踩到一些坑，順手紀錄一下如何使用 Starship 來客製化 Warp 的 command line。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FrJXMJ4_j3.png\" alt=\"warp\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FBJE0vOzXR.png\" alt=\"warp\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E上面兩張圖分別是 Before(預設) 和 After(Starship)～\u003C\u002Fp\u003E\n\u003Ch2 id=\"安裝 Warp\" title=\"安裝 Warp\"\u003E\u003Ca href=\"#安裝 Warp\"\u003E安裝 Warp\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$brew\u003C\u002Fspan\u003E install --cask warp\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch2 id=\"設定字體\" title=\"設定字體\"\u003E\u003Ca href=\"#設定字體\"\u003E設定字體\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E為了順利顯示各種 icons，字體需要更改成 Nerd Font：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u003Ccode\u003ESettings\u003C\u002Fcode\u003E -&gt; \u003Ccode\u003EAppearance\u003C\u002Fcode\u003E -&gt; \u003Ccode\u003EText\u003C\u002Fcode\u003E -&gt; \u003Ccode\u003ETerminal font\u003C\u002Fcode\u003E 改成 \u003Ccode\u003EMesloGS NF\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E筆者是使用 \u003Ccode\u003EMesloGS Nerd Font\u003C\u002Fcode\u003E，可自行選擇下載的版本。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FByAkVwSin.png\" alt=\"設定字體\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cdiv class=\"info\"\u003E\n\u003Cp\u003E💡 \u003Cstrong\u003ENerd Font 相關下載點：\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Feng.m.fontke.com\u002Ffont\u002F24637081\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003EDroidSansMono Nerd Font\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fromkatv\u002Fpowerlevel10k#meslo-nerd-font-patched-for-powerlevel10k\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E\u003Ccode\u003EMesloGS Nerd Font\u003C\u002Fcode\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"安裝 Starship\" title=\"安裝 Starship\"\u003E\u003Ca href=\"#安裝 Starship\"\u003E安裝 Starship\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E筆者環境是使用 \u003Ca  href=\"https:\u002F\u002Fbrew.sh\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHomebrew\u003C\u002Fa\u003E (套件管理器)＋ Zsh (Shell)，如果是使用其他的，可以參考 \u003Ca  href=\"https:\u002F\u002Fstarship.rs\u002Fzh-TW\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EStarship\u003C\u002Fa\u003E 的安裝設定。\u003C\u002Fp\u003E\n\u003Ch3\u003E1. 安裝\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$brew\u003C\u002Fspan\u003E install starship\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E2. 初始化腳本 (script)\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$vi\u003C\u002Fspan\u003E ~\u002F.zshrc\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E先輸入 \u003Ccode\u003Ei\u003C\u002Fcode\u003E 進入 insert 模式，將以下內容放在最底部：\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Ccode\u003Eeval &quot;$(starship init zsh)&quot;\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E按 \u003Ccode\u003Eesc\u003C\u002Fcode\u003E 結束編輯，輸入 \u003Ccode\u003Ewq\u003C\u002Fcode\u003E，存檔離開。\u003C\u002Fp\u003E\n\u003Cdiv class=\"warning\"\u003E\n\u003Cp\u003E⚠️ \u003Cstrong\u003E注意\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E如果之前電腦設定過 iTerms + powerlevel10k，這邊會踩到一個坑，zsh 會一直套用 powerlevel10k，沒辦法看到 Starship prompt。\u003C\u002Fp\u003E\n\u003Cp\u003E解決辦法是\u003Ca  href=\"https:\u002F\u002Fgithub.com\u002Fwarpdotdev\u002FWarp\u002Fissues\u002F1518#issuecomment-1415410776\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E針對 Warp Terminal，去執行對應的動作\u003C\u002Fa\u003E：\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$vi\u003C\u002Fspan\u003E ~\u002F.zshrc\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E將原本這段\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003EZSH_THEME=\u003Cspan class=\"hljs-string\"\u003E&quot;powerlevel10k\u002Fpowerlevel10k&quot;\u003C\u002Fspan\u003E\n\n....\n\n\u003Cspan class=\"hljs-built_in\"\u003Eeval\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;\u003Cspan class=\"hljs-subst\"\u003E$(starship init zsh)\u003C\u002Fspan\u003E&quot;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E改成\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E [[ \u003Cspan class=\"hljs-variable\"\u003E$TERM_PROGRAM\u003C\u002Fspan\u003E == \u003Cspan class=\"hljs-string\"\u003E&quot;WarpTerminal&quot;\u003C\u002Fspan\u003E ]]; \u003Cspan class=\"hljs-keyword\"\u003Ethen\u003C\u002Fspan\u003E\n  ZSH_THEME=\u003Cspan class=\"hljs-string\"\u003E&quot;robbyrussell&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Eelse\u003C\u002Fspan\u003E\n  ZSH_THEME=\u003Cspan class=\"hljs-string\"\u003E&quot;powerlevel10k\u002Fpowerlevel10k&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Efi\u003C\u002Fspan\u003E\n\n...\n\n\u003Cspan class=\"hljs-keyword\"\u003Eif\u003C\u002Fspan\u003E [[ \u003Cspan class=\"hljs-variable\"\u003E$TERM_PROGRAM\u003C\u002Fspan\u003E == \u003Cspan class=\"hljs-string\"\u003E&quot;WarpTerminal&quot;\u003C\u002Fspan\u003E ]]; \u003Cspan class=\"hljs-keyword\"\u003Ethen\u003C\u002Fspan\u003E\n \u003Cspan class=\"hljs-built_in\"\u003Eeval\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;\u003Cspan class=\"hljs-subst\"\u003E$(starship init zsh)\u003C\u002Fspan\u003E&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-keyword\"\u003Efi\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E存檔後，再重新執行 zsh 設定檔即可\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-built_in\"\u003Esource\u003C\u002Fspan\u003E ~\u002F.zshrc\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch3\u003E3. 更改 Prompt 選項\u003C\u002Fh3\u003E\n\u003Cp\u003E\u003Cstrong\u003E\u003Ccode\u003ESettings\u003C\u002Fcode\u003E -&gt; \u003Ccode\u003EAppearance\u003C\u002Fcode\u003E -&gt; 點擊 \u003Ccode\u003EPrompt\u003C\u002Fcode\u003E -&gt; 選擇 \u003Ccode\u003EShell prompt(PS1)\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FBJfdfMlfR.png\" alt=\"Edit prompt\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"設定 Starship prompt config\" title=\"設定 Starship prompt config\"\u003E\u003Ca href=\"#設定 Starship prompt config\"\u003E設定 Starship prompt config\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E1. 新增 \u003Ccode\u003Estarship.toml\u003C\u002Fcode\u003E\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$mkdir\u003C\u002Fspan\u003E -p ~\u002F.config &amp;&amp; \u003Cspan class=\"hljs-built_in\"\u003Etouch\u003C\u002Fspan\u003E ~\u002F.config\u002Fstarship.toml\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$vi\u003C\u002Fspan\u003E ~\u002F.config\u002Fstarship.toml\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E先輸入 \u003Ccode\u003Ei\u003C\u002Fcode\u003E 進入 insert 模式，將以下內容寫入後按 \u003Ccode\u003Eesc\u003C\u002Fcode\u003E 結束編輯，輸入 \u003Ccode\u003Ewq\u003C\u002Fcode\u003E，存檔離開。\u003C\u002Fp\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003E這邊是 starship 相關設定，更多可以參考\u003Ca  href=\"https:\u002F\u002Fstarship.rs\u002Fzh-TW\u002Fconfig\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E官方的 Document\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003C\u002Fblockquote\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;&quot;&quot;\\\n[](bg:#030B16 fg:#7DF9AA)\\\n[ ](bg:#7DF9AA fg:#090c0c)\\\n[](fg:#7DF9AA bg:#1C3A5E)\\\n$time\\\n[](fg:#1C3A5E bg:#6699cc)\\\n$directory\\\n[](fg:#6699cc bg:#ffcc66)\\\n$git_branch\\\n$git_status\\\n$git_metrics\\\n[](fg:#ffcc66 bg:#030B16)\\\n$character\\\n&quot;&quot;&quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[directory]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;[  $path ]($style)&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;fg:#000000 bg:#6699cc&quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[git_branch]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&#x27;[ $symbol$branch(:$remote_branch) ]($style)&#x27;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Esymbol\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;  &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;fg:#000000 bg:#ffcc66&quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[git_status]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eahead\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;⇡${count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Ediverged\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;⇡${ahead_count}⇣${behind_count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Ebehind\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;⇣${count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Emodified\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;!${count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Euntracked\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;?${count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estaged\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;+${count} &quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&#x27;[$all_status]($style)&#x27;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;fg:#000000 bg:#ffcc66&quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[hg_branch]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;[ $symbol$branch ]($style)&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Esymbol\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot; &quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[cmd_duration]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;[ ◷ $duration ]($style)&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;fg:bright-white bg:18&quot;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[character]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Esuccess_symbol\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&#x27;[ ➜](bold green) &#x27;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eerror_symbol\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&#x27;[ ✗](#E84D44) &#x27;\u003C\u002Fspan\u003E\n\n\u003Cspan class=\"hljs-section\"\u003E[time]\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Edisabled\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-literal\"\u003Efalse\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Etime_format\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;%R&quot;\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-comment\"\u003E# Hour:Minute Format\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Estyle\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&quot;bg:#1d2230&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eformat\u003C\u002Fspan\u003E = \u003Cspan class=\"hljs-string\"\u003E&#x27;[[ 󱑍 $time ](bg:#1C3A5E fg:#8DFBD2)]($style)&#x27;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003C!-- format = '[[󱑍 $time ](bg:#1C3A5E fg:#8DFBD2)]($style)' --\u003E\n\u003Cp\u003E接著就會看到設定好的 prompt 了 🍺 ~\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FBJ8xmfgf0.png\" alt=\"image\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Cdiv class=\"warning\"\u003E\n\u003Cp\u003E⚠️ \u003Cstrong\u003E注意\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\n\u003Cp\u003E如果遇到色塊有跑版，可以至 \u003Ccode\u003ESetting\u003C\u002Fcode\u003E &gt; \u003Ccode\u003EAppearance\u003C\u002Fcode\u003E 中的 \u003Ccode\u003EText\u003C\u002Fcode\u003E，調整 Line Height，筆者的設定是 \u003Ccode\u003EFont size: 14\u003C\u002Fcode\u003E 和 \u003Ccode\u003ELine height: 1.2\u003C\u002Fcode\u003E。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FBkKnNfgGA.png\" alt=\"image\" \u002F\u003E\u003C\u002Fp\u003E\n\u003C\u002Fdiv\u003E\n\u003Ch2 id=\"設定 Warp theme\" title=\"設定 Warp theme\"\u003E\u003Ca href=\"#設定 Warp theme\"\u003E設定 Warp theme\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Ch3\u003E1. 新增 themes 資料夾\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$mkdir\u003C\u002Fspan\u003E -p ~\u002F.warp\u002Fthemes\u002F &amp;&amp; \u003Cspan class=\"hljs-built_in\"\u003Ecd\u003C\u002Fspan\u003E ~\u002F.warp\u002Fthemes\u002F\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E2. 新增 theme yaml\u003C\u002Fh3\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$mkdir\u003C\u002Fspan\u003E -p \u003Cspan class=\"hljs-string\"\u003E&#x27;coolnight&#x27;\u003C\u002Fspan\u003E &amp;&amp; \u003Cspan class=\"hljs-built_in\"\u003Ecd\u003C\u002Fspan\u003E coolnight\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-variable\"\u003E$vi\u003C\u002Fspan\u003E coolnight.yaml\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Cp\u003E將下方內容貼上後，記得儲存後離開，這邊是參考 \u003Ca  href=\"https:\u002F\u002Fgithub.com\u002FtheRubberDuckiee\u002Fdev-environment-files\u002Fblob\u002Fmain\u002Fcoolnight.yaml\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EtheRubberDuckiee 原設定\u003C\u002Fa\u003E，更多設定可以參考 \u003Ca  href=\"https:\u002F\u002Fdocs.warp.dev\u002Fappearance\u002Fcustom-themes\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EWarp Document\u003C\u002Fa\u003E。\u003C\u002Fp\u003E\n\u003Cpre class=\"hljs\"\u003E\u003Ccode\u003E\u003Cspan class=\"hljs-attr\"\u003Eaccent:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#38ff9c&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Ebackground:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#010b17&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eforeground:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ebddf4&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Edetails:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;darker&quot;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-attr\"\u003Eterminal_colors:\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Enormal:\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eblack:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#0b3b61&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ered:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ff3a3a&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Egreen:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#52ffcf&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eyellow:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#fff383&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eblue:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#1376f8&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Emagenta:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#c792ea&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ecyan:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ff5dd4&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ewhite:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#15fca2&quot;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-attr\"\u003Ebright:\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eblack:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#62686c&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ered:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ff54b0&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Egreen:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#73ffd8&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eyellow:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#fcf4ad&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Eblue:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#378dfe&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Emagenta:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ae81ff&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ecyan:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#ff69d7&quot;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-attr\"\u003Ewhite:\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-string\"\u003E&quot;#5ffbbe&quot;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n\u003Ch3\u003E3. 選擇自定義 Theme\u003C\u002Fh3\u003E\n\u003Cp\u003E到 \u003Ccode\u003ESettings\u003C\u002Fcode\u003E &gt; \u003Ccode\u003EAppearance\u003C\u002Fcode\u003E 中的 Themes，點選 \u003Ccode\u003ECurrent theme\u003C\u002Fcode\u003E，接著在左邊找出剛剛新增的主題，點選後就會直接套用了。\u003C\u002Fp\u003E\n\u003Cp\u003E\u003Cimg src=\"https:\u002F\u002Fhackmd.io\u002F_uploads\u002FSyp5_GlzA.png\" alt=\"image\" \u002F\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"結語\" title=\"結語\"\u003E\u003Ca href=\"#結語\"\u003E結語\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cp\u003E沒有特別追求樣式的話，其實 Warp 預設已經輾壓原生的 Terminal 太多太多了～\u003C\u002Fp\u003E\n\u003Cp\u003E但如果你是每次打開 Terminal，看到親手裝飾的樣式，心情都會被療癒一下，這篇可以當作是入門 Starship 的第一步～\u003C\u002Fp\u003E\n\u003Cp\u003E因為筆者在 P10K 和 Starship 選擇不出來，所以公司和私人電腦的 Warp 各搭配一種 😆\u003Cbr \u002F\u003E\n有興趣 Warp 搭配 P10K，可以參考筆者另一篇文章 \u003Ca  href=\"https:\u002F\u002Fjenniesh.github.io\u002Fdev\u002FTerminal\u002Fterminal-warp#%E5%AE%A2%E8%A3%BD%E5%8C%96%20Terminal%20-%20Warp%20+%20Powerlevel10k\" target=\"_blank\" rel=\"noreferrer noopener\"\u003E客製化 Terminal - Warp + Powerlevel10k\u003C\u002Fa\u003E\u003C\u002Fp\u003E\n\u003Ch2 id=\"參考資料\" title=\"參考資料\"\u003E\u003Ca href=\"#參考資料\"\u003E參考資料\u003C\u002Fa\u003E\u003C\u002Fh2\u003E\n\u003Cul\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fstarship.rs\u002Fzh-TW\u002F\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EStarship\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003Cli\u003E\u003Ca  href=\"https:\u002F\u002Fdev.to\u002Ftherubberduckiee\u002Fhow-to-configure-starship-to-look-exactly-like-p10k-zsh-warp-h9h\" target=\"_blank\" rel=\"noreferrer noopener\"\u003EHow to Configure Starship to Look Exactly Like P10K\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n\u003C\u002Ful\u003E\n",toc:{title:b,subtitles:["安裝 Warp","設定字體","安裝 Starship","設定 Starship prompt config","設定 Warp theme","結語","參考資料"]}}}}}(null,"客製化 command line - Warp + Starship","2024-05-16T00:00:00.000Z"));