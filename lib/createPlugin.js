'use strict';

/** @typedef {import('ec0lint-style').Rule} StylelintRule */

/**
 * @param {string} ruleName
 * @param {StylelintRule} rule
 * @returns {{ruleName: string, rule: StylelintRule}}
 */
function createPlugin(ruleName, rule) {
	return {
		ruleName,
		rule,
	};
}

module.exports = /** @type {typeof import('ec0lint-style').createPlugin} */ (createPlugin);
