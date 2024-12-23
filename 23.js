import _ from 'lodash';

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
					clusters.add([e, i, j].sort().join(','));
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
	const data = d.split('\n').map(e => e.split('-'));
	/**@type {Map<string, string[]} */
	const nodes = new Map();
	let found = new Set();

	data.forEach(e => {
		if (!nodes.has(e[0])) {
			nodes.set(e[0], []);
		}
		if (!nodes.has(e[1])) {
			nodes.set(e[1], []);
		}

		nodes.get(e[0]).push(e[1]);
		nodes.get(e[1]).push(e[0]);
	});

	for (let [key1, conn1] of nodes.entries()) {
		const cc = [key1, ...conn1];
		const other = conn1.map((key2) => [key2, ...nodes.get(key2)]);

		const w = other.map((s) => _.intersection(cc, s).length);
		const maxw = _.max(w);
		if (w.filter(v => v === maxw).length < maxw - 1) continue;
		if (maxw < found.size) continue;

		let base = [...cc];
		for (let i = 0; i < other.length && base.length >= maxw; i++) {
			if (w[i] !== maxw) continue;

			base = _.intersection(base, other[i]);
		}

		if (base.length < maxw) continue;
		const res = new Set(base.sort());
		if (_.isEqual(found, res)) continue;
		found = res;
	}

	return [...found].join(',');
};
