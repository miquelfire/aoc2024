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
	/**
	 * @param {[number, number]} size
	 * @param {Set<string>} boxes 
	 * @param {Set<string>} walls 
	 * @param {[number, number]} robotPos 
	 */
	function drawMap(size, boxes, walls, robotPos) {
		const map = [];
		for (let y = 0; y < size[1]; y++) {
			const line = [];
			map.push(line);
			for (let x = 0; x < size[0]; x++) {
				line.push('.');
			}
		}

		for (let x = 0; x < size[0]; x++) {
			for (let y = 0; y < size[1]; y++) {
				if (robotPos[0] == x && robotPos[1] == y) {
					map[y][x] = '@';
				}
				const pos = [x, y].join('x');
				if (boxes.has(pos)) {
					map[y][x] = '[';
					map[y][x + 1] = ']';
				}
				if (walls.has(pos)) {
					map[y][x] = '#';
				}
			}
		}
		console.log(map.map(e => e.join('')).join('\n') + '\n');
	}
	const data = d.split('\n\n');
	const map = data[0].split('\n').map(e => e.split(''));
	const moves = data[1].split('\n').join('').split('');

	const walls = new Set(['0x0']); // Using 0x0 as a wall that is always there

	/** @type {Set<string>} */
	const boxes = new Set();
	const robotPos = [0, 0];
	const mapSize = [map[0].length * 2, map.length];

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			switch (map[y][x]) {
				case '#': {
					walls.add([x * 2, y].join('x'));
					walls.add([x * 2 + 1, y].join('x'));
					break;
				}
				case '@': {
					robotPos[0] = x * 2;
					robotPos[1] = y;
					break;
				}
				case 'O': {
					boxes.add([x * 2, y].join('x'));
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
		const boxesBeingPushed = new Set();
		const spacesToCheck = new Set();
		const pos = [...robotPos]; // Clone the robot's position
		let moving = true;
		let moveRobot = false;

		switch (e) {
			case '^': {
				// Move Robot North

				pos[1]--;
				spacesToCheck.add(pos.join('x'));
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}

				while (spacesToCheck.size) {
					const [posStr] = spacesToCheck;
					spacesToCheck.delete(posStr);
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					[pos[0], pos[1]] = posStr.split('x').map(e => +e);
					const boxCheck = [pos[0] - 1, pos[1]].join('x');
					const boxSpaceMove = [
						[pos[0] - 1, pos[1] - 1].join('x'), // Only if box is on boxCheck
						[pos[0], pos[1] - 1].join('x'),
						[pos[0] + 1, pos[1] - 1].join('x'), // Only if box is on posStr
					];
					if (!boxes.has(posStr) && !boxes.has(boxCheck)) {
						// Empty Floor, just move the robot one space
						moveRobot = true;
					} else if (boxes.has(posStr)) {
						boxesBeingPushed.add(posStr);
						spacesToCheck.add(boxSpaceMove[1]);
						spacesToCheck.add(boxSpaceMove[2]);
					} else if (boxes.has(boxCheck)) {
						boxesBeingPushed.add(boxCheck);
						spacesToCheck.add(boxSpaceMove[0]);
						spacesToCheck.add(boxSpaceMove[1]);
					}
					pos[1]--;
				}
				if (moving && moveRobot) {
					robotPos[1]--;
				}
				if (boxesBeingPushed.size && moving) {
					boxesBeingPushed.forEach(e => {
						boxes.delete(e);
					});
					boxesBeingPushed.forEach(e => {
						const oldPos = e.split('x');
						const newPos = [oldPos[0], +oldPos[1] + 1].join('x');
						boxes.add(newPos);
					});
				}

				break;
			}
			case 'v': {
				// Move Robot South

				pos[1]++;
				spacesToCheck.add(pos.join('x'));
				if (walls.has(pos.join('x'))) {
					break; // Ran into a wall at first. Nothing to do
				}
				
				while (spacesToCheck.size) {
					const [posStr] = spacesToCheck;
					spacesToCheck.delete(posStr);
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					[pos[0], pos[1]] = posStr.split('x').map(e => +e);
					const boxCheck = [pos[0] - 1, pos[1]].join('x');
					const boxSpaceMove = [
						[pos[0] - 1, pos[1] + 1].join('x'), // Only if box is on boxCheck
						[pos[0], pos[1] + 1].join('x'),
						[pos[0] + 1, pos[1] + 1].join('x'), // Only if box is on posStr
					];
					if (!boxes.has(posStr) && !boxes.has(boxCheck)) {
						// Empty Floor, just move the robot one space
						moveRobot = true;
					} else if (boxes.has(posStr)) {
						boxesBeingPushed.add(posStr);
						spacesToCheck.add(boxSpaceMove[1]);
						spacesToCheck.add(boxSpaceMove[2]);
					} else if (boxes.has(boxCheck)) {
						boxesBeingPushed.add(boxCheck);
						spacesToCheck.add(boxSpaceMove[0]);
						spacesToCheck.add(boxSpaceMove[1]);
					}
					pos[1]++;
				}
				if (moving && moveRobot) {
					robotPos[1]++;
				}
				if (boxesBeingPushed.size && moving) {
					boxesBeingPushed.forEach(e => {
						boxes.delete(e);
					});
					boxesBeingPushed.forEach(e => {
						const oldPos = e.split('x');
						const newPos = [oldPos[0], +oldPos[1] + 1].join('x');
						boxes.add(newPos);
					});
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
					const pos2Str = [pos[0] - 1, pos[1]].join('x');
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					if (!boxes.has(posStr) && boxes.has(pos2Str)) {
						boxesBeingPushed.add(pos2Str);
						pos[0]--;
					} else if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[0]--;
						break;
					}
					pos[0]--;
				}
				if (boxesBeingPushed.size && moving) {
					boxesBeingPushed.forEach(e => {
						const oldPos = e.split('x');
						const newPos = [oldPos[0] - 1, oldPos[1]].join('x');
						boxes.delete(e);
						boxes.add(newPos);
					});
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
					const pos2Str = [pos[0] + 1, pos[1]].join('x');
					if (walls.has(posStr)) {
						// Hit a wall 
						moving = false;
						break;
					}
					if (boxes.has(posStr)) {
						boxesBeingPushed.add(posStr);
						pos[0]++;
					} else if (!boxes.has(posStr)) {
						// Empty Floor, just move the robot one space
						robotPos[0]++;
						break;
					}
					pos[0]++;
				}
				if (boxesBeingPushed.size && moving) {
					boxesBeingPushed.forEach(e => {
						const oldPos = e.split('x');
						const newPos = [+oldPos[0] + 1, oldPos[1]].join('x');
						boxes.delete(e);
						boxes.add(newPos);
					});
				}

				break;
			}
		}
		drawMap(mapSize, boxes, walls, robotPos); debugger;
	});
	drawMap(mapSize, boxes, walls, robotPos); debugger;

	const boxGPS = [...boxes].map(e => e.split('x').map(e => +e).reduce((x, y) => y * 100 + x)).reduce((p, v) => p + v);

	return boxGPS;
};
