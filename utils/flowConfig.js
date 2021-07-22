import { NodeStart } from "../components/ReactFlow/NodeGeneral";
import {
  NodeDistance,
  NodeSpeedOf,
  NodeHeightOf,
  NodeWidthOf,
  NodeElevationOf,
} from "../components/ReactFlow/NodeSensing";
import {
  NodeAttack,
  NodeDoubleJump,
  NodeCrouch,
  NodeJump,
} from "../components/ReactFlow/NodeActions";
import {
  NodeAdd,
  NodeSubtract,
  NodeMultiply,
  NodeDivide,
  NodeGreaterThan,
  NodeLessThan,
  NodeEquals,
  NodeNotEquals,
  NodeOperatorGeneral,
} from "../components/ReactFlow/NodeOperations";
import { NodeAnd, NodeOr } from "../components/ReactFlow/NodeLogicals";
import {
  NodeIf,
  NodeRepeat,
  NodeWhile,
} from "../components/ReactFlow/NodeConditionals";
import { ExecutionEdge } from "../components/ReactFlow/Edges";

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
};

export const edgeTypes = {
  execution: ExecutionEdge,
};

export const initialElements = [
  {
    id: "start",
    type: "start",
    position: { x: -80, y: -80 },
  },
];

export const entities = ["Player"];

export const tooltips = {
  distance: "Outputs the distance to the next obstacle",
  speedOf: "Outputs the speed of the next obstacle",
  heightOf:
    "Outputs the height of the next obstacle (measurement between the top and bottom of an object)",
  widthOf:
    "Outputs the width of the next obstacle (measurement between the front and back of an object)",
  elevationOf: "Outputs the height of an object above the ground",
  jump: "Instructs your character to jump",
  crouch: "Instructs your character to crouch for 1 second",
  add: "Outputs the addition of the two inputs",
  subtract: "Outputs the subtraction of one input from the other",
  multiply: "Outputs the multiplication of the two inputs",
  divide: "Outputs the division of one input by the other",
  greaterThan:
    "Outputs TRUE if the left input is greater than the right input, and FALSE otherwise",
  lessThan:
    "Outputs TRUE if the left input is less than the right input, and FALSE otherwise",
  equals:
    "Outputs TRUE if the two inputs are equal to each other, and FALSE if they are not equal",
  notEquals:
    "Outputs TRUE if the two inputs are not equal to each other, and FALSE if they are equal",
  operatorGeneral: "Choose your operator",
  and: "Outputs TRUE if both inputs are TRUE. If any inputs are FALSE, outputs FALSE",
  or: "Outputs TRUE if any inputs are TRUE. Only outputs FALSE if both inputs are FALSE",
  if: "If the input (condition) is TRUE, then the code will run DO. If the input (condition) is FALSE, then the code will run ELSE. Every time this block is run, it will pick either the DO or ELSE path, but never run both. After it has completed running one of the two, the code continues by running THEN",
  repeat:
    "Repeatedly runs DO for the inputted number of times (input). After it has completed repeating itself, the code continues by running THEN",
  while:
    "While the input (condition) is TRUE, this block will keep repeating the DO code. Only when the input (condition) is FALSE will the code continue onto the THEN code",
};
