const apexnitroConfig = require('./apexnitro.config.json');

const eslintConfig = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    "indent": ["error", 2],
    "prefer-const": "warn"
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint'
      ],
      extends: [
        'eslint:recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parserOptions: {
        ecmaVersion: 10,
        sourceType: 'module',
      },
      env: {
        browser: true,
        es6: true,
        node: true,
      },
      rules: {
      },

    }
  ]
};

eslintConfig.globals = apexnitroConfig.external.reduce((a, b) => ((a[b] = 'readonly'), a), {});

module.exports = eslintConfig;