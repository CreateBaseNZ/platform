import classesControlsBar from "../components/ReactFlow/ControlsBar.module.scss";

export const getDefaultValues = (type) => {
	if (
		type === "NodeHeatSeekerLeftWheel" ||
		type === "NodeHeatSeekerRightWheel" ||
		type === "NodePrint" ||
		type === "NodeDelay" ||
		type === "NodeAbsolute" ||
		type === "NodeArcTan" ||
		type === "NodePI" ||
		type === "NodeSqrt" ||
		type === "NodeClamp" ||
		type === "NodeHeatSeekerMoveForward" ||
		type === "NodeHeatSeekerMoveBackward" ||
		type === "NodeAimBotGetYawAngle" ||
		type === "NodeAimBotGetPitchAngle" ||
		type === "NodeAimBotGetMosquitoXPos" ||
		type === "NodeAimBotGetMosquitoYPos" ||
		type === "NodeAimBotGetMosquitoZPos" ||
		type === "NodeAimBotShoot" ||
		type === "NodeAimBotSetYawSpeed" ||
		type === "NodeAimBotSetPitchSpeed" ||
		type === "NodeAimBotSetCurrentYawSpeed" ||
		type === "NodeAimBotSetCurrentPitchSpeed" ||
		type === "NodeAimBotGetCurrentYawSpeed" ||
		type === "NodeAimBotGetCurrentPitchSpeed" || 
		type === "NodeTrainingBotGetBananaGreen" ||
		type === "NodeTrainingBotGetBananaYellow" ||
		type === "NodeTrainingBotGetBananaBrown" ||
		type === "NodeTrainingBotGetTrafficLight" ||
		type === "NodeTrainingBotGetTyrePressure" ||
		type === "NodeTrainingBotGetSlipLevel" ||
		type === "NodeTrainingBotGetTargetDistance" ||
		type === "NodeTrainingBotPullLever" ||
		type === "NodeTrainingBotPunch" ||
		type === "NodeTrainingBotTurnLeft" ||
		type === "NodeTrainingBotTurnRight" ||
		type === "NodeTrainingBotMoveForward" ||
		type === "NodeTrainingBotPumpTyre" ||
		type === "NodeTrainingBotWalk" ||
		type === "NodeTrainingBotStop" ||
		type === "NodeTrainingBotThrowBalloon," ||
		type === "NodeTrainingBotThrowConstant" ||
		type === "NodeRestartInitialize," ||
		type === "NodeDelayedRestartInitialize"
	) {
		return { a: 0 };
	}
	if (
		type === "NodeAdd" ||
		type === "NodeSubtract" ||
		type === "NodeMultiply" ||
		type === "NodeDivide" ||
		type === "NodeGreaterThan" ||
		type === "NodeLessThan" ||
		type === "NodeEquals" ||
		type === "NodeNotEquals" ||
		type === "NodeTrue" ||
		type === "NodeFalse"
	) {
		return { a: 0, b: 0 };
	}
	if (type === "NodeGeneralOperator") {
		return { a: 0, b: 0, operator: "+" };
	}
	if (type === "NodeRepeat") {
		return { condition: "1" };
	}
	if (type === "NodeMagnebotMoveArm") {
		return { x: 0, y: 0, z: 0 };
	}
	if (type === "NodeMagnebotSwitch" || type === "NodeHeatSeekerWaterHose" || type === "NodeHeatSeekerTurn" || type === "NodeNot") {
		return { a: true };
	}
	return {};
};

export const getHandleObject = (type, params) => {
	if (type === "execution") {
		return {
			...params,
			type: "execution",
			animated: true,
			arrowHeadType: "arrowclosed",
		};
	}
	if (type === "boolean") {
		return {
			...params,
			type: "boolean",
		};
	}
	if (type === "float") {
		return {
			...params,
			type: "float",
		};
	}
};

const sensingHandles = ["float__out"];
const actionHandles = ["execution__in", "execution__out"];
const operatorHandles = ["float__in__a", "float__in__b", "float__out"];
const comparisonHandles = ["float__in__a", "float__in__b", "boolean__out"];
const logicalHandles = ["boolean__in__a", "boolean__in__b", "boolean__out"];

export const nodeTypeHandles = {
	NodeStart: ["execution__out"],
	NodeAdd: operatorHandles,
	NodeSubtract: operatorHandles,
	NodeMultiply: operatorHandles,
	NodeDivide: operatorHandles,
	NodeAbsolute: ["float__in__a", "float__out"],
	NodeArcTan: ["float__in__a", "float__out"],

	NodePI: ["float__out"],
	NodeSqrt: ["float__in__a", "float__out"],
	NodeClamp: ["float__in__a", "float__in__b", "float__in__c", "float__out"],

	NodeGeneralOperator: operatorHandles,
	NodeGreaterThan: comparisonHandles,
	NodeLessThan: comparisonHandles,
	NodeEquals: comparisonHandles,
	NodeNotEquals: comparisonHandles,
	NodeAnd: logicalHandles,
	NodeOr: logicalHandles,
	NodeNot: ["boolean__in__a", "boolean__out"],
	NodeIf: ["execution__in", "boolean__in__condition", "execution__out__0", "execution__out__1", "execution__out__2"],
	NodeRepeat: ["exeuction__in", "float__in__condition", "execution__out__0", "execution__out__1"],
	NodeWhile: ["execution__in", "boolean__in__condition", "execution__out__0", "execution__out__1"],
	NodePrint: ["execution__in", "float__in__a", "execution__out"],
	NodeDelay: ["execution__in", "float__in__a", "execution__out"],
	NodeTrue: comparisonHandles,
	NodeFalse: comparisonHandles,
	
	NodeMagnebotMoveArm: ["execution__in", "float__in__x", "float__in__y", "float__in__z", "execution__out"],
	NodeMagnebotSwitch: actionHandles,

	NodeSendItJump: actionHandles,
	NodeSendItCrouch: actionHandles,
	NodeSendItDistance: sensingHandles,
	NodeSendItHeightOf: sensingHandles,
	NodeSendItWidthOf: sensingHandles,
	NodeSendItSpeedOf: sensingHandles,
	NodeSendItElevationOf: sensingHandles,

	NodeHeatSeekerLeftWheel: actionHandles,
	NodeHeatSeekerRightWheel: actionHandles,
	NodeHeatSeekerMoveForward: actionHandles,
	NodeHeatSeekerMoveBackward: actionHandles,
	NodeHeatSeekerTurn: actionHandles,
	NodeHeatSeekerStop: actionHandles,
	NodeHeatSeekerWaterHose: actionHandles,
	NodeHeatSeekerLeftSensor: sensingHandles,
	NodeHeatSeekerMiddleSensor: sensingHandles,
	NodeHeatSeekerRightSensor: sensingHandles,
	NodeHeatSeekerRobotOnLine: ["boolean__out"],
	NodeHeatSeekerFrontOnLine: ["boolean__out"],
	NodeHeatSeekerIsFireNear: ["boolean__out"],
	NodeHeatSeekerDifference: sensingHandles,
	NodeHeatSeekerFireSensor: sensingHandles,

	NodeAimBotGetYawAngle: sensingHandles,
	NodeAimBotGetPitchAngle: sensingHandles,
	NodeAimBotGetMosquitoXPos: sensingHandles,
	NodeAimBotGetMosquitoYPos: sensingHandles,
	NodeAimBotGetMosquitoZPos: sensingHandles,
	NodeAimBotSetYawSpeed: actionHandles,
	NodeAimBotSetPitchSpeed: actionHandles,
	NodeAimBotShoot: actionHandles,
	NodeAimBotSetCurrentYawSpeed: actionHandles,
	NodeAimBotSetCurrentPitchSpeed: actionHandles,
	NodeAimBotGetCurrentYawSpeed: sensingHandles,
	NodeAimBotGetCurrentPitchSpeed: sensingHandles,

	NodeTrainingBotGetBananaGreen: ["boolean__out"],
	NodeTrainingBotGetBananaYellow: ["boolean__out"],
	NodeTrainingBotGetBananaBrown: ["boolean__out"],
	NodeTrainingBotGetTrafficLight: sensingHandles,
	NodeTrainingBotGetTyrePressure: sensingHandles,
	NodeTrainingBotGetSlipLevel: sensingHandles,
	NodeTrainingBotGetTargetDistance: sensingHandles,
	NodeTrainingBotPullLever: ["execution__in", "boolean__in__a", "execution__out"],
	NodeTrainingBotPunch: actionHandles,
	NodeTrainingBotTurnLeft: actionHandles,
	NodeTrainingBotTurnRight: actionHandles,
	NodeTrainingBotMoveForward: actionHandles,
	NodeTrainingBotPumpTyre: actionHandles,
	NodeTrainingBotWalk: actionHandles,
	NodeTrainingBotStop: actionHandles,
	NodeTrainingBotThrowBalloon: ["execution__in", "float__in__a", "execution__out"],
	NodeTrainingBotThrowConstant: sensingHandles,
	NodeRestartInitialize: actionHandles,
	NodeDelayedRestartInitialize: actionHandles
	
};

export const infoLogs = [
	"To start coding with Flow, drag and drop one of the blocks into the drop zone. You can add as many blocks as you like and rearrange them.",
	"Before you run your code, you will need to connect each of your blocks together in the order you want them to be run. To connect two blocks, drag from the output handle (solid square) of one block to the input handle (hollow square) of another to form a track.",
	"If a block is connected with multiple tracks, you may get unexpected behavior when running your code. To delete a track, click on its arrowhead to select the track, then press the backspace key on your keyboard.",
	"When you code in Flow, the corresponding text code will automatically generate in the Text tab.",
];

export const flashLockIcon = () => {
	document.querySelector("#lockButton").classList.add(classesControlsBar.lockAlert);
	setTimeout(() => {
		document.querySelector("#lockButton").classList.remove(classesControlsBar.lockAlert);
	}, 3200);
};

export const getNearestGridPosition = (position) => {
	return Math.round(position / 16) * 16;
};

export const removeConnection = (el, oldHandle) => {
	return {
		...el,
		data: {
			...el.data,
			connections: el.data.connections.filter((handle) => handle !== oldHandle),
		},
	};
};

export const addConnection = (el, newHandle) => {
	return {
		...el,
		data: {
			...el.data,
			connections: el.data.connections.concat(newHandle),
		},
	};
};

export const newConnection = (elements, edge) => {
	return elements.map((el) => {
		if (el.id === edge.source) {
			return addConnection(el, edge.sourceHandle);
		} else if (el.id === edge.target) {
			return addConnection(el, edge.targetHandle);
		} else {
			return el;
		}
	});
};

export const updateConnections = (elements, oldEdge, newEdge) => {
	if (oldEdge.sourceHandle === newEdge.sourceHandle) {
		return elements.map((el) => {
			if (oldEdge.target === newEdge.target) {
				if (el.id === oldEdge.target) {
					return addConnection(removeConnection(el, oldEdge.targetHandle), newEdge.targetHandle);
				} else {
					return el;
				}
			} else {
				if (el.id === oldEdge.target) {
					return removeConnection(el, oldEdge.targetHandle);
				} else if (el.id === newEdge.target) {
					return addConnection(el, newEdge.targetHandle);
				} else {
					return el;
				}
			}
		});
	} else {
		if (oldEdge.source === newEdge.source) {
			return elements.map((el) => {
				if (el.id === oldEdge.source) {
					return addConnection(removeConnection(el, oldEdge.sourceHandle), newEdge.sourceHandle);
				} else {
					return el;
				}
			});
		} else {
			return elements.map((el) => {
				if (el.id === oldEdge.source) {
					return removeConnection(el, oldEdge.sourceHandle);
				} else if (el.id === newEdge.source) {
					return addConnection(el, newEdge.sourceHandle);
				} else {
					return el;
				}
			});
		}
	}
};

export const saveAs = (uri, filename) => {
	const link = document.createElement("a");
	if (typeof link.download === "string") {
		link.href = uri;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		window.open(uri);
	}
};
