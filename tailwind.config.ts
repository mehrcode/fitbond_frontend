import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                kodchasan: ["'Kodchasan'", "sans-serif"],
            },
            colors: {
                base: "#151313",
                orangeAccent: "#ff5734",
                purpleAccent: "#be94f5",
                yellowAccent: "#fccc42",
                offWhite: "#f7f7f5",
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
            },
        },
    },
    plugins: [],
};
export default config;
