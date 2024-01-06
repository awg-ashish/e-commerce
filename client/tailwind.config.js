/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "amz-gray-dark": "#131921",
                "amz-gray-light": "#232F3E",
                "amz-text-dark": "#999999",
                "amz-orange": "#F3A847",
                "amz-yellow-dark": "#F7CA00",
                "amz-yellow": "#FFD814",
                "amz-orange-dark": "#FA8900",
                "amz-orange-darker": "#C45500",
            },
        },
    },
    plugins: [],
};
