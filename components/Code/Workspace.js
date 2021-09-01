import { useRef, useContext, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import { initialElements } from "../../utils/flowConfig";
import Console from "./Console";
import ConsoleContext from "../../store/console-context";
import { ReactFlowProvider } from "react-flow-renderer";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import { initialElements } from "../../utils/flowConfig";
import TextEditor from "./TextEditor";
import Console from "./Console";
import Config from "./Config";
import GreenButton from "../UI/GreenButton";
import { CodeGenerator } from "../../utils/codeGenerator.ts";
import { flow2Text, isOnceCode } from "../../utils/blockExtractionHelpers";
import classes from "./Workspace.module.scss";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import Config from "./Config";
import {
  flow2Text,
  isOnceCode,
  defineObject,
} from "../../utils/blockExtractionHelpers";
import { convertCode } from "../../utils/textConvertor";
let codeChanged = false;

let codesDone = 0;

const TabBar = dynamic(() => import("./TabBar"), {
  ssr: false,
});

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
  ssr: false,
});

const Workspace = (props) => {
  const editorRef = useRef();
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
    if (theme) {
      setTheme(theme);
    } else {
      localStorage.setItem("createbase__monaco-theme", "VSDark");
      setTheme("VSDark");
    }
  }, []);

  useEffect(() => {
    if (activeTab === "text") {
      const onceCode = isOnceCode(props.query);
      const [newText, dispCode] = compileCode(onceCode);
      if (newText) {
        setText(dispCode);
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

  const compileCode = (onceCode) => {
    const [blocks, type, message] = flow2Text(elements, props.query);
    if (type && type === "warning"&& activeTab=="flow") {
      ctx.addWarning(message);
    }
    if (Array.isArray(blocks)) {
      const codeGen = new CodeGenerator();
      const [newText, type, message, dispCode] = codeGen.build(
        blocks,
        onceCode
      );
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

  const executeCode = (text, printing) => {
    return new Promise((resolve, reject) => {
      const sensorData = sensorDataRef.current;
      const unityContext = props.unityContext;
      const dispError = (error) => {
        if (error.name) {
          ctx.addError(error.message);
          resolve(false);
        }
        else {
          resolve(true);
        }
      }
      try {
        eval("(async ()=>{" + text + "})()").catch((e)=>dispError(e));
      }
      catch (error) {
        dispError(error);
      }
      
      if (codeChanged) {
        resolve(true);
      }
    });
  };

  let delay = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  };

  const compileHandlerTxt = async() => {
    const onceCode = isOnceCode(props.query);
    let t = editorRef.current.getValue();
    const systemName=defineObject(props.query)
    let code = convertCode(t, systemName, onceCode);
    runCode(code,onceCode);
  }

  const runCode = async (code, onceCode) => {
    let com;
    codeChanged = true;
  
    code += "\nresolve(true);";
    let functionExecute = async () => {
      printing++;
      const isRun = await executeCode(code, printing);
      if (printing >= 10) {
        printing = 0;
      }
      if (!isRun||onceCode) {
        codesDone = -1;
      }
      else if (codeChanged) {
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
    let printing = 10;
    functionExecute();
    codesDone++;
  }


  const compileHandler = () => {
    const onceCode = isOnceCode(props.query);
    let [code, dispCode] = compileCode(onceCode);
    runCode(code,onceCode);
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
          ref={editorRef}
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
