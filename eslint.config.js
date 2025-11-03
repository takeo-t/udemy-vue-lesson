// eslint.config.js (Flat Config)
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint' // ← 追加
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 対象ファイル
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'], // ← ts/tsx を追加
  },
  // 除外
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  // JS の推奨
  js.configs.recommended,

  // TypeScript の推奨（lintルール & パーサ同梱）
  ...tseslint.configs.recommended,

  // Vue 用（Vue3推奨）
  {
    // .vue ファイル専用のパーサ設定
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser, // ← .vue を vue-eslint-parser で読む
      parserOptions: {
        parser: tseslint.parser, // ← <script lang="ts"> を TS パーサで読む
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: { vue: pluginVue },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
    },
  },

  // 純粋な TS ファイル（.ts/.tsx）のパーサ設定を明示
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    // 追加で TS 向けルールを入れたい場合はここに rules を書く
  },

  // Prettier 連携（フォーマット衝突回避）
  skipFormatting,
]
