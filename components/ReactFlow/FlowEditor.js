import React, { useRef, useState, useCallback, useEffect, memo } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  Background,
  isEdge,
  isNode,
  useZoomPanHelper,
  getConnectedEdges,
  Controls,
} from "react-flow-renderer";
import { nodeTypes, edgeTypes } from "../../utils/flowConfig";
import {
  controlTitles,
  flashLockIcon,
  getDefaultValues,
  updateGhostEnd,
  updateParamInput,
} from "../../utils/flowHelpers";

import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [actionStack, setActionStack] = useState({
    stack: [],
    currentIndex: -1,
  });
  const [systemAction, setSystemAction] = useState(false);
  const [clipBoard, setClipBoard] = useState({
    selectedEl: null,
    board: null,
  });
  const [flowLocked, setFlowLocked] = useState(false);

  console.log(actionStack);

  const allowUndo = actionStack.currentIndex !== 0;
  const allowRedo = actionStack.currentIndex + 1 !== actionStack.stack.length;

  useEffect(() => {
    if (!systemAction) {
      setActionStack((state) => {
        return {
          stack: [
            ...state.stack.slice(0, state.currentIndex + 1),
            props.elements,
          ],
          currentIndex: state.currentIndex + 1,
        };
      });
    } else {
      setSystemAction(false);
    }
  }, [props.elements]);

  // temporary while devs fix library
  useEffect(() => {
    if (flowLocked) {
      document.querySelectorAll(".react-flow__handle").forEach((handle) => {
        handle.classList.remove("connectable");
      });
    } else {
      document.querySelectorAll(".react-flow__handle").forEach((handle) => {
        handle.classList.add("connectable");
      });
    }
  }, [flowLocked]);

  // initialising flow editor
  const onLoad = useCallback((_reactFlowInstance) => {
    console.log("flow loaded:", _reactFlowInstance);
    _reactFlowInstance.fitView();
    setReactFlowInstance(_reactFlowInstance);
    const controls = document.querySelector(".react-flow__controls").children;
    for (let i = 0; i < controls.length; i++) {
      controls[i].title = controlTitles[i];
    }
    const arrow = document.querySelector("#react-flow__arrowclosed");
    const clone = arrow.cloneNode(true);
    clone.id = "react-flow__arrowclosed__custom";
    arrow.parentNode.appendChild(clone);
  }, []);

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
    updateGhostEnd(params.source, params.sourceHandle, "add");
    updateParamInput(params.target, params.targetHandle, "prevent");
    props.setElements((els) => addEdge(newEdge, els));
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

  // dragging from menu to drop zone
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // dropping
  const onDrop = (event) => {
    event.preventDefault();
    if (flowLocked) {
      flashLockIcon();
      return;
    }
    // place the node in correct position
    const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    // create new node
    const id = getId();
    const newNode = {
      id: id,
      type,
      position,
      data: {
        values: getDefaultValues(type),
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

  const elementClickHandler = (event, element) => {
    if (isNode(element)) {
      setClipBoard((state) => {
        return { ...state, selectedEl: element };
      });
    }
  };

  const copyNode = () => {
    setClipBoard((state) => {
      return { ...state, board: clipBoard.selectedEl };
    });
  };

  const undoAction = () => {
    if (allowUndo) {
      setSystemAction(true);
      props.setElements(actionStack.stack[actionStack.currentIndex - 1]);
      setActionStack((state) => {
        return { ...state, currentIndex: state.currentIndex - 1 };
      });
    }
  };

  const redoAction = () => {
    if (allowRedo) {
      setSystemAction(true);
      props.setElements(actionStack.stack[actionStack.currentIndex + 1]);
      setActionStack((state) => {
        return { ...state, currentIndex: state.currentIndex + 1 };
      });
    }
  };

  const saveFlow = () => {
    if (props.elements) {
      window.localStorage.setItem("flow_save", JSON.stringify(props.elements));
    }
  };

  const restoreFlow = () => {
    const restore = () => {
      const flow = JSON.parse(window.localStorage.getItem("flow_save"));
      if (flow) {
        props.setElements(flow);
        setCenter(0, 0, 1.25);
      }
    };
    restore();
  };

  const lockHandler = () => {
    setFlowLocked((state) => !state);
  };

  const keyDownHandler = (event) => {
    event.preventDefault();
    if (event.ctrlKey) {
      if (event.key === "c") {
        copyNode();
      } else if (event.key === "v") {
      } else if (event.key === "z") {
        undoAction();
      } else if (event.key === "y") {
        redoAction();
      } else if (event.key === "s") {
        saveFlow();
      } else if (event.key === "r") {
        restoreFlow();
      } else if (event.key === "=") {
        zoomIn();
      } else if (event.key === "-") {
        zoomOut();
      } else if (event.key === "l") {
        lockHandler();
      }
    }
  };

  const edgeUpdateEndHandler = (event, edge) => {
    if (!event.target.classList.contains(".react-flow__handle")) {
      updateGhostEnd(edge.source, edge.sourceHandle, "remove");
      updateParamInput(edge.target, edge.targetHandle, "allow");
      props.setElements((els) => removeElements([edge], els));
    }
  };

  const nodeDragStopHandler = (event, node) => {
    console.log(props.elements);
    console.log(node);
    props.setElements((els) =>
      els.map((el) => (el.id === node.id ? node : el))
    );
  };

  return (
    <div
      className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}
      onContextMenu={() => console.log("does this work")}
      onKeyDown={keyDownHandler}
      tabIndex={-1}
    >
      <DndBar />
      <div className={classes.editorWrapper} ref={wrapperRef}>
        <ReactFlow
          elements={props.elements}
          elementsSelectable={!flowLocked}
          nodesConnectable={!flowLocked}
          nodesDraggable={!flowLocked}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onLoad={onLoad}
          minZoom={0.25}
          onElementClick={!flowLocked && elementClickHandler}
          onElementsRemove={onElementsRemove}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          snapToGrid={true}
          snapGrid={[16, 16]}
          arrowHeadColor="#ffffff"
          onNodeDragStop={nodeDragStopHandler}
          onEdgeUpdateEnd={edgeUpdateEndHandler}
        >
          <ControlsBar
            undoHandler={undoAction}
            redoHandler={redoAction}
            saveHandler={saveFlow}
            restoreHandler={restoreFlow}
            allowUndo={allowUndo}
            allowRedo={allowRedo}
            flowLocked={flowLocked}
            lockHandler={lockHandler}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default memo(FlowEditor);
