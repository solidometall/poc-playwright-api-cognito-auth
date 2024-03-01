module.exports = {
	env: {
		browser: false,
		es2021: true,
	},
	plugins: ['@typescript-eslint'],
	extends: ['standard-with-typescript', 'eslint-config-prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: './tsconfig.json',
	},
	rules: {},
};
