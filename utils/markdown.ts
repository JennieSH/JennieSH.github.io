import type MarkdownItType from "markdown-it";

import MarkdownIt from "markdown-it";
import MarkdownItContainer from "markdown-it-container";
import MarkdownItEmoji from "markdown-it-emoji";

import hljs from "./hljs";

const md: MarkdownItType = new MarkdownIt({
  html: false,
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
})
  .use(MarkdownItEmoji)
  .use(MarkdownItContainer, "success")
  .use(MarkdownItContainer, "info")
  .use(MarkdownItContainer, "warning")
  .use(MarkdownItContainer, "danger")
  .use(MarkdownItContainer, "spoiler", {
    validate(params: string) {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },
    render(tokens: any[], idx: number) {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return (
          "<details class='spoiler'><summary>" +
          md.utils.escapeHtml(m[1]) +
          "</summary>\n"
        );
      } else {
        // closing tag
        return "</details>\n";
      }
    }
  });

export default md;
