/**
 * @param {string} d 
 */
export const part1 = async d => {
	const driveMap = d.split('').map(e => +e);
	const sectorCount = driveMap.reduce((p, v) => p + v, 0);
	const driveSectors = [];

	let i = 0;
	let fileId = 0;
	driveMap.map((e, idx) => {
		for (let j = 0; j < e; j++) {
			driveSectors[i++] = (idx % 2) ? null : fileId;
		}
		if ((idx % 2) == 0) fileId++;
	});

	i = 0;
	// Move blocks
	for (let j = sectorCount - 1; j > i; j--) {
		if (driveSectors[j] === null) {
			continue;
		}
		while (i < j) {
			if (driveSectors[i] === null) {
				driveSectors[i] = driveSectors[j];
				driveSectors[j] = null;
				break;
			}
			i++;
		}
	}

	return driveSectors.filter(e => e !== null).reduce((p, v, i) => p += v * i, 0);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const driveMap = d.split('').map(e => +e);
	/** @type {number[]} */
	const driveSectors = [];
	/** @type {[number, number][]} */
	const files = [];
	/** @type {number[]} */
	const freeSpace = [];

	let i = 0;
	let fileId = 0;
	driveMap.map((e, idx) => {
		const file = [i];
		for (let j = 0; j < e; j++) {
			if ((idx % 2) == 1) {
				freeSpace.push(i);
			}
			driveSectors[i++] = (idx % 2) ? null : fileId;
		}
		if ((idx % 2) == 0) {
			fileId++;
			file.push(i);
			files.push(file);
		};
	});
	files.reverse();

	// Move Files
	for (const file of files) {
		const size = file[1] - file[0];

		i = 0;
		fileId = driveSectors[file[0]];

		// Remove pointers to free space after this file
		while (freeSpace.at(-1) > file[0]) {
			freeSpace.splice(-1);
		}

		// Make a map of chunks of free space [start, size, idx]
		let lastVal = -10; // To allow the math to be simple
		let currFreeSpace = [0, 0, 0];
		for (const [idx, val] of freeSpace.entries()) {
			if ((val - lastVal) > 1) {
				currFreeSpace[0] = val;
				currFreeSpace[1] = 1;
				currFreeSpace[2] = idx;
			} else {
				currFreeSpace[1]++;
			}
			if (currFreeSpace[1] >= size) { // Just something to handle the first span of free space
				// Move the file to this chunk of free space
				for (let i = file[0]; i < file[1]; i++) {
					driveSectors[i] = 0;
				}
				for (let i = currFreeSpace[0]; i < currFreeSpace[0] + size; i++) {
					driveSectors[i] = fileId;
				}
				freeSpace.splice(currFreeSpace[2], size);
				break;
			}
			lastVal = val;
		}
	}

	return driveSectors.reduce((p, v, i) => p += (+v) * i, 0);
};
