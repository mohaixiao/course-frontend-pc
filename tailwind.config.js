/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'register-background': "url('/images/svg/log_reg_bg.svg')",
      },
    },
  },
  corePlugins: {
    preflight: false, // 去掉 tailwindcss 的基础样式设置
  },
  important: true,   // 给 tailwindcss 的样式加上最高优先级
  plugins: [],
}
