'use strict';

/** @typedef {import('ec0lint-style').RangeType} RangeType */
/** @typedef {import('ec0lint-style').DisableReportRange} DisabledRange */
/** @typedef {import('ec0lint-style').LintResult} StylelintResult */
/** @typedef {import('ec0lint-style').ConfigRuleSettings<any, Object>} StylelintConfigRuleSettings */

/**
 * Returns a report describing which `results` (if any) contain disabled ranges
 * for rules that disallow disables via `reportDisables: true`.
 *
 * @param {StylelintResult[]} results
 */
module.exports = function (results) {
	for (const result of results) {
		// File with `CssSyntaxError` don't have `_postcssResult`s.
		if (!result._postcssResult) {
			continue;
		}

		/** @type {{[ruleName: string]: Array<RangeType>}} */
		const rangeData = result._postcssResult.ec0lintStyle.disabledRanges;

		if (!rangeData) continue;

		const config = result._postcssResult.ec0lintStyle.config;

		if (!config || !config.rules) continue;

		// If no rules actually disallow disables, don't bother looking for ranges
		// that correspond to disabled rules.
		if (!Object.values(config.rules).some((rule) => reportDisablesForRule(rule))) {
			continue;
		}

		for (const [rule, ranges] of Object.entries(rangeData)) {
			for (const range of ranges) {
				if (!reportDisablesForRule(config.rules[rule] || [])) continue;

				// If the comment doesn't have a location, we can't report a useful error.
				// In practice we expect all comments to have locations, though.
				if (!range.comment.source || !range.comment.source.start) continue;

				result.warnings.push({
					text: `Rule "${rule}" may not be disabled`,
					rule: 'reportDisables',
					line: range.comment.source.start.line,
					column: range.comment.source.start.column,
					severity: 'error',
				});
			}
		}
	}
};

/**
 * @param {StylelintConfigRuleSettings} options
 * @return {boolean}
 */
function reportDisablesForRule(options) {
	if (!options || !options[1]) return false;

	return Boolean(options[1].reportDisables);
}
