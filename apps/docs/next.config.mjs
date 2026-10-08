import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Trace from the monorepo root so workspace packages are included in the output.
  outputFileTracingRoot: resolve(here, '../..'),
};

export default nextConfig;
