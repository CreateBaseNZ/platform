import { useRef, useContext, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import {
  getOutgoers,
  getConnectedEdges,
  getIncomers,
} from "react-flow-renderer";
import { initialElements } from "../utils/flowConfig";
import Console from "./Console";
import ConsoleContext from "../store/console-context";
import { ReactFlowProvider } from "react-flow-renderer";
import GreenButton from "./UI/GreenButton";

import { CodeGenerator } from "../utils/codeGenerator.ts";
import classes from "./Workspace.module.scss";

let com;

const findNextNode = (currentNode, path, elements) => {
  const nodes = [currentNode];
  let nodeCollection = getConnectedEdges(nodes, elements);
  let nextNodeList = getOutgoers(currentNode, elements);
  let nextNodeID;
  for (let i = 0; i < nodeCollection.length; i++) {
    if (currentNode.id == nodeCollection[i].source) {
      if (nodeCollection[i].sourceHandle == String(path)) {
        if (
          nodeCollection[i].targetHandle &&
          nodeCollection[i].targetHandle.split("_")[0] == "execution"
        ) {
          nextNodeID = nodeCollection[i].target;
          break;
        } else {
          return [false, "Wrong Connection"];
        }
      }
    }
  }
  for (let i = 0; i < nextNodeList.length; i++) {
    if (nextNodeID == nextNodeList[i].id) {
      return [true, nextNodeList[i]];
    }
  }

  return [true, false];
};

const determineType = (block, currentNode) => {
  switch (currentNode.type) {
    case "if":
    case "intialise":
    case "compare":
    case "while":
    case "for":
    case "num":
    case "repeat":
    case "operatorGeneral":
      block.name = currentNode.type;
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
    case "greaterThan":
    case "lessThan":
    case "equals":
    case "notEquals":
    case "and":
    case "or":
      block.type = "operatorGeneral";
      block.name = currentNode.type;
      break;
    case "heightOf":
    case "widthOf":
    case "elevationOf":
    case "speedOf":
    case "distance":
      block.type = "sense";
      block.name = currentNode.type;
      break;
    case "start":
    case "end":
      break;
    case "jump":
    case "crouch":
    case "attack":
    case "crouch":
    case "doubleJump":
      block.type = "move";
      block.name = currentNode.type;
      break;
    default:
      block.type = "specific";
      block.name = currentNode.type;
      break;
  }
  return block;
};

const findInputs = (blocksOrder, currentNode, elements, val, level = 0) => {
  const nodes = [currentNode];
  let edgeCollection = getConnectedEdges(nodes, elements);
  let prevNodeList = getIncomers(currentNode, elements);
  let IDlist = [];
  let inputs = [];
  if (level != 0) {
    let outName = null;
    let executionBlock = false;
    for (let i = 0; i < edgeCollection.length; i++) {
      if (currentNode.id == edgeCollection[i].source) {
        if (
          edgeCollection[i].sourceHandle &&
          edgeCollection[i].sourceHandle.split("_")[0] == "execution"
        ) {
          executionBlock = true;
        } else if (
          edgeCollection[i].sourceHandle &&
          edgeCollection[i].sourceHandle.split("_")[0] == "execution"
        ) {
          outName = blocksOrder[i].value[edgeCollection[i].sourceHandle];
        }
        if (executionBlock == true && outName) {
          break;
        }
      }
    }
    if (executionBlock) {
      for (let i = 0; i < blocksOrder.length; i++) {
        if (blocksOrder[i].id == currentNode.id) {
          return [blocksOrder, val, outName];
        }
      }
      return [null, null, null];
    }
  }
  for (let i = 0; i < edgeCollection.length; i++) {
    if (currentNode.id == edgeCollection[i].target) {
      if (
        edgeCollection[i].targetHandle &&
        edgeCollection[i].targetHandle.split("_")[0] != "execution"
      ) {
        const inputName = edgeCollection[i].targetHandle.split("__")[1];
        inputs.push(inputName);
        for (let j = 0; j < prevNodeList.length; j++) {
          if (edgeCollection[i].source == prevNodeList[j].id) {
            IDlist.push(prevNodeList[j]);
            break;
          }
        }
      }
    }
  }
  if (IDlist.length != inputs.length) {
    console.log("gg", currentNode);
  }
  let block = {
    robot: "Player",
    id: currentNode.id,
    type: currentNode.type,
  };
  if (currentNode.data != undefined) {
    block.value = { ...currentNode.data.values };
  }
  block = determineType(block, currentNode);
  let output;
  for (let i = 0; i < IDlist.length; i++) {
    [blocksOrder, val, output] = findInputs(
      blocksOrder,
      IDlist[i],
      elements,
      val,
      1
    );
    if (blocksOrder || val || output) {
      block.value[inputs[i]] = output;
    } else {
      return [null, null, null];
    }
  }
  let edgeNum;
  for (let i = 0; i < edgeCollection.length; i++) {
    if (currentNode.id == edgeCollection[i].source) {
      if (
        edgeCollection[i].sourceHandle &&
        edgeCollection[i].sourceHandle.split("_")[0] != "execution"
      ) {
        edgeNum = i;
        break;
      }
    }
  }
  let outName = false;
  switch (currentNode.type) {
    default:
      if (edgeNum || edgeNum == 0) {
        let NextOut = edgeCollection[edgeNum].sourceHandle.split("__")[1];
        if (NextOut) {
          outName = "out_" + String(val);
          val++;
        }
        block.value[NextOut] = outName;
      }
      blocksOrder.push(block);
      break;
  }
  return [blocksOrder, val, outName];
};

const flow2Text = (elements) => {
  let blocksConfig = [];
  let currentNode = elements[0];
  let traverse = true;
  let val = 0;
  let path = [];
  let maxPath = [];
  let nodeContext = [];
  while (traverse) {
    if (currentNode) {
      let f;
      [blocksConfig, val, f] = findInputs(
        blocksConfig,
        currentNode,
        elements,
        val
      );
      if (!(blocksConfig || val || f)) {
        return "Wrong execution order";
      }
    }
    let nextNode;
    let executionNext;
    switch (currentNode.type) {
      case "if":
        maxPath.push(2);
        path.push(0);
        nodeContext.push(currentNode);
        executionNext = "execution__" + String(path[path.length - 1]);
        break;
      case "while":
      case "repeat":
        maxPath.push(1);
        path.push(0);
        nodeContext.push(currentNode);
        executionNext = "execution__" + String(path[path.length - 1]);
        break;
      case undefined:
        let block = blocksConfig.pop();
        if (block.type != "else-condition") {
          blocksConfig.push(block);
        }
        break;
      default:
        executionNext = "execution";
        break;
    }
    if (executionNext) {
      let state;
      [state, nextNode] = findNextNode(currentNode, executionNext, elements);
      if (!state) {
        console.log("lol");
        return nextNode;
      }
    }
    if (nextNode) {
      currentNode = nextNode;
    } else {
      if (path.length == 0) {
        traverse = false;
        break;
      } else {
        currentNode = nodeContext[path.length - 1];
        path[path.length - 1]++;
        let executionNext = "execution__" + String(path[path.length - 1]);
        let state;
        [state, nextNode] = findNextNode(currentNode, executionNext, elements);
        if (!state) {
          console.log("gg");
          return nextNode;
        }
        let interBlock;
        if (path[path.length - 1] == maxPath[path.length - 1]) {
          path.pop();
          maxPath.pop();
          nodeContext.pop();
          interBlock = {
            type: "end-condition",
            name: "end-condition",
          };
        } else {
          switch (currentNode.type) {
            case "if":
              if (path[path.length - 1] == 1) {
                interBlock = {
                  type: "else-condition",
                  name: "else-condition",
                };
              }
              break;
            default:
              break;
          }
        }
        blocksConfig.push(interBlock);
        currentNode = nextNode;
      }
    }
  }

  const endNode = {
    robot: "Player",
    type: "end",
  };
  blocksConfig.push(endNode);

  return blocksConfig;
};

const TabBar = dynamic(() => import("./TabBar"), {
  ssr: false,
});

const FlowEditor = dynamic(() => import("./ReactFlow/FlowEditor"), {
  ssr: false,
});

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");
  const [elements, setElements] = useState(initialElements);
  const [text, setText] = useState("// Let's code! 💡");
  const [allowCompile, setAllowCompile] = useState(false);

  const ctx = useContext(ConsoleContext);
  const sensorDataRef = useRef(props.sensorData);

  sensorDataRef.current = props.sensorData;

  useEffect(() => {
    setAllowCompile(true);
  }, [props.elements]);

  const compileCode = () => {
    const blocks = flow2Text(elements);
    if (Array.isArray(blocks)) {
      const codeGen = new CodeGenerator();
      const [newText, type, message] = codeGen.build(blocks);
      if (type === "warning") {
        ctx.addWarning(message);
      } else if (type === "error") {
        ctx.addError(message);
      }
      return newText;
    } else {
      ctx.addError(blocks);
      return;
    }
  };

  const changeTabHandler = (tab) => {
    if (activeTab === "flow" && tab === "text") {
      const newText = compileCode();
      if (newText) {
        setText(newText);
      }
    }
    setActiveTab(tab);
  };

  const executeCode = (text) => {
    const sensorData = sensorDataRef.current;
    const unityContext = props.unityContext;
    eval(text);
  };

  const compileHandler = () => {
    clearInterval(com);
    com = 0;
    const code = compileCode();
    com = setInterval(() => {
      executeCode(code);
    }, 10);
    setAllowCompile(false);
  };

  return (
    <div className={classes.workspace}>
      {activeTab === "flow" && (
        <GreenButton
          className={`${classes.compileBtn} ${
            allowCompile && classes.newChanges
          } terminate-code`}
          clickHandler={compileHandler}
          caption="Compile"
        />
      )}
      <ReactFlowProvider>
        <FlowEditor
          show={activeTab === "flow"}
          elements={elements}
          setElements={setElements}
        />
      </ReactFlowProvider>
      <TextEditor show={activeTab === "text"} text={text} />
      <Console show={activeTab === "console"} />
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default Workspace;
