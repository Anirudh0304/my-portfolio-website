// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        purple: {
          core: '#7c3aed',
          bright: '#a855f7',
          pale: '#c084fc',
          950: '#1e0052',
        },
        void: '#03020f',
        deep: '#07051a',
        card: '#0d0b22',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%': { transform: 'scale(1.15)', borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '66%': { transform: 'scale(0.92)', borderRadius: '70% 30% 50% 50% / 30% 70% 60% 40%' },
          '100%': { transform: 'scale(1)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(124,58,237,0.6), 0 0 100px rgba(124,58,237,0.2)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      backgroundImage: {
        'skills-gradient': 'linear-gradient(141.27deg, rgba(0,70,209,0) 50%, rgba(0,70,209,0.08) 100%)',
        'purple-mesh': 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.1) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(168,85,247,0.03))',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(124,58,237,0.25)',
        'glow-md': '0 0 40px rgba(124,58,237,0.35)',
        'glow-lg': '0 0 80px rgba(124,58,237,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 20px 60px rgba(124,58,237,0.2), 0 0 0 1px rgba(124,58,237,0.3)',
      },
    },
  },
  plugins: [],
};