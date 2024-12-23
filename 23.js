/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split('-'));
	/**@type {Map<string, string[]} */
	const nodes = new Map();
	/**@type {Set<string>} */
	const targetNodes = new Set();
	/**@type {Set<string>} */
	const clusters = new Set();

	data.forEach(e => {
		if (!nodes.has(e[0])) {
			nodes.set(e[0], []);
		}
		if (!nodes.has(e[1])) {
			nodes.set(e[1], []);
		}

		nodes.get(e[0]).push(e[1]);
		nodes.get(e[1]).push(e[0]);

		if (e[0][0] == 't') {
			targetNodes.add(e[0]);
		}
		if (e[1][0] == 't') {
			targetNodes.add(e[1]);
		}
	});

	targetNodes.forEach(e => {
		const connectedNodes = nodes.get(e);
		for (let i of connectedNodes) {
			for (let j of connectedNodes) {
				if (i == j) continue;
				if (nodes.get(i).includes(j)) {
					clusters.add([e,i,j].sort().join(','));
				}
			}
		}
	});

	return clusters.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
