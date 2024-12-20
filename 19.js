/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const towels = new RegExp('^(?:' + data[0].replaceAll(', ', '|') + ')+$');
	const patterns = data[1].split('\n');

	return patterns.filter(e => towels.test(e)).length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n');
	const towelPatternCheck = new RegExp('^(?:' + data[0].replaceAll(', ', '|') + ')+$');
	const patterns = data[1].split('\n').filter(e => towelPatternCheck.test(e));
	const towels = data[0].split(', ');
	let sum = 0;
	
	patterns.forEach(e => {
		sum += memoize(e, towels, new Map());
	});

	return sum;
};

function memoize(partialPattern, towels, memo) {
	// If we've already matched this partial pattern, return its count
	if (memo.has(partialPattern)) return memo.get(partialPattern);
	// We've successfully matched the entire pattern
	if (!partialPattern.length) return 1;
	// This is the first time we get this pattern
	// Find the towels that can be added next
	const count = towels.filter((towel) => partialPattern.startsWith(towel))
		// Recurse and sum
		.reduce((sum, towel) => sum + memoize(partialPattern.slice(towel.length), towels, memo), 0);
	// cache result for this partial pattern and return it
	memo.set(partialPattern, count);
	return count;
}
