/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	const height = data.length;
	const width = data[0].length;
	/** @type {Map<string, [number, number][]} */
	const nodes = new Map();
	/** @type {Set<string>} */
	const aniNodes = new Set();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			if (data[y][x] != '.') {
				const nodeLabel = data[y][x];
				const nodeList = nodes.get(nodeLabel) || [];
				nodeList.push([x, y]);
				nodes.set(nodeLabel, nodeList);
			}
		}
	}

	for (const nodeList of nodes.values()) {
		for (let i = 0; i < nodeList.length - 1; i++) {
			for (let j = i + 1; j < nodeList.length; j++) {
				const distX = nodeList[i][0] - nodeList[j][0];
				const distY = nodeList[i][1] - nodeList[j][1];
				const point1 = [nodeList[i][0] + distX, nodeList[i][1] + distY];
				const point2 = [nodeList[j][0] - distX, nodeList[j][1] - distY];
				if (-1 < point1[0] && point1[0] < width && -1 < point1[1] && point1[1] < height) {
					aniNodes.add(point1.join('x'));
				}
				if (-1 < point2[0] && point2[0] < width && -1 < point2[1] && point2[1] < height) {
					aniNodes.add(point2.join('x'));
				}
				//console.log(nodeList[i], nodeList[j], distX, distY, point1, point2);
			}
		}
		//console.log(nodeList);
	}
	return aniNodes.size;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
