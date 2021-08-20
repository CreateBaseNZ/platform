import { useRef, useContext, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import { initialElements } from "../../utils/flowConfig";
import Console from "./Console";
import ConsoleContext from "../../store/console-context";
import { ReactFlowProvider } from "react-flow-renderer";
import GreenButton from "../UI/GreenButton";

import { CodeGenerator } from "../../utils/codeGenerator.ts";
import classes from "./Workspace.module.scss";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import Config from "./Config";
import { flow2Text ,isOnceCode} from "../../utils/blockExtractionHelpers";
import {convertCode} from "../../utils/textConvertor"
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

  const compileHandlerTxt = () => {
    let codeLines = 0;
    let t =`let x=\`I wentHom;e\nlol\`;Lols();\n Jump();\n for(let i=0;i<5;i++){
      if(i=5){
        x=MoveArm(3,5,6);
      }
      intialiseRobot();
    }`;
    convertCode(t, props.query);
    const onceCode = isOnceCode(props.query);

  }
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
      {activeTab === "text" && (
        <GreenButton
          className={classes.compileTxtBtn}
          clickHandler={compileHandlerTxt}
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
