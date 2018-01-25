module.exports = {
    "env": {
        "es6": true,
        "node": true,
	      "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
	      "ecmaVersion": 2017,
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};