/**
 * @param {string} d 
 */
export const part1 = async d => {
	/**
	 * 
	 * @param {string[]} stones 
	 */
	function handleStones(stones) {
		for (let i = stones.length - 1; i > -1; i--) {
			if (stones[i] == '0') {
				stones[i] = '1';
			} else if (stones[i].length % 2 == 0) {
				stones.splice(i + 1, 0, +(stones[i].substring(stones[i].length / 2)) + '');
				stones[i] = +(stones[i].substring(0, stones[i].length / 2)) + '';
			} else {
				stones[i] = stones[i] * 2024 + '';
			}
		}
	}

	const data = d.split(' ');

	for (let i = 0; i < 25; i++) {
		handleStones(data);
	}
	return data.length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split(' ');
	data.splice(0, data.length);
	return data;
};
