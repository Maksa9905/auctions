import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import i18next from 'eslint-plugin-i18next';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** Слои FSD сверху вниз */
const FSD_LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
const SLICED_LAYERS = ['pages', 'widgets', 'features', 'entities'];

const lowerLayers = (layer) => FSD_LAYERS.slice(FSD_LAYERS.indexOf(layer) + 1);

const fsdLayerPolicies = [
  ...FSD_LAYERS.filter((layer) => layer !== 'shared').map((layer) => ({
    from: { element: { type: layer } },
    allow: {
      to: {
        element: {
          type: layer === 'app' ? ['app', ...lowerLayers(layer)] : lowerLayers(layer),
        },
      },
    },
  })),
  {
    from: { element: { type: 'shared' } },
    allow: { to: { element: { type: 'shared' } } },
  },
];

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      i18next,
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/ignore': ['src/**/*.d.ts', 'src/main.tsx', 'types/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages/*', capture: ['slice'] },
        { type: 'widgets', pattern: 'src/widgets/*', capture: ['slice'] },
        { type: 'features', pattern: 'src/features/*', capture: ['slice'] },
        { type: 'entities', pattern: 'src/entities/*', capture: ['slice'] },
        { type: 'shared', pattern: 'src/shared' },
      ],
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            // FSD layers: сверху вниз
            ['^@app(/.*)?$'],
            ['^@pages(/.*)?$'],
            ['^@widgets(/.*)?$'],
            ['^@features(/.*)?$'],
            ['^@entities(/.*)?$'],
            ['^@shared(/.*)?$'],
            ['^@/'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message:
            'Нарушение границ FSD: {{ from.element.type }} → {{ to.element.type }}. https://feature-sliced.design/docs/reference/layers',
          policies: [
            ...fsdLayerPolicies,
            // Публичное API слайсов — только index.*
            {
              disallow: {
                to: {
                  element: {
                    type: SLICED_LAYERS,
                    fileInternalPath: '!(index.ts|index.tsx|index.js|index.jsx)',
                  },
                },
              },
              message:
                'Импортируйте только публичное API слайса (index), без внутренних модулей. https://feature-sliced.design/docs/reference/public-api',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{tsx,jsx}'],
    rules: {
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'jsx-text-only',
          'jsx-components': {
            exclude: ['Trans'],
          },
          words: {
            exclude: ['[0-9]+', '\\s*', '[A-Z_]+'],
          },
          message: 'Текст для пользователя должен быть локализован через t()/Trans',
        },
      ],
    },
  },
  eslintConfigPrettier,
]);
