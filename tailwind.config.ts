/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/renderer/src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      backgroundColor: (): any => ({
        blue: {
          700: '#151927'
        },
        grey: {
          400: '#73859736',
          50: '#F6F6F6',
          100: '#EAF1FB',
          200: '#F6F8FC',
          300: '#444746'
        },

        white: '#ffff'
      }),
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        blue: {
          700: '#151927',
          750: '#11113096'
        },
        orange: {
          100: 'rgb(175, 76, 11)',
          DEFAULT: '#FB6D10'
        },
        grey: {
          50: '#F6F6F6',
          100: '#EAF1FB',
          150: '#F7F7FE',
          200: '#F6F8FC',
          250: '#D6D8D9',
          300: '#444746',
          350: '#B3B3B3',
          500: '#70707033',
          600: '#202124'
        },
        red: {
          100: '#E71A1AA6',
          DEFAULT: '#D85A5A',
          200: '#F54F4A',
          250: '#F75C3F',
          300: '#C33535',
          500: '#DC4242',
          550: 'rgba(255,0,0)'
        }
      },
      opacity: {
        67: '0.67'
      },
      borderRadius: {
        inputBorder: '10px'
      }
    }
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: { color: theme('colors.slate.200') }
      })
    }),
    require('tailwindcss-animate')
  ]
}
