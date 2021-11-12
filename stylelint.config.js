module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-sass-guidelines"
  ],
  plugins: ["stylelint-scss", "stylelint-order"],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "tailwind",
          "screen",
          "apply",
          "layer",
          "variants",
          "responsive"
        ]
      }
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
          "tailwind",
          "screen",
          "apply",
          "layer",
          "variants",
          "responsive"
        ]
      }
    ],
    "selector-max-id": null,
    "order/properties-alphabetical-order": null,
    "string-quotes": "double",
    "selector-no-qualifying-type": [
      true,
      {
        ignore: ["attribute", "class", "id"]
      }
    ],
    "order/properties-order": [
      "position",
      "top",
      "bottom",
      "right",
      "left",
      "display",
      "align-items",
      "justify-content",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "font-weight",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "z-index",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition"
    ],

    "max-nesting-depth": null,
    "no-empty-source": null,
    "no-descending-specificity": null,
    "selector-max-compound-selectors": null,
    "scss/at-import-partial-extension-blacklist": null,
    "function-parentheses-space-inside": "never-single-line"
  },
  ignoreFiles: [".vscode/**", "dist/**", "node_modules/**"]
};
