/**
 * @param {string} d 
 */
export const part1 = async d => {
	const reports = d.split('\n').map(e => e.split(' '));
	const diffs = [];
	for (let i = 0; i < reports.length; i++) {
		const levelDiffs = [];
		const report = reports[i]
		for (let j = 1; j < report.length; j++) {
			levelDiffs.push(report[j] - report[j - 1]);
		}
		diffs.push(levelDiffs);
	}
	const temp = diffs.filter(e => e.every(e => Math.abs(e) < 4) && (e.every(e => e > 0) || e.every(e => e < 0)));
	return temp.length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
