/**
 * @param {string} d 
 */
export const part1 = async d => {
	const [inputsRaw, gatesRaw] = d.split('\n\n').map(e => e.split('\n'));
	const inputs = new Map(inputsRaw.map(e => e.split(': ')));
	const gates = new Map(gatesRaw.map(e => {
		const regEx = /([a-z\d]+) (AND|OR|XOR) ([a-z\d]+) -> ([a-z\d]+)/;
		const matches = regEx.exec(e);
		return [matches[4], [matches[2], matches[1], matches[3]]];
	}));

	const queue = [...gates.keys()];

	while (queue.length) {
		const currGateId = queue.shift();
		const currGate = gates.get(currGateId);
		const op = currGate[0];
		const input1 = inputs.get(currGate[1]);
		const input2 = inputs.get(currGate[2]);
		if (!input1 || !input2) {
			// Inputs not ready
			queue.push(currGateId);
			continue;
		}
		switch (op) {
			case 'AND': {
				inputs.set(currGateId, (Number(input1) && Number(input2)) ? '1' : '0');
				break;
			}
			case 'OR': {
				inputs.set(currGateId, (Number(input1) || Number(input2)) ? '1' : '0');
				break;
			}
			case 'XOR': {
				inputs.set(currGateId, (Number(input1) ^ Number(input2)) ? '1' : '0');
				break;
			}
		}
	}

	const zwires = [...inputs.entries()].filter((e => e[0][0] == 'z')).reduce((p, v) => p |= BigInt(v[1]) << BigInt(v[0].slice(1)), 0n);

	return zwires.toString();
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const [inputsRaw, gatesRaw] = d.split('\n\n').map(e => e.split('\n'));
	gatesRaw.splice(0, gatesRaw.length);
	inputsRaw.splice(0, inputsRaw.length);
	return gatesRaw;
};
