/**
 * @param {string} d 
 */
export const part1 = async d => {
	const list1 = [];
	const list2 = [];
	const data = d.split('\n').map(e => e.split(/\W+/).map((e,i) => {
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
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
