import { useEffect, useRef } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";

import classes from "./TextEditor.module.scss";
import { editor } from "monaco-editor";

const EDITOR_OPTIONS = {
	automaticLayout: true,
	formatOnPaste: true,
	fontFamily: "Roboto Mono, mono",
	lineDecorationsWidth: 0,
};

interface Props {
	run: (code: string) => void;
}

const TextEditor = ({ run }: Props): JSX.Element => {
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const runHandler = () => {
		editorRef.current && run(editorRef.current?.getValue());
	};

	// useEffect(() => {
	// 	if (ref.current) {
	// 		ref.current.updateOptions({ readOnly: false });
	// 		ref.current
	// 			.getAction("editor.action.formatDocument")
	// 			.run()
	// 			.then(() => ref.current.updateOptions({ readOnly: false }));
	// 	}
	// }, [props.text]);

	// useEffect(() => {
	// 	if (monacoRef.current) {
	// 		monacoRef.current.editor.setTheme(props.theme);
	// 	}
	// }, [props.theme]);

	const editorDidMount: OnMount = (editor, monaco) => {
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
				<button onClick={runHandler}>Yo click me</button>
			</div>
			<div className={classes.wrapper}>
				<Editor language="javascript" onMount={editorDidMount} options={EDITOR_OPTIONS} />
			</div>
		</div>
	);
};

export default TextEditor;
