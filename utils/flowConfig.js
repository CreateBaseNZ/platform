import { NodeStart } from "../components/ReactFlow/NodeGeneral";
import {
  NodeDistance,
  NodeSpeedOf,
  NodeHeightOf,
  NodeWidthOf,
  NodeElevationOf,
  NodeLeftSensor,
  NodeRightSensor,
  NodeFireSensor,
  NodeMiddleSensor,
  NodeOnLine,
  NodeDifference,
  NodeFrontOnLine,
  NodeIsFire,
  NodeLineLeft,
  NodeLineRight
} from "../components/ReactFlow/NodeSensing";
import {
  NodeAttack,
  NodeDoubleJump,
  NodeCrouch,
  NodeJump,
} from "../components/ReactFlow/NodeSendIt";
import {
  NodeMoveArm,
  NodeMagneticSwitch,
} from "../components/ReactFlow/NodeMagneBot";
import {
  NodeAdd,
  NodeSubtract,
  NodeMultiply,
  NodeDivide,
  NodeOperatorGeneral,
} from "../components/ReactFlow/NodeOperations";
import {
  NodeGreaterThan,
  NodeLessThan,
  NodeEquals,
  NodeNotEquals,
} from "../components/ReactFlow/NodeComparisons";
import { NodeAnd, NodeOr } from "../components/ReactFlow/NodeLogicals";
import {
  NodeIf,
  NodeRepeat,
  NodeWhile,
} from "../components/ReactFlow/NodeConditionals";
import {
  NodeDelay,
  NodePrint,
  NodeTrue,
  NodeFalse,
  NodeAbsolute,
} from "../components/ReactFlow/NodeUtils";
import {
  ExecutionEdge,
  BooleanEdge,
  FloatEdge,
} from "../components/ReactFlow/Edges";

import classes from "../components/ReactFlow/FlowEditor.module.scss";
import {
  NodeLeftWheel,
  NodeMoveBackward,
  NodeMoveForward,
  NodeRightWheel,
  NodeStop,
  NodeTurn,
  NodeWateHose
} from "../components/ReactFlow/NodeLineFollowing";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: NodeStart,
  distance: NodeDistance,
  speedOf: NodeSpeedOf,
  heightOf: NodeHeightOf,
  widthOf: NodeWidthOf,
  elevationOf: NodeElevationOf,
  jump: NodeJump,
  doubleJump: NodeDoubleJump,
  crouch: NodeCrouch,
  attack: NodeAttack,
  moveArm: NodeMoveArm,
  magneticSwitch: NodeMagneticSwitch,
  add: NodeAdd,
  subtract: NodeSubtract,
  multiply: NodeMultiply,
  divide: NodeDivide,
  greaterThan: NodeGreaterThan,
  lessThan: NodeLessThan,
  equals: NodeEquals,
  notEquals: NodeNotEquals,
  operatorGeneral: NodeOperatorGeneral,
  and: NodeAnd,
  or: NodeOr,
  if: NodeIf,
  repeat: NodeRepeat,
  while: NodeWhile,
  delay: NodeDelay,
  print: NodePrint,
  true: NodeTrue,
  false: NodeFalse,
  leftLineSensor: NodeLeftSensor,
  rightLineSensor: NodeRightSensor,
  fireDetectionSensor: NodeFireSensor,
  middleLineSensor: NodeMiddleSensor,
  onLine: NodeOnLine,
  difference: NodeDifference,
  moveForward: NodeMoveForward,
  moveBackward: NodeMoveBackward,
  turn: NodeTurn,
  stop:NodeStop,
  absolute: NodeAbsolute,
  leftWheel:NodeLeftWheel,
  rightWheel: NodeRightWheel,
  waterHose: NodeWateHose,
  frontOnLine: NodeFrontOnLine,
  isFire: NodeIsFire,
  lineLeft: NodeLineLeft,
  lineRight:NodeLineRight
};

export const edgeTypes = {
  execution: ExecutionEdge,
  boolean: BooleanEdge,
  float: FloatEdge,
};

export const initialElements = [
  {
    id: "start",
    type: "start",
    position: { x: -80, y: -80 },
    data: { connections: [] },
  },
];

export const entities = {
  SendIt: ["Player"],
  LineFollowing:["\"forwards\"","\"backwards\"","\"stop\""]
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
    <span
      className={classes.tooltipTypes}
      style={{ backgroundColor: "#333333" }}
    >
      None
    </span>
  );
};
const FloatType = () => {
  return (
    <span
      className={classes.tooltipTypes}
      style={{ backgroundColor: "#D869EA" }}
    >
      Number
    </span>
  );
};
const BooleanType = () => {
  return (
    <span
      className={classes.tooltipTypes}
      style={{ backgroundColor: "#16e3f1" }}
    >
      Boolean
    </span>
  );
};
const ExecutionType = () => {
  return (
    <span
      className={classes.tooltipTypes}
      style={{ backgroundColor: "#FDB554" }}
    >
      Execution
    </span>
  );
};

export const tooltips = {
  leftLineSensor: [
    <NoneType />,
    <FloatType />,
    "Outputs the reading from left line sensor",
  ],
  onLine: [
    <NoneType />,
    <BooleanType />,
    "Outputs whether the right and left sensors are on the line",
  ],
  frontOnLine: [
    <NoneType />,
    <FloatType />,
    "Outputs whether the front sensors is on the middle of the line",
  ],
  isFire: [
    <NoneType />,
    <BooleanType />,
    "Outputs whether there is fire in front of the car",
  ],
  lineLeft: [
    <NoneType />,
    <BooleanType />,
    "Outputs whether the line has a turn to the left",
  ],
  lineRight: [
    <NoneType />,
    <BooleanType />,
    "Outputs whether the line has a turn to the right",
  ],
  absolute: [
    <FloatType />,
    <FloatType />,
    "Outputs the absolute of the input (i.e. number without the sign)",
  ],
  rightLineSensor: [
    <NoneType />,
    <FloatType />,
    "Outputs the reading from right line sensor",
  ],
  middleLineSensor: [
    <NoneType />,
    <FloatType />,
    "Outputs the reading from middle line sensor",
  ],
  stop: [
    <ExecutionType />,
    <ExecutionType />,
    "Stops the movement of both motors",
  ],
  difference: [
    <NoneType />,
    <FloatType />,
    "Outputs the difference in reading between the right and left sensors",
  ],
  moveForward: [
    <>
      <ExecutionType />,
      <FloatType />
    </>,
    <ExecutionType />,
    "Orders both motors to move forwards. If input is zero then they move at equal speed. If input is positive, Left motor is sped up and right is slowed and vice versa ",
  ],
  moveBackward: [
    <>
      <ExecutionType />,
      <FloatType />
    </>,
    <ExecutionType />,
    "Orders both motors to move backwards. If input is zero then they move at equal speed. If input is positive, Left motor is sped up and right is slowed and vice versa ",
  ],
  turn: [
    <ExecutionType />,
    <ExecutionType />,
    "Instructs the motors to move to make the car rotate, either clockwise or anticlockwise",
  ],
  fireDetectionSensor: [
    <NoneType />,
    <FloatType />,
    "Outputs the reading from the fire sensor",
  ],
  distance: [
    <NoneType />,
    <FloatType />,
    "Outputs the distance to the next obstacle",
  ],
  speedOf: [
    <NoneType />,
    <FloatType />,
    "Outputs the speed of the next obstacle",
  ],
  heightOf: [
    <NoneType />,
    <FloatType />,
    "Outputs the height of the next obstacle (measurement between the top and bottom of an object)",
  ],
  widthOf: [
    <NoneType />,
    <FloatType />,
    "Outputs the width of the next obstacle (measurement between the front and back of an object)",
  ],
  elevationOf: [
    <NoneType />,
    <FloatType />,
    "Outputs the height of an object above the ground",
  ],
  jump: [
    <ExecutionType />,
    <ExecutionType />,
    "Instructs your character to jump",
  ],
  rightWheel: [
      <ExecutionType />,
    <ExecutionType />,
    "Instructs the right wheel to move. 0 is stop, positive for forward and negative for backwards",
  ],
  leftWheel: [
    <>
      <ExecutionType />,
      <FloatType />
    </>,
    <ExecutionType />,
    "Instructs the left wheel to move. 0 is stop, positive for forward and negative for backwards",
  ],
  waterHose: [
    <ExecutionType />,
    <ExecutionType />,
    "Toggles the water hose on and off",
  ],
  crouch: [
    <ExecutionType />,
    <ExecutionType />,
    "Instructs your character to crouch for 1 second",
  ],
  moveArm: [
    <>
      <ExecutionType />
      <FloatType />
    </>,
    <ExecutionType />,
    "Moves the end of the arm to the specified position",
  ],
  magneticSwitch: [
    <ExecutionType />,
    <ExecutionType />,
    "Toggles the magnet on and off",
  ],
  add: [<FloatType />, <FloatType />, "Outputs the addition of the two inputs"],
  subtract: [
    <FloatType />,
    <FloatType />,
    "Outputs the subtraction of one input from the other",
  ],
  multiply: [
    <FloatType />,
    <FloatType />,
    "Outputs the multiplication of the two inputs",
  ],
  divide: [
    <FloatType />,
    <FloatType />,
    "Outputs the division of one input by the other",
  ],
  greaterThan: [
    <FloatType />,
    <BooleanType />,
    "Outputs TRUE if the left input is greater than the right input, and FALSE otherwise",
  ],
  lessThan: [
    <FloatType />,
    <BooleanType />,
    "Outputs TRUE if the left input is less than the right input, and FALSE otherwise",
  ],
  equals: [
    <FloatType />,
    <BooleanType />,
    "Outputs TRUE if the two inputs are equal to each other, and FALSE if they are not equal",
  ],
  notEquals: [
    <FloatType />,
    <BooleanType />,
    "Outputs TRUE if the two inputs are not equal to each other, and FALSE if they are equal",
  ],
  operatorGeneral: [<FloatType />, <FloatType />, "Choose your operator"],
  and: [
    <BooleanType />,
    <BooleanType />,
    "Outputs TRUE if both inputs are TRUE. If any inputs are FALSE, outputs FALSE",
  ],
  or: [
    <BooleanType />,
    <BooleanType />,
    "Outputs TRUE if any inputs are TRUE. Only outputs FALSE if both inputs are FALSE",
  ],
  if: [
    <>
      <ExecutionType />
      <BooleanType />
    </>,
    <ExecutionType />,
    "If the input (condition) is TRUE, then the code will run DO. If the input (condition) is FALSE, then the code will run ELSE. Every time this block is run, it will pick either the DO or ELSE path, but never run both. After it has completed running one of the two, the code continues by running THEN",
  ],
  repeat: [
    <>
      <ExecutionType />
      <FloatType />
    </>,
    <ExecutionType />,
    "Repeatedly runs DO for the inputted number of times (input). After it has completed repeating itself, the code continues by running THEN",
  ],
  while: [
    <>
      <ExecutionType />
      <BooleanType />
    </>,
    <ExecutionType />,
    "While the input (condition) is TRUE, this block will keep repeating the DO code. Only when the input (condition) is FALSE will the code continue onto the THEN code",
  ],
  delay: [
    <>
      <ExecutionType /> <FloatType />
    </>,
    <ExecutionType />,
    "Delays the code from running for a certain number of seconds",
  ],
  print: [
    <>
      <ExecutionType /> <FloatType />
    </>,
    <ExecutionType />,
    "Prints the input to the console",
  ],
};
