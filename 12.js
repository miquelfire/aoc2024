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
	/**
	 * 
	 * @param {string[][]} garden 
	 * @param {number} x 
	 * @param {number} y 
	 * @returns number
	 */
	function getPatch(garden, y, x) {
		const start = x + 'x' + y;
		const patch = new Set([start]); // NESW
		const toProcess = new Set([start]);
		const idToMatch = garden[y][x];
		while (toProcess.size) {
			const [currPos] = toProcess;
			toProcess.delete(currPos);
			[x, y] = currPos.split('x').map(e => +e);
			if (y - 1 > -1) {
				// Checking the north plot
				if (garden[y - 1][x] == idToMatch) {
					toProcess.add([x, y - 1].join('x'));
				}
			}
			if (y + 1 < garden.length) {
				// Checking the north plot
				if (garden[y + 1][x] == idToMatch) {
					toProcess.add([x, y + 1].join('x'));
				}
			}
			if (x - 1 > -1) {
				// Checking the north plot
				if (garden[y][x - 1] == idToMatch) {
					toProcess.add([x - 1, y].join('x'));
				}
			}
			if (x + 1 < garden[y].length) {
				// Checking the north plot
				if (garden[y][x + 1] == idToMatch) {
					toProcess.add([x + 1, y].join('x'));
				}
			}

			garden[y][x] = null;
			patch.add([x, y].join('x'));
		}

		/**
		 * 
		 * @param {Set<string>} coords 
		 * @param {[number, number]} inputDeltaCoord1 
		 * @param {[number, number]} inputDeltaCoord2 
		 */
		function countSides(coords, inputDeltaCoord1, inputDeltaCoord2) {
			const counted = new Set();
			let count = 0;

			for (const cur of coords.values()) {
				if (counted.has(cur)) {
					continue;
				}

				count++;
				counted.add(cur);

				let delta1 = cur.split('x').map(e => +e);
				let delta2 = cur.split('x').map(e => +e);

				while (true) {
					delta1 = [delta1[0] + inputDeltaCoord1[0], delta1[1] + inputDeltaCoord1[1]];
					const ds = delta1.join('x');
					if (!coords.has(ds)) {
						break;
					}
					counted.add(ds);
				}

				while (true) {
					delta2 = [delta2[0] + inputDeltaCoord2[0], delta2[1] + inputDeltaCoord2[1]];
					const ds = delta2.join('x');
					if (!coords.has(ds)) {
						break;
					}
					counted.add(ds);
				}
			}

			return count;
		}
		/*
  private int countSides(final Set<Coord> coords, final Coord inputDeltaCoord1, final Coord inputDeltaCoord2)
  {
	final Set<Coord> countedCoords = new HashSet<>();
	int count = 0;
	for (final Coord curCoord : coords)
	{
	  if (countedCoords.contains(curCoord)) continue;

	  count++;
	  countedCoords.add(curCoord);
	  
	  Coord delta1Coord = curCoord;
	  Coord delta2Coord = curCoord;
	  

	  // Look in second direction to continue the side
	  while (true)
	  {
		delta2Coord = new Coord(delta2Coord.x() + inputDeltaCoord2.x(), delta2Coord.y() + inputDeltaCoord2.y());
		if (!coords.contains(delta2Coord)) break;
		countedCoords.add(delta2Coord);
	  }
	}

	return count;
  }
		*/
		const norths = new Set();
		const souths = new Set();
		const easts = new Set();
		const wests = new Set();

		for (const currPos of patch.values()) {

			[x, y] = currPos.split('x').map(e => +e);
			const north = [x, y - 1].join('x');
			const south = [x, y + 1].join('x');
			const east = [x + 1, y].join('x');
			const west = [x - 1, y].join('x');

			if (!patch.has(north)) {
				norths.add(north);
			}
			if (!patch.has(south)) {
				souths.add(south);
			}
			if (!patch.has(east)) {
				easts.add(east);
			}
			if (!patch.has(west)) {
				wests.add(west);
			}
		}

		const northSides = countSides(norths, [-1, 0], [1, 0]);
		const southSides = countSides(souths, [-1, 0], [1, 0]);
		const eastSides = countSides(easts, [0, -1], [0, 1]);
		const westSides = countSides(wests, [0, -1], [0, 1]);

		return (northSides + southSides + eastSides + westSides) * patch.size;
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
