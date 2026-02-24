import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class", "class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'var(--font-sans)',
					'Inter',
					'system-ui',
					'sans-serif'
				],
				serif: [
					'var(--font-playfair)',
					'Playfair Display',
					'serif'
				]
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				bg: '#f2efe9',
				surface: '#f2efe9',
				primary: {
					DEFAULT: '#1a1a1a',
					foreground: '#f2efe9'
				},
				secondary: {
					DEFAULT: '#707a7e',
					foreground: '#f2efe9'
				},
				accent: {
					DEFAULT: '#3e4437',
					foreground: '#ffffff'
				},
				card: {
					DEFAULT: '#f2efe9',
					foreground: '#1a1a1a'
				},
				popover: {
					DEFAULT: '#f2efe9',
					foreground: '#1a1a1a'
				},
				muted: {
					DEFAULT: '#e6e2da',
					foreground: '#707a7e'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				}
			},
			boxShadow: {
				neu: '9px 9px 18px #d1cfc9, -9px -9px 18px transparent',
				'neu-sm': '5px 5px 10px #d1cfc9, -5px -5px 10px transparent',
				'neu-inset': 'inset 5px 5px 10px #d1cfc9, inset -5px -5px 10px transparent'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				neu: '20px',
				neuBtn: '14px'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindAnimate],
};
export default config;
