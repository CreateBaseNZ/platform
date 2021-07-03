import NodeStart from "../components/ReactFlow/NodeStart";
import NodeEnd from "../components/ReactFlow/NodeEnd";
import NodeDistance from "../components/ReactFlow/NodeDistance";
import NodeSpeedOf from "../components/ReactFlow/NodeSpeedOf";
import NodeSizeOf from "../components/ReactFlow/NodeSizeOf";
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
  {
    id: "123",
    type: "distance",
    position: { x: 0, y: 0 },
    data: { id: "123", values: { from: "character", to: "drone" } },
  },
  {
    id: "456",
    type: "speedOf",
    position: { x: 32, y: 32 },
    data: { id: "456", values: { entity: "character" } },
  },
  { id: "end", type: "end", position: { x: 80, y: 80 } },
];
