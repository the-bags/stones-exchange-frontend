// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": "true",
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "env": {
    "browser": "true"
  },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  "extends": "standard",
    // required to lint *.vue files
  "plugins": [
    "html"
  ],
    // add your custom rules here
  "rules": {
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-before-function-paren": 0,
    "indent": ["error", 2],
    "comma-spacing": [2, {"before": false, "after": true}],
    "no-console": "off",
      // allow paren-less arrow functions
    "arrow-parens": 0,
      // allow async-await
    "generator-star-spacing": 0,
      // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};

