import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6EE',
        sage: '#0F4C3A',
        sunset: '#FF7A1A',
        gold: '#D4A24C',
        ocean: '#00A8C5',
        ink: '#0A1F1C'
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        glow: '0 18px 60px rgba(15, 76, 58, 0.16)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(255,122,26,0.24), transparent 32%), radial-gradient(circle at 80% 20%, rgba(0,168,197,0.22), transparent 28%), linear-gradient(135deg, #FAF6EE 0%, #FFF9F0 100%)'
      }
    }
  },
  plugins: []
} satisfies Config;
