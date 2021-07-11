import { NodeStart, NodeEnd } from "../components/ReactFlow/NodeGeneral";
import NodeDistance from "../components/ReactFlow/NodeDistance";
import NodeSpeedOf from "../components/ReactFlow/NodeSpeedOf";
import NodeSizeOf from "../components/ReactFlow/NodeSizeOf";
import {
  NodeAttack,
  NodeDoubleJump,
  NodeDuck,
  NodeJump,
  NodeSlide,
} from "../components/ReactFlow/NodeActions";
import {
  NodeAdd,
  NodeSubtract,
  NodeMultiply,
  NodeDivide,
  NodeGreaterThan,
  NodeLessThan,
  NodeEquals,
} from "../components/ReactFlow/NodeOperations";
import { ExecutionEdge } from "../components/ReactFlow/Edges";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: NodeStart,
  end: NodeEnd,
  distance: NodeDistance,
  speedOf: NodeSpeedOf,
  sizeOf: NodeSizeOf,
  jump: NodeJump,
  doubleJump: NodeDoubleJump,
  duck: NodeDuck,
  slide: NodeSlide,
  attack: NodeAttack,
  add: NodeAdd,
  subtract: NodeSubtract,
  multiply: NodeMultiply,
  divide: NodeDivide,
  greaterThan: NodeGreaterThan,
  lessThan: NodeLessThan,
  equals: NodeEquals,
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
  { id: "end", type: "end", position: { x: 80, y: 80 } },
];

export const entities = ["Character", "Drone", "Vehicle"];
