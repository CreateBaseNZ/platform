import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
  useContext,
} from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  Background,
  isEdge,
  isNode,
  useZoomPanHelper,
  useStoreState,
  useStoreActions,
} from "react-flow-renderer";
import {
  nodeTypes,
  edgeTypes,
  tooltips,
  controlTitles,
  initialElements,
} from "../../utils/flowConfig";
import {
  flashLockIcon,
  getDefaultValues,
  getNearestGridPosition,
  newConnection,
  removeConnection,
  saveAs,
  updateConnections,
} from "../../utils/flowHelpers";
import html2canvas from "html2canvas";

import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";

import classes from "./FlowEditor.module.scss";
import MiniHoverContext from "../../store/mini-hover-context";

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowEditor = (props) => {
  const miniHoverCtx = useContext(MiniHoverContext);
  const wrapperRef = useRef(null);
  const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [actionStack, setActionStack] = useState({
    stack: [],
    currentIndex: -1,
  });
  const [systemAction, setSystemAction] = useState(false);
  const [clipBoard, setClipBoard] = useState({
    selection: null,
    board: null,
  });
  const [flowLocked, setFlowLocked] = useState(false);
  const setSelectedElements = useStoreActions(
    (actions) => actions.setSelectedElements
  );

  console.log(props.elements);

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
    document.querySelector(".react-flow").focus();
    window.onbeforeunload = (e) => {
      e.preventDefault();
      return (e.returnValue =
        "You have unsaved changes, are you sure you want to exit?");
    };
  }, []);

  // deleting an element
  const onElementsRemove = useCallback((elementsToRemove) => {
    let edges = [];
    const filteredElements = elementsToRemove.filter((el) => {
      if (isEdge(el)) {
        edges.push(el);
      }
      return el.id !== "start";
    });
    props.setElements((els) =>
      removeElements(filteredElements, els).map((el) => {
        for (const edge of edges) {
          if (el.id === edge.source) {
            return removeConnection(el, edge.sourceHandle);
          } else if (el.id === edge.target) {
            return removeConnection(el, edge.targetHandle);
          }
        }
        return el;
      })
    );
  }, []);

  const onConnect = useCallback((params) => {
    // styling new edge
    let newEdge;
    const handleType = params.sourceHandle.split("__")[0];
    if (handleType === "execution") {
      newEdge = {
        ...params,
        type: "execution",
        animated: true,
        arrowHeadType: "arrowclosed",
      };
    } else if (handleType === "boolean") {
      newEdge = {
        ...params,
        type: "boolean",
      };
    } else if (handleType === "float") {
      newEdge = {
        ...params,
        type: "float",
      };
    }
    props.setElements((els) => newConnection(addEdge(newEdge, els), params));
  }, []);

  // updating edges
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    props.setElements((els) =>
      updateConnections(
        updateEdge(oldEdge, newConnection, els),
        oldEdge,
        newConnection
      )
    );
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
      props.setVisualBell((state) => ({
        message: "Flow is locked",
        switch: !state.switch,
      }));
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
        connections: [],
        callBack: (newValues, thisId) => {
          props.setElements((els) =>
            els.map((el) => {
              if (el.id === thisId) {
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

  const selectChangeHandler = (elements) => {
    if (elements) {
      setClipBoard((state) => {
        return {
          ...state,
          selection: elements,
        };
      });
    }
  };

  const copySelection = () => {
    if (clipBoard.selection) {
      setClipBoard((state) => {
        return {
          ...state,
          board: clipBoard.selection.filter((el) => el.id !== "start"),
        };
      });
    }
  };

  const pasteSelection = () => {
    if (flowLocked) {
      flashLockIcon();
      props.setVisualBell((state) => ({
        message: "Flow is locked",
        switch: !state.switch,
      }));
      return;
    }
    if (clipBoard.board) {
      let mapping = {};
      let edges = [];
      for (const el of clipBoard.board) {
        if (isNode(el)) {
          const newId = getId();
          mapping[el.id] = {
            id: newId,
            type: el.type,
            position: el.position,
            data: { ...el.data, connections: [] },
          };
        } else {
          edges.push(el);
        }
      }

      const newEdges = edges
        .filter((edge) => edge.source in mapping && edge.target in mapping)
        .map((edge) => {
          mapping[edge.source].data.connections.push(edge.sourceHandle);
          mapping[edge.target].data.connections.push(edge.targetHandle);
          return {
            ...edge,
            id: `reactflow__edge-${mapping[edge.source].id}${
              edge.sourceHandle
            }-${mapping[edge.target].id}${edge.targetHandle}`,
            source: mapping[edge.source].id,
            target: mapping[edge.target].id,
          };
        });

      const newNodes = Object.keys(mapping).map((key) => mapping[key]);
      const newEls = newNodes.concat(newEdges);
      props.setElements((els) => els.concat(newEls));
      setSelectedElements(newEls);
      props.setVisualBell((state) => ({
        message: "Code pasted",
        switch: !state.switch,
      }));
    }
  };

  const undoAction = () => {
    if (flowLocked) {
      flashLockIcon();
      props.setVisualBell((state) => ({
        message: "Flow is locked",
        switch: !state.switch,
      }));
      return;
    }
    if (allowUndo) {
      setSystemAction(true);
      props.setElements(actionStack.stack[actionStack.currentIndex - 1]);
      setActionStack((state) => {
        return { ...state, currentIndex: state.currentIndex - 1 };
      });
    }
  };

  const redoAction = () => {
    if (flowLocked) {
      flashLockIcon();
      props.setVisualBell((state) => ({
        message: "Flow is locked",
        switch: !state.switch,
      }));
      return;
    }
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
    props.setVisualBell((state) => ({
      message: "Code saved",
      switch: !state.switch,
    }));
  };

  const restoreFlow = () => {
    if (flowLocked) {
      flashLockIcon();
      props.setVisualBell((state) => ({
        message: "Flow is locked",
        switch: !state.switch,
      }));
      return;
    }
    const savedEls = JSON.parse(window.localStorage.getItem("flow_save"));
    if (savedEls) {
      const restoredEls = savedEls.map((el) => {
        if (isNode(el)) {
          const idNum = parseInt(el.id.split("_")[1]);
          if (idNum && idNum >= id) {
            id = idNum + 1;
          }
          return {
            ...el,
            data: {
              ...el.data,
              callBack: (newValues) => {
                props.setElements((els) =>
                  els.map((thisEl) => {
                    if (thisEl.id === el.id) {
                      thisEl.data = {
                        ...thisEl.data,
                        values: newValues,
                      };
                    }
                    return thisEl;
                  })
                );
              },
            },
          };
        } else {
          return el;
        }
      });
      props.setElements(restoredEls);
      setCenter(0, 0, 1.25);
    }
  };

  const lockHandler = () => {
    setFlowLocked((state) => !state);
  };

  const fitView = () => {
    reactFlowInstance.fitView();
  };

  const clearAll = () => {
    props.setElements(initialElements);
  };

  const selectAll = () => {
    setSelectedElements(props.elements);
  };

  const capture = () => {
    html2canvas(document.querySelector(".react-flow__renderer")).then(
      (canvas) => {
        saveAs(canvas.toDataURL(), "my-flow-code.png");
      }
    );
  };

  const keyDownHandler = (event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "c") {
        event.preventDefault();
        copySelection();
      } else if (event.key === "v") {
        event.preventDefault();
        pasteSelection();
      } else if (event.key === "z") {
        event.preventDefault();
        undoAction();
      } else if (event.key === "y") {
        event.preventDefault();
        redoAction();
      } else if (event.key === "s") {
        event.preventDefault();
        saveFlow();
      } else if (event.key === "r") {
        event.preventDefault();
        restoreFlow();
      } else if (event.key === "=") {
        event.preventDefault();
        zoomIn();
      } else if (event.key === "-") {
        event.preventDefault();
        zoomOut();
      } else if (event.key === "l") {
        event.preventDefault();
        lockHandler();
      } else if (event.key === "b") {
        event.preventDefault();
        clearAll();
      } else if (event.key === "a") {
        selectAll();
      }
    } else if (event.key === " ") {
      event.preventDefault();
      fitView();
    }
  };

  const edgeUpdateEndHandler = (event, edge) => {
    if (!event.target.classList.contains("react-flow__handle")) {
      props.setElements((els) =>
        removeElements([edge], els).map((el) => {
          if (el.id === edge.target) {
            return removeConnection(el, edge.targetHandle);
          } else if (el.id === edge.source) {
            return removeConnection(el, edge.sourceHandle);
          } else {
            return el;
          }
        })
      );
    }
  };

  const nodeDragStopHandler = (_, node) => {
    console.log(node);
    props.setElements((els) =>
      els.map((el) => (el.id === node.id ? node : el))
    );
  };

  const selectionDragStopHandler = (_, selectionNodes) => {
    props.setElements((els) => {
      return els.map((el) => {
        for (const node of selectionNodes) {
          if (node.id === el.id) {
            return {
              id: el.id,
              type: el.type,
              position: {
                x: getNearestGridPosition(node.position.x),
                y: getNearestGridPosition(node.position.y),
              },
              data: el.data,
            };
          }
        }
        return el;
      });
    });
  };

  const paneClickHandler = (e) => {
    console.log(e);
    setSelectedElements([]);
  };

  const mouseDownHandler = (e) => {
    // console.log(e);
  };

  return (
    <div
      className={`${classes.editorContainer} ${props.show ? "" : "hide"}`}
      onContextMenu={() => console.log("does this work")}
      onKeyDown={keyDownHandler}
      tabIndex={-1}
    >
      <DndBar />
      <div
        className={classes.editorWrapper}
        onMouseDown={mouseDownHandler}
        ref={wrapperRef}
      >
        <ReactFlow
          onLoad={onLoad}
          elements={props.elements}
          elementsSelectable={!flowLocked}
          nodesConnectable={!flowLocked}
          nodesDraggable={!flowLocked}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          minZoom={0.25}
          snapToGrid={true}
          snapGrid={[16, 16]}
          arrowHeadColor="#ffffff"
          // deleteKeyCode={["Backspace", "Delete"]}
          multiSelectionKeyCode={"Control"}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          onElementsRemove={onElementsRemove}
          onNodeDragStop={nodeDragStopHandler}
          onEdgeUpdateEnd={edgeUpdateEndHandler}
          onSelectionChange={selectChangeHandler}
          onSelectionDragStop={selectionDragStopHandler}
          onPaneClick={paneClickHandler}
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
            clearAll={clearAll}
            selectAll={selectAll}
            capture={capture}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        {miniHoverCtx.activeNode && (
          <div className={classes.hoverBg}>
            {miniHoverCtx.activeNode.block}
            <span>{tooltips[miniHoverCtx.activeNode.nodeType]}</span>
          </div>
        )}
        {props.visualBell.message && (
          <div className={classes.visualBell}>{props.visualBell.message}</div>
        )}
      </div>
    </div>
  );
};

export default memo(FlowEditor);
