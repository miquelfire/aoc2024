/**
 * @param {string} d 
 */
export const part1 = async d => {
	const [inputsRaw, gatesRaw] = d.split('\n\n').map(e => e.split('\n'));

	/**@type {Map<string, string>} */
	const known = new Map(inputsRaw.map(e => e.split(': ')));

	/**@type{Map<string, [string, number, number]} */
	const formulas = new Map(gatesRaw.map(e => {
		const regEx = /([a-z\d]+) (AND|OR|XOR) ([a-z\d]+) -> ([a-z\d]+)/;
		const matches = regEx.exec(e);
		return [matches[4], [matches[2], matches[1], matches[3]]];
	}));

	/**@type {Map<string, (x:number, y:number) => number>} */
	const operators = new Map([
		['OR', (x, y) => x | y],
		['AND', (x, y) => x & y],
		['XOR', (x, y) => x ^ y],
	]);

	function calculate(wire) {
		if (known.has(wire)) {
			return known.get(wire);
		}
		/**@type {[string, number, number]} */
		const [op, x, y] = formulas.get(wire);
		known.set(wire, operators.get(op)(calculate(x), calculate(y)));
		return known.get(wire);
	}

	const zwires = [];
	let i = 0;
	while (true) {
		const key = 'z' + ('' + i).padStart(2, '0');
		if (!formulas.has(key)) {
			break;
		}
		zwires.push(calculate(key) + '');
		i++;
	}
	return BigInt('0b' + zwires.reverse().join(''), 2).toString();
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const [inputsRaw, gatesRaw] = d.split('\n\n').map(e => e.split('\n'));

	/**@type {Map<string, string>} */
	const known = new Map(inputsRaw.map(e => e.split(': ')));

	/**@type{Map<string, [string, number, number]} */
	const formulas = new Map(gatesRaw.map(e => {
		const regEx = /([a-z\d]+) (AND|OR|XOR) ([a-z\d]+) -> ([a-z\d]+)/;
		const matches = regEx.exec(e);
		return [matches[4], [matches[2], matches[1], matches[3]]];
	}));

	/**@type {Map<string, (x:number, y:number) => number>} */
	const operators = new Map([
		['OR', (x, y) => x | y],
		['AND', (x, y) => x & y],
		['XOR', (x, y) => x ^ y],
	]);

	function calculate(wire) {
		if (known.has(wire)) {
			return known.get(wire);
		}
		/**@type {[string, number, number]} */
		const [op, x, y] = formulas.get(wire);
		known.set(wire, operators.get(op)(calculate(x), calculate(y)));
		return known.get(wire);
	}

	const zwires = [];
	let i = 0;
	while (true) {
		const key = 'z' + ('' + i).padStart(2, '0');
		if (!formulas.has(key)) {
			break;
		}
		zwires.push(calculate(key) + '');
		i++;
	}
	console.log(parseInt(zwires.reverse().join(''), 2));

	return NaN;
};
