import hljs from "highlight.js";

// for support vue syntax highlightjs
// 暫時解法，待 highlightjs-vue 的 issue 關閉後移除
// https://github.com/highlightjs/highlightjs-vue/issues/10

/**
 * Copied from highlightjs-vue: https://github.com/highlightjs/highlightjs-vue
 *
 * Author: Sara Lissette Luis Ibáñez <lissette.ibnz@gmail.com>
 * License: BSD-3-Clause
 */

function hljsDefineVue() {
  return {
    subLanguage: "xml",
    contains: [
      hljs.COMMENT("<!--", "-->", {
        relevance: 10
      }),
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "javascript",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<script lang=["']ts["']>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: "typescript",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style(\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "css",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "scss",
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: "stylus",
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}

export default hljsDefineVue;
