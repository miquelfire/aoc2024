/**
 * @param {string} d 
 */
export const part1 = async d => {
	const [rules, updates] = d.split('\n\n').map((e, i) => e.split('\n').map(e => e.split((i == 0) ? '|' : ',')));

	/**
	 * 
	 * @param {string[]} update 
	 */
	function followRules(update) {
		let idx = new Map();
		for (let [id, val] of update.entries()) {
			idx.set(val, id);
		}
		for (let [before, after] of rules) {
			if (idx.has(before) && idx.has(after) && idx.get(before) > idx.get(after)) {
				return false;
			}
		}
		return true;
	}
	let sum = 0;

	for (let update of updates) {
		if (followRules(update)) {
			sum += Number(update[Math.floor(update.length / 2)]);
		}
	}
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const [rules, updates] = d.split('\n\n').map((e, i) => e.split('\n').map(e => e.split((i == 0) ? '|' : ',')));
	function topoSort(update) {
		let set = new Set(update);
		let indegree = new Map();
		let graph = new Map();
		let q = [];
		let res = [];

		for (let key of set) {
			graph.set(key, []);
			indegree.set(key, 0);
		}

		for (let [before, after] of rules) {
			if (set.has(before) && set.has(after)) {
				graph.get(before).push(after);
				indegree.set(after, indegree.get(after) + 1);
			}
		}

		for (let [key, val] of indegree.entries()) {
			if (val == 0) q.push(key);
		}

		while (q.length > 0) {
			const node = q.shift();
			res.push(node);
			for (let nei of graph.get(node)) {
				indegree.set(nei, indegree.get(nei) - 1);
				if (indegree.get(nei) === 0) {
					q.push(nei);
				}
			}
		}
		return res;
	}

	function followRules(update) {
		let idx = new Map();
		for (let [id, val] of update.entries()) {
			idx.set(val, id);
		}
		for (let [before, after] of rules) {
			if (idx.has(before) && idx.has(after) && idx.get(before) > idx.get(after)) {
				return false;
			}
		}
		return true;
	}

	let sum = 0;

	for (let update of updates) {
		if (!followRules(update)) {
			sum += Number(topoSort(update)[Math.floor(update.length / 2)]);
		}
	}
	return sum;
};
