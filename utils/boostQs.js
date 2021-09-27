export const comparisonBoostLvl1Item = () => {
	const a = Math.floor(Math.random() * 100);
	const b = Math.floor(Math.random() * 100);
	const type = Math.random() > 0.5 ? "NodeGreaterThan" : "NodeLessThan";
	return {
		q: "What does this print?",
		els: [
			{
				id: "start",
				position: { x: -48, y: -32 },
				data: { connections: ["execution__out"] },
				type: "NodeStart",
			},
			{
				id: "dndnode_0",
				position: { x: -16, y: -144 },
				data: {
					connections: ["boolean__out"],
					values: {
						a: a,
						b: b,
					},
				},
				type: type,
			},
			{
				id: "dndnode_1",
				type: "NodePrint",
				position: { x: 110, y: -64 },
				data: {
					connections: ["execution__in", "any__in__a"],
					values: { a: 0 },
				},
			},
			{
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_1",
				targetHandle: "execution__in",
				type: "execution",
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
			},
			{
				source: "dndnode_0",
				sourceHandle: "boolean__out",
				target: "dndnode_1",
				targetHandle: "any__in__a",
				type: "boolean",
				id: "reactflow__edge-dndnode_1boolean__out-dndnode_0any__in__a",
			},
		],
		o: ["true", "false", a + b, a - b, "skip"],
		a: (type === "NodeGreaterThan" ? a > b : a < b).toString(),
	};
};

export const comparisonBoostLvl2Item = () => {
	const a = Math.floor(Math.random() * 100);
	const b = Math.floor(Math.random() * 100);
	const c = Math.floor(Math.random() * 100);
	const opType = Math.random() > 0.5 ? "NodeAdd" : "NodeSubtract";
	const compType = Math.random() > 0.5 ? "NodeGreaterThan" : "NodeLessThan";
	const opAnswer = opType === "NodeAdd" ? a + b : a - b;
	const compAnswer = compType === "NodeGreaterThan" ? opAnswer > c : opAnswer < c;
	return {
		q: "What does this print?",
		els: [
			{
				data: {
					connections: ["execution__out"],
				},
				id: "start",
				position: { x: 0, y: -32 },
				type: "NodeStart",
			},
			{
				data: {
					connections: ["execution__in", "any__in__a"],
					values: { a: 0 },
				},
				id: "dndnode_0",
				position: { x: 144, y: -48 },
				type: "NodePrint",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_0",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: {
					connections: ["boolean__out", "float__in__a"],
					values: { a: 0, b: c },
				},
				id: "dndnode_1",
				position: { x: 64, y: -112 },
				type: compType,
			},
			{
				id: "reactflow__edge-dndnode_1boolean__out-dndnode_0any__in__a",
				source: "dndnode_1",
				sourceHandle: "boolean__out",
				target: "dndnode_0",
				targetHandle: "any__in__a",
				type: "boolean",
			},
			{
				data: { connections: ["float__out"], values: { a: a, b: b } },
				id: "dndnode_2",
				position: { x: -80, y: -176 },
				type: opType,
			},
			{
				id: "reactflow__edge-dndnode_2float__out-dndnode_1float__in__a",
				source: "dndnode_2",
				sourceHandle: "float__out",
				target: "dndnode_1",
				targetHandle: "float__in__a",
				type: "float",
			},
		],
		o: ["true", "false", a + b, a - b, "skip"],
		a: compAnswer.toString(),
	};
};

// Math.floor(Math.random() * (max - min) + min)
// The maximum is exclusive and the minimum is inclusive
export const comparisonBoostLvl3Item = () => {
	const greaterThan = Math.random() > 0.5;
	const leftHandle = Math.random() > 0.5;
	const handleName = leftHandle ? "float__in__a" : "float__in__b";
	const noneOfThese = Math.random() > 0.75;
	const a = Math.floor(Math.random() * 99 + 1);
	let b, c, d;

	if ((greaterThan && leftHandle) || (!greaterThan && !leftHandle)) {
		if (noneOfThese) {
			b = Math.floor(Math.random() * a);
		} else {
			b = Math.floor(Math.random() * (100 - a + 1) + a + 1);
		}
		c = Math.floor(Math.random() * a);
		d = Math.floor(Math.random() * a);
	} else {
		if (noneOfThese) {
			b = Math.floor(Math.random() * (100 - a + 1) + a + 1);
		} else {
			b = Math.floor(Math.random() * a);
		}
		c = Math.floor(Math.random() * (100 - a + 1) + a + 1);
		d = Math.floor(Math.random() * (100 - a + 1) + a + 1);
	}

	const options = [b, c, d];

	for (let i = options.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[options[i], options[j]] = [options[j], options[i]];
	}

	return {
		q: "What value of 'Distance to next obstacle' would TRUE be printed?",
		els: [
			{
				data: {
					connections: ["execution__out"],
				},
				id: "start",
				position: { x: 0, y: -32 },
				type: "NodeStart",
			},
			{
				data: {
					connections: ["execution__in", "any__in__a"],
					values: { a: 0 },
				},
				id: "dndnode_0",
				position: { x: 144, y: -48 },
				type: "NodePrint",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_0",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: {
					connections: ["boolean__out", handleName],
					values: { a: a, b: a },
				},
				id: "dndnode_1",
				position: { x: 64, y: -112 },
				type: greaterThan ? "NodeGreaterThan" : "NodeLessThan",
			},
			{
				id: "reactflow__edge-dndnode_1boolean__out-dndnode_0any__in__a",
				source: "dndnode_1",
				sourceHandle: "boolean__out",
				target: "dndnode_0",
				targetHandle: "any__in__a",
				type: "boolean",
			},
			{
				data: { connections: ["float__out"], values: {} },
				id: "dndnode_2",
				position: { x: -80, y: -176 },
				type: "NodeSendItDistance",
			},
			{
				id: `reactflow__edge-dndnode_2float__out-dndnode_1${handleName}`,
				source: "dndnode_2",
				sourceHandle: "float__out",
				target: "dndnode_1",
				targetHandle: handleName,
				type: "float",
			},
		],
		o: options.concat("None of these", "skip"),
		a: noneOfThese ? "None of these" : b,
	};
};

export const ifBoostLvl1Item = () => {
	const condition = Math.random() < 0.5;
	const handleId = Math.floor(Math.random() * 2);
	const handleName = `execution__out__${handleId}`;
	return {
		q: "Will 'Jump' be executed?",
		els: [
			{
				data: { connections: ["execution__out"] },
				id: "start",
				position: { x: 64, y: 48 },
				type: "NodeStart",
			},
			{
				data: {
					values: {},
					connections: ["execution__in", handleName, "boolean__in__condition"],
				},
				id: "dndnode_0",
				position: { x: 192, y: 16 },
				type: "NodeIf",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_0",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["execution__in"] },
				id: "dndnode_1",
				position: { x: 416, y: 48 },
				type: "NodeSendItJump",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: `reactflow__edge-dndnode_0${handleName}-dndnode_1execution__in`,
				source: "dndnode_0",
				sourceHandle: handleName,
				target: "dndnode_1",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["boolean__out"] },
				id: "dndnode_2",
				position: { x: 128, y: -32 },
				type: condition ? "NodeTrue" : "NodeFalse",
			},
			{
				id: "reactflow__edge-dndnode_2boolean__out-dndnode_0boolean__in__condition",
				source: "dndnode_2",
				sourceHandle: "boolean__out",
				target: "dndnode_0",
				targetHandle: "boolean__in__condition",
				type: "boolean",
			},
		],
		o: ["yes", "no", "skip"],
		a: (condition && handleId === 0) || (!condition && handleId === 1) ? "yes" : "no",
	};
};

export const ifBoostLvl2Item = () => {
	const condition = Math.random() < 0.5;
	const doJump = Math.random() < 0.5;
	const swap = Math.random() < 0.5;

	return {
		q: "What is the correct sequence of actions?",
		els: [
			{
				data: { connections: ["execution__out"] },
				id: "start",
				position: { x: 64, y: 48 },
				type: "NodeStart",
			},
			{
				data: {
					values: {},
					connections: ["execution__in", "execution__out__0", "execution__out__1", "boolean__in__condition"],
				},
				id: "dndnode_0",
				position: { x: 192, y: 16 },
				type: "NodeIf",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_0",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["execution__in"] },
				id: "dndnode_1",
				position: { x: 416, y: swap ? 32 : 80 },
				type: doJump ? "NodeSendItJump" : "NodeSendItCrouch",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: `reactflow__edge-dndnode_0execution__out__0-dndnode_1execution__in`,
				source: "dndnode_0",
				sourceHandle: "execution__out__0",
				target: "dndnode_1",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["execution__in"] },
				id: "dndnode_2",
				position: { x: 416, y: swap ? 80 : 32 },
				type: doJump ? "NodeSendItCrouch" : "NodeSendItJump",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: `reactflow__edge-dndnode_0execution__out__1-dndnode_2execution__in`,
				source: "dndnode_0",
				sourceHandle: "execution__out__1",
				target: "dndnode_2",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["boolean__out"] },
				id: "dndnode_3",
				position: { x: 128, y: -32 },
				type: condition ? "NodeTrue" : "NodeFalse",
			},
			{
				id: "reactflow__edge-dndnode_3boolean__out-dndnode_0boolean__in__condition",
				source: "dndnode_3",
				sourceHandle: "boolean__out",
				target: "dndnode_0",
				targetHandle: "boolean__in__condition",
				type: "boolean",
			},
		],
		o: ["jump", "crouch", "crouch ➞ jump", "jump ➞ crouch", "skip"],
		a: (condition && doJump) || (!condition && !doJump) ? "jump" : "crouch",
	};
};

export const ifBoostLvl3Item = () => {
	const condition = Math.random() < 0.5;

	const randomBranch = () => [Math.random() < 0.5 ? "NodeSendItJump" : "NodeSendItCrouch", ...(Math.random() < 0.5 ? (Math.random() < 0.5 ? ["NodeSendItJump"] : ["NodeSendItCrouch"]) : [])];

	const allBlocks = [...Array(3)].map((_) => randomBranch());

	const els = [
		{
			data: { connections: ["execution__out"] },
			id: "start",
			position: { x: 64, y: 48 },
			type: "NodeStart",
		},
		{
			data: {
				values: {},
				connections: ["execution__in", "execution__out__0", "execution__out__1", "boolean__in__condition"],
			},
			id: "dndnode_0",
			position: { x: 192, y: 16 },
			type: "NodeIf",
		},
		{
			animated: true,
			arrowHeadType: "arrowclosed",
			id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
			source: "start",
			sourceHandle: "execution__out",
			target: "dndnode_0",
			targetHandle: "execution__in",
			type: "execution",
		},
		{
			data: { values: {}, connections: ["boolean__out"] },
			id: "dndnode_1",
			position: { x: 128, y: -32 },
			type: condition ? "NodeTrue" : "NodeFalse",
		},
		{
			id: "reactflow__edge-dndnode_1boolean__out-dndnode_0boolean__in__condition",
			source: "dndnode_1",
			sourceHandle: "boolean__out",
			target: "dndnode_0",
			targetHandle: "boolean__in__condition",
			type: "boolean",
		},
		...allBlocks.map((branch, branchInd) =>
			branch
				.map((block, blockInd) => {
					const targetId = 2 + branchInd * 2 + blockInd;
					const sourceId = blockInd === 0 ? 0 : targetId - 1;
					return [
						{
							data: { values: {}, connections: ["execution__in"] },
							id: `dndnode_${targetId}`,
							position: { x: 416 + blockInd * 144, y: 48 * branchInd },
							type: block,
						},
						{
							animated: true,
							arrowHeadType: "arrowclosed",
							id: `reactflow__edge-dndnode_${sourceId}execution__out${blockInd === 0 && `__${branchInd}`}-dndnode_${targetId}execution__in`,
							source: `dndnode_${sourceId}`,
							sourceHandle: `execution__out${blockInd === 0 && `__${branchInd}`}`,
							target: `dndnode_${targetId}`,
							targetHandle: "execution__in",
							type: "execution",
						},
					];
				})
				.flat()
		),
	].flat();

	const doOption = `${allBlocks[0].join("➞")}➞${allBlocks[2].join("➞")}`;
	const elseOption = `${allBlocks[1].join("➞")}➞${allBlocks[2].join("➞")}`;
	const answer = condition ? doOption : elseOption;
	const options = [doOption, elseOption, allBlocks.map((branch) => branch.join("➞")).join("➞"), condition ? allBlocks[0].join("➞") : allBlocks[1].join("➞"), "skip"];

	return {
		q: "What is the correct sequence of actions?",
		els: els,
		o: options,
		a: answer,
	};
};

export const whileBoostLvl1Item = () => {
	const condition = Math.random() < 0.5;

	return {
		q: "Will 'Jump' be executed?",
		els: [
			{
				data: { connections: ["execution__out"] },
				id: "start",
				position: { x: -64, y: -64 },
				type: "NodeStart",
			},
			{
				data: {
					values: {},
					connections: ["execution__in", "execution__out__0", "boolean__in__condition"],
				},
				id: "dndnode_0",
				position: { x: 64, y: -64 },
				type: "NodeWhile",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-startexecution__out-dndnode_0execution__in",
				source: "start",
				sourceHandle: "execution__out",
				target: "dndnode_0",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["execution__in"] },
				id: "dndnode_1",
				position: { x: 304, y: -96 },
				type: "NodeSendItJump",
			},
			{
				animated: true,
				arrowHeadType: "arrowclosed",
				id: "reactflow__edge-dndnode_0execution__out__0-dndnode_1execution__in",
				source: "dndnode_0",
				sourceHandle: "execution__out__0",
				target: "dndnode_1",
				targetHandle: "execution__in",
				type: "execution",
			},
			{
				data: { values: {}, connections: ["boolean__out"] },
				id: "dndnode_2",
				position: { x: 32, y: -128 },
				type: condition ? "NodeTrue" : "NodeFalse",
			},
			{
				id: "reactflow__edge-dndnode_3boolean__out-dndnode_0boolean__in__condition",
				source: "dndnode_2",
				sourceHandle: "boolean__out",
				target: "dndnode_0",
				targetHandle: "boolean__in__condition",
				type: "boolean",
			},
		],
		o: ["yes", "no", "skip"],
		a: condition ? "yes" : "no",
	};
};
