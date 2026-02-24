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
    			bg: '#F9F8F6',
    			surface: '#F9F8F6',
    			primary: {
    				DEFAULT: '#4A4238',
    				foreground: '#F9F8F6'
    			},
    			secondary: {
    				DEFAULT: '#E5DED1',
    				foreground: '#4A4238'
    			},
    			accent: {
    				DEFAULT: '#8B9481',
    				foreground: '#F9F8F6'
    			},
    			card: {
    				DEFAULT: '#F9F8F6',
    				foreground: '#4A4238'
    			},
    			popover: {
    				DEFAULT: '#F9F8F6',
    				foreground: '#4A4238'
    			},
    			muted: {
    				DEFAULT: '#E5DED1',
    				foreground: '#8B9481'
    			},
    			destructive: {
    				DEFAULT: '#EF4444',
    				foreground: '#FFFFFF'
    			}
    		},
    		boxShadow: {
    			neu: '9px 9px 18px #d6d5d3, -9px -9px 18px transparent',
    			'neu-sm': '5px 5px 10px #d6d5d3, -5px -5px 10px transparent',
    			'neu-inset': 'inset 5px 5px 10px #d6d5d3, inset -5px -5px 10px transparent'
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
