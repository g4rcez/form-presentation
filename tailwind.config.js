/** @type {import("tailwindcss").Config} */
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

const plugins = [typography, plugin((wind) => wind.addVariant("link", ["&:hover", "&:focus"]))];

export default {
    plugins,
    theme: { extend: {} },
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
