/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,vue}", "./node_modules/flyonui/dist/js/*.js"],
	theme: {
		container: {
			center: true,
			screens: {
				sm: "640px",
				md: "768px",
				lg: "996px",
				xl: "1024px",
				"2xl": "1280px",
			},
		},
		extend: {
			fontSize: {
				heading: ["1.25rem", { lineHeight: "1.625rem", fontWeight: "700" }],
				subheading: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "700" }],
				content: ["1rem", { lineHeight: "1.375rem", fontWeight: "700" }],
				description: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "700" }],
				meta: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }],
			},
			colors: {
				heading: "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity, 1)))",
				subheading: "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity, 1)))",
				content: "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity, 1)))",
				description: "var(--fallback-bc,oklch(var(--bc)/0.8))",
				meta: "var(--fallback-bc,oklch(var(--bc)/0.8))",
			},
		},
	},
};
