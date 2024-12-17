/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = /Register A: (\d+)\n\r?Register B: (\d+)\n\r?Register C: (\d+)\n\r?\n\r?Program: (.*)/.exec(d);

	let regA = BigInt(data[1]);
	let regB = BigInt(data[2]);
	let regC = BigInt(data[3]);
	let program = data[4].split(',').map(e => +e);
	let pc = 0;
	const output = [];

	loop: while (pc < program.length) {
		const op = program[pc];
		const operand = program[pc + 1];
		switch (op) {
			case 0: {
				// combo
				switch (operand) {
					case 0:
					case 1:
					case 2:
					case 3: {
						regA = regA / (2n ** BigInt(operand));
						break;
					}
					case 4: {
						regA = regA / (2n ** regA);
						break;
					}
					case 5: {
						regA = regA / (2n ** regB);
						break;
					}
					case 6: {
						regA = regA / (2n ** regC);
						break;
					}
				}
				break;
			}
			case 1: {
				regB ^= BigInt(operand);
				break;
			}
			case 2: {
				// combo
				switch (operand) {
					case 0:
					case 1:
					case 2:
					case 3: {
						regB = BigInt(operand) % 8n;
						break;
					}
					case 4: {
						regB = BigInt(regA) % 8n;
						break;
					}
					case 5: {
						regB = BigInt(regB) % 8n;
						break;
					}
					case 6: {
						regB = BigInt(regC) % 8n;
						break;
					}
				}
				break;
			}
			case 3: {
				if (regA) {
					pc = operand;
					continue loop;
				}
				break;
			}
			case 4: {
				regB ^= regC;
				break;
			}
			case 5: {
				// combo
				switch (operand) {
					case 0:
					case 1:
					case 2:
					case 3: {
						output.push(BigInt(operand) % 8n);
						break;
					}
					case 4: {
						output.push(BigInt(regA) % 8n);
						break;
					}
					case 5: {
						output.push(BigInt(regB) % 8n);
						break;
					}
					case 6: {
						output.push(BigInt(regC) % 8n);
						break;
					}
				}
				break;
			}
			case 6: {
				// combo
				switch (operand) {
					case 0:
					case 1:
					case 2:
					case 3: {
						regB = regA / (2n ** BigInt(operand));
						break;
					}
					case 4: {
						regB = regA / (2n ** regA);
						break;
					}
					case 5: {
						regB = regA / (2n ** regB);
						break;
					}
					case 6: {
						regB = regA / (2n ** regC);
						break;
					}
				}
				break;
			}
			case 7: {
				// combo
				switch (operand) {
					case 0:
					case 1:
					case 2:
					case 3: {
						regC = regA / (2n ** BigInt(operand));
						break;
					}
					case 4: {
						regC = regA / (2n ** regA);
						break;
					}
					case 5: {
						regC = regA / (2n ** regB);
						break;
					}
					case 6: {
						regC = regA / (2n ** regC);
						break;
					}
				}
				break;
			}
		}
		pc += 2;
	}
	return output.join(',');
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
