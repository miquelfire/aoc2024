/**
 * @param {string} d 
 */
export const part1 = async d => {
	/**
	 * @param {string[]} equation 
	 */
	function isValid(equation) {
		/**
		 * @type {[number, number[]]}
		 */
		const [total, parts] = equation;
		return sovler(total, parts, 1, parts[0]);
	}

	/**
	 * @param {number} 
	 * @param {number[]} 
	 * @param {number} 
	 * @param {number} 
	 * @returns 
	 */
	function sovler(total, inputs, pos, runningTotal) {
		if (runningTotal > total) {
			return false;
		}

		if (pos >= inputs.length) {
			if (runningTotal == total) {
				return true;
			}
			return false;
		}

		const result1 = sovler(total, inputs, pos + 1, runningTotal + inputs[pos]);
		const result2 = sovler(total, inputs, pos + 1, runningTotal * inputs[pos]);

		if (result1 || result2) {
			return true;
		}

		return false;
	}

	/**
	 * @type {[number, number[]]}
	 */
	const data = d.split('\n').map(e => e.split(': ').map((e, i) => (i == 1) ? e.split(' ').map(e => +e) : +e));
	let sum = 0;

	data.forEach(e => {
		if (isValid(e)) {
			sum += e[0];
		}
	});

	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	/**
	 * @param {string[]} equation 
	 */
	function isValid(equation) {
		/**
		 * @type {[number, number[]]}
		 */
		const [total, parts] = equation;
		return sovler(total, parts, 1, parts[0]);
	}

	/**
	 * @param {number} 
	 * @param {number[]} 
	 * @param {number} 
	 * @param {number} 
	 * @returns 
	 */
	function sovler(total, inputs, pos, runningTotal) {
		if (runningTotal > total) {
			return false;
		}

		if (pos >= inputs.length) {
			if (runningTotal == total) {
				return true;
			}
			return false;
		}

		const result1 = sovler(total, inputs, pos + 1, runningTotal + inputs[pos]);
		const result2 = sovler(total, inputs, pos + 1, runningTotal * inputs[pos]);
		const result3 = sovler(total, inputs, pos + 1, +(runningTotal + '' + inputs[pos]));

		if (result1 || result2 || result3) {
			return true;
		}

		return false;
	}

	/**
	 * @type {[number, number[]]}
	 */
	const data = d.split('\n').map(e => e.split(': ').map((e, i) => (i == 1) ? e.split(' ').map(e => +e) : +e));
	let sum = 0;

	data.forEach(e => {
		if (isValid(e)) {
			sum += e[0];
		}
	});

	return sum;
};
