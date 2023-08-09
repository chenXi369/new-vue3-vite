/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}", /** 生成后需要加上这句，不然会报错 */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

