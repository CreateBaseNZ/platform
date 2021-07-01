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
  Controls,
  ControlButton,
  Background,
  getOutgoers,
} from "react-flow-renderer";
import {
  initialData,
  initialElements,
  nodeTypes,
  edgeTypes,
} from "../../utils/flowConfig";

import DndBar from "/components/ReactFlow/DndBar";
import { CustomConnectionLine } from "./CustomEdge";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import classes from "./FlowEditor.module.scss";

let id = 0;
const getId = () => `dndnode_${id++}`;

const controlTitles = ["Zoom-in", "Zoom-out", "Fit-view", "Lock", "Info"];

const FlowEditor = (props) => {
  const wrapperRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [data, setData] = useState(initialData);

  useImperativeHandle(props.forwardedRef, () => ({
    getBlockConfig: () => {
      let blocksConfig = [];
      let currentNode = elements[0];
      let traverse = true;
      while (traverse) {
        let block = {
          robot: "Arm",
          value: { ...data[currentNode.id] },
          type: currentNode.type,
        };
        switch (currentNode.type) {
          case "move":
            block = {
              ...block,
              name: "MoveArm",
            };
            break;
          case "gravity":
            block = {
              ...block,
              name: "GravitySwitch",
            };
            block.type = "move";
            break;
          default:
            break;
        }
        blocksConfig.push(block);
        const nextNode = getOutgoers(currentNode, elements);
        if (nextNode.length > 1) {
          return "multiple_tracks";
        } else if (nextNode[0]) {
          currentNode = nextNode[0];
        } else {
          traverse = false;
          break;
        }
      }
      if (blocksConfig[blocksConfig.length - 1].type !== "end") {
        return "disconnected";
      }
      return blocksConfig;
    },
  }));

  const onElementsRemove = useCallback((elementsToRemove) => {
    const filteredElements = elementsToRemove.filter(
      (el) => el.id !== "start" && el.id !== "end"
    );
    setElements((els) => removeElements(filteredElements, els));
  }, []);

  const onElementClick = useCallback((event, element) => {
    // if (isNode(element)) {
    //   console.log("this is a node");
    // }
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

    const controls = document.querySelector(".react_flow_controls").children;
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

    const reactFlowBounds = wrapperRef.current.getBoundingClientRect();
    const [type, x, y] = event.dataTransfer
      .getData("application/reactflow")
      .split("-");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left - parseFloat(x),
      y: event.clientY - reactFlowBounds.top - parseFloat(y),
    });
    const id = getId();
    let defaultValues = null;
    if (type === "gravity") {
      defaultValues = { isOn: true };
    } else if (type === "move") {
      defaultValues = { x: 0, y: 0, z: 0 };
    }
    setData((data) => ({
      ...data,
      [id]: { ...defaultValues },
    }));
    const newNode = {
      id: id,
      type,
      position,
      data: {
        default: defaultValues,
        callBack: (newValues) => {
          setData((state) => ({ ...state, [id]: { ...newValues } }));
        },
      },
    };
    setElements((es) => es.concat(newNode));
  };

  const interactiveChangeHandler = () => {
    const lock = document.querySelector(".react_flow_controls").children[3];
    if (lock.title === "Lock") {
      lock.title = "Unlock";
      lock.classList.add(classes.locked);
    } else {
      lock.title = "Lock";
      lock.classList.remove(classes.locked);
    }
  };

  const onEdgeUpdateStart = (event, edge) => {
    console.log(event);
    console.log(edge);
  };

  const onEdgeMouseLeave = (event, edge) => {
    console.log(event);
    console.log(edge);
  };

  return (
    <div className={classes.editorContainer}>
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
            deleteKeyCode={46}
          >
            <Controls
              className={`${classes.controls} react_flow_controls`}
              onInteractiveChange={interactiveChangeHandler}
            >
              <ControlButton
                className={classes.customControl}
                onClick={() => console.log("another action")}
              >
                <InfoOutlinedIcon />
              </ControlButton>
            </Controls>
            <Background id="set-bg" olor="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowEditor;
