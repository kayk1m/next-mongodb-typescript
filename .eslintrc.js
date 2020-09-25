module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    '@typescript-eslint/no-empty-interface': 1,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/no-empty-function': 0,
    'react-hooks/exhaustive-deps': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['~'],
      },
    },
  },
};
