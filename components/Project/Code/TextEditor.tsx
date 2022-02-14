import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Image from "next/image";

import classes from "./TextEditor.module.scss";

const EDITOR_OPTIONS = {
	automaticLayout: true,
	formatOnPaste: true,
	fontFamily: "Roboto Mono, mono",
	lineDecorationsWidth: 0,
};

const TextEditor = ({ text }): JSX.Element => {
	const monacoRef = useRef();

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

	const editorDidMount = (editor, monaco) => {
		// ref.current = editor;
		// monacoRef.current = monaco;
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
			</div>
			<div className={classes.wrapper}>
				<Editor language="javascript" value={text} onMount={editorDidMount} options={EDITOR_OPTIONS} />
			</div>
		</div>
	);
};

export default TextEditor;
