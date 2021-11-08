import type MarkdownItType from "markdown-it";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";

// highlight langue
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import shell from "highlight.js/lib/languages/shell";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("shell", shell);

const md: MarkdownItType = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight(str, prefixLang) {
    // for being compatible with hackMD
    const lang = prefixLang.replace(/=/g, "");

    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          // eslint-disable-next-line quotes
          '<pre class="hljs"><code>' +
          hljs.highlight(str, {
            language: lang,
            ignoreIllegals: true
          }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      // eslint-disable-next-line quotes
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});

export default md;
