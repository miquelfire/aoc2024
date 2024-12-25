import { type } from "os";

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const map = d.split('\n').map(e => e.split(''));
	const path = new Set('0x0'); // To be filled in when scanning the map
	path.clear();
	const start = [0, 0];
	const end = [0, 0];
	for (let y = 1; y < map.length; y++) {
		for (let x = 1; x < map[y].length - 1; x++) {
			const tile = map[y][x];
			if (tile == '#') {
				continue;
			}

			if (tile == 'S') {
				start[0] = x;
				start[1] = y;
			}
			if (tile == 'E') {
				end[0] = x;
				end[1] = y;
			}
			path.add([x, y].join('x'));
		}
	}

	const visited = new Map([['0x0', 0]]);
	visited.clear();
	// List of shortcuts we found but haven't used yet
	const unvisitedShortcut = new Map([['0x0', ['2x0', '0x2']]]);
	unvisitedShortcut.clear();
	// The number of saved "steps" per shortcut found. Part 2 might give us a reason to use a map instead
	const foundShortcuts = [0];
	foundShortcuts.pop();
	let count = 0;
	// queue should alway be a length of 1 until the end. Just easier to deal with an const array then let variable pointing the to next bit
	const queue = [start];

	while (queue.length) {
		const pos = queue.pop();
		const posStr = pos.join('x');
		// Calculate shortcuts savings that point here
		const shortcutsPointingHere = unvisitedShortcut.get(posStr);
		if (shortcutsPointingHere) {
			shortcutsPointingHere.forEach(shortcut => {
				const counted = visited.get(shortcut);
				foundShortcuts.push(count - 2 - counted);
			});
		}

		//#region Find the shortcuts we might be able to take
		const north1 = [pos[0], pos[1] - 1];
		const north2 = [pos[0], pos[1] - 2];
		const north1Str = north1.join('x');
		const north2Str = north2.join('x');
		const south1 = [pos[0], pos[1] + 1];
		const south2 = [pos[0], pos[1] + 2];
		const south1Str = south1.join('x');
		const south2Str = south2.join('x');
		const east1 = [pos[0] + 1, pos[1]];
		const east2 = [pos[0] + 2, pos[1]];
		const east1Str = east1.join('x');
		const east2Str = east2.join('x');
		const west1 = [pos[0] - 1, pos[1]];
		const west2 = [pos[0] - 2, pos[1]];
		const west1Str = west1.join('x');
		const west2Str = west2.join('x');

		if (!path.has(north1Str) && path.has(north2Str) && !visited.has(north2Str)) {
			const shortcuts = unvisitedShortcut.get(north2Str) || [];
			shortcuts.push(posStr);
			unvisitedShortcut.set(north2Str, shortcuts);
		}
		if (!path.has(south1Str) && path.has(south2Str) && !visited.has(south2Str)) {
			const shortcuts = unvisitedShortcut.get(south2Str) || [];
			shortcuts.push(posStr);
			unvisitedShortcut.set(south2Str, shortcuts);
		}
		if (!path.has(east1Str) && path.has(east2Str) && !visited.has(east2Str)) {
			const shortcuts = unvisitedShortcut.get(east2Str) || [];
			shortcuts.push(posStr);
			unvisitedShortcut.set(east2Str, shortcuts);
		}
		if (!path.has(west1Str) && path.has(west2Str) && !visited.has(west2Str)) {
			const shortcuts = unvisitedShortcut.get(west2Str) || [];
			shortcuts.push(posStr);
			unvisitedShortcut.set(west2Str, shortcuts);
		}
		//#endregion

		// Find the next tile to go to and add it to the queue
		if (path.has(north1Str) && !visited.has(north1Str)) {
			// We haven't been north yet
			queue.push(north1);
		}
		if (path.has(south1Str) && !visited.has(south1Str)) {
			// We haven't been north yet
			queue.push(south1);
		}
		if (path.has(east1Str) && !visited.has(east1Str)) {
			// We haven't been north yet
			queue.push(east1);
		}
		if (path.has(west1Str) && !visited.has(west1Str)) {
			// We haven't been north yet
			queue.push(west1);
		}
		visited.set(posStr, count++);
	}

	return foundShortcuts.filter(e => e >= 100).length;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const map = d.split('\n').map(e => e.split(''));
	const path = new Set('0x0'); // To be filled in when scanning the map
	path.clear();
	const start = [0, 0];
	const end = [0, 0];

	for (let y = 1; y < map.length; y++) {
		for (let x = 1; x < map[y].length - 1; x++) {
			const tile = map[y][x];
			if (tile == '#') {
				continue;
			}

			if (tile == 'S') {
				start[0] = x;
				start[1] = y;
			}
			if (tile == 'E') {
				end[0] = x;
				end[1] = y;
			}
			path.add([x, y].join('x'));
		}
	}

	const visited = new Map([[start.join('x'), 0]]);
	visited.clear();

	let count = 0;
	// queue should alway be a length of 1 until the end. Just easier to deal with an const array then let variable pointing the to next bit
	const queue = [start];

	while (queue.length) {
		const pos = queue.pop();
		const posStr = pos.join('x');

		const north = [pos[0], pos[1] - 1];
		const northStr = north.join('x');
		const south = [pos[0], pos[1] + 1];
		const southStr = south.join('x');
		const east = [pos[0] + 1, pos[1]];
		const eastStr = east.join('x');
		const west = [pos[0] - 1, pos[1]];
		const westStr = west.join('x');

		// Find the next tile to go to and add it to the queue
		if (path.has(northStr) && !visited.has(northStr)) {
			// We haven't been north yet
			queue.push(north);
		}
		if (path.has(southStr) && !visited.has(southStr)) {
			// We haven't been north yet
			queue.push(south);
		}
		if (path.has(eastStr) && !visited.has(eastStr)) {
			// We haven't been north yet
			queue.push(east);
		}
		if (path.has(westStr) && !visited.has(westStr)) {
			// We haven't been north yet
			queue.push(west);
		}
		visited.set(posStr, count++);
	}

	let shortcuts = 0;

	/** 
	 * @type {[[number, number], number]}
	 */
	const queue2 = [...visited.entries()].map(e => [e[0].split('x').map(e => +e), e[1]]);

	while (queue2.length) {
		/** 
		 * @type {[[number, number], number]}
		 */
		const [dst, dstDis] = queue2.pop();


		let /** @type {[number, number]} */ src, /** @type {number} */ srcDis;
		for ([src, srcDis] of queue2) {
			const mattDis = Math.abs(src[0] - dst[0]) + Math.abs(src[1] - dst[1]);
			const disDiff = dstDis - srcDis;
			const saved = disDiff - mattDis;
			//if (mattDis == 2) console.log(mattDis, disDiff, saved);
			if (saved > 99 && mattDis < 21) {
				shortcuts++;
			}
		}
	}

	//43698329 Too high
	//1017615
	//893328 Too Low
	return shortcuts;
};
