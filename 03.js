/**
 * @param {string} d 
 */
export const part1 = async d => {
	const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
	let data = regex.exec(d);
	let sum = 0;
	while (data != null) {
		sum += data[1] * data[2];
		data = regex.exec(d);
	}
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d;
	return data;
};
