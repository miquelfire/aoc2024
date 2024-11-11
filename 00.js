/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
