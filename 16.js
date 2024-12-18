import { ucs } from './utils.js';

/**
 * 
 * @param {string[][]} mapRaw 
 * @param {string[]} pathRaw
 */
// eslint-disable-next-line no-unused-vars
function drawMap(mapRaw, pathRaw) {
	// Clone map
	const map = mapRaw.map(e => e.join('')).join('\n').split('\n').map(e => e.split(''));
	const path = pathRaw.map(e => e.split('x').map(e => +e));

	path.forEach(([x, y]) => map[y][x] = 'O');

	console.log(map.map(e => e.join('')).join('\n'));
}
/**
 * @param {string} d 
 */
export const part1 = async d => {
	// TODO: Redo to allow having a straight paths work out
	const mapRaw = d.split('\n').map(e => e.split(''));
	/** @type {Map<string, { node: string, cost: number }[]} */
	const map = new Map();
	const start = [0, 0, 1];
	const end = [0, 0];

	for (let y = 0; y < mapRaw.length; y++) {
		for (let x = 0; x < mapRaw[y].length; x++) {
			/**
			 * @type {{node: string, cost: number}[][]}
			 */
			const nodes = [[], [], [], []]; // One for each direction we are facing
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

			// Going to the West
			if (mapRaw[y][x - 1] != '#') {
				nodes[3].push({ node: [x - 1, y, 3].join('x'), cost: 1 });
				nodes[0].push({ node: [x - 1, y, 0].join('x'), cost: 1001 });
				nodes[2].push({ node: [x - 1, y, 2].join('x'), cost: 1001 });
			}
			// Going to the East
			if (mapRaw[y][x + 1] != '#') {
				nodes[1].push({ node: [x + 1, y, 1].join('x'), cost: 1 });
				nodes[0].push({ node: [x + 1, y, 0].join('x'), cost: 1001 });
				nodes[2].push({ node: [x + 1, y, 2].join('x'), cost: 1001 });
			}
			// Going to the North
			if (mapRaw[y - 1][x] != '#') {
				nodes[0].push({ node: [x, y - 1, 0].join('x'), cost: 1 });
				nodes[1].push({ node: [x, y - 1, 1].join('x'), cost: 1001 });
				nodes[3].push({ node: [x, y - 1, 3].join('x'), cost: 1001 });
			}
			// Going to the South
			if (mapRaw[y + 1][x] != '#') {
				nodes[2].push({ node: [x, y + 1, 2].join('x'), cost: 1 });
				nodes[1].push({ node: [x, y + 1, 1].join('x'), cost: 1001 });
				nodes[3].push({ node: [x, y + 1, 3].join('x'), cost: 1001 });
			}
			map.set([x, y, 0].join('x'), nodes[0]);
			map.set([x, y, 1].join('x'), nodes[1]);
			map.set([x, y, 2].join('x'), nodes[2]);
			map.set([x, y, 3].join('x'), nodes[3]);
		}
	}
	map.set([...end, 0].join('x'), [{ node: end.join('x'), cost: 0 }]);
	map.set([...end, 1].join('x'), [{ node: end.join('x'), cost: 0 }]);
	map.set([...end, 2].join('x'), [{ node: end.join('x'), cost: 0 }]);
	map.set([...end, 3].join('x'), [{ node: end.join('x'), cost: 0 }]);
	map.set(end.join('x'), [
		{ node: [...end, 0].join('x'), cost: 0 },
		{ node: [...end, 1].join('x'), cost: 0 },
		{ node: [...end, 2].join('x'), cost: 0 },
		{ node: [...end, 3].join('x'), cost: 0 },
	]);

	const path = ucs(start.join('x'), end.join('x'), map);
	if (!path) {
		return null;
	}

	drawMap(mapRaw, path);

	// Remove the direction from the path returned values
	path.reverse().splice(path.length - 1, 1);
	path.forEach((e, i) => {
		const [x, y] = e.split('x');
		path[i] = [+x, +y];
	});

	/**
	 * 
	 * @param {[number, number][]} path 
	 * @param {*} map 
	 * @param {[number, number]} cur 
	 * @returns 
	 */
	function getCostOfPath(path, cur) {
		let sum = path.length;
		let turns = 0;
		if (path[0][1] != cur[1]) {
			turns++;
		}
		path.unshift(cur.slice(0, 1));

		// Check for turns
		for (let i = 1; i < path.length - 1; i++) {
			if (path[i - 1][0] != path[i + 1][0] && path[i - 1][1] != path[i + 1][1]) {
				turns++;
			}
		}
		return sum + turns * 1000;
	}

	return getCostOfPath(path, start);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const mapRaw = d.split('\n');
	mapRaw.splice(0, mapRaw.length);
	return mapRaw;
};
