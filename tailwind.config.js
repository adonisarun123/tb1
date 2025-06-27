/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: '#FFB573',
        neutral: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#EEEEEE',
          300: '#E3E3E3',
          400: '#C1C1C1',
          500: '#B1B1B1',
          600: '#979797',
          700: '#757575',
          800: '#636363',
          900: '#313131',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #FF4C39 0%, #FFB573 100%)',
      },
      boxShadow: {
        'card': '0px 4px 10px 8px rgba(0, 0, 0, 0.04)',
        'nav': '0px 5px 15px 10px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  // Performance optimizations
  corePlugins: {
    // Disable unused features to reduce bundle size
    container: false,
    // Only enable what you need
  },
  // Optimize for production
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Experimental features for better performance
  experimental: {
    optimizeUniversalDefaults: true,
  },
}
