/**
 * @param {string} d 
 */
export const part1 = async d => {
	/**
	 * @param {string} code 
	 * @returns 
	 */
	function getNumber(code) {
		const regEx = /([1-9]\d?\d?)A/;
		const match = regEx.exec(code);
		if (match != null && match[1] !== undefined) {
			return Number(match[1]);
		}
		return 0;
	}

	/**
	 * 
	 * @param {string} pattern 
	 * @param {string[][]} keypad 
	 */
	function generateButtonPresses(pattern, keypad) {
		const pos = new Map();
		for (let r = 0; r < keypad.length; r++) {
			for (let c = 0; c < keypad[r].length; c++) {
				if (keypad[r][c] !== null) {
					pos.set(keypad[r][c], [r, c]);
				}
			}
		}

		const seq = new Map();
		pos.forEach((xv, xk) => {
			pos.forEach((yv, yk) => {
				if (xk == yk) {
					seq.set(xk + yk, ['A']);
					return;
				}

				let possibilities = [];
				/** @type {[number, number, string][]} */
				const queue = [[...xv, '']];
				let optimal = Infinity;
				whileloop: while (queue.length) {
					const [r, c, moves] = queue.shift();
					/** @type {[number, number, string][]} */
					const possMove = [
						[r - 1, c, '^'],
						[r + 1, c, 'v'],
						[r, c - 1, '<'],
						[r, c + 1, '>']
					];

					for (let [nr, nc, nm] of possMove) {
						if (nr < 0 || nc < 0 || nr >= keypad.length || nc >= keypad[0].length) continue;
						if (keypad[nr][nc] == null) continue;
						if (keypad[nr][nc] == yk) {
							if (optimal < moves.length + 1) break whileloop;
							optimal = moves.length + 1;
							possibilities.push(moves + nm + 'A');
						} else {
							queue.push([nr, nc, moves + nm]);
						}
					}
					/*Py example: Not sure what this does, just keeping it here until I notice something is wrong with my code
					else continue
					break */
				}
				seq.set(xk + yk, possibilities);
			});
		});

		const pathsRaw = [];
		pattern = 'A' + pattern;
		for (let i = 0; i < pattern.length - 1; i++) {
			pathsRaw.push(seq.get(pattern.slice(i, i + 2)));
		}
		return pathsRaw.reduce((p, v) => {
			var tmp = [];
			p.forEach(a0 => {
				v.forEach(a1 => {
					tmp.push(a0 + a1);
				});
			});
			return tmp;
		}, [[]]);
	}

	const codesToEnter = d.split('\n'); // Needed to get the final output. Easier than combining later on.

	const numKeypad = [
		['7', '8', '9'],
		['4', '5', '6'],
		['1', '2', '3'],
		[null, '0', 'A'],
	];

	const dirKeypad = [
		[null, '^', 'A'],
		['<', 'v', '>'],
	];

	let sum = 0;
	for (let code of codesToEnter) {
		let currobot = generateButtonPresses(code, numKeypad);

		for (let i = 0; i < 2; i++) {
			let nextrobot = [];
			let minLen = Infinity;
			for (let seq of currobot) {
				const tmp = generateButtonPresses(seq, dirKeypad);
				minLen = Math.min(minLen, ...tmp.map(e => e.length));
				nextrobot = nextrobot.filter(e => e.length == minLen);
				nextrobot.push(...tmp.filter(e => e.length == minLen));

			}
			currobot = nextrobot.filter(e => e.length == minLen);
		}
		sum += currobot[0].length * getNumber(code);
	}

	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	/**
	 * @param {string} code 
	 * @returns 
	 */
	function getNumber(code) {
		const regEx = /([1-9]\d?\d?)A/;
		const match = regEx.exec(code);
		if (match != null && match[1] !== undefined) {
			return Number(match[1]);
		}
		return 0;
	}

	/**
	 * 
	 * @param {string} pattern 
	 * @param {Map<string, string[]} seq 
	 */
	function generateButtonPresses(pattern, seq) {

		const pathsRaw = [];
		pattern = 'A' + pattern;
		for (let i = 0; i < pattern.length - 1; i++) {
			pathsRaw.push(seq.get(pattern.slice(i, i + 2)));
		}
		return pathsRaw.reduce((p, v) => {
			var tmp = [];
			p.forEach(a0 => {
				v.forEach(a1 => {
					tmp.push(a0 + a1);
				});
			});
			return tmp;
		}, [[]]);
	}

	/**
	 * 
	 * @param {string[][]} keypad 
	 */
	function compute_seqs(keypad) {
		/** @type{Map<string, [number, number]} */
		const pos = new Map();
		for (let r = 0; r < keypad.length; r++) {
			for (let c = 0; c < keypad[r].length; c++) {
				if (keypad[r][c] !== null) {
					pos.set(keypad[r][c], [r, c]);
				}
			}
		}

		/** @type {Map<string, string[]} */
		const seq = new Map();
		pos.forEach((xv, xk) => {
			pos.forEach((yv, yk) => {
				if (xk == yk) {
					seq.set(xk + yk, ['A']);
					return;
				}

				let possibilities = [];
				/** @type {[number, number, string][]} */
				const queue = [[...xv, '']];
				let optimal = Infinity;
				whileloop: while (queue.length) {
					const [r, c, moves] = queue.shift();
					/** @type {[number, number, string][]} */
					const possMove = [
						[r - 1, c, '^'],
						[r + 1, c, 'v'],
						[r, c - 1, '<'],
						[r, c + 1, '>']
					];

					for (let [nr, nc, nm] of possMove) {
						if (nr < 0 || nc < 0 || nr >= keypad.length || nc >= keypad[0].length) continue;
						if (keypad[nr][nc] == null) continue;
						if (keypad[nr][nc] == yk) {
							if (optimal < moves.length + 1) break whileloop;
							optimal = moves.length + 1;
							possibilities.push(moves + nm + 'A');
						} else {
							queue.push([nr, nc, moves + nm]);
						}
					}
					/*Py example: Not sure what this does, just keeping it here until I notice something is wrong with my code
					else continue
					break */
				}
				seq.set(xk + yk, possibilities);
			});
		});
		return seq;
	}

	const codesToEnter = d.split('\n'); // Needed to get the final output. Easier than combining later on.

	const numKeypad = compute_seqs([
		['7', '8', '9'],
		['4', '5', '6'],
		['1', '2', '3'],
		[null, '0', 'A'],
	]);

	const dirKeypad = compute_seqs([
		[null, '^', 'A'],
		['<', 'v', '>'],
	]);

	/** @type {Map<string, number>} */
	const dirLengths = new Map(dirKeypad.entries().map(e => [e[0], e[1][0].length]));

	/** @type {Map<string, number>} */ // TODO Find out what the return value of compute_length is
	const compute_length_cache = new Map();
	/**
	 * 
	 * @param {string} x 
	 * @param {string} y 
	 * @param {number} depth 
	 */
	const compute_length = (x, y, depth = 2) => {
		const cache_id = [x, y, depth].join('*');
		const pair = x + y;
		if (compute_length_cache.has(cache_id)) {
			return compute_length_cache.get(cache_id);
		}
		if (depth == 1) {
			return dirLengths.get(pair);
		}
		if (dirKeypad.has(pair)) {
			let optimal = Infinity;
			for (let seq of dirKeypad.get(pair)) {
				let length = 0;
				const newPairs = [];
				seq = 'A' + seq;
				for (let i = 0; i < seq.length - 1; i++) {
					newPairs.push(seq.slice(i, i + 2));
				}
				for (let pair2 of newPairs) {
					length += compute_length(pair2[0], pair2[1], depth - 1);
				}
				optimal = Math.min(optimal, length);
			}
			compute_length_cache.set(cache_id, optimal);
			return optimal;
		}
		return 0;
	};

	let sum = 0;
	for (let code of codesToEnter) {
		let inputs = generateButtonPresses(code, numKeypad);
		let optimal = Infinity;
		for (let seq of inputs) {
			let length = 0;
			const newPairs = [];
			seq = 'A' + seq;
			for (let i = 0; i < seq.length - 1; i++) {
				newPairs.push(seq.slice(i, i + 2));
			}
			for (let pair2 of newPairs) {
				length += compute_length(pair2[0], pair2[1], 25);
			}
			optimal = Math.min(optimal, length);
		}
		sum += optimal * getNumber(code);
	}

	// 81975 Too Low
	return sum;
};
