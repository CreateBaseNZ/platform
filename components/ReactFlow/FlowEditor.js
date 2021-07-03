import React, {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  updateEdge,
  Background,
  isNode,
  getOutgoers,
} from "react-flow-renderer";
import {
  initialData,
  initialElements,
  nodeTypes,
  edgeTypes,
} from "../../utils/flowConfig";

import DndBar from "./DndBar";
import ControlsBar from "./ControlsBar";
import { CustomConnectionLine } from "./CustomEdge";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const controlTitles = ["Zoom-in", "Zoom-out", "Fit-view", "Lock", "Info"];

const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [data, setData] = useState(initialData);

  // useImperativeHandle(props.forwardedRef, () => ({
  //   getBlockConfig: () => {
  //     let blocksConfig = [];
  //     let currentNode = elements[0];
  //     let traverse = true;
  //     while (traverse) {
  //       let block = {
  //         robot: "Arm",
  //         value: { ...data[currentNode.id] },
  //         type: currentNode.type,
  //       };
  //       switch (currentNode.type) {
  //         case "move":
  //           block = {
  //             ...block,
  //             name: "MoveArm",
  //           };
  //           break;
  //         case "gravity":
  //           block = {
  //             ...block,
  //             name: "GravitySwitch",
  //           };
  //           block.type = "move";
  //           break;
  //         default:
  //           break;
  //       }
  //       blocksConfig.push(block);
  //       const nextNode = getOutgoers(currentNode, elements);
  //       if (nextNode.length > 1) {
  //         return "multiple_tracks";
  //       } else if (nextNode[0]) {
  //         currentNode = nextNode[0];
  //       } else {
  //         traverse = false;
  //         break;
  //       }
  //     }
  //     if (blocksConfig[blocksConfig.length - 1].type !== "end") {
  //       return "disconnected";
  //     }
  //     return blocksConfig;
  //   },
  // }));

  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end"
    );
    setElements((els) => removeElements(filteredElements, els));
  }, []);

  const onElementClick = useCallback((event, element) => {
    if (isNode(element)) {
      console.log(event);
    }
  }, []);

  const onConnect = useCallback((params) => {
    setElements((els) => {
      return addEdge(
        {
          ...params,
          type: "custom",
          animated: true,
          arrowHeadType: "arrowclosed",
        },
        els
      );
    });
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setElements((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const onLoad = useCallback((_reactFlowInstance) => {
    console.log("flow loaded:", _reactFlowInstance);

    _reactFlowInstance.fitView();
    setReactFlowInstance(_reactFlowInstance);

    const controls = document.querySelector("." + classes.controls).children;
    for (let i = 0; i < controls.length; i++) {
      controls[i].title = controlTitles[i];
    }
  }, []);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

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
    } else if (type === "speedOf") {
      defaultValues = { entity: "character" };
    } else if (type === "sizeOf") {
      defaultValues = { entity: "character" };
    }
    setData((data) => ({
      ...data,
      [id]: { ...defaultValues },
    }));

    // add to element state
    const newNode = {
      id: id,
      type,
      position,
      data: {
        id: id,
        values: defaultValues,
        callBack: (newValues) => {
          setData((state) => ({ ...state, [id]: { ...newValues } }));
        },
      },
    };
    setElements((es) => es.concat(newNode));
  };

  return (
    <div
      className={`${classes.editorContainer} ${props.show ? "" : classes.hide}`}
    >
      <ReactFlowProvider>
        <DndBar />
        <div className={classes.editorWrapper} ref={wrapperRef}>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onLoad={onLoad}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            snapToGrid={true}
            snapGrid={[16, 16]}
            connectionLineComponent={CustomConnectionLine}
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
