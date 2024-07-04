import { palettes, rounded, shade, components } from "@tailus/themer";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tailus/themer/dist/components/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: palettes.mystery,
      fontFamily: {
        sans: ['Encode Sans Semi Expanded', 'Roboto', 'sans-serif'],
      }
    }
  },
  plugins : [
    rounded,
    shade,
    components
  ]
}

