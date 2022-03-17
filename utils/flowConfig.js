import { NodeStart } from "../components/Nodes/NodeGeneral";
import { NodeAdd, NodeSubtract, NodeMultiply, NodeDivide, NodeAbsolute, NodeArcTan, NodePI, NodeSqrt, NodeClamp, NodeGeneralOperator } from "../components/Nodes/NodeOperations";
import { NodeGreaterThan, NodeLessThan, NodeEquals, NodeNotEquals, NodeTrue, NodeFalse } from "../components/Nodes/NodeComparisons";
import { NodeAnd, NodeOr, NodeNot} from "../components/Nodes/NodeLogicals";
import { NodeIf, NodeRepeat, NodeWhile } from "../components/Nodes/NodeConditionals";
import { NodePrint, NodeDelay} from "../components/Nodes/NodeUtils";
import { NodeMagnebotMoveArm, NodeMagnebotSwitch } from "../components/Nodes/NodeMagneBot";
import {
	NodeAimBotGetYawAngle,
	NodeAimBotGetPitchAngle,
	NodeAimBotGetMosquitoXPos,
	NodeAimBotGetMosquitoYPos,
	NodeAimBotGetMosquitoZPos,
	NodeAimBotSetYawSpeed,
	NodeAimBotSetPitchSpeed,
	NodeAimBotShoot,
	NodeAimBotSetCurrentYawSpeed,
	NodeAimBotSetCurrentPitchSpeed,
	NodeAimBotGetCurrentYawSpeed,
	NodeAimBotGetCurrentPitchSpeed,
} from "../components/Nodes/NodeAimbot";
import { NodeSendItJump, NodeSendItCrouch, NodeSendItDistance, NodeSendItHeightOf, NodeSendItWidthOf, NodeSendItSpeedOf, NodeSendItElevationOf } from "../components/Nodes/NodeSendIt";
import {
	NodeHeatSeekerLeftWheel,
	NodeHeatSeekerRightWheel,
	NodeHeatSeekerMoveForward,
	NodeHeatSeekerMoveBackward,
	NodeHeatSeekerTurn,
	NodeHeatSeekerStop,
	NodeHeatSeekerWaterHose,
	NodeHeatSeekerLeftSensor,
	NodeHeatSeekerMiddleSensor,
	NodeHeatSeekerRightSensor,
	NodeHeatSeekerRobotOnLine,
	NodeHeatSeekerFrontOnLine,
	NodeHeatSeekerIsFireNear,
	NodeHeatSeekerDifference,
	NodeHeatSeekerFireSensor,
} from "../components/Nodes/NodeHeatSeeker";
import {
	NodeTrainingBotGetBananaGreen,
	NodeTrainingBotGetBananaYellow,
	NodeTrainingBotGetBananaBrown,
	NodeTrainingBotGetTrafficLight,
	NodeTrainingBotGetTyrePressure,
	NodeTrainingBotGetSlipLevel,
	NodeTrainingBotGetTargetDistance,
	NodeTrainingBotPullLever,
	NodeTrainingBotPunch,
	NodeTrainingBotTurnLeft,
	NodeTrainingBotTurnRight,
	NodeTrainingBotMoveForward,
	NodeTrainingBotPumpTyre,
	NodeTrainingBotWalk,
	NodeTrainingBotStop,
	NodeTrainingBotThrowBalloon,
	NodeTrainingBotThrowConstant,
	NodeRestartInitialize,
	NodeDelayedRestartInitialize
} from "../components/Nodes/NodeTrainingCamp";

import { ExecutionEdge, BooleanEdge, FloatEdge } from "../components/Nodes/Edges";

import classes from "../components/ReactFlow/FlowEditor.module.scss";

export const initialData = {
	start: {},
	end: {},
};

export const edgeTypes = {
	execution: ExecutionEdge,
	boolean: BooleanEdge,
	float: FloatEdge,
};

export const controlTitles = [
	"Zoom-in (Ctrl and +)",
	"Zoom-out (Ctrl and -)",
	"Fit View (Space)",
	"Undo (Ctrl + Z)",
	"Redo (Ctrl + Y)",
	"Save (Ctrl + S)",
	"Restore (Ctrl + R)",
	"Select All (Ctrl + A)",
	"Clear All (Ctrl + B)",
	"Capture (Ctrl + G)",
	"Lock (Ctrl + L)",
	"Info",
];

const NoneType = () => {
	return (
		<span className={classes.tooltipTypes} style={{ backgroundColor: "#333333" }}>
			None
		</span>
	);
};
const FloatType = () => {
	return (
		<span className={classes.tooltipTypes} style={{ backgroundColor: "#D869EA" }}>
			Number
		</span>
	);
};
const BooleanType = () => {
	return (
		<span className={classes.tooltipTypes} style={{ backgroundColor: "#16e3f1" }}>
			Boolean
		</span>
	);
};
const ExecutionType = () => {
	return (
		<span className={classes.tooltipTypes} style={{ backgroundColor: "#FDB554" }}>
			Execution
		</span>
	);
};

export const nodeTypes = {
	NodeStart,
	NodeAdd,
	NodeSubtract,
	NodeMultiply,
	NodeDivide,
	NodeAbsolute,
	NodeArcTan,
	NodePI,
	NodeSqrt,
	NodeClamp,
	NodeGeneralOperator,
	NodeGreaterThan,
	NodeLessThan,
	NodeEquals,
	NodeNotEquals,
	NodeAnd,
	NodeOr,
	NodeNot,
	NodeIf,
	NodeRepeat,
	NodeWhile,
	NodePrint,
	NodeDelay,
	NodeTrue,
	NodeFalse,
	NodeMagnebotMoveArm,
	NodeMagnebotSwitch,
	NodeSendItCrouch,
	NodeSendItJump,
	NodeSendItDistance,
	NodeSendItHeightOf,
	NodeSendItWidthOf,
	NodeSendItSpeedOf,
	NodeSendItElevationOf,
	NodeHeatSeekerLeftWheel,
	NodeHeatSeekerRightWheel,
	NodeHeatSeekerMoveForward,
	NodeHeatSeekerMoveBackward,
	NodeHeatSeekerTurn,
	NodeHeatSeekerStop,
	NodeHeatSeekerWaterHose,
	NodeHeatSeekerLeftSensor,
	NodeHeatSeekerMiddleSensor,
	NodeHeatSeekerRightSensor,
	NodeHeatSeekerRobotOnLine,
	NodeHeatSeekerFrontOnLine,
	NodeHeatSeekerIsFireNear,
	NodeHeatSeekerDifference,
	NodeHeatSeekerFireSensor,
	NodeAimBotGetYawAngle,
	NodeAimBotGetPitchAngle,
	NodeAimBotGetMosquitoXPos,
	NodeAimBotGetMosquitoYPos,
	NodeAimBotGetMosquitoZPos,
	NodeAimBotSetYawSpeed,
	NodeAimBotSetPitchSpeed,
	NodeAimBotShoot,
	NodeAimBotSetCurrentYawSpeed,
	NodeAimBotSetCurrentPitchSpeed,
	NodeAimBotGetCurrentYawSpeed,
	NodeAimBotGetCurrentPitchSpeed,
	NodeTrainingBotGetBananaGreen,
	NodeTrainingBotGetBananaYellow,
	NodeTrainingBotGetBananaBrown,
	NodeTrainingBotGetTrafficLight,
	NodeTrainingBotGetTyrePressure,
	NodeTrainingBotGetSlipLevel,
	NodeTrainingBotGetTargetDistance,
	NodeTrainingBotPullLever,
	NodeTrainingBotPunch,
	NodeTrainingBotTurnLeft,
	NodeTrainingBotTurnRight,
	NodeTrainingBotMoveForward,
	NodeTrainingBotPumpTyre,
	NodeTrainingBotWalk,
	NodeTrainingBotStop,
	NodeTrainingBotThrowBalloon,
	NodeTrainingBotThrowConstant,
	NodeRestartInitialize,
	NodeDelayedRestartInitialize
};

export const tooltips = {
	NodeAdd: [<FloatType />, <FloatType />, "Outputs the addition of the two inputs"],
	NodeSubtract: [<FloatType />, <FloatType />, "Outputs the subtraction of one input from the other"],
	NodeMultiply: [<FloatType />, <FloatType />, "Outputs the multiplication of the two inputs"],
	NodeDivide: [<FloatType />, <FloatType />, "Outputs the division of one input by the other"],
	NodeAbsolute: [<FloatType />, "Outputs the absolute of the input (i.e. number without the sign)"],
	NodeArcTan: [<FloatType />, <FloatType />, "Outputs the arc tangent of the input"],

	NodePI: [<NoneType />, <FloatType />, "Outputs the number PI"],
	NodeSqrt: [<FloatType />, <FloatType />, "Outputs the square root of the input"],
	NodeClamp: [
		<>
			<FloatType /> <FloatType /> <FloatType />
		</>,
		<FloatType />,
		"Outputs an input number that is restricted between the given minimum and maximum values",
	],
	NodeGeneralOperator: [<FloatType />, <FloatType />, "Outputs the calulation based on the operation selected"],
	NodeGreaterThan: [<FloatType />, <BooleanType />, "Outputs TRUE if the left input is greater than the right input, and FALSE otherwise"],
	NodeLessThan: [<FloatType />, <BooleanType />, "Outputs TRUE if the left input is less than the right input, and FALSE otherwise"],
	NodeEquals: [<FloatType />, <BooleanType />, "Outputs TRUE if the two inputs are equal to each other, and FALSE if they are not equal"],
	NodeNotEquals: [<FloatType />, <BooleanType />, "Outputs TRUE if the two inputs are not equal to each other, and FALSE if they are equal"],
	NodeAnd: [<BooleanType />, <BooleanType />, "Outputs TRUE if both inputs are TRUE. If any inputs are FALSE, outputs FALSE"],
	NodeOr: [<BooleanType />, <BooleanType />, "Outputs TRUE if any inputs are TRUE. Only outputs FALSE if both inputs are FALSE"],
	NodeNot: [<BooleanType />, <BooleanType />, "Returns the opposite of the input boolean"],
	NodeIf: [
		<>
			<ExecutionType />
			<BooleanType />
		</>,
		<ExecutionType />,
		"If the input (condition) is TRUE, then the code will run DO. If the input (condition) is FALSE, then the code will run ELSE. Every time this block is run, it will pick either the DO or ELSE path, but never run both. After it has completed running one of the two, the code continues by running THEN",
	],
	NodeRepeat: [
		<>
			<ExecutionType />
			<FloatType />
		</>,
		<ExecutionType />,
		"Repeatedly runs DO for the inputted number of times (input). After it has completed repeating itself, the code continues by running THEN",
	],
	NodeWhile: [
		<>
			<ExecutionType />
			<BooleanType />
		</>,
		<ExecutionType />,
		"While the input (condition) is TRUE, this block will keep repeating the DO code. Only when the input (condition) is FALSE will the code continue onto the THEN code",
	],
	NodePrint: [
		<>
			<ExecutionType /> <FloatType />
		</>,
		<ExecutionType />,
		"Prints the input to the console",
	],
	NodeDelay: [
		<>
			<ExecutionType /> <FloatType />
		</>,
		<ExecutionType />,
		"Delays the code from running for a certain number of seconds",
	],
	NodeTrue: [<NoneType />, <BooleanType />, "Outputs boolean TRUE"],
	NodeFalse: [<NoneType />, <BooleanType />, "Outputs boolean FALSE"],
	NodeMagnebotMoveArm: [
		<>
			<ExecutionType />
			<FloatType />
		</>,
		<ExecutionType />,
		"Moves the end of the arm to the specified position",
	],
	NodeMagnebotSwitch: [<ExecutionType />, <ExecutionType />, "Toggles the magnet on and off"],
	NodeSendItCrouch: [<ExecutionType />, <ExecutionType />, "Instructs your character to crouch for 1 second"],
	NodeSendItJump: [<ExecutionType />, <ExecutionType />, "Instructs your character to jump"],
	NodeSendItDistance: [<NoneType />, <FloatType />, "Outputs the distance to the next obstacle"],
	NodeSendItHeightOf: [<NoneType />, <FloatType />, "Outputs the height of the next obstacle (measurement between the top and bottom of an object)"],
	NodeSendItWidthOf: [<NoneType />, <FloatType />, "Outputs the width of the next obstacle (measurement between the front and back of an object)"],
	NodeSendItSpeedOf: [<NoneType />, <FloatType />, "Outputs the speed of the next obstacle"],
	NodeSendItElevationOf: [<NoneType />, <FloatType />, "Outputs the height of an object above the ground"],

	NodeHeatSeekerLeftWheel: [
		<>
			<ExecutionType />,
			<FloatType />
		</>,
		<ExecutionType />,
		"Instructs the left wheel to move. 0 is stop, positive for forward and negative for backwards",
	],
	NodeHeatSeekerRightWheel: [<ExecutionType />, <ExecutionType />, "Instructs the right wheel to move. 0 is stop, positive for forward and negative for backwards"],
	NodeHeatSeekerMoveForward: [
		<>
			<ExecutionType />,
			<FloatType />
		</>,
		<ExecutionType />,
		"Orders both motors to move forwards. If input is zero then they move at equal speed. If input is positive, Left motor is sped up and right is slowed and vice versa ",
	],
	NodeHeatSeekerMoveBackward: [
		<>
			<ExecutionType />,
			<FloatType />
		</>,
		<ExecutionType />,
		"Orders both motors to move backwards. If input is zero then they move at equal speed. If input is positive, Left motor is sped up and right is slowed and vice versa ",
	],
	NodeHeatSeekerTurn: [<ExecutionType />, <ExecutionType />, "Instructs the motors to move to make the car rotate, either clockwise or anticlockwise"],
	NodeHeatSeekerStop: [<ExecutionType />, <ExecutionType />, "Stops the movement of both motors"],
	NodeHeatSeekerWaterHose: [<ExecutionType />, <ExecutionType />, "Toggles the water hose on and off"],
	NodeHeatSeekerLeftSensor: [<NoneType />, <FloatType />, "Outputs the reading from left line sensor"],
	NodeHeatSeekerMiddleSensor: [<NoneType />, <FloatType />, "Outputs the reading from middle line sensor"],
	NodeHeatSeekerRightSensor: [<NoneType />, <FloatType />, "Outputs the reading from right line sensor"],
	NodeHeatSeekerRobotOnLine: [<NoneType />, <BooleanType />, "Outputs whether the left and right sensors are both on the line"],
	NodeHeatSeekerFrontOnLine: [<NoneType />, <BooleanType />, "Outputs whether the front sensor is on the middle of the line"],
	NodeHeatSeekerIsFireNear: [<NoneType />, <BooleanType />, "Outputs whether there is fire in front of the car"],
	NodeHeatSeekerDifference: [<NoneType />, <FloatType />, "Outputs the difference in reading between the right and left sensors"],
	NodeHeatSeekerFireSensor: [<NoneType />, <FloatType />, "Outputs the reading from the fire sensor"],
	NodeAimBotGetYawAngle: [<NoneType />, <FloatType />, "Outputs the yaw of the robot (Angle rotated about the y-axis)"],
	NodeAimBotGetPitchAngle: [<NoneType />, <FloatType />, "Outputs the pitch of the robot (Angle rotated about the x-axis)"],
	NodeAimBotGetMosquitoXPos: [<NoneType />, <FloatType />, "Outputs the distance the mosquito is away from the robot along the x-axis"],
	NodeAimBotGetMosquitoYPos: [<NoneType />, <FloatType />, "Outputs the distance the mosquito is away from the robot along the y-axis"],
	NodeAimBotGetMosquitoZPos: [<NoneType />, <FloatType />, "Outputs the distance the mosquito is away from the robot along the z-axis"],
	NodeAimBotSetYawSpeed: [<ExecutionType />, <><FloatType />, <ExecutionType /></>, "Sets the yaw speed of the robot in degrees per second"],
	NodeAimBotSetPitchSpeed: [<ExecutionType />, <><FloatType />, <ExecutionType /></>, "Sets the pitch speed of the robot in degrees per second"],
	NodeAimBotShoot: [<ExecutionType />, <ExecutionType />, "Fire the robot's high powered arm laser blaster"],
	NodeAimBotSetCurrentYawSpeed: [<ExecutionType />, <><FloatType />, <ExecutionType /></>, "Set the value of the CurrentYawSpeed variable"],
	NodeAimBotSetCurrentPitchSpeed: [<ExecutionType />, <><FloatType />, <ExecutionType /></>, "Set the value of the CurrentPitchSpeed variable"],
	NodeAimBotGetCurrentYawSpeed: [<NoneType />, <FloatType />, "Return the value of the CurrentYawSpeed variable"],
	NodeAimBotGetCurrentPitchSpeed: [<NoneType />, <FloatType />, "Return the value of the CurrentPitchSpeed variable"],
	NodeTrainingBotGetBananaGreen: [<NoneType />, <BooleanType />, "Return TRUE if the banana has any green colour"],
	NodeTrainingBotGetBananaYellow: [<NoneType />, <BooleanType />, "Return TRUE if the banana has any yellow colour"],
	NodeTrainingBotGetBananaBrown: [<NoneType />, <BooleanType />, "Return TRUE if the banana has any brown colour"],
	NodeTrainingBotGetTrafficLight: [<NoneType />, <FloatType />, "Return 1 if the traffic light is green, 2 if the traffic light is orange, and 3 if the traffic light is red"],
	NodeTrainingBotGetTyrePressure: [<NoneType />, <FloatType />, "Return the pressure level of the tyre"],
	NodeTrainingBotGetSlipLevel: [<NoneType />, <FloatType />, "Return the slip level of the ground"],
	NodeTrainingBotGetTargetDistance: [<NoneType />, <FloatType />, "Return distance of the target away from the robot"],
	NodeTrainingBotPullLever: [<ExecutionType />, <><BooleanType />, <ExecutionType /></>, "Pull the lever"],
	NodeTrainingBotPunch: [<ExecutionType />, <ExecutionType />, "Punch"],
	NodeTrainingBotTurnLeft: [<ExecutionType />, <ExecutionType />, "Turn 90 degrees to the left"],
	NodeTrainingBotTurnRight: [<ExecutionType />, <ExecutionType />, "Turn 90 degrees to the right"],
	NodeTrainingBotMoveForward: [<ExecutionType />, <ExecutionType />, "Move forward 1 step"],
	NodeTrainingBotPumpTyre: [<ExecutionType />, <ExecutionType />, "Pump the tyre once"],
	NodeTrainingBotWalk: [<ExecutionType />, <ExecutionType />, "Start walking forward"],
	NodeTrainingBotStop: [<ExecutionType />, <ExecutionType />, "Stop the robot walking"],
	NodeTrainingBotThrowBalloon: [<><ExecutionType /> <FloatType /></>, <ExecutionType />, "Throw the balloon with the specified power"],
	NodeTrainingBotThrowConstant: [<NoneType />, <FloatType />, "Return the throwing constant"],
	NodeRestartInitialize: [<ExecutionType />, <ExecutionType />, "Initialize the robot"],
	NodeDelayedRestartInitialize:  [<ExecutionType />, <ExecutionType />, "Initialize the robot"]
};

export const initialElements = [
	{
		id: "start",
		type: "NodeStart",
		position: { x: -80, y: -80 },
		data: { connections: [] },
	},
];
