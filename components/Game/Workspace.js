import { useRef, useContext, useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import TextEditor from "./TextEditor";
import { initialElements } from "../../utils/flowConfig";
import Console from "./Console";
import ConsoleContext from "../../store/console-context";
import { ReactFlowProvider } from "react-flow-renderer";
import { MiniHoverContextProvider } from "../../store/mini-hover-context";
import Config from "./Config";
import GreenButton from "../UI/GreenButton";
import { CodeGenerator } from "../../utils/codeGenerator.ts";
import classes from "./Workspace.module.scss";
import { flow2Text, isOnceCode, defineObject, findStartingCode } from "../../utils/blockExtractionHelpers";
import { convertCode } from "../../utils/textConvertor";
let codeChanged = false;

let codesDone = 0;
let m = {};

const TabBar = dynamic(() => import("./TabBar"), {
	ssr: false,
});

const FlowEditor = dynamic(() => import("../ReactFlow/FlowEditor"), {
	ssr: false,
});

const Workspace = ({ sensorData, query, _unityContext, saveName, blockList, stacked, textCodingOnly }) => {
	const editorRef = useRef();
	const sensorDataRef = useRef();
	const [activeTab, setActiveTab] = useState(textCodingOnly ? "text" : "flow");
	const [elements, setElements] = useState(initialElements);
	const [text, setText] = useState("// Let's code! 💡");
	const [theme, setTheme] = useState(null);
	const consoleCtx = useContext(ConsoleContext);

	sensorDataRef.current = sensorData;

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
			const onceCode = isOnceCode(query);
			const [newText, dispCode] = compileCode(onceCode);
			if (newText) {
				setText(dispCode);
			}
		}
	}, [activeTab]);

	const compileCode = (onceCode) => {
		// Convert the flow arrangement to a configuration of blocks
		const [blocks, type, message] = flow2Text(elements, query);
		if (type && type === "warning" && activeTab == "flow") {
			consoleCtx.addWarning(message);
		}
		if (Array.isArray(blocks)) {
			const codeGen = new CodeGenerator();
			const [newText, type, message, dispCode] = codeGen.build(blocks, onceCode);
			if (type === "warning") {
				consoleCtx.addWarning(message);
			} else if (type === "error") {
				consoleCtx.addError(message);
			}
			return [newText, dispCode];
		} else {
			consoleCtx.addError(blocks);
			const message = "// Oops! An error occurred, please check the Console for more info";
			return [message, message];
		}
	};

	const changeTabHandler = (tab) => setActiveTab(tab);

	const executeCode = (text, printing = 0) => {
		return new Promise((resolve, reject) => {
			const sensorData = sensorDataRef.current;
			const unityContext = _unityContext;
			eval("(async ()=>{" + text + "})()").catch((error) => {
				consoleCtx.addError(error.message);
				resolve(false);
			});
			if (codeChanged) resolve(true);
		});
	};

	let delay = (time) => {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		});
	};

	const compileHandlerTxt = async () => {
		const onceCode = isOnceCode(query);
		let t = editorRef.current.getValue();
		const systemName = defineObject(query);
		let code = convertCode(t, systemName, onceCode);
		runCode(code, onceCode);
	};

	const runCode = async (code, onceCode) => {
		let com;
		codeChanged = true;
		m = {};

		code += "\nresolve(true);";
		let functionExecute = async () => {
			printing++;
			const isRun = await executeCode(code, printing);
			if (printing >= 10) {
				printing = 0;
			}
			if (!isRun || onceCode) {
				codesDone = -1;
			} else if (codeChanged) {
				com = 0;
				codeChanged = false;
			} else {
				com = setTimeout(functionExecute, 5);
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
		const startingCode = async () => {
			const startCode = findStartingCode(query);
			const isRun = await executeCode(startCode);
		};
		await startingCode();
		functionExecute();
		codesDone++;
	};

	const compileHandler = () => {
		const onceCode = isOnceCode(query);
		let [code, dispCode] = compileCode(onceCode);
		runCode(code, onceCode);
	};

	return (
		<div className={classes.workspace}>
			{activeTab === "flow" && <GreenButton className={classes.compileBtn} clickHandler={compileHandler} caption="Compile" />}
			{activeTab === "text" && <GreenButton className={classes.compileTextBtn} clickHandler={compileHandlerTxt} caption="Compile" />}
			<MiniHoverContextProvider>
				<ReactFlowProvider>
					<FlowEditor saveName={saveName} blockList={blockList} show={activeTab === "flow"} elements={elements} setElements={setElements} />
				</ReactFlowProvider>
			</MiniHoverContextProvider>
			{theme && <TextEditor theme={theme} setTheme={setTheme} show={activeTab === "text"} text={text} ref={editorRef} />}
			<Console show={activeTab === "console"} />
			<Config show={activeTab === "config"} theme={theme} setTheme={setTheme} />
			<TabBar stacked={stacked} textCodingOnly={textCodingOnly} active={activeTab} onChange={changeTabHandler} />
		</div>
	);
};

export default memo(Workspace);
