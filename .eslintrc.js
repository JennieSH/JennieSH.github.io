module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: false,
        ignores: ["/^router-/", "/^keep-/", "/^transition-/"]
      }
    ],
    "vue/custom-event-name-casing": [
      "error",
      "kebab-case",
      {
        ignores: []
      }
    ],
    "vue/html-comment-content-newline": [
      "warn",
      {
        singleline: "ignore",
        multiline: "always"
      }
    ],
    "vue/html-comment-content-spacing": [
      "warn",
      "always",
      {
        exceptions: []
      }
    ],
    "vue/html-comment-indent": ["warn", 2],
    "vue/no-template-target-blank": [
      "warn",
      {
        allowReferrer: true,
        enforceDynamicLinks: "always"
      }
    ],
    "vue/padding-line-between-blocks": ["warn", "always"],
    "vue/v-on-event-hyphenation": [
      "error",
      "always",
      {
        autofix: true,
        ignore: []
      }
    ],
    "vue/v-on-function-call": [
      "error",
      "never",
      {
        ignoreIncludesComment: false
      }
    ],
    "vue/html-indent": [
      "warn",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 1,
        alignAttributesVertically: true,
        ignores: []
      }
    ],

    quotes: ["error", "double"],
    semi: ["error", "always"],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ["ConditionalExpression"]
      }
    ],
    "max-len": ["error", { code: 200 }],
    "comma-dangle": [2, "only-multiline"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "ignore",
        named: "ignore",
        asyncArrow: "always"
      }
    ],
    "newline-after-var": ["error", "always"],
    "newline-before-return": "error"
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "vue/html-indent": "off"
      }
    }
  ]
};
