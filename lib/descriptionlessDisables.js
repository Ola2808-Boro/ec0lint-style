'use strict';

const optionsMatches = require('./utils/optionsMatches');
const validateDisableSettings = require('./validateDisableSettings');

/** @typedef {import('postcss').Comment} PostcssComment */
/** @typedef {import('ec0lint-style').RangeType} RangeType */
/** @typedef {import('ec0lint-style').DisableReportRange} DisableReportRange */
/** @typedef {import('ec0lint-style').DisableOptionsReport} StylelintDisableOptionsReport */

/**
 * @param {import('ec0lint-style').LintResult[]} results
 */
module.exports = function descriptionlessDisables(results) {
	for (const result of results) {
		const settings = validateDisableSettings(
			result._postcssResult,
			'reportDescriptionlessDisables',
		);

		if (!settings) continue;

		const [enabled, options, stylelintResult] = settings;

		const rangeData = stylelintResult.disabledRanges;

		/** @type {Set<PostcssComment>} */
		const alreadyReported = new Set();

		for (const rule of Object.keys(rangeData)) {
			for (const range of rangeData[rule]) {
				if (range.description) continue;

				if (alreadyReported.has(range.comment)) continue;

				if (enabled === optionsMatches(options, 'except', rule)) {
					// An 'all' rule will get copied for each individual rule. If the
					// configuration is `[false, {except: ['specific-rule']}]`, we
					// don't want to report the copies that match except, so we record
					// the comment as already reported.
					if (!enabled && rule === 'all') alreadyReported.add(range.comment);

					continue;
				}

				alreadyReported.add(range.comment);

				// If the comment doesn't have a location, we can't report a useful error.
				// In practice we expect all comments to have locations, though.
				if (!range.comment.source || !range.comment.source.start) continue;

				result.warnings.push({
					text: `Disable for "${rule}" is missing a description`,
					rule: '--report-descriptionless-disables',
					line: range.comment.source.start.line,
					column: range.comment.source.start.column,
					severity: options.severity,
				});
			}
		}
	}
};
