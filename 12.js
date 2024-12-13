/**
 * @param {string} d 
 */
export const part1 = async d => {
	/**
	 * 
	 * @param {string[][]} garden 
	 * @param {number} x 
	 * @param {number} y 
	 * @returns number
	 */
	function getPatch(garden, y, x) {
		const patch = new Map([[x + 'x' + y, 4]]); // NESW
		const toProcess = new Set([x + 'x' + y]);
		const idToMatch = garden[y][x];
		while (toProcess.size) {
			let fences = 4;
			const [currPos] = toProcess;
			toProcess.delete(currPos);
			[x, y] = currPos.split('x').map(e => +e);
			if (y - 1 > -1) {
				// Checking the north plot
				if (patch.has([x, y - 1].join('x'))) {
					fences--;
				}
				if (garden[y - 1][x] == idToMatch) {
					toProcess.add([x, y - 1].join('x'));
					fences--;
				}
			}
			if (y + 1 < garden.length) {
				// Checking the north plot
				if (patch.has([x, y + 1].join('x'))) {
					fences--;
				}
				if (garden[y + 1][x] == idToMatch) {
					toProcess.add([x, y + 1].join('x'));
					fences--;
				}
			}
			if (x - 1 > -1) {
				// Checking the north plot
				if (patch.has([x - 1, y].join('x'))) {
					fences--;
				}
				if (garden[y][x - 1] == idToMatch) {
					toProcess.add([x - 1, y].join('x'));
					fences--;
				}
			}
			if (x + 1 < garden[y].length) {
				// Checking the north plot
				if (patch.has([x + 1, y].join('x'))) {
					fences--;
				}
				if (garden[y][x + 1] == idToMatch) {
					toProcess.add([x + 1, y].join('x'));
					fences--;
				}
			}

			garden[y][x] = null;
			patch.set([x, y].join('x'), fences);
		}

		// TODO get number of fences to handle
		return patch.size * [...patch.values()].reduce((p, v) => p + v);
	}
	const garden = d.split('\n').map(e => e.split(''));
	let sum = 0;

	for (let y = 0; y < garden.length; y++) {
		for (let x = 0; x < garden[y].length; x++) {
			if (garden[y][x]) {
				sum += getPatch(garden, y, x);
			}
		}
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
