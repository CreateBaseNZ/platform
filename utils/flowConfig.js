import StartNode from "/components/ReactFlow/StartNode";
// import EndNode from "/components/Play/Workspace/FlowEditor/EndNode";
// import MoveNode from "/components/Play/Workspace/FlowEditor/MoveNode";
// import GravityNode from "/components/Play/Workspace/FlowEditor/GravityNode";
// import ReadNode from "/components/Play/Workspace/FlowEditor/ReadNode";
// import SetNode from "/components/Play/Workspace/FlowEditor/SetNode";
// import PauseNode from "/components/Play/Workspace/FlowEditor/PauseNode";
import CustomEdge from "/components/ReactFlow/CustomEdge";

export const initialData = {
  start: {},
  end: {},
};

export const nodeTypes = {
  start: StartNode,
  // end: EndNode,
  // move: MoveNode,
  // gravity: GravityNode,
  // read: ReadNode,
  // set: SetNode,
  // pause: PauseNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export const initialElements = [
  {
    id: "start",
    type: "start",
    position: { x: -150, y: 150 },
  },
];
