import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
    },
  },
  {
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
    },
  },
  ...vueTsEslintConfig(),
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/*.test.ts'],
  },
  skipFormatting,
  eslintConfigPrettier,
]
