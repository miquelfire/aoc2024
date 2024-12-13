/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n').map(e => {
		const regex = /Button A: X\+(\d+), Y\+(\d+)\n\r?Button B: X\+(\d+), Y\+(\d+)\n\r?Prize: X=(\d+), Y=(\d+)/;
		const match = regex.exec(e);
		if (match == null) throw new Error;
		const [, ax, ay, bx, by, px, py] = match;
		return [ax, ay, bx, by, px, py];
	}).map(e => e.map(e => +e));
	data.forEach((e, i) => {
		const b = (e[5] * e[0] - e[4] * e[1]) / (e[3] * e[0] - e[2] * e[1]);
		const a = (e[5] - e[3] * b) / e[1];
		if (a % 1 == 0 && b % 1 == 0) {
			data[i] = [a, b];
		} else {
			data[i] = false;
		}
	});
	return data.filter((e => e)).reduce((p, v) => p += v[0] * 3 + v[1], 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n').map(e => {
		const regex = /Button A: X\+(\d+), Y\+(\d+)\n\r?Button B: X\+(\d+), Y\+(\d+)\n\r?Prize: X=(\d+), Y=(\d+)/;
		const match = regex.exec(e);
		if (match == null) throw new Error;
		const [, ax, ay, bx, by, px, py] = match;
		return [BigInt(ax), BigInt(ay), BigInt(bx), BigInt(by), BigInt(px) + 10000000000000n, BigInt(py) + 10000000000000n];
	});
	data.forEach((e, i) => {
		const b = (e[5] * e[0] - e[4] * e[1]) / (e[3] * e[0] - e[2] * e[1]);
		const bm = (e[5] * e[0] - e[4] * e[1]) % (e[3] * e[0] - e[2] * e[1]);
		const a = (e[5] - e[3] * b) / e[1];
		const am = (e[5] - e[3] * b) % e[1];
		if (am == 0 && bm == 0) {
			data[i] = [a, b];
		} else {
			data[i] = false;
		}
	});
	return data.filter((e => e)).reduce((p, v) => p += v[0] * 3n + v[1], 0n).toString(10);
};
