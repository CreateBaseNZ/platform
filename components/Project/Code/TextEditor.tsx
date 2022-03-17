import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { editor } from "monaco-editor";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";

import classes from "./TextEditor.module.scss";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import { useRouter } from "next/router";
import { TCodeFile } from "../../../types/code";
import CodeContext from "../../../store/code-context";

const EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
	automaticLayout: true,
	formatOnPaste: true,
	fontFamily: "Roboto Mono, mono",
	lineDecorationsWidth: 0,
	glyphMargin: false,
	lineNumbersMinChars: 3,
};

const DEFAULT_FILENAME = "Untitled";

interface Props {
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
	subsystem: string;
	projectId: string;
}

const TextEditor = ({ subsystem, projectId, run, stop, restart, unlink }: Props): JSX.Element => {
	const router = useRouter();
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const { activeFileId, setActiveFileId, files, setFiles } = useContext(CodeContext);
	const [activeFile, setActiveFile] = useState<TCodeFile>();

	const runHandler = () => editorRef.current && run(editorRef.current?.getValue());

	useEffect(() => {
		const _activeFile = files.find((f) => f.id === activeFileId);
		setActiveFile(_activeFile);
		editorRef.current?.setValue(_activeFile?.code || `// Let's start coding!`);
		editorRef.current?.focus();
	}, [activeFileId, files]);

	const buttonConfig = [
		{
			title: "Run",
			icon: "play_arrow",
			func: runHandler,
		},
		{
			title: "Stop",
			icon: "stop",
			func: stop,
		},
		{
			title: "Restart",
			icon: "replay",
			func: () => {
				console.log(editorRef.current?.getValue());
				editorRef.current && run(editorRef.current?.getValue());
			},
		},
		{
			title: "Unlink",
			icon: "link_off",
			func: () => {
				console.log(editorRef.current?.getValue());
				editorRef.current && run(editorRef.current?.getValue());
			},
		},
	];

	// useEffect(() => {
	// 	if (monacoRef.current) {
	// 		monacoRef.current.editor.setTheme(props.theme);
	// 	}
	// }, [props.theme]);

	const editorDidMount: OnMount = (editor, monaco) => {
		editor.addAction({
			id: "save",
			label: "Save",
			keybindings: [monaco.KeyMod.CtrlCmd | (monaco.KeyCode as any).KEY_S], // type coercion due to error in package
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 1,
			run: async () => {
				editor.getAction("editor.action.formatDocument").run();
				let newState: TCodeFile[] = [];
				setFiles((state) => {
					const ind = state.findIndex((f) => f.id === activeFileId);
					if (ind > -1) {
						newState = [...state];
						newState[ind] = { ...state[ind], code: editor.getValue(), lastModified: new Date() };
					} else {
						const newFile: TCodeFile = { id: uuidv4(), name: DEFAULT_FILENAME, lang: "js", code: editor.getValue(), lastModified: new Date(), created: new Date() };
						newState = [...state, newFile]; // TODO - @louis default lang
						setActiveFileId(newFile.id);
					}
					return newState;
				});
				post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [`${projectId}__${subsystem}`]: newState }, date: new Date().toString() });
			},
		});
		editor.addAction({
			id: "run",
			label: "Run",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F5],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 2,
			run: runHandler,
		});
		editor.addAction({
			id: "stop",
			label: "Stop",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | (monaco.KeyCode as any).KEY_C], // type coercion due to error in package
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 3,
			run: () => {
				run(editor.getValue());
			},
		});
		editor.addAction({
			id: "restart",
			label: "Restart",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.F5],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 4,
			run: function (ed) {
				alert("i'm running => " + ed.getPosition());
			},
		});

		editorRef.current = editor;
		monacoRef.current = monaco;
		// for (const t in themeFiles) {
		// 	monacoRef.current.editor.defineTheme(t, themeFiles[t]);
		// }
		// monacoRef.current.editor.setTheme(props.theme);
	};

	return (
		<div className={classes.textEditor}>
			<div className={classes.header}>
				<div className={classes.filename}>
					<div className={classes.fileIcon}>
						<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/js.svg`} alt="js" />
					</div>
					{activeFile?.name || "Untitled"}
				</div>
				<div className={classes.btnContainer}>
					{buttonConfig.map((conf) => (
						<button key={conf.title} className={classes[conf.title.toLowerCase()]} onClick={conf.func} title={conf.title}>
							<i className="material-icons-outlined">{conf.icon}</i>
							{conf.title}
						</button>
					))}
					<button className={classes.more} title="More">
						<i className="material-icons-outlined">more_vert</i>
					</button>
				</div>
			</div>
			<div className={classes.wrapper}>
				<Editor language="javascript" onMount={editorDidMount} options={EDITOR_OPTIONS} />
			</div>
		</div>
	);
};

export default TextEditor;
