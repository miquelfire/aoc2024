/**
 * @param {number[]}
 */
function checkReport(report) {
	return report.every(e => Math.abs(e) < 4) && (report.every(e => e > 0) || report.every(e => e < 0));
}

/**
 * @param {number[]} levels 
 */
function processLevels(levels) {
	const diffs = [];
	for (let i = 1; i < levels.length; i++) {
		diffs.push(levels[i] - levels[i - 1]);
	}
	return diffs;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const reports = d.split('\n').map(e => e.split(' '));
	const diffs = [];
	for (let i = 0; i < reports.length; i++) {
		const levelDiffs = [];
		const report = reports[i];
		for (let j = 1; j < report.length; j++) {
			levelDiffs.push(report[j] - report[j - 1]);
		}
		diffs.push(levelDiffs);
	}
	const temp = diffs.filter(e => checkReport(e));
	return temp.length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const reports = d.split('\n').map(e => e.split(' '));
	const safeReports = [];
	reports.forEach(e => {
		if (checkReport(processLevels(e))) {
			safeReports.push(processLevels(e));
			return;
		}
		for (let i = 0; i < e.length; i++) {
			const temp = e.filter((e, j) => i != j);
			if (checkReport(processLevels(temp))) {
				safeReports.push(processLevels(temp));
				return;
			}
		}
	});
	return safeReports.length;
};
