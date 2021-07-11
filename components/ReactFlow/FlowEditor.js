import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  updateEdge,
  Background,
  isNode,
  getOutgoers,
} from "react-flow-renderer";
import { nodeTypes, edgeTypes, entities } from "../../utils/flowConfig";

import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const controlTitles = ["Zoom-in", "Zoom-out", "Fit-view", "Lock", "Info"];

const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // deleting an element
  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end" // prevent deleting start and end node
    );
    props.setElements((els) => removeElements(filteredElements, els));
  }, []);

  // custom edges
  const onConnect = useCallback((params) => {
    console.log(params);

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

    props.setElements((els) => {
      return addEdge(newEdge, els);
    });
  }, []);

  // updating edges
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      props.setElements((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

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
      defaultValues = { from: "character", to: "character" };
    } else if (
      type === "speedOf" ||
      type === "sizeOf" ||
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

  return (
    <div className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}>
      <ReactFlowProvider>
        <DndBar />
        <div className={classes.editorWrapper} ref={wrapperRef}>
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
