/**
 * @param {string} d 
 */
export const part1 = async d => {
	const robots = d.split('\n').map(e => {
		const regex = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/;
		const match = regex.exec(e);

		return [+match[1], +match[2], +match[3], +match[4]];
	});
	const quads = [0, 0, 0, 0];

	const gridSize = [11, 7];
	if (robots.length > 15) {
		// Using real data
		gridSize[0] = 101;
		gridSize[1] = 103;
	}
	const midpoints = [Math.floor(gridSize[0] / 2), Math.floor(gridSize[1] / 2)];

	// Simulate steps
	robots.forEach(e => {
		let x = (e[0] + e[2] * 100) % gridSize[0];
		if (x < 0) {
			x += gridSize[0];
		}
		let y = (e[1] + e[3] * 100) % gridSize[1];
		if (y < 0) {
			y += gridSize[1];
		}
		if (x < midpoints[0] && y < midpoints[1]) {
			quads[0]++;
		}
		if (x < midpoints[0] && y > midpoints[1]) {
			quads[1]++;
		}
		if (x > midpoints[0] && y < midpoints[1]) {
			quads[2]++;
		}
		if (x > midpoints[0] && y > midpoints[1]) {
			quads[3]++;
		}
	});

	return quads.reduce((p, v) => p * v);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
