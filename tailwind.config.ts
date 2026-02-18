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
                bg: "#f2efe9",      // Warm light beige
                surface: "#f2efe9", // Matching surface
                primary: {
                    DEFAULT: "#1a1a1a", // Dark charcoal
                    foreground: "#f2efe9",
                },
                secondary: {
                    DEFAULT: "#707a7e", // Muted grey-green
                    foreground: "#f2efe9",
                },
                accent: {
                    DEFAULT: "#3e4437", // Dark olive green
                    foreground: "#ffffff",
                },
                // Shadcn overrides/maps
                card: {
                    DEFAULT: "#f2efe9",
                    foreground: "#1a1a1a",
                },
                popover: {
                    DEFAULT: "#f2efe9",
                    foreground: "#1a1a1a",
                },
                muted: {
                    DEFAULT: "#e6e2da", // Slightly darker than bg
                    foreground: "#707a7e",
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
            },
            boxShadow: {
                // Warm shadows for #f2efe9 - REMOVED WHITE HIGHLIGHT as per user request
                // Using a transparent second shadow or just a single dark shadow to avoid "glow"
                neu: "9px 9px 18px #d1cfc9, -9px -9px 18px transparent",
                "neu-sm": "5px 5px 10px #d1cfc9, -5px -5px 10px transparent",
                "neu-inset": "inset 5px 5px 10px #d1cfc9, inset -5px -5px 10px transparent",
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
