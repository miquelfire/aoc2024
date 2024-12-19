/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const towels = new RegExp('^(?:' + data[0].replaceAll(', ', '|') + ')+$');
	const patterns = data[1].split('\n');

	return patterns.filter(e => towels.test(e)).length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
