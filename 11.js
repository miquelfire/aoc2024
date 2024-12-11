class CountKeeper {
	/** @type {Map<number, number>} */
	#counts = new Map();

	/**
	 * 
	 * @param {number} valueToGetCountOf 
	 */
	getCountOf(valueToGetCountOf) {
		return this.#counts.get(valueToGetCountOf) || 0;
	}

	/**
	 * 
	 * @param {number} valueToIncreaseCountOf 
	 * @param {number} amountToIncreaseBy 
	 */
	increaseCountOf(valueToIncreaseCountOf, amountToIncreaseBy) {
		if (!this.#counts.has(valueToIncreaseCountOf)) {
			this.#counts.set(valueToIncreaseCountOf, amountToIncreaseBy);
		} else {
			this.#counts.set(valueToIncreaseCountOf, this.#counts.get(valueToIncreaseCountOf) + amountToIncreaseBy);
		}
	}

	getCountedValues() {
		return [...this.#counts.keys()];
	}
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split(' ').map(e => +e);
	let ck = new CountKeeper;

	data.forEach(e => ck.increaseCountOf(e, 1));

	for (let i = 0; i < 25; i++) {
		const newCk = new CountKeeper;
		ck.getCountedValues().forEach(e => {
			const numOfValue = ck.getCountOf(e);
			if (e == 0) {
				newCk.increaseCountOf(1, numOfValue);
				return;
			}
			const n = Math.trunc(Math.log10(e) + 1);
			if (n % 2 == 0) {
				const left = Math.trunc(e / Math.pow(10, n / 2));
				const right = e % Math.pow(10, n / 2);
				newCk.increaseCountOf(left, numOfValue);
				newCk.increaseCountOf(right, numOfValue);
			} else {
				newCk.increaseCountOf(e * 2024, numOfValue);
			}
		});
		ck = newCk;
	}
	let sum = 0;
	ck.getCountedValues().forEach(e => sum += ck.getCountOf(e));
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split(' ').map(e => +e);
	let ck = new CountKeeper;

	data.forEach(e => ck.increaseCountOf(e, 1));

	for (let i = 0; i < 75; i++) {
		const newCk = new CountKeeper;
		ck.getCountedValues().forEach(e => {
			const numOfValue = ck.getCountOf(e);
			if (e == 0) {
				newCk.increaseCountOf(1, numOfValue);
				return;
			}
			const n = Math.trunc(Math.log10(e) + 1);
			if (n % 2 == 0) {
				const left = Math.trunc(e / Math.pow(10, n / 2));
				const right = e % Math.pow(10, n / 2);
				newCk.increaseCountOf(left, numOfValue);
				newCk.increaseCountOf(right, numOfValue);
			} else {
				newCk.increaseCountOf(e * 2024, numOfValue);
			}
		});
		ck = newCk;
	}
	let sum = 0;
	ck.getCountedValues().forEach(e => sum += ck.getCountOf(e));
	return sum;
};
