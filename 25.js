/**
 * @param {string} d 
 */
export const part1 = async d => {
	const schematics = d.split('\n\n').map(e => e.split('\n').map(e => e.split('')));
	const keys = [];
	const locks = [];
	let workingCombos = 0;
	schematics.forEach(e => {
		const topRow = e[0][0];
		const heights = [];
		for (let column = 0; column < e[0].length; column++) {
			heights.push(0);
			for (let row = 0; row < e.length; row++) {
				if (topRow != e[row][column]) {
					heights[column] = row - 1;
					break;
				}
			}
		}
		if (topRow == '#') {
			locks.push(heights);
		} else {
			keys.push(heights);
		}
	});

	for (let lock of locks) {
		for (let key of keys) {
			let valid = true;
			for (let column = 0; column < lock.length; column++) {
				if (lock[column] > key[column]) {
					valid = false;
				}
			}
			if (valid) {
				workingCombos++;
			}
		}
	}
	return workingCombos;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
