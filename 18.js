import { bfs } from './utils.js';

/**
 * 
 * @param {[number, number][]} bytes 
 * @param {boolean} testSize
 */
// eslint-disable-next-line no-unused-vars
function drawMap(bytes, testSize = true) {
	const map = [];
	const size = (testSize) ? 7 : 71;
	for (let y = 0; y < size; y++) {
		const line = [];
		for (let x = 0; x < size; x++) {
			line.push('.');
		}
		map.push(line);
	}

	bytes.forEach(e => map[e[1]][e[0]] = '#');
	console.log(map.map(e => e.join('')).join('\n'));
}
/**
 * @param {string} d 
 */
export const part1 = async d => {
	let test = true;
	const bytes = new Set();
	const bytesCroods = d.split('\n').map(e => {
		return e.split(',').map(e => {
			if (+e > 6) {
				test = false;
			}
			return +e;
		});
	}).slice(0, (test) ? 12 : 1024);
	bytesCroods.forEach(e => {
		bytes.add(e.join('x'));
	});
	const endPoint = (test) ? '6x6' : '70x70';
	const size = (test) ? 7 : 71;
	const graph = new Map([['0x0', ['1x0', '0x1']]]);
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			const nodes = [];
			const northPos = [x, y - 1].join('x');
			const southPos = [x, y + 1].join('x');
			const eastPos = [x - 1, y].join('x');
			const westPos = [x + 1, y].join('x');
			// North
			if (y - 1 > -1 && !bytes.has(northPos)) {
				nodes.push(northPos);
			}


			// South
			if (y + 1 < size && !bytes.has(southPos)) {
				nodes.push(southPos);
			}

			// East
			if (x - 1 > -1 && !bytes.has(eastPos)) {
				nodes.push(eastPos);
			}

			// West
			if (x + 1 < size && !bytes.has(westPos)) {
				nodes.push(westPos);
			}

			graph.set([x, y].join('x'), nodes);
		}
	}

	const path = bfs('0x0', endPoint, graph);
	//drawMap(bytesCroods, test);

	return path.length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
