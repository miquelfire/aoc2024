/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('').map(e => +e));
	/** @type {[number, number][]} */
	const startPoints = [];
	const trailScores = [new Set()];

	/**
	 * 
	 * @param {number[][]} map 
	 * @param {[number, number]} start 
	 * @param {Set<string>} ends
	 */
	function followPath(map, start, ends) {
		const nextHeight = map[start[0]][start[1]] + 1;

		if (nextHeight == 10) return ends.add(start.join('x'));
		if (start[0] + 1 < map.length && map[start[0] + 1][start[1]] == nextHeight) {
			followPath(map, [start[0] + 1, start[1]], ends);
		}
		if (start[1] + 1 < map[start[0]].length && map[start[0]][start[1] + 1] == nextHeight) {
			followPath(map, [start[0], start[1] + 1], ends);
		}
		if (start[0] - 1 > -1 && map[start[0] - 1][start[1]] == nextHeight) {
			followPath(map, [start[0] - 1, start[1]], ends);
		}
		if (start[1] - 1 > -1 && map[start[0]][start[1] - 1] == nextHeight) {
			followPath(map, [start[0], start[1] - 1], ends);
		}
		return ends;
	}

	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			if (data[y][x] == 0) {
				startPoints.push([y, x]);
			}
		}
	}

	startPoints.forEach(e => {
		trailScores.push(followPath(data, e, new Set()));
	});
	return trailScores.reduce((p, v) => p + v.size, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
