module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    // add your custom config here
     "declaration-block-trailing-semicolon": "always",
     "at-rule-no-unknown": [
       true,
       {
         ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"]
       }
     ],
     "no-descending-specificity": null
   },
  ignoreFiles: [
    '.vscode/**', 'dist/**', 'node_modules/**'
  ]
}
