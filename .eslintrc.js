module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"plugin:cypress/recommended"
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"cypress/no-assigning-return-values": "error",
		"cypress/no-unnecessary-waiting": "error",
		"cypress/assertion-before-screenshot": "warn",
		"cypress/no-force": "error",
		"cypress/no-async-tests": "error",
		"cypress/no-pause": "error",
		"indent": ["error", "tab"]
	}
}