import StartNode from "/components/ReactFlow/StartNode";
import EndNode from "/components/ReactFlow/EndNode";
import CustomEdge from "/components/ReactFlow/CustomEdge";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export const initialElements = [
  {
    id: "start",
    type: "start",
    position: { x: -160, y: -160 },
  },
  { id: "end", type: "end", position: { x: 160, y: 160 } },
];
