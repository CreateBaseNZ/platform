import { getOutgoers, getConnectedEdges, getIncomers } from "react-flow-renderer";
import BlocksF from "../public/systemDefinitions.json";

/**
 *
 * @param {*} projectName : The project name from the data file
 * @returns
 * EXPLAINDone: Salim - What is this function for?
 * This function returns the code to be run to reset the system
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
 * EXPLAINDone: Salim - Define this input variable
 * @param {*} currentNode : The node we want to find the next node in the execution path
 * @param {*} path : The ID of the execution  handle we want to find what node its connected to it
 * @param {*} elements : The list of all nodes and connections
 * @returns
 * EXPLAINDone: Salim - What is this function for?
 * The purpose of this function is to find the node that is connected to the handle defined in path
 * It returns two outputs [state, nextNode]
 * @param {*} state: returns true or false whether the process of finding the next node is successful.(ie. nextNode is found)
 * @param {*} nextNode: Returns either the nextNode if a nextNode is found, false if there is no nextNode or a error message if state was false.
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

	// EXPLAINDone: Salim - What is the purpose of this for loop?
	// The previous parts retrieves the ID of the node. This loop finds the node that matches the ID found.
	for (let i = 0; i < nextNodeList.length; i++) {
		if (nextNodeID == nextNodeList[i].id) {
			return [true, nextNodeList[i]];
		}
	}

	return [true, false];
};

/**
 * EXPLAINDone: Salim - Define these input variables
 * @param {*} block : The current block data
 * @param {*} currentNode : The node we want to find the type of
 * @param {*} generalBlock : List of general  types (nodes could be used for all system)
 * @param {*} mathOperations : List of differnet math operations concidered
 * @param {*} actions : List of action nodes of the current systems
 * @param {*} sensors : List of sensor nodes of the current systems
 * @param {*} allFunctions : List of function types both for all systems and the current system
 * @param {*} generalSystem : Data regarding the genral nodes and functions.
 * @returns
 * EXPLAINDone: Salim - What is this function for?
 * This function returns an updated block data adding the type or any extra information if the type is of general type.
 * For example, for math opertation,it will add within the value.opertator, the operator or for functions changes the
 * name to the name of the function
 */
const determineType = (block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, generalSystem) => {
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
	}
	return block;
};

/**
 * EXPLAINDone: Salim - Define these input variables
 * @param {*} currentNode : Current node we are trying to analyse
 * @param {*} elements : the full list of nodes and connections
 * @returns
 * EXPLAINDone: Salim - What is this function for?
 * This function returns whether this node has only one previous node (node prior in execution order) connected to it, except for start node, returns
 * true always
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
 * EXPLAINDone: Salim - Define these input variables
 * @param {*} blocksOrder : The current list of detailed blocks
 * @param {*} currentNode : The node we want to find the inputs for
 * @param {*} elements : List of all nodes and connections
 * @param {*} val : number of ouputs defined previously
 * @param {*} robotName : The name of the robot for this system
 * @param {*} level : 0 if this function hasn't been called within itself and 1 otherwise
 * @returns
 * EXPLAINDone: Salim - What is this function for?
 * This function adds into the block list the current block, by finding the inputs to this block, if the inputs are from other node it runs the
 * function on itself. Once the block data is finalised it adds it into the block list it returns 4 outputs [blocksOrder, val, outName, meassage]
 * @param {*} blocksOrder : New block list with the new blocks or null if this process is unsuccessful
 * @param {number} val : the updated number of ouputs defined or null if this process is unsuccessful
 * @param {string} outName : The name of output of this block if applicable or null if this process is unsuccessful
 * @param {string} message : If process is unsuccessful returns a message why process is unseuccessful
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
	// EXPLAINDone: Salim - What is the purpose of this if statement?
	// Currently, it serves no purose as this case is not here yet but this basically ensures if level>0 it means we are checking an input of another node. If we concider the currentNode (the node connected to another node as its input) is also an execution block then it should be already within the block list. If level is 0 then it means it came from execution path while if it is higher then its through input to another block. The reason it serves no purpose is no block has both execution and an output
	if (level != 0) {
		let outName = null;
		let executionBlock = false;
		// EXPLAINDone: Salim - What is the purpose of this for loop?
		// This loop looks through all connection from the block and checks if there is an exectution path and records it along with the output name of the block.
		for (let i = 0; i < edgeCollection.length; i++) {
			// EXPLAINDone: Salim - What is this if statement checking for?
			//Checks if the source of the connection is the node we are concidering
			if (currentNode.id == edgeCollection[i].source) {
				// EXPLAINDone: Salim - What are these conditions check for? What are the purpose of these conditions?
				// The conditions are checking for the name of the handles and checking if there is an execution connection and records the output name of this block and records it. I realised there is a bug in the second here and I fixed, it is spread between this and the other if.
				if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] == "execution") {
					executionBlock = true;
				} else if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] != "execution") {
					const spilletedName = edgeCollection[i].sourceHandle.split("__");
					outName = spilletedName[spilletedName.length - 1];
				}
				// EXPLAINDone: Salim - What is the purpose of this if statement?
				// Once we found the name of the output and confirmed its an execution block we stop going through the connection, serves no additional purpose
				if (executionBlock == true && outName) {
					break;
				}
			}
		}
		// EXPLAINDone: Salim - What is the purpose of this if statement?
		// If this was an execution block, we will look through the block list and check it is already there
		if (executionBlock) {
			// EXPLAINDone: Salim - What is the purpose of this for loop?
			// Look throught the blocks to check if the block we are looking at is already in the list
			for (let i = 0; i < blocksOrder.length; i++) {
				// EXPLAINDOne: Salim - What is the purpose of this if statement?
				// Compare ID of the blocks in the list with the id of the node we are checking. If it is true then the block is the node we are accessing
				if (blocksOrder[i].id == currentNode.id) {
					const output = blocksOrder[i].value.outName;
					return [blocksOrder, val, output, ""];
				}
			}
			return [null, null, null, "Wrong execution order"];
		}
	}
	// EXPLAINDone: Salim - What is the purpose of this for loop?
	// This loop goes through the edges to define the inputs to the node. Also, if one of the inputs is defined by another node, i.e. node connected to the input handle, it records the node that is connected to the input so we could explore it later
	for (let i = 0; i < edgeCollection.length; i++) {
		// EXPLAINDone: Salim - What is the purpose of this if statement?
		// Checks if the currentNode is the target of the connection examined
		if (currentNode.id == edgeCollection[i].target) {
			// EXPLAINDone: Salim - What is the purpose of this if statement?
			// Checks that the handle is not type execution and indeed of an input (float, bool or otherwise)
			if (edgeCollection[i].targetHandle && edgeCollection[i].targetHandle.split("__")[0] != "execution") {
				const splitName = edgeCollection[i].targetHandle.split("__");
				const inputName = splitName[splitName.length - 1];
				inputs.push(inputName);
				// EXPLAINDone: Salim - What is the purpose of this for loop?
				//THis loop goes through all nodes that input to the current node and checks which is the node that concides with this input
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

	// EXPLAINDone: Salim - What is the purpose of this if statement?
	// The propose of this block is to ensure non of the inputs are repeated which will happen if two connections are connected to the same iput handle
	if (unduplicatedArray.length != inputs.length) {
		return [null, null, null, "One of the inputs has more than one entry"];
	}
	let block = {
		robot: robotName,
		id: currentNode.id,
		type: currentNode.type,
	};
	// EXPLAINDOne: Salim - What is the purpose of this if statement?
	// This block tranfers the values from the node to the block data. value contains all the data that is related to the block such as input and so on
	if (currentNode.data != undefined) {
		block.value = { ...currentNode.data.values };
	}
	block = determineType(block, currentNode, generalBlocks, mathOperations, actions, sensors, allFunctions, generalSystem);
	let output;
	// EXPLAINDone: Salim - What is the purpose of this for loop?
	// This loops goes through each of the nodes that were connected to the current node as inputs and obtain the data for them and place them in block list
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
	// EXPLAINDone: Salim - What is the purpose of this for loop?
	// This loop finds whether this block has an output or not. The loop either ends an edge is undefined or breaks once an ouptut is found. It goes through connections related to the current node.
	for (let i = 0; i < edgeCollection.length; i++) {
		// EXPLAINDone: Salim - What is the purpose of this if statement?
		// It checks if the source of the connection is the current node
		if (currentNode.id == edgeCollection[i].source) {
			// EXPLAINDone: Salim - What is the purpose of this if statement?
			// Checks if the handle ID of the source is not an execution. The first part of the handle defines its type thus if it isn't execttion then it is an output
			if (edgeCollection[i].sourceHandle && edgeCollection[i].sourceHandle.split("__")[0] != "execution") {
				edgeNum = i;
				break;
			}
		}
	}
	let outName = false;
	switch (currentNode.type) {
		default:
			// EXPLAINDone: Salim - What is the purpose of this if statement?
			// edgeNum is going to define whether there is an output or not. If the block has no output, nothing here should be done
			if (edgeNum || edgeNum == 0) {
				const splitArray = edgeCollection[edgeNum].sourceHandle.split("__");
				let NextOut = splitArray[splitArray.length - 1];
				const doneBlock = blocksOrder.filter((block) => {
					return currentNode.id === block.id;
				});
				// EXPLAINDone: Salim - What is the purpose of this if statement?
				// This checks if the block was already within the block list pick out to have the same variable name of output as the previous time it was added
				if (doneBlock.length > 0) {
					if (doneBlock[0].value.out) {
						outName = doneBlock[0].value.out;
					}
				}
				// EXPLAINDone: Salim - What is the purpose of this if statement?
				// I guess this could have been just else for the if above (I am unsure currently maybe it would have not worked), but basically if a block hasn't been already added before this creates the variable name for the output
				if (NextOut && !outName) {
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
				// EXPLAINDone: Salim - What is the purpose of this if statement?
				// Could have been written better. undefined means there was an end to the branch. If the else branch was an else branch and nothing was connected to it will be the last block in the chain. In that case we dont want else with nothing being done. So I take out the last block, chek if it is else-condition, if it wasn't I put it back
				if (block.type != "else-condition") {
					blocksConfig.push(block);
				}
				executionNext = undefined;
				break;
		}
		// EXPLAINDone: Salim - What is the purpose of this if statement?
		// As seen above, only reason executionNext is if we are in currentNode.type==undefined which means there is no next node
		if (executionNext) {
			let state;
			[state, nextNode] = findNextNode(currentNode, executionNext, elements);
			if (!state) {
				return [nextNode, null, null];
			}
		}
		// EXPLAINDone: Salim - What is the purpose of this if statement?
		// If there was a next node in the path we set currentNode as nextNode for the next iteration. If the nextNode is undefined/null then we need it is the end of this path and either we continue exploring other paths or it is the end
		if (nextNode) {
			currentNode = nextNode;
		} else {
			// EXPLAINDone: Salim - What is the purpose of this if statement?
			//path stores if we are in subpaths such as if/ else for NodeIf , or Do in repeat (see case "NodeIf": and below). If no subpaths are there, and path is of length 0, then we have ended the flow block program so the while loop is broken. Otherwise, we check other paths
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
				// EXPLAINDone: Salim - What is the purpose of this if statement?
				// Check if all subpaths are checked of the last value in the path. maxPath defines how many subpaths are there for that division
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
	// EXPLAINDone: Salim - What is the purpose of this if statement?
	// Display a warning if they have no blocks connected to the start block
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
		case "send-it": return "Player";
		case "magnebot": return "Arm";
		case "heat-seeker": return "Car";
		case "aimbot": return "aimbot";
		case "hyperloop": return "hyperloop"
		case "flow-training-camp": return "trainingbot"
	}
	return "";
};

export const isOnceCode = (projectName) => {
	switch (projectName) {
		case "send-it":
		case "heat-seeker":
		case "aimbot":
		case "hyperloop":

			return false;
		case "magnebot":
		case "flow-training-camp":
			return true;

	}
};
