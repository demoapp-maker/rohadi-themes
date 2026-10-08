/** @type {import('tailwindcss').Config} */
module.exports = {
  // FieldNote's stylesheet provides base styles; disable Tailwind's preflight so they don't fight.
  corePlugins: { preflight: false },
  presets: [require('fieldnote-ui/tailwind-preset')],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
