import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  updateEdge,
  Background,
  isEdge,
  isNode,
  getOutgoers,
} from "react-flow-renderer";
import { nodeTypes, edgeTypes, entities } from "../../utils/flowConfig";

import GreenButton from "../UI/GreenButton";
import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";

import classes from "./FlowEditor.module.scss";
import nodesClass from "./Nodes.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const controlTitles = ["Zoom-in", "Zoom-out", "Fit-view", "Lock", "Info"];

let com;

const updateGhostEnd = (sourceBlock, sourceHandle, action) => {
  switch (action) {
    case "add":
      document
        .querySelector(
          `.react-flow__handle.source[data-nodeid="${sourceBlock}"][data-handleid="${sourceHandle}"]`
        )
        .classList.add(nodesClass.handleConnected);
      break;
    case "remove":
      document
        .querySelector(
          `.react-flow__handle.source[data-nodeid="${sourceBlock}"][data-handleid="${sourceHandle}"]`
        )
        .classList.remove(nodesClass.handleConnected);
      break;
  }
};

const updateParamInput = (targetBlock, targetHandle, action) => {
  if (targetHandle.split("__")[0] === "param") {
    const handleId = targetHandle.split("__")[1];
    const el = document.querySelector(
      `.react-flow__node[data-id="${targetBlock}"]`
    );
    switch (handleId) {
      case "b":
        action === "prevent"
          ? el
              .querySelectorAll("input")[1]
              .classList.add(nodesClass.preventInput)
          : el
              .querySelectorAll("input")[1]
              .classList.remove(nodesClass.preventInput);
        break;
      default:
        action === "prevent"
          ? el.querySelector("input").classList.add(nodesClass.preventInput)
          : el.querySelector("input").classList.remove(nodesClass.preventInput);
        break;
    }
  }
};

const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // deleting an element
  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end" // prevent deleting start and end node
    );
    for (const element of elementsToRemove) {
      if (isEdge(element)) {
        updateGhostEnd(element.source, element.sourceHandle, "remove");
        updateParamInput(element.target, element.targetHandle, "allow");
      }
    }
    props.setElements((els) => removeElements(filteredElements, els));
  }, []);

  const onConnect = useCallback((params) => {
    updateGhostEnd(params.source, params.sourceHandle, "add");

    // styling new edge
    let newEdge;
    if (params.sourceHandle.split("__")[0] === "execution") {
      newEdge = {
        ...params,
        type: "execution",
        animated: true,
        arrowHeadType: "arrowclosed",
      };
    } else if (params.sourceHandle.split("__")[0] === "param") {
      newEdge = {
        ...params,
      };
    }

    // check if param input needs to be toggled
    updateParamInput(params.target, params.targetHandle, "prevent");

    props.setElements((els) => {
      return addEdge(newEdge, els);
    });
  }, []);

  // updating edges
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    updateGhostEnd(oldEdge.source, oldEdge.sourceHandle, "remove");
    updateGhostEnd(newConnection.source, newConnection.sourceHandle, "add");
    updateParamInput(oldEdge.target, oldEdge.targetHandle, "allow");
    updateParamInput(
      newConnection.target,
      newConnection.targetHandle,
      "prevent"
    );
    props.setElements((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  // initialising flow editor
  const onLoad = useCallback((_reactFlowInstance) => {
    console.log("flow loaded:", _reactFlowInstance);

    _reactFlowInstance.fitView();
    setReactFlowInstance(_reactFlowInstance);

    const controls = document.querySelector("." + classes.controls).children;
    for (let i = 0; i < controls.length; i++) {
      controls[i].title = controlTitles[i];
    }

    // const arrowClosed = document.querySelector("#react-flow__arrowclosed");
    // arrowClosed.setAttribute("markerHeight", 16);
    // arrowClosed.setAttribute("markerWidth", 16);
  }, []);

  // dragging from menu to drop zone
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // dropping
  const onDrop = (event) => {
    event.preventDefault();
    // place the node in correct position
    const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    // create new node
    const id = getId();
    // add to data state
    let defaultValues = null;
    if (type === "distance") {
      defaultValues = { from: entities[0].toLowerCase(), to: "next object" };
    } else if (
      type === "speedOf" ||
      type === "heightOf" ||
      type === "widthOf" ||
      type === "elevationOf" ||
      type === "jump" ||
      type === "doubleJump" ||
      type === "duck" ||
      type === "slide" ||
      type === "attack"
    ) {
      defaultValues = { entity: entities[0].toLowerCase() };
    } else if (
      type === "add" ||
      type === "subtract" ||
      type === "multiply" ||
      type === "divide" ||
      type === "greaterThan" ||
      type === "lessThan" ||
      type === "equals" ||
      type === "or"
    ) {
      defaultValues = { a: 0, b: 0 };
    } else if (type === "operatorGeneral") {
      defaultValues = { a: 0, b: 0, operator: "+" };
    } else if (type === "repeat") {
      defaultValues = { condition: "1" };
    } else {
      defaultValues = {};
    }
    // add to element state
    const newNode = {
      id: id,
      type,
      position,
      data: {
        values: defaultValues,
        callBack: (newValues) => {
          props.setElements((els) =>
            els.map((el) => {
              if (el.id === id) {
                el.data = {
                  ...el.data,
                  values: newValues,
                };
              }
              return el;
            })
          );
        },
      },
    };
    props.setElements((es) => es.concat(newNode));
  };

  const compileHandler = async () => {
    clearInterval(com);
    com = 0;
    const code = props.compileCode();
    com = setInterval(() => {
      props.executeCode(code);
    }, 100);
  };

  return (
    <div className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}>
      <ReactFlowProvider>
        <DndBar />
        <div className={classes.editorWrapper} ref={wrapperRef}>
          <GreenButton
            className={`${classes.compileBtn} terminate-code`}
            clickHandler={compileHandler}
            caption="Compile"
          />
          <ReactFlow
            elements={props.elements}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onLoad={onLoad}
            // onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            snapToGrid={true}
            snapGrid={[16, 16]}
            arrowHeadColor="#ffffff"
          >
            <ControlsBar />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowEditor;
