import NodeStart from "../components/ReactFlow/NodeStart";
import NodeEnd from "../components/ReactFlow/NodeEnd";
import NodeDistance from "../components/ReactFlow/NodeDistance";
import CustomEdge from "../components/ReactFlow/CustomEdge";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: NodeStart,
  end: NodeEnd,
  distance: NodeDistance,
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
  { id: "end", type: "end", position: { x: 80, y: 80 } },
];
