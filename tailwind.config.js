/** @type {import('tailwindcss').Config} */
export default 
{
  content: 
  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: 
  {
    screens:
    {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: 
    {
      colors:
      {
        primary: '#4d3686',
        secondary:'#715dbd',
        tertiary: '#8971cb'
      },
      fontFamily:
      {
        main: ['Bahnschrift', 'serif']
      }
    },
  },
  plugins: [],
}