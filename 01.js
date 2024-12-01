/**
 * @param {string} d 
 */
export const part1 = async d => {
	const list1 = [];
	const list2 = [];
	d.split('\n').map(e => e.split(/\W+/).map((e,i) => {
		if (i == 0) {
			list1.push(+e);
		} else {
			list2.push(+e);
		}
	}));
	list1.sort((a,b) => a - b);
	list2.sort((a,b) => a - b);

	return list1.reduce((p, c, i) => p + (Math.abs(c - list2[i])), 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const list1 = [];
	const list2 = new Map();
	d.split('\n').map(e => e.split(/\W+/).map((e,i) => {
		if (i == 0) {
			list1.push(e);
		} else {
			if (list2.has(e)) {
				list2.set(e, list2.get(e) + 1);
			} else {
				list2.set(e, 1);
			}
		}
	}));
	return list1.reduce((p, c) => p + (c * (list2.get(c) || 0)), 0);
};
