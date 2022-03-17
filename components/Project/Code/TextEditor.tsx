import { memo, useContext, useEffect, useRef, useState } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { editor } from "monaco-editor";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import CodeContext from "../../../store/code-context";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import { TCodeFile } from "../../../types/code";

import classes from "./TextEditor.module.scss";

const EDITOR_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
	automaticLayout: true,
	formatOnPaste: true,
	fontFamily: "Roboto Mono, mono",
	lineDecorationsWidth: 0,
	glyphMargin: false,
	lineNumbersMinChars: 3,
};

interface Props {
	subsystem: string;
	projectId: string;
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const TextEditor = ({ subsystem, projectId, run, stop, restart, unlink }: Props): JSX.Element => {
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const { activeFile, setFiles } = useContext(CodeContext);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

	const runHandler = () => editorRef.current && run(editorRef.current?.getValue());

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
		editor.getModel()?.onDidChangeContent(() => setHasUnsavedChanges(true));

		editor.getModel()?.setValue(activeFile.code);
		setHasUnsavedChanges(false);

		editor.addAction({
			id: "save",
			label: "Save",
			keybindings: [monaco.KeyMod.CtrlCmd | (monaco.KeyCode as any).KEY_S], // type coercion due to error in package
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 1,
			run: () => {
				const activeFileId = editor.getModel()?.uri.path.slice(1);
				console.log("Saving currently active file: " + activeFileId);
				editor.getAction("editor.action.formatDocument").run();
				let newState: TCodeFile[] = [];
				setFiles((state) => {
					console.log(state);
					newState = state.map((f) => (f.id === activeFileId ? { ...f, code: editor.getValue(), lastModified: new Date() } : f));
					return newState;
				});
				console.log(newState);
				post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [`${projectId}__${subsystem}`]: newState }, date: new Date().toString() }, () => setHasUnsavedChanges(false));
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
						{hasUnsavedChanges ? (
							<i className={classes.unsavedIndicator} />
						) : (
							<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/js.svg`} alt="js" />
						)}
					</div>
					{activeFile.name}
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
				<Editor onMount={editorDidMount} options={EDITOR_OPTIONS} path={activeFile.id} defaultLanguage={activeFile.lang} defaultValue={activeFile.code} saveViewState={true} />
			</div>
		</div>
	);
};

export default memo(TextEditor);
