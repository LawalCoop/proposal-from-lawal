/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0612',
        surface: 'rgba(30, 20, 50, 0.5)',
        'surface-elevated': 'rgba(45, 30, 70, 0.6)',
        accent: '#a855f7',
        'accent-bright': '#c084fc',
        'accent-glow': 'rgba(168, 85, 247, 0.12)',
        'accent-dim': 'rgba(168, 85, 247, 0.4)',
        success: '#a855f7',
        'text-primary': '#f5f3ff',
        'text-secondary': '#c4b5d4',
        'text-muted': '#8b7aa0',
        border: 'rgba(168, 85, 247, 0.15)',
        'border-accent': 'rgba(168, 85, 247, 0.4)',
      },
      backgroundImage: {
        'grid-purple':
          'linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)',
      },
      animation: {
        'glow': 'glow 10s ease-in-out infinite',
        'scroll-dot': 'scroll-dot 2s ease-in-out infinite',
        'twinkle': 'twinkle 1.8s ease-in-out infinite',
        'halo-pulse': 'halo-pulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.7', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1.08)' },
        },
        'scroll-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(10px)', opacity: '0.3' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.4) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(45deg)' },
        },
        'halo-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
