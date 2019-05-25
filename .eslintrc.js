module.exports = {
	root: true,
	extends: [
		"plugin:vue/essential",
		"plugin:prettier/recommended",
		"eslint:recommended"
	],
	globals: {
		process: "writable",
		require: "writable",
		module: "writable"
	},
	rules: {
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"arrow-body-style": ["error", "always"],
		radix: 0,
		"no-shadow": [
			2,
			{
				hoist: "all",
				allow: ["resolve", "reject", "done", "next", "err", "error"]
			}
		],
		"no-unused-expressions": [
			"error",
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true
			}
		],
		"no-unused-vars": [
			"error",
			{
				vars: "all",
				args: "all",
				argsIgnorePattern: "res|^err"
			}
		],
		"no-param-reassign": [
			"error",
			{
				props: false
			}
		],
		"one-var-declaration-per-line": ["error", "initializations"],
		"import/core-modules": ["vue", "vuex"],
		"prefer-const": [
			"error",
			{
				destructuring: "all"
			}
		],
		"prettier/prettier": [
			"error",
			{
				singleQuote: false,
				printWidth: 80,
				useTabs: true,
				tabWidth: 4,
				bracketSpacing: false
			}
		]
	}
};
