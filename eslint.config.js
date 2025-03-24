import tsEslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	...tsEslint.configs.recommended,
	{
		ignores: ["node_modules"],
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					varsIgnorePattern: "^_",
					argsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
		},
	},
];
