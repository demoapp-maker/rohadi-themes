import { defineConfig } from 'tsup';

const clientEntries = ['index', 'ui', 'layouts', 'charts', 'icons', 'theme'];
const external = [
  'react',
  'react-dom',
  '@fieldnote-ui/tokens',
  '@fieldnote-ui/theme',
  '@fieldnote-ui/icons',
  '@fieldnote-ui/ui',
  '@fieldnote-ui/layouts',
  '@fieldnote-ui/charts',
];
const outExtension = ({ format }: { format: string }) => ({ js: format === 'esm' ? '.js' : '.cjs' });

export default defineConfig([
  {
    entry: Object.fromEntries(clientEntries.map((name) => [name, `src/${name}.ts`])),
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    external,
    banner: { js: '"use client";' },
    outExtension,
  },
  {
    // Server-safe entries: tokens and server helpers, without the client directive.
    entry: { server: 'src/server.ts', tokens: 'src/tokens.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: false,
    external,
    outExtension,
  },
]);
