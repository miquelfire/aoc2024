import { bfs } from './utils.js';

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
	let test = true;
	const bytes = new Set();
	const bytesCroods = d.split('\n').map(e => {
		return e.split(',').map(e => {
			if (+e > 6) {
				test = false;
			}
			return +e;
		});
	});
	const endPoint = (test) ? '6x6' : '70x70';
	const size = (test) ? 7 : 71;
	const graph = new Map([['0x0', ['1x0', '0x1']]]);

	/**
	 * 
	 * @param {Map<string, string[]} graph 
	 * @param {Set<string>} bytes 
	 * @param {number} size 
	 */
	function generateGraph(graph, bytes, size) {
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
	}

	for (let i = 0; i < bytesCroods.length; i++) {
		bytes.add(bytesCroods[i].join('x'));
		graph.clear();
		generateGraph(graph, bytes, size);
		const path = bfs('0x0', endPoint, graph);
		if (!path) {
			return bytesCroods[i].join(',');
		}
	}

	//drawMap(bytesCroods, test);

	return null;
};
