/**
 * @param {string} d 
 */
export const part1 = async d => {
	// TODO: Redo to allow having a straight paths work out
	const mapRaw = d.split('\n').map(e => e.split(''));
	/** @type {Map<string, string[]} */
	const map = new Map();
	const start = [0, 0];
	const end = [0, 0];

	/**
	 * try all paths, adding up costs as it moves and turns
	 * @param {string} current 
	 * @param {number} dir 1-4 -> NESW
	 * @param {string} end 
	 * @param {Map<string, string[]>} map 
	 * @returns {number}
	 */
	function pathFind(current, dir, end, map, cost = 0) {
		// Calculate cost of directions
		const [x, y] = current.split('x').map(e => +e);
		/** @type {Map<string, {cost: number, dir: number}>} */
		const pathCosts = new Map();
		const possiblePaths = map.get(current);
		let cheapestPath = Infinity;

		// TODO: going down straight paths and only recruse if there's choice
		switch (dir) {
			case 1: {
				pathCosts.set([x, y - 1].join('x'), { cost: 1, dir: 1 });
				pathCosts.set([x - 1, y].join('x'), { cost: 1000, dir: 4 });
				pathCosts.set([x + 1, y].join('x'), { cost: 1000, dir: 2 });
				break;
			}
			case 2: {
				pathCosts.set([x + 1, y].join('x'), { cost: 1, dir: 2 });
				pathCosts.set([x, y - 1].join('x'), { cost: 1000, dir: 1 });
				pathCosts.set([x, y + 1].join('x'), { cost: 1000, dir: 3 });
				break;
			}
			case 3: {
				pathCosts.set([x, y + 1].join('x'), { cost: 1, dir: 3 });
				pathCosts.set([x - 1, y].join('x'), { cost: 1000, dir: 4 });
				pathCosts.set([x + 1, y].join('x'), { cost: 1000, dir: 2 });
				break;
			}
			case 4: {
				pathCosts.set([x - 1, y].join('x'), { cost: 1, dir: 4 });
				pathCosts.set([x, y - 1].join('x'), { cost: 1000, dir: 1 });
				pathCosts.set([x, y + 1].join('x'), { cost: 1000, dir: 3 });
				break;
			}
		}

		pathCosts.forEach((costInfo, path) => {
			if (possiblePaths.includes(path)) {
				if (costInfo.cost == 1) {
					//
				} else {
					const new_cost = pathFind(path, costInfo.dir, end, map, cost + costInfo.cost);

				}
				if (new_cost < cheapestPath) {
					cheapestPath = new_cost;
				}
			}
		});
		return cheapestPath;
	}
	for (let y = 0; y < mapRaw.length; y++) {
		for (let x = 0; x < mapRaw[y].length; x++) {
			const nodes = [];
			if (mapRaw[y][x] == '#') {
				continue;
			}
			if (mapRaw[y][x] == 'S') {
				start[0] = x;
				start[1] = y;
			}
			if (mapRaw[y][x] == 'E') {
				end[0] = x;
				end[1] = y;
			}
			if (mapRaw[y][x - 1] != '#') {
				nodes.push([x - 1, y].join('x'));
			}
			if (mapRaw[y][x + 1] != '#') {
				nodes.push([x + 1, y].join('x'));
			}
			if (mapRaw[y - 1][x] != '#') {
				nodes.push([x, y - 1].join('x'));
			}
			if (mapRaw[y + 1][x] != '#') {
				nodes.push([x, y + 1].join('x'));
			}
			map.set([x, y].join('x'), nodes);
		}
	}

	return pathFind(start.join('x'), 2, end.join('x'), map);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const mapRaw = d.split('\n');
	mapRaw.splice(0, mapRaw.length);
	return mapRaw;
};
