/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a1628',
          800: '#0f2040',
          700: '#162b55',
          600: '#1e3a6e',
        },
        accent: {
          cyan:    '#00d4ff',
          green:   '#00ff9d',
          amber:   '#ffb800',
          red:     '#ff4d6d',
          purple:  '#b47cff',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-navy': `linear-gradient(rgba(0,212,255,.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,212,255,.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-up':    'fadeUp .5s ease both',
        'fade-in':    'fadeIn .4s ease both',
        'pulse-slow': 'pulse 3s cubic-bezier(.4,0,.6,1) infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'none' } },
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}
