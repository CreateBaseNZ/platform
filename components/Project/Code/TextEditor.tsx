import { useEffect, useRef } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { editor } from "monaco-editor";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";

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
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const TextEditor = ({ run, stop, restart, unlink }: Props): JSX.Element => {
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const buttonConfig = [
		{
			title: "Run",
			icon: "play_arrow",
			func: () => {
				console.log(editorRef.current?.getValue());
				editorRef.current && run(editorRef.current?.getValue());
			},
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
			// This DOES works but linting raises an error
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 1,
			run: () => {
				editor.getAction("editor.action.formatDocument").run();
			},
		});
		editor.addAction({
			id: "run",
			label: "Run",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F5],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 2,
			run: () => {
				run(editor.getValue());
			},
		});
		editor.addAction({
			id: "stop",
			label: "Stop",
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_C],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 3,
			run: () => {
				run(editor.getValue());
			},
		});
		editor.addAction({
			id: "restart",
			label: "Restart",
			// This DOES works but linting raises an error
			keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.F5],
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 4,
			run: function (ed) {
				alert("i'm running => " + ed.getPosition());
			},
		});

		editor.focus();

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
						<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/js.svg`} alt="javascript" />
					</div>
					loremIpsum.js
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
