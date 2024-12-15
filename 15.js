/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const map = data[0].split('\n').map(e => e.split(''));
	const moves = data[1].split('\n').join('').split('');

	const walls = new Set(['0x0']); // Using 0x0 as a wall that is always there
	/** @type {Set<string>} */
	const boxes = new Set();
	const robotPos = [0, 0];

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			switch (map[y][x]) {
				case '#': {
					walls.add([x, y].join('x'));
					break;
				}
				case '@': {
					robotPos[0] = x;
					robotPos[1] = y;
					break;
				}
				case 'O': {
					boxes.add([x, y].join('x'));
					break;
				}
				case '.': {
					// Just the floor
					break;
				}
			}
		}
	}

	moves.forEach(e => {
		/** @type {Set<string>} */
		const boxesToMove = new Set();
		const pos = [...robotPos]; // Clone the robot's position
		let moving = true;

		switch (e) {
			case '^': {
				// Move Robot North

				pos[1]--;
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}
				while (moving) {
					const posStr = pos.join('x');
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[1]--;
						break;
					} else {
						boxesToMove.add(posStr);
					}
					pos[1]--;
				}
				if (boxesToMove.size && moving) {
					const [...temp] = boxesToMove;
					const boxToRemove = temp.shift();
					const boxToAdd = (temp.pop() || boxToRemove).split('x').map(e => +e);
					boxToAdd[1]--;
					boxes.delete(boxToRemove);
					boxes.add(boxToAdd.join('x'));
				}

				break;
			}
			case 'v': {
				// Move Robot South

				pos[1]++;
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}
				while (moving) {
					const posStr = pos.join('x');
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[1]++;
						break;
					} else {
						boxesToMove.add(posStr);
					}
					pos[1]++;
				}
				if (boxesToMove.size && moving) {
					const [...temp] = boxesToMove;
					const boxToRemove = temp.shift();
					const boxToAdd = (temp.pop() || boxToRemove).split('x').map(e => +e);
					boxToAdd[1]++;
					boxes.delete(boxToRemove);
					boxes.add(boxToAdd.join('x'));
				}

				break;
			}
			case '<': {
				// Move Robot West

				pos[0]--;
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}
				while (moving) {
					const posStr = pos.join('x');
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[0]--;
						break;
					} else {
						boxesToMove.add(posStr);
					}
					pos[0]--;
				}
				if (boxesToMove.size && moving) {
					const [...temp] = boxesToMove;
					const boxToRemove = temp.shift();
					const boxToAdd = (temp.pop() || boxToRemove).split('x').map(e => +e);
					boxToAdd[0]--;
					boxes.delete(boxToRemove);
					boxes.add(boxToAdd.join('x'));
				}

				break;
			}
			case '>': {
				// Move Robot East

				pos[0]++;
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}
				while (moving) {
					const posStr = pos.join('x');
					if (walls.has(posStr)) {
						// Hit a wall
						moving = false;
						break;
					}
					if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[0]++;
						break;
					} else {
						boxesToMove.add(posStr);
					}
					pos[0]++;
				}
				if (boxesToMove.size && moving) {
					const [...temp] = boxesToMove;
					const boxToRemove = temp.shift();
					const boxToAdd = (temp.pop() || boxToRemove).split('x').map(e => +e);
					boxToAdd[0]++;
					boxes.delete(boxToRemove);
					boxes.add(boxToAdd.join('x'));
				}

				break;
			}
		}
	});

	const boxGPS = [...boxes].map(e => e.split('x').map(e => +e).reduce((x, y) => y * 100 + x)).reduce((p, v) => p + v);

	return boxGPS;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
