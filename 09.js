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
	// No matter the dataset
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
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
