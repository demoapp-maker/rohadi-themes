import { defineConfig } from 'tsup';

const entries = ['index', 'ui', 'layouts', 'charts', 'icons', 'theme', 'tokens'];

export default defineConfig({
  entry: Object.fromEntries(entries.map((name) => [name, `src/${name}.ts`])),
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: [
    'react',
    'react-dom',
    '@fieldnote-ui/tokens',
    '@fieldnote-ui/theme',
    '@fieldnote-ui/icons',
    '@fieldnote-ui/ui',
    '@fieldnote-ui/layouts',
    '@fieldnote-ui/charts',
  ],
  banner: { js: '"use client";' },
  outExtension: ({ format }) => ({ js: format === 'esm' ? '.js' : '.cjs' }),
});
