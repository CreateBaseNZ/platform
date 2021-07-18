import { entities } from "./flowConfig";

import classes from "../components/ReactFlow/Nodes.module.scss";

export const controlTitles = [
  "Zoom-in",
  "Zoom-out",
  "Fit-view",
  "Lock",
  "Undo",
  "Redo",
  "Save",
  "Restore",
  "Info",
];

export const getDefaultValues = (type) => {
  if (type === "distance") {
    return { from: entities[0].toLowerCase(), to: "next obstacle" };
  }
  if (
    type === "jump" ||
    type === "doubleJump" ||
    type === "crouch" ||
    type === "attack"
  ) {
    return { entity: entities[0].toLowerCase() };
  }
  if (
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
    type === "notEquals" ||
    type === "and" ||
    type === "or"
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

export const updateGhostEnd = (sourceBlock, sourceHandle, action) => {
  switch (action) {
    case "add":
      document
        .querySelector(
          `.react-flow__handle.source[data-nodeid="${sourceBlock}"][data-handleid="${sourceHandle}"]`
        )
        .classList.add(classes.handleConnected);
      break;
    case "remove":
      document
        .querySelector(
          `.react-flow__handle.source[data-nodeid="${sourceBlock}"][data-handleid="${sourceHandle}"]`
        )
        .classList.remove(classes.handleConnected);
      break;
  }
};

export const updateParamInput = (targetBlock, targetHandle, action) => {
  if (targetHandle.split("__")[0] === "param") {
    const handleId = targetHandle.split("__")[1];
    const el = document.querySelector(
      `.react-flow__node[data-id="${targetBlock}"]`
    );
    switch (handleId) {
      case "b":
        action === "prevent"
          ? el.querySelectorAll("input")[1].classList.add(classes.preventInput)
          : el
              .querySelectorAll("input")[1]
              .classList.remove(classes.preventInput);
        break;
      default:
        action === "prevent"
          ? el.querySelector("input").classList.add(classes.preventInput)
          : el.querySelector("input").classList.remove(classes.preventInput);
        break;
    }
  }
};
