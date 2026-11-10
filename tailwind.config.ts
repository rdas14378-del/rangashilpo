import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#16171f',
        alabaster: '#f7f5f0',
        crimson: '#9b1b30',
        'crimson-light': '#c43a4d',
        gold: '#d4af37',
        'gold-light': '#e8c56d',
        pearl: '#f7f5f0',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        devanagari: ['var(--font-noto-sans-devanagari)', 'sans-serif'],
      },
      boxShadow: {
        'gallery': '0 4px 24px rgba(0, 0, 0, 0.06), 0 16px 48px rgba(0, 0, 0, 0.08)',
        'gallery-hover': '0 8px 32px rgba(0, 0, 0, 0.1), 0 24px 64px rgba(0, 0, 0, 0.12)',
        'pedestal': 'inset 0 -4px 24px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'bounce-in': 'bounceIn 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'page-flip': 'pageFlip 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        bounceIn: {
          '0%': { transform: 'translateY(-600px) rotate(-15deg) scale(0.8)', opacity: '0' },
          '60%': { transform: 'translateY(20px) rotate(3deg) scale(1.02)', opacity: '1' },
          '80%': { transform: 'translateY(-10px) rotate(-1deg) scale(0.98)' },
          '100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
        },
        pageFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-180deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
export default config