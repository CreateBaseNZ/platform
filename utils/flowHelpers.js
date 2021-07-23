import { entities } from "./flowConfig";

import classes from "../components/ReactFlow/Nodes.module.scss";

import classesControlsBar from "../components/ReactFlow/ControlsBar.module.scss";

export const controlTitles = [
  "Zoom-in (Ctrl and +)",
  "Zoom-out (Ctrl and -)",
  "Undo (Ctrl + Z)",
  "Redo (Ctrl + Y)",
  "Save (Ctrl + S)",
  "Restore (Ctrl + R)",
  "Lock (Ctrl + L)",
  "Info",
];

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
  return {};
};

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
  if (oldEdge.source === newEdge.source) {
    return elements.map((el) => {
      if (el.id === oldEdge.target) {
        return removeConnection(el, oldEdge.targetHandle);
      } else if (el.id === newEdge.target) {
        return addConnection(el, newEdge.targetHandle);
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
};
