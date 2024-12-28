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
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
