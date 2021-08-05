import { entities } from "./flowConfig";

import classesControlsBar from "../components/ReactFlow/ControlsBar.module.scss";

export const getDefaultValues = (type) => {
  if (
    type === "jump" ||
    type === "doubleJump" ||
    type === "crouch" ||
    type === "attack"
  ) {
    return { entity: entities[0].toLowerCase() };
  }
  if (
    type === "distance" ||
    type === "speedOf" ||
    type === "heightOf" ||
    type === "widthOf" ||
    type === "elevationOf"
  ) {
    return { entity: "next obstacle" };
  }
  if (
    type === "add" ||
    type === "subtract" ||
    type === "multiply" ||
    type === "divide" ||
    type === "greaterThan" ||
    type === "lessThan" ||
    type === "equals" ||
    type === "notEquals"
  ) {
    return { a: 0, b: 0 };
  }
  if (type === "operatorGeneral") {
    return { a: 0, b: 0, operator: "+" };
  }
  if (type === "repeat") {
    return { condition: "1" };
  }
  if (type === "print" || type === "delay") {
    return { a: 0 };
  }
  if (type === "moveArm") {
    return { x: 0, y: 0, z: 0 };
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
  distance: sensingHandles,
  speedOf: sensingHandles,
  heightOf: sensingHandles,
  widthOf: sensingHandles,
  elevationOf: sensingHandles,
  jump: actionHandles,
  crouch: actionHandles,
  moveArm: [
    "execution__in, float__in__x",
    "float__in__y",
    "float__in__z",
    "execution__out",
  ],
  add: operatorHandles,
  subtract: operatorHandles,
  multiply: operatorHandles,
  divide: operatorHandles,
  greaterThan: comparisonHandles,
  lessThan: comparisonHandles,
  notEquals: comparisonHandles,
  and: logicalHandles,
  or: logicalHandles,
  if: [
    "execution__in",
    "boolean__in__condition",
    "execution__out__0",
    "execution__out__1",
    "execution__out__2",
  ],
  repeat: [
    "exeuction__in",
    "float__in__condition",
    "execution__out__0",
    "execution__out__1",
  ],
  while: [
    "execution__in",
    "boolean__in__condition",
    "execution__out__0",
    "execution__out__1",
  ],
  delay: ["execution__in", "float__in__a", "execution__out"],
  print: ["execution__in", "float__in__a", "execution__out"],
};

export const infoLogs = [
  "To start coding with Flow, drag and drop one of the blocks into the drop zone. You can add as many blocks as you like and rearrange them.",
  "Before you run your code, you will need to connect each of your blocks together in the order you want them to be run. To connect two blocks, drag from the output handle (solid square) of one block to the input handle (hollow square) of another to form a track.",
  "If a block is connected with multiple tracks, you may get unexpected behavior when running your code. To delete a track, click on its arrowhead to select the track, then press the backspace key on your keyboard.",
  "When you code in Flow, the corresponding text code will automatically generate in the Text tab.",
];

export const flashLockIcon = () => {
  document
    .querySelector("#lockButton")
    .classList.add(classesControlsBar.lockAlert);
  setTimeout(() => {
    document
      .querySelector("#lockButton")
      .classList.remove(classesControlsBar.lockAlert);
  }, 3200);
};

export const getNearestGridPosition = (position) => {
  return Math.round(position / 16) * 16;
};

export const removeConnection = (el, oldHandle) => {
  console.log(el);
  console.log(oldHandle);
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
  console.log(oldEdge);
  console.log(newEdge);
  if (oldEdge.sourceHandle === newEdge.sourceHandle) {
    return elements.map((el) => {
      if (oldEdge.target === newEdge.target) {
        if (el.id === oldEdge.target) {
          return addConnection(
            removeConnection(el, oldEdge.targetHandle),
            newEdge.targetHandle
          );
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
          return addConnection(
            removeConnection(el, oldEdge.sourceHandle),
            newEdge.sourceHandle
          );
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
