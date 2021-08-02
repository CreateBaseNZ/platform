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
import { MiniHoverContextProvider } from "../store/mini-hover-context";
import Config from "./Config";

let com;

const findNextNode = (currentNode, path, elements) => {
  const nodes = [currentNode];
  let nodeCollection = getConnectedEdges(nodes, elements);
  let nextNodeList = getOutgoers(currentNode, elements);
  let nextNodeID;
  const reqConnection = nodeCollection.filter((connection) => {
    if (currentNode.id == connection.source) {
      if (connection.sourceHandle == String(path)) {
        return true;
      }
    }
    return false;
  });
  if (reqConnection.length > 1) {
    return [false, "One Block has multiple exectution connection"];
  }
  if (reqConnection.length == 0) {
    return [true, false];
  }
  const Connection = reqConnection[0];
  if (
    Connection.targetHandle &&
    Connection.targetHandle.split("__")[0] == "execution"
  ) {
    nextNodeID = Connection.target;
  } else {
    return [false, "Wrong Connection"];
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
    case "print":
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

const CheckPreviuos = (currentNode, elements) => {
  const nodes = [currentNode];
  let edgeCollection = getConnectedEdges(nodes, elements);
  const prevConnection = edgeCollection.filter((connection) => {
    if (currentNode.id == connection.target) {
      if (connection.targetHandle.split("__")[0] == "execution") {
        return true;
      }
    }
    return false;
  });

  if (prevConnection.length != 1 && currentNode.id != "start") {
    return false;
  }
  return true;
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
      return [null, null, null, "Wrong execution order"];
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
  const unduplicatedArray = [...new Set(inputs)];

  if (unduplicatedArray.length != inputs.length) {
    return [null, null, null, "One of the inputs has more than one entry"];
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
    let message;
    [blocksOrder, val, output, message] = findInputs(
      blocksOrder,
      IDlist[i],
      elements,
      val,
      1
    );
    if (blocksOrder || val || output) {
      block.value[inputs[i]] = output;
    } else {
      return [null, null, null, message];
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
  return [blocksOrder, val, outName, ""];
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
      if (!CheckPreviuos(currentNode, elements)) {
        return "One Node has more than one input";
      }
      let f, message;
      [blocksConfig, val, f, message] = findInputs(
        blocksConfig,
        currentNode,
        elements,
        val
      );
      if (!(blocksConfig || val || f)) {
        return message;
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
        executionNext = "execution__out";
        break;
    }
    if (executionNext) {
      let state;
      [state, nextNode] = findNextNode(currentNode, executionNext, elements);
      if (!state) {
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

let codeChanged = false;
let onceCode = false;
let codesDone = 0;


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
  const [theme, setTheme] = useState(null);
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });

  const ctx = useContext(ConsoleContext);
  const sensorDataRef = useRef(props.sensorData);
  const visualBellTimer = useRef(null);

  sensorDataRef.current = props.sensorData;

  useEffect(() => {
    const theme = localStorage.getItem("monaco-theme");
    if (theme) {
      setTheme(theme);
    } else {
      setTheme("VSDark");
      localStorage.setItem("monaco-theme", "VSDark");
    }
  }, []);

  useEffect(() => {
    setAllowCompile(true);
  }, [elements]);

  useEffect(() => {
    if (visualBell.message) {
      clearTimeout(visualBellTimer.current);
      visualBellTimer.current = setTimeout(
        () => setVisualBell((state) => ({ message: "", switch: state.switch })),
        [5000]
      );
    }
  }, [visualBell.switch]);

  const compileCode = () => {
    const blocks = flow2Text(elements);
    if (Array.isArray(blocks)) {
      const codeGen = new CodeGenerator();
      const [newText, type, message, dispCode] = codeGen.build(blocks);
      if (type === "warning") {
        ctx.addWarning(message);
      } else if (type === "error") {
        ctx.addError(message);
      }
      return [newText, dispCode];
    } else {
      ctx.addError(blocks);
      const meassage =
        "// Oops! An error occurred, please check the Console for more info";
      return [meassage, meassage];
    }
  };

  const changeTabHandler = (tab) => {
    if (activeTab === "flow" && tab === "text") {
      const [newText, dispCode] = compileCode();
      if (newText) {
        setText(newText);
      }
    }
    setActiveTab(tab);
  };

  const executeCode =  (text) => {
    return new Promise((resolve, reject) => {
      const sensorData = sensorDataRef.current;
      const unityContext = props.unityContext;
      eval("(async () => {" + text + "})()");
      if (codeChanged) {
        resolve('');
      }
    })
  };
  
  let delay = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }


  const compileHandler = async () => {
    codeChanged = true;
    let [code, dispCode] = compileCode();
    if (!onceCode) {
      code += "\nresolve(' ');"
      let functionExecute = async () => {
        await executeCode(code);
        if (codeChanged) {
          com = 0;
          codeChanged = false;
        } else {
          com = setTimeout(functionExecute, 10);
        }
      }
      if (codesDone > 0) {
        while (codeChanged) {
          await delay(10);
        }
      } else {
        codeChanged = false;
      }    
      functionExecute();
    } else {
      com = 0;
      if (codesDone > 0) {
        while (codeChanged) {
          await delay(10);
        }
      } else {
        codeChanged = false;
      }
      eval("(async () => {" + code + "})()");
    }
    codesDone++;
    setVisualBell((state) => ({
      message: "Code is now running",
      switch: !state.switch,
    }));
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
      <MiniHoverContextProvider>
        <ReactFlowProvider>
          <FlowEditor
            show={activeTab === "flow"}
            elements={elements}
            setElements={setElements}
            visualBell={visualBell}
            setVisualBell={setVisualBell}
          />
        </ReactFlowProvider>
      </MiniHoverContextProvider>
      <TextEditor show={activeTab === "text"} text={text} />
      <Console
        show={activeTab === "console"}
        theme={theme}
        setTheme={setTheme}
      />
      <Config show={activeTab === "config"} theme={theme} setTheme={setTheme} />
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default Workspace;
