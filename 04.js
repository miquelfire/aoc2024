/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	let sum = 0;
	for (let x = 0; x < data.length; x++) {
		for (let y = 0; y < data[x].length; y++) {
			if (data[x][y] == 'X') {
				if (x + 3 < data.length) {
					// Check Down
					if (data[x + 1][y] == 'M' && data[x + 2][y] == 'A' && data[x + 3][y] == 'S') {
						sum++;
					}
				}
				if (x > 2) {
					// Check Up
					if (data[x - 1][y] == 'M' && data[x - 2][y] == 'A' && data[x - 3][y] == 'S') {
						sum++;
					}
				}
				if (y + 3 < data[x].length) {
					// Check Left
					if (data[x][y + 1] == 'M' && data[x][y + 2] == 'A' && data[x][y + 3] == 'S') {
						sum++;
					}
				}
				if (y > 2) {
					// Check Right
					if (data[x][y - 1] == 'M' && data[x][y - 2] == 'A' && data[x][y - 3] == 'S') {
						sum++;
					}
				}

				// Diangle
				if (x + 3 < data.length && y + 3 < data[x].length) {
					// Check Down Left
					if (data[x + 1][y + 1] == 'M' && data[x + 2][y + 2] == 'A' && data[x + 3][y + 3] == 'S') {
						sum++;
					}
				}
				if (x > 2 && y + 3 < data[x].length) {
					// Check Up Left
					if (data[x - 1][y + 1] == 'M' && data[x - 2][y + 2] == 'A' && data[x - 3][y + 3] == 'S') {
						sum++;
					}
				}
				if (x + 3 < data.length && y > 2) {
					// Check Down Right
					if (data[x + 1][y - 1] == 'M' && data[x + 2][y - 2] == 'A' && data[x + 3][y - 3] == 'S') {
						sum++;
					}
				}
				if (x > 2 && y > 2) {
					// Check Up Left
					if (data[x - 1][y - 1] == 'M' && data[x - 2][y - 2] == 'A' && data[x - 3][y - 3] == 'S') {
						sum++;
					}
				}

			}
		}
	}
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	let sum = 0;
	for (let x = 1; x < data.length - 1; x++) {
		for (let y = 1; y < data[x].length - 1; y++) {
			if (data[x][y] == 'A') {
				if (data[x - 1][y - 1] == 'M' && data[x + 1][y + 1] == 'S' && data[x + 1][y - 1] == 'M' && data[x - 1][y + 1] == 'S') {
					sum++;
				}
				if (data[x + 1][y + 1] == 'M' && data[x - 1][y - 1] == 'S' && data[x + 1][y - 1] == 'M' && data[x - 1][y + 1] == 'S') {
					sum++;
				}
				if (data[x + 1][y + 1] == 'M' && data[x - 1][y - 1] == 'S' && data[x - 1][y + 1] == 'M' && data[x + 1][y - 1] == 'S') {
					sum++;
				}
				if (data[x - 1][y - 1] == 'M' && data[x + 1][y + 1] == 'S' && data[x - 1][y + 1] == 'M' && data[x + 1][y - 1] == 'S') {
					sum++;
				}
			}
		}
	}
	return sum;
};
