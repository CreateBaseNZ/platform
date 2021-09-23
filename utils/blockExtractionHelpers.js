import { getOutgoers, getConnectedEdges, getIncomers } from "react-flow-renderer";
import BlocksF from "../public/systemDefinitions.json";

const findNextNode = (currentNode, path, elements) => {
	const nodes = [currentNode];
	let nodeCollection = getConnectedEdges(nodes, elements);
	let nextNodeList = getOutgoers(currentNode, elements);
	let nextNodeID;
	const reqConnection = nodeCollection.filter((connection) => {
		if (currentNode.id == connection.source) {
			if (connection.sourceHandle == String(path)) {
				return true;
			}
		}
		return false;
	});
	if (reqConnection.length > 1) {
		return [false, "One Block has multiple exectution connection"];
	}
	if (reqConnection.length == 0) {
		return [true, false];
	}
	const Connection = reqConnection[0];
	if (Connection.targetHandle && Connection.targetHandle.split("__")[0] == "execution") {
		nextNodeID = Connection.target;
	} else {
		return [false, "Wrong Connection"];
	}

	for (let i = 0; i < nextNodeList.length; i++) {
		if (nextNodeID == nextNodeList[i].id) {
			return [true, nextNodeList[i]];
		}
	}

	return [true, false];
};

const determineType = (block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, genralSystem) => {
	if (generalBlocks.includes(currentNode.type)) {
		block.name = currentNode.type;
	} else if (mathOperations.includes(currentNode.type)) {
		block.type = "operatorGeneral";
		block.name = currentNode.type;
		block.value.operator = genralSystem.mathOps[currentNode.type];
	} else if (actions.includes(currentNode.type)) {
		block.type = "move";
		block.name = currentNode.type;
	} else if (sensors.includes(currentNode.type)) {
		block.type = "sense";
		block.name = currentNode.type;
	} else if (currentNode.type == "start" || currentNode.type == "end") {
		block.name = currentNode.type;
	} else if (allFunctions.includes(currentNode.type)) {
		block.type = "specific";
		block.name = currentNode.type;
	} else {
		console.log(block, currentNode);
	}
	return block;
};

const CheckPreviuos = (currentNode, elements) => {
	const nodes = [currentNode];
	let edgeCollection = getConnectedEdges(nodes, elements);
	const prevConnection = edgeCollection.filter((connection) => {
		if (currentNode.id == connection.target) {
			if (connection.targetHandle.split("__")[0] == "execution") {
				return true;
			}
		}
		return false;
	});

	if (prevConnection.length != 1 && currentNode.id != "start") {
		return false;
	}
	return true;
};

const findInputs = (blocksOrder, currentNode, elements, val, robotName, level = 0) => {
	const correctSystem = BlocksF.filter((element) => {
		return element.robot == robotName;
	})[0];
	const genralSystem = BlocksF.filter((element) => {
		return element.robot == undefined;
	})[0];
	const generalBlocks = genralSystem.general;
	const mathOperations = [...Object.keys(genralSystem.mathOps)];
	const actions = [...Object.keys(correctSystem.actions)];
	const sensors = [...Object.keys(correctSystem.sensors)];
	const allFunctions = [...Object.keys(correctSystem.functions), ...Object.keys(genralSystem.functions)];
	const nodes = [currentNode];
	let edgeCollection = getConnectedEdges(nodes, elements);
	let prevNodeList = getIncomers(currentNode, elements);
	let IDlist = [];
	let inputs = [];
	if (level != 0) {
		let outName = null;
		let executionBlock = false;
		for (let i = 0; i < edgeCollection.length; i++) {
			if (currentNode.id == edgeCollection[i].source) {
				if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] == "execution") {
					executionBlock = true;
				} else if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] == "execution") {
					outName = blocksOrder[i].value[edgeCollection[i].sourceHandle];
				}
				if (executionBlock == true && outName) {
					break;
				}
			}
		}
		if (executionBlock) {
			for (let i = 0; i < blocksOrder.length; i++) {
				if (blocksOrder[i].id == currentNode.id) {
					return [blocksOrder, val, outName];
				}
			}
			return [null, null, null, "Wrong execution order"];
		}
	}

	for (let i = 0; i < edgeCollection.length; i++) {
		if (currentNode.id == edgeCollection[i].target) {
			if (edgeCollection[i].targetHandle && edgeCollection[i].targetHandle.split("__")[0] != "execution") {
				const splitName = edgeCollection[i].targetHandle.split("__");
				const inputName = splitName[splitName.length - 1];
				inputs.push(inputName);
				for (let j = 0; j < prevNodeList.length; j++) {
					if (edgeCollection[i].source == prevNodeList[j].id) {
						IDlist.push(prevNodeList[j]);
						break;
					}
				}
			}
		}
	}
	const unduplicatedArray = [...new Set(inputs)];

	if (unduplicatedArray.length != inputs.length) {
		return [null, null, null, "One of the inputs has more than one entry"];
	}
	let block = {
		robot: robotName,
		id: currentNode.id,
		type: currentNode.type,
	};
	if (currentNode.data != undefined) {
		block.value = { ...currentNode.data.values };
	}
	block = determineType(block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, genralSystem);
	let output;
	for (let i = 0; i < IDlist.length; i++) {
		let message;
		[blocksOrder, val, output, message] = findInputs(blocksOrder, IDlist[i], elements, val, robotName, 1);
		if (blocksOrder || val || output) {
			block.value[inputs[i]] = output;
		} else {
			return [null, null, null, message];
		}
	}
	let edgeNum;
	for (let i = 0; i < edgeCollection.length; i++) {
		if (currentNode.id == edgeCollection[i].source) {
			if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] != "execution") {
				edgeNum = i;
				break;
			}
		}
	}
	let outName = false;
	switch (currentNode.type) {
		default:
			if (edgeNum || edgeNum == 0) {
				const splitArray = edgeCollection[edgeNum].sourceHandle.split("__");
				let NextOut = splitArray[splitArray.length - 1];
				const doneBlock = blocksOrder.filter((block) => {
					return currentNode.id === block.id;
				});
				if (doneBlock.length > 0) {
					if (doneBlock[0].value.out) {
						outName = doneBlock[0].value.out;
					}
				}
				if (NextOut && !outName) {
					console.log(val);
					outName = "out_" + String(val);
					val++;
				}
				block.value[NextOut] = outName;
			}
			blocksOrder.push(block);
			break;
	}
	return [blocksOrder, val, outName, ""];
};

export const flow2Text = (elements, projectName) => {
	let blocksConfig = [];
	let currentNode = elements[0];
	let traverse = true;
	let val = 0;
	let path = [];
	let maxPath = [];
	let nodeContext = [];
	const robotName = defineObject(projectName);
	if (robotName == "") {
		console.log("G");
		return "Robot doesn't Exist";
	}
	while (traverse) {
		if (currentNode) {
			if (!CheckPreviuos(currentNode, elements)) {
				return ["One Node has more than one input", null, null];
			}
			let f, message;
			[blocksConfig, val, f, message] = findInputs(blocksConfig, currentNode, elements, val, robotName);
			if (!(blocksConfig || val || f)) {
				return [message, null, null];
			}
		}
		let nextNode;
		let executionNext = "execution__out";
		switch (currentNode.type) {
			case "if":
				maxPath.push(2);
				path.push(0);
				nodeContext.push(currentNode);
				executionNext += "__" + String(path[path.length - 1]);
				break;
			case "while":
			case "repeat":
				maxPath.push(1);
				path.push(0);
				nodeContext.push(currentNode);
				executionNext += "__" + String(path[path.length - 1]);
				break;
			case undefined:
				let block = blocksConfig.pop();
				if (block.type != "else-condition") {
					blocksConfig.push(block);
				}
				executionNext = undefined;
				break;
		}
		if (executionNext) {
			let state;
			[state, nextNode] = findNextNode(currentNode, executionNext, elements);
			if (!state) {
				return [nextNode, null, null];
			}
		}
		if (nextNode) {
			currentNode = nextNode;
		} else {
			if (path.length == 0) {
				traverse = false;
				break;
			} else {
				currentNode = nodeContext[path.length - 1];
				path[path.length - 1]++;
				let executionNext = "execution__out__" + String(path[path.length - 1]);
				let state;
				[state, nextNode] = findNextNode(currentNode, executionNext, elements);
				if (!state) {
					return [nextNode, null, null];
				}
				let interBlock;
				if (path[path.length - 1] == maxPath[path.length - 1]) {
					switch (currentNode.type) {
						case "while":
							let delayBlock = {
								robot: robotName,
								id: "delay_whiled",
								type: "specific",
								name: "delay",
								value: {
									a: 0.25,
								},
							};
							blocksConfig.push(delayBlock);
							let f, message, useles;
							[blocksConfig, useles, f, message] = findInputs(blocksConfig, currentNode, elements, -1, robotName);
							blocksConfig.pop();
							break;
						default:
							break;
					}
					path.pop();
					maxPath.pop();
					nodeContext.pop();
					interBlock = {
						type: "end-condition",
						name: "end-condition",
					};
				} else {
					switch (currentNode.type) {
						case "if":
							if (path[path.length - 1] == 1) {
								interBlock = {
									type: "else-condition",
									name: "else-condition",
								};
							}
							break;
						default:
							break;
					}
				}
				blocksConfig.push(interBlock);
				currentNode = nextNode;
			}
		}
	}

	const endNode = {
		robot: robotName,
		type: "end",
	};
	blocksConfig.push(endNode);
	console.log(blocksConfig);
	if (blocksConfig.length == 2) {
		return [blocksConfig, "warning", "You have no blocks connected. Nothing interesting will happen."];
	}
	return [blocksConfig, null, null];
};

export const defineObject = (projectName) => {
	switch (projectName) {
		case "send-it":
			return "Player";
		case "magnebot":
			return "Arm";
		case "heat-seeker":
			return "Car";
	}
	return "";
};

export const isOnceCode = (projectName) => {
	switch (projectName) {
		case "send-it":
		case "heat-seeker":
			return false;
		case "magnebot":
			return true;
	}
};
