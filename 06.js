/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	/** @type {Set<string>} */
	const visited = new Set();
	/** @type {Set<string} */
	const objects = new Set();
	/* x, y, dir (North = 0, NESW like CSS) */
	const guardInfo = [0,0,0];

	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			const pos = x + 'x' + y;
			switch (data[y][x]) {
				case '^': {
					guardInfo[0] = x;
					guardInfo[1] = y;
					visited.add(pos);
					break;
				}
				case '#': {
					objects.add(pos);
					break;
				}
			}
		}
	}

	while (0 <= guardInfo[0] && guardInfo[0] < data[0].length && 0 <= guardInfo[1] && guardInfo[1] < data.length) {
		let newPos = '';
		let newInfo = [...guardInfo];
		switch (guardInfo[2]) {
			case 0: {
				newInfo[1]--;
				newPos = newInfo[0] + 'x' + newInfo[1];
				if (objects.has(newPos)) {
					guardInfo[2]++;
					break; // Let East handle things
				}
				guardInfo[1]--;
				visited.add(newPos);
				break;
			}
			case 1: {
				newInfo[0]++;
				newPos = newInfo[0] + 'x' + newInfo[1];
				if (objects.has(newPos)) {
					guardInfo[2]++;
					break; // Let South handle things
				}
				guardInfo[0]++;
				visited.add(newPos);
				break;
			}
			case 2: {
				newInfo[1]++;
				newPos = newInfo[0] + 'x' + newInfo[1];
				if (objects.has(newPos)) {
					guardInfo[2]++;
					break; // Let West handle things
				}
				guardInfo[1]++;
				visited.add(newPos);
				break;
			}
			case 3: {
				newInfo[0]--;
				newPos = newInfo[0] + 'x' + newInfo[1];
				if (objects.has(newPos)) {
					guardInfo[2] = 0;
					break; // Let North handle things
				}
				guardInfo[0]--;
				visited.add(newPos);
				break;
			}
		}
	}
	return visited.size - 1;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	/** @type {Set<string>} */
	const visited = new Set();
	/** @type {Set<string} */
	const objects = new Set();
	/* x, y, dir (North = 0, NESW like CSS) */
	const guardInfo = [0,0,0];
	let startPos = [0,0];
	let loopsFound = 0;

	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			const pos = x + 'x' + y;
			switch (data[y][x]) {
				case '^': {
					guardInfo[0] = x;
					guardInfo[1] = y;
					startPos[0] = x;
					startPos[1] = y;
					visited.add(guardInfo.join('x'));
					break;
				}
				case '#': {
					objects.add(pos);
					break;
				}
			}
		}
	}

	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			const newObj = x + 'x' + y;
			if (newObj == startPos.join('x')) {
				// Can't place on the guard!
				continue;
			}
			guardInfo[0] = startPos[0];
			guardInfo[1] = startPos[1];
			guardInfo[2] = 0;
			visited.clear();

			while (0 <= guardInfo[0] && guardInfo[0] < data[0].length && 0 <= guardInfo[1] && guardInfo[1] < data.length) {
				let newPos = '';
				let newInfo = [...guardInfo];
				switch (guardInfo[2]) {
					case 0: {
						newInfo[1]--;
						newPos = newInfo[0] + 'x' + newInfo[1];
						if (objects.has(newPos) || newObj == newPos) {
							guardInfo[2]++;
							break; // Let East handle things
						}
						guardInfo[1]--;
						if (visited.has(guardInfo.join('x'))) {
							// Found a loop
							guardInfo[0] = -1;
							loopsFound++;
						}
						visited.add(guardInfo.join('x'));
						break;
					}
					case 1: {
						newInfo[0]++;
						newPos = newInfo[0] + 'x' + newInfo[1];
						if (objects.has(newPos) || newObj == newPos) {
							guardInfo[2]++;
							break; // Let South handle things
						}
						guardInfo[0]++;
						if (visited.has(guardInfo.join('x'))) {
							// Found a loop
							guardInfo[0] = -1;
							loopsFound++;
						}
						visited.add(guardInfo.join('x'));
						break;
					}
					case 2: {
						newInfo[1]++;
						newPos = newInfo[0] + 'x' + newInfo[1];
						if (objects.has(newPos) || newObj == newPos) {
							guardInfo[2]++;
							break; // Let West handle things
						}
						guardInfo[1]++;
						if (visited.has(guardInfo.join('x'))) {
							// Found a loop
							guardInfo[0] = -1;
							loopsFound++;
						}
						visited.add(guardInfo.join('x'));
						break;
					}
					case 3: {
						newInfo[0]--;
						newPos = newInfo[0] + 'x' + newInfo[1];
						if (objects.has(newPos) || newObj == newPos) {
							guardInfo[2] = 0;
							break; // Let North handle things
						}
						guardInfo[0]--;
						if (visited.has(guardInfo.join('x'))) {
							// Found a loop
							guardInfo[0] = -1;
							loopsFound++;
						}
						visited.add(guardInfo.join('x'));
						break;
					}
				}
			}
		}
	}

	return loopsFound;
};
