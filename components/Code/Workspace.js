import { useRef, useContext, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import {
  getOutgoers,
  getConnectedEdges,
  getIncomers,
} from "react-flow-renderer";
import { initialElements } from "../../utils/flowConfig";
import Console from "./Console";
import ConsoleContext from "../../store/console-context";
import { ReactFlowProvider } from "react-flow-renderer";
import GreenButton from "../UI/GreenButton";

import { CodeGenerator } from "../../utils/codeGenerator.ts";
import classes from "./Workspace.module.scss";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import Config from "./Config";

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

const findInputs = (
  blocksOrder,
  currentNode,
  elements,
  val,
  robotName,
  level = 0
) => {
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
        const splitName = edgeCollection[i].targetHandle.split("__");
        const inputName = splitName[splitName.length - 1];
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
    robot: robotName,
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
      robotName,
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
        edgeCollection[i].sourceHandle.split("__")[0] != "execution"
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
        const splitArray = edgeCollection[edgeNum].sourceHandle.split("__");
        let NextOut = splitArray[splitArray.length - 1];
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

const flow2Text = (elements, projectName) => {
  let blocksConfig = [];
  let currentNode = elements[0];
  let traverse = true;
  let val = 0;
  let path = [];
  let maxPath = [];
  let nodeContext = [];
  const robotName = defineObject(projectName);
  if (robotName == "") {
    console.log("G");
    return "Robot doesn't Exist";
  }
  while (traverse) {
    if (currentNode) {
      if (!CheckPreviuos(currentNode, elements)) {
        return ["One Node has more than one input", null, null];
      }
      let f, message;
      [blocksConfig, val, f, message] = findInputs(
        blocksConfig,
        currentNode,
        elements,
        val,
        robotName
      );
      if (!(blocksConfig || val || f)) {
        return [message, null, null];
      }
    }
    let nextNode;
    let executionNext = "execution__out";
    switch (currentNode.type) {
      case "if":
        maxPath.push(2);
        path.push(0);
        nodeContext.push(currentNode);
        executionNext += "__" + String(path[path.length - 1]);
        break;
      case "while":
      case "repeat":
        maxPath.push(1);
        path.push(0);
        nodeContext.push(currentNode);
        executionNext += "__" + String(path[path.length - 1]);
        break;
      case undefined:
        let block = blocksConfig.pop();
        if (block.type != "else-condition") {
          blocksConfig.push(block);
        }
        executionNext = undefined;
        break;
    }
    if (executionNext) {
      let state;
      [state, nextNode] = findNextNode(currentNode, executionNext, elements);
      if (!state) {
        return [nextNode, null, null];
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
        let executionNext = "execution__out__" + String(path[path.length - 1]);
        let state;
        [state, nextNode] = findNextNode(currentNode, executionNext, elements);
        if (!state) {
          return [nextNode, null, null];
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
    robot: robotName,
    type: "end",
  };
  blocksConfig.push(endNode);

  if (blocksConfig.length == 2) {
    return [
      blocksConfig,
      "warning",
      "You have no blocks connected. Nothing interesting will happen.",
    ];
  }
  return [blocksConfig, null, null];
};

let defineObject = (projectName) => {
  switch (projectName) {
    case "send-it":
      return "Player";
    case "magnebot":
      return "Arm";
  }
  return "";
};

let isOnceCode = (projectName) => {
  switch (projectName) {
    case "send-it":
      return false;
    case "magnebot":
      return true;
  }
};

let codeChanged = false;

let codesDone = 0;

const TabBar = dynamic(() => import("./TabBar"), {
  ssr: false,
});

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Workspace = (props) => {
  const [activeTab, setActiveTab] = useState("flow");
  const [elements, setElements] = useState(initialElements);
  const [text, setText] = useState("// Let's code! 💡");
  const [theme, setTheme] = useState(null);
  const [visualBell, setVisualBell] = useState({ message: "", switch: false });

  const ctx = useContext(ConsoleContext);
  const sensorDataRef = useRef();
  const visualBellTimer = useRef(null);

  sensorDataRef.current = props.sensorData;

  useEffect(() => {
    const theme = localStorage.getItem("createbase__monaco-theme");
    console.log(theme);
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("createbase__monaco-theme", "VSDark");
      setTheme("VSDark");
    }
  }, []);

  useEffect(() => {
    if (activeTab === "text") {
      const [newText, dispCode] = compileCode();
      if (newText) {
        setText(newText);
      }
    }
  }, [activeTab]);

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
    const [blocks, type, message] = flow2Text(elements, props.query);
    if (type && type === "warning") {
      ctx.addWarning(message);
    }
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

  const changeTabHandler = (tab) => setActiveTab(tab);

  const executeCode = (text,printing) => {
    return new Promise((resolve, reject) => {
      const sensorData = sensorDataRef.current;
      const unityContext = props.unityContext;
      eval("(async () => {" + text + "})()").catch((e) => {
        resolve("");
      });
      if (codeChanged) {
        resolve("");
      }
    });
  };

  let delay = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  };

  const compileHandler = async () => {
    let com;
    codeChanged = true;
    const onceCode = isOnceCode(props.query);
    let [code, dispCode] = compileCode();
    if (!onceCode) {
      code += "\nresolve(' ');";
      let functionExecute = async () => {
        printing++;
        await executeCode(code,printing);
        if (printing >= 10) {
          printing = 0;
        }
        if (codeChanged) {
          com = 0;
          codeChanged = false;
        } else {
          com = setTimeout(functionExecute, 50);
        }
      };
      if (codesDone > 0) {
        while (codeChanged) {
          await delay(10);
        }
      } else {
        codeChanged = false;
      }
      let printing = 0;
      functionExecute();
      codesDone++;
    } else {
      com = 0;
      codesDone++
      eval("(async () => {" + code + "})()").catch((e) => {
        codesDone = -1;
      });
    }
    setVisualBell((state) => ({
      message: "Code is now running",
      switch: !state.switch,
    }));
  };

  return (
    <div className={classes.workspace}>
      {activeTab === "flow" && (
        <GreenButton
          className={classes.compileBtn}
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
            query={props.query}
          />
        </ReactFlowProvider>
      </MiniHoverContextProvider>
      {theme && (
        <TextEditor
          theme={theme}
          setTheme={setTheme}
          show={activeTab === "text"}
          text={text}
        />
      )}
      <Console show={activeTab === "console"} />
      <Config show={activeTab === "config"} theme={theme} setTheme={setTheme} />
      <TabBar
        stacked={props.stacked}
        active={activeTab}
        onChange={changeTabHandler}
      />
    </div>
  );
};

export default memo(Workspace);
