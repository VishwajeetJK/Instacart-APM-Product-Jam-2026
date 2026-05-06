/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: { ic: { cream: 'var(--ic-cream)', cream2: 'var(--ic-cream-2)', greenDeep: 'var(--ic-green-deep)', orange: 'var(--ic-orange)', orangeSoft: 'var(--ic-orange-soft)', greenSoft: 'var(--ic-green-soft)', text: 'var(--ic-text)', textMute: 'var(--ic-text-mute)', border: 'var(--ic-border)' } },
    },
  },
  plugins: [],
}

