import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
                serif: ["var(--font-playfair)", "Playfair Display", "serif"],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                // User defined palette
                bg: "#F9F8F6",      // Bone
                surface: "#F9F8F6", // Bone
                primary: {
                    DEFAULT: "#4A4238", // Umber
                    foreground: "#F9F8F6", // Bone
                },
                secondary: {
                    DEFAULT: "#E5DED1", // Oatmeal
                    foreground: "#4A4238", // Umber
                },
                accent: {
                    DEFAULT: "#8B9481", // Sage
                    foreground: "#F9F8F6", // Bone
                },
                // Shadcn overrides/maps
                card: {
                    DEFAULT: "#F9F8F6", // Bone
                    foreground: "#4A4238", // Umber
                },
                popover: {
                    DEFAULT: "#F9F8F6", // Bone
                    foreground: "#4A4238", // Umber
                },
                muted: {
                    DEFAULT: "#E5DED1", // Oatmeal
                    foreground: "#8B9481", // Sage
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
            },
            boxShadow: {
                // Warm shadows for #F9F8F6 - REMOVED WHITE HIGHLIGHT as per user request
                // Using a transparent second shadow or just a single dark shadow to avoid "glow"
                neu: "9px 9px 18px #d6d5d3, -9px -9px 18px transparent",
                "neu-sm": "5px 5px 10px #d6d5d3, -5px -5px 10px transparent",
                "neu-inset": "inset 5px 5px 10px #d6d5d3, inset -5px -5px 10px transparent",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                neu: "20px",
                neuBtn: "14px",
            },
        },
    },
    plugins: [tailwindAnimate],
};
export default config;
