import { getOutgoers, getConnectedEdges, getIncomers } from "react-flow-renderer";
import BlocksF from "../public/systemDefinitions.json";

/**
 *
 * @param {*} projectName
 * @returns
 * EXPLAIN: Salim - What is this function for?
 */
export const findStartingCode = (projectName) => {
	const robot = defineObject(projectName);
	const correctSystem = BlocksF.filter((element) => {
		return element.robot == robot;
	})[0];
	let startCode = correctSystem.startingCode;
	if (startCode) {
		startCode += "\nresolve(true);";
	} else {
		startCode = "resolve(true);";
	}

	return startCode;
};

/**
 * EXPLAIN: Salim - Define this input variable
 * @param {*} currentNode
 * @param {*} path
 * @param {*} elements
 * @returns
 * EXPLAIN: Salim - What is this function for?
 */
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

	// EXPLAIN: Salim - What is the purpose of this for loop?
	for (let i = 0; i < nextNodeList.length; i++) {
		if (nextNodeID == nextNodeList[i].id) {
			return [true, nextNodeList[i]];
		}
	}

	return [true, false];
};

/**
 * EXPLAIN: Salim - Define these input variables
 * @param {*} block
 * @param {*} currentNode
 * @param {*} generalBlocks
 * @param {*} mathOperations
 * @param {*} actions
 * @param {*} sensors
 * @param {*} allFunctions
 * @param {*} generalSystem
 * @returns
 * EXPLAIN: Salim - What is this function for?
 */
const determineType = (block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, generalSystem) => {
	console.log(currentNode.type);
	if (generalBlocks.includes(currentNode.type)) {
		block.name = currentNode.type;
	} else if (mathOperations.includes(currentNode.type)) {
		block.type = "NodeOperatorGeneral";
		block.name = currentNode.type;
		block.value.operator = generalSystem.mathOps[currentNode.type];
	} else if (actions.includes(currentNode.type)) {
		block.type = "move";
		block.name = currentNode.type;
	} else if (sensors.includes(currentNode.type)) {
		block.type = "sense";
		block.name = currentNode.type;
	} else if (currentNode.type == "NodeStart" || currentNode.type == "NodeEnd") {
		block.name = currentNode.type;
	} else if (allFunctions.includes(currentNode.type)) {
		block.type = "specific";
		block.name = currentNode.type;
	} else {
		console.log(block, currentNode);
	}
	return block;
};

/**
 * EXPLAIN: Salim - Define these input variables
 * @param {*} currentNode
 * @param {*} elements
 * @returns
 * EXPLAIN: Salim - What is this function for?
 */
const checkPrevious = (currentNode, elements) => {
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

/**
 * EXPLAIN: Salim - Define these input variables
 * @param {*} blocksOrder
 * @param {*} currentNode
 * @param {*} elements
 * @param {*} val
 * @param {*} robotName
 * @param {*} level
 * @returns
 * EXPLAIN: Salim - What is this function for?
 */
const findInputs = (blocksOrder, currentNode, elements, val, robotName, level = 0) => {
	// Fetch the configuration associated with the robot
	const correctSystem = BlocksF.find((element) => element.robot === robotName);
	// Fetch the configuration universal to the all systems
	const generalSystem = BlocksF.find((element) => !element.robot);
	const generalBlocks = generalSystem.general; // Universal blocks
	const mathOperations = [...Object.keys(generalSystem.mathOps)]; // Operations
	const actions = [...Object.keys(correctSystem.actions)]; // Actuators/actions associated with the robot
	const sensors = [...Object.keys(correctSystem.sensors)]; // Sensors associated with the robot
	const allFunctions = [...Object.keys(correctSystem.functions), ...Object.keys(generalSystem.functions)]; // Functions associated with the robot
	const nodes = [currentNode];
	let edgeCollection = getConnectedEdges(nodes, elements);
	let prevNodeList = getIncomers(currentNode, elements);
	let IDlist = [];
	let inputs = [];
	// EXPLAIN: Salim - What is the purpose of this if statement?
	if (level != 0) {
		let outName = null;
		let executionBlock = false;
		// EXPLAIN: Salim - What is the purpose of this for loop?
		for (let i = 0; i < edgeCollection.length; i++) {
			// EXPLAIN: Salim - What is this if statement checking for?
			if (currentNode.id == edgeCollection[i].source) {
				// EXPLAIN: Salim - What are these conditions check for? What are the purpose of these conditions?
				if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] == "execution") {
					executionBlock = true;
				} else if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] == "execution") {
					outName = blocksOrder[i].value[edgeCollection[i].sourceHandle];
				}
				// EXPLAIN: Salim - What is the purpose of this if statement?
				if (executionBlock == true && outName) {
					break;
				}
			}
		}
		// EXPLAIN: Salim - What is the purpose of this if statement?
		if (executionBlock) {
			// EXPLAIN: Salim - What is the purpose of this for loop?
			for (let i = 0; i < blocksOrder.length; i++) {
				// EXPLAIN: Salim - What is the purpose of this if statement?
				if (blocksOrder[i].id == currentNode.id) {
					return [blocksOrder, val, outName];
				}
			}
			return [null, null, null, "Wrong execution order"];
		}
	}
	// EXPLAIN: Salim - What is the purpose of this for loop?
	for (let i = 0; i < edgeCollection.length; i++) {
		// EXPLAIN: Salim - What is the purpose of this if statement?
		if (currentNode.id == edgeCollection[i].target) {
			// EXPLAIN: Salim - What is the purpose of this if statement?
			if (edgeCollection[i].targetHandle && edgeCollection[i].targetHandle.split("__")[0] != "execution") {
				const splitName = edgeCollection[i].targetHandle.split("__");
				const inputName = splitName[splitName.length - 1];
				inputs.push(inputName);
				// EXPLAIN: Salim - What is the purpose of this for loop?
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

	// EXPLAIN: Salim - What is the purpose of this if statement?
	if (unduplicatedArray.length != inputs.length) {
		return [null, null, null, "One of the inputs has more than one entry"];
	}
	let block = {
		robot: robotName,
		id: currentNode.id,
		type: currentNode.type,
	};
	// EXPLAIN: Salim - What is the purpose of this if statement?
	if (currentNode.data != undefined) {
		block.value = { ...currentNode.data.values };
	}
	block = determineType(block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, generalSystem);
	let output;
	// EXPLAIN: Salim - What is the purpose of this for loop?
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
	// EXPLAIN: Salim - What is the purpose of this for loop?
	for (let i = 0; i < edgeCollection.length; i++) {
		// EXPLAIN: Salim - What is the purpose of this if statement?
		if (currentNode.id == edgeCollection[i].source) {
			// EXPLAIN: Salim - What is the purpose of this if statement?
			if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] != "execution") {
				edgeNum = i;
				break;
			}
		}
	}
	let outName = false;
	switch (currentNode.type) {
		default:
			// EXPLAIN: Salim - What is the purpose of this if statement?
			if (edgeNum || edgeNum == 0) {
				const splitArray = edgeCollection[edgeNum].sourceHandle.split("__");
				let NextOut = splitArray[splitArray.length - 1];
				const doneBlock = blocksOrder.filter((block) => {
					return currentNode.id === block.id;
				});
				// EXPLAIN: Salim - What is the purpose of this if statement?
				if (doneBlock.length > 0) {
					if (doneBlock[0].value.out) {
						outName = doneBlock[0].value.out;
					}
				}
				// EXPLAIN: Salim - What is the purpose of this if statement?
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

/**
 *
 * @param {[Object]} elements An array of block detail
 * @param {*} projectName The name of the project
 * @returns
 */
export const flow2Text = (elements, projectName) => {
	// Declare variables
	let blocksConfig = [];
	let currentNode = elements[0];
	let traverse = true;
	let val = 0;
	let path = [];
	let maxPath = [];
	let nodeContext = [];
	// Fetch the robot name associated with the project
	const robotName = defineObject(projectName);
	// Construct the block config
	while (traverse) {
		if (currentNode) {
			if (!checkPrevious(currentNode, elements)) {
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
			case "NodeIf":
				maxPath.push(2);
				path.push(0);
				nodeContext.push(currentNode);
				executionNext += "__" + String(path[path.length - 1]);
				break;
			case "NodeWhile":
			case "NodeRepeat":
				maxPath.push(1);
				path.push(0);
				nodeContext.push(currentNode);
				executionNext += "__" + String(path[path.length - 1]);
				break;
			case undefined:
				let block = blocksConfig.pop();
				// EXPLAIN: Salim - What is the purpose of this if statement?
				if (block.type != "else-condition") {
					blocksConfig.push(block);
				}
				executionNext = undefined;
				break;
		}
		// EXPLAIN: Salim - What is the purpose of this if statement?
		if (executionNext) {
			let state;
			[state, nextNode] = findNextNode(currentNode, executionNext, elements);
			if (!state) {
				return [nextNode, null, null];
			}
		}
		// EXPLAIN: Salim - What is the purpose of this if statement?
		if (nextNode) {
			currentNode = nextNode;
		} else {
			// EXPLAIN: Salim - What is the purpose of this if statement?
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
				// EXPLAIN: Salim - What is the purpose of this if statement?
				if (path[path.length - 1] == maxPath[path.length - 1]) {
					switch (currentNode.type) {
						case "NodeWhile":
							let delayBlock = {
								robot: robotName,
								id: "delay_whiled",
								type: "specific",
								name: "NodeDelay",
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
						case "NodeIf":
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
		type: "NodeEnd",
	};
	blocksConfig.push(endNode);
	console.log(blocksConfig);
	// EXPLAIN: Salim - What is the purpose of this if statement?
	if (blocksConfig.length == 2) {
		return [blocksConfig, "warning", "You have no blocks connected. Nothing interesting will happen."];
	}
	return [blocksConfig, null, null];
};

/**
 *
 * @param {*} projectName
 * @returns
 */
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
