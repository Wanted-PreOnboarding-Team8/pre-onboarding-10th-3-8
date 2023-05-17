module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      'plugin:react/recommended',
      'standard-with-typescript',
      'plugin:prettier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
      'object-curly-newline': 0,
      'arrow-parens': ['error', 'as-needed'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'linebreak-style': 0,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          labelAttributes: ['htmlFor'],
        },
      ],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      '@typescript-eslint/no-misused-promises': [
        2,
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
    ignorePatterns: ['node_modules/'],
  };