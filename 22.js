/**
 * 
 * @param {BigInt | number | string} prevSecretNumber 
 * @returns 
 */
function generateNextSecretNumber(prevSecretNumber) {
	let newSN = BigInt(prevSecretNumber);

	newSN ^= newSN * 64n;
	newSN %= 16777216n;

	newSN ^= newSN / 32n;
	newSN %= 16777216n;

	newSN ^= newSN * 2048n;
	newSN %= 16777216n;

	return newSN;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
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
	/**@type {Map<string, number>} */
	const patternsCost = new Map();

	const buyers = d.split('\n').map(e => {
		e = BigInt(e);
		const prices = [[e % 10n, null]];
		prices.pop();

		const patterns = new Set('1,1,1,1');
		patterns.clear();
		const curPattern = [];

		for (let i = 0; i < 2000; i++) {
			const prevPrice = e % 10n;
			e = generateNextSecretNumber(e);
			const newPrice = e % 10n;

			curPattern.push(newPrice - prevPrice);
			if (curPattern.length > 4) {
				curPattern.shift();
			}

			prices.push([Number(newPrice), Number(newPrice - prevPrice)]);
			if (curPattern.length == 4) {
				const pattStr = curPattern.join(',');
				if (!patterns.has(pattStr)) {
					patterns.add(pattStr);
					patternsCost.set(pattStr, (patternsCost.get(pattStr) || 0) + Number(newPrice));
				}
			}
		}

		return prices;
	});

	let maxPrice = Math.max(...patternsCost.values());

	return maxPrice;
	//1973 too low
};
