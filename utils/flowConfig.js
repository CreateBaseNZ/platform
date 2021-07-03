import NodeStart from "../components/ReactFlow/NodeStart";
import NodeEnd from "../components/ReactFlow/NodeEnd";
import NodeDistance from "../components/ReactFlow/NodeDistance";
import NodeSpeedOf from "../components/ReactFlow/NodeSpeedOf";
import NodeSizeOf from "../components/ReactFlow/NodeSizeOf";
import NodeJump from "../components/ReactFlow/NodeJump";
import NodeDoubleJump from "../components/ReactFlow/NodeDoubleJump";
import NodeDuck from "../components/ReactFlow/NodeDuck";
import NodeSlide from "../components/ReactFlow/NodeSlide";
import NodeAttack from "../components/ReactFlow/NodeAttack";
import CustomEdge from "../components/ReactFlow/CustomEdge";

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
};

export const edgeTypes = {
  custom: CustomEdge,
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
