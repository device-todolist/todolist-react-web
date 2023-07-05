module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-rational-order"],
  plugins: ["stylelint-order", "stylelint-declaration-block-no-ignored-properties"],
  rules: {
    "plugin/declaration-block-no-ignored-properties": true,
    "comment-empty-line-before": null,
    "declaration-empty-line-before": null,
    "function-name-case": "lower",
    "no-descending-specificity": null,
    "no-invalid-double-slash-comments": null,
    "rule-empty-line-before": "always",
    "no-missing-end-of-source-newline": null,
  },
  ignoreFiles: ["node_modules/**/*", "build/**/*"],
};
