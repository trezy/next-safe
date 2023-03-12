//@ts-check

const util = require('@fuelrats/eslint-config/util');

module.exports = {
  env: {
    es2022: true,
    browser: true,
    commonjs: true,
  },
  overrides: [
    {
      files: [
        'scripts/**/*.{js,mjs,cjs,jsx}',
      ],
      extends: [
        '@fuelrats/eslint-config/purejs',
      ],
      env: {
        node: true,
      },
    },
    {
      files: [
        'src/**/*.{ts,tsx,d.ts}',
      ],
      extends: [
        '@fuelrats/eslint-config/typescript',
        'plugin:prettier/recommended',
      ],
      rules:  {
        '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
        ...util.disableRules('jsdoc/require-jsdoc'),
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    }
  ],
}
