import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    // Ignorar archivos y directorios
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  {
    // Configuración para archivos JavaScript
    files: ['**/*.js'],
    ...pluginJs.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // Configuración para archivos TypeScript
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true, // Usa el tsconfig.json más cercano
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Aquí puedes agregar reglas personalizadas de TypeScript
    },
  },
  {
    // Configuración de Prettier para todos los archivos
    files: ['**/*.{js,ts}'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': ['warn'],
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
