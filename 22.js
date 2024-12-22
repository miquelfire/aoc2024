/**
 * @param {string} d 
 */
export const part1 = async d => {
	function generateNextSecretNumber(prevSecretNumber) {
		let newSN = BigInt(prevSecretNumber);

		newSN ^= newSN * 64n;
		newSN %= 16777216n;

		newSN ^= newSN/32n;
		newSN %= 16777216n;

		newSN ^= newSN * 2048n;
		newSN %= 16777216n;

		return newSN;
	}
	const buyers = d.split('\n').map(e => {
		for (let i = 0; i < 2000; i++) {
			e = generateNextSecretNumber(e);
		}
		return e;
	});

	
	return buyers.reduce((p, v) => p + v).toString();
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
