import { Dispatch, memo, SetStateAction, useContext, useEffect, useRef } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { editor } from "monaco-editor";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import CodeContext from "../../../store/code-context";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import { TCodeFile } from "../../../types/code";

import classes from "./TextEditor.module.scss";
import { TOpenTextFile } from "./Editor";

const getLang = (lang: string) => {
	switch (lang) {
		case "js":
			return "javascript";
		default:
			return "javascript";
	}
};

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
	openTextFiles: TOpenTextFile[];
	setOpenTextFiles: Dispatch<SetStateAction<TOpenTextFile[]>>;
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const TextEditor = ({ subsystem, projectId, openTextFiles, setOpenTextFiles, run, stop, restart, unlink }: Props): JSX.Element => {
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const { activeFile, setActiveFile, files, setFiles } = useContext(CodeContext);

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

	useEffect(() => {
		setOpenTextFiles((files) => {
			const newState = files.some((f) => f.id === activeFile.id) ? files : [...files, { id: activeFile.id, name: activeFile.name, lang: activeFile.lang, lastSavedVersion: 1, isDirty: false }];
			post("/api/profile/update-saves", {
				profileId: globalSession.profileId,
				update: { [`${projectId}-${subsystem}__workspace`]: { openTextFileIds: newState.map((f) => f.id), activeFileId: activeFile.id } },
				date: new Date().toString(),
			});
			return newState;
		});
	}, [activeFile, setOpenTextFiles, globalSession.profileId, projectId, subsystem, post]);

	const changeHandler = () => {
		const _lastSavedVersion = editorRef.current?.getModel()?.getAlternativeVersionId();
		const _fileId = editorRef.current?.getModel()?.uri.path.slice(1);
		setOpenTextFiles((files) => files.map((f) => (f.id === _fileId ? { ...f, isDirty: f.lastSavedVersion !== _lastSavedVersion } : f)));
	};

	const editorDidMount: OnMount = (editor, monaco) => {
		editor.addAction({
			id: "save",
			label: "Save",
			keybindings: [monaco.KeyMod.CtrlCmd | (monaco.KeyCode as any).KEY_S], // type coercion due to error in package
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 1,
			run: () => {
				const activeFileId = editor.getModel()?.uri.path.slice(1);
				editor.getAction("editor.action.formatDocument").run();
				setFiles((state) => {
					const newState = state.map((f) => (f.id === activeFileId ? { ...f, code: editor.getValue(), lastModified: new Date() } : f));
					post(
						"/api/profile/update-saves",
						{
							profileId: globalSession.profileId,
							update: { [`${projectId}-${subsystem}__files`]: newState },
							date: new Date().toString(),
						},
						() => {
							setOpenTextFiles((files) => files.map((f) => (f.id === activeFileId ? { ...f, lastSavedVersion: editor.getModel()?.getAlternativeVersionId(), isDirty: false } : f)));
						}
					);
					return newState;
				});
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
				{openTextFiles.map((f) => (
					<button
						key={f.id}
						className={`${classes.filename} ${activeFile.id === f.id && classes.active}`}
						title={f.name + "." + f.lang}
						onClick={() => setActiveFile(files.find((_f) => _f.id === f.id) as TCodeFile)}>
						<div className={classes.fileIcon}>
							{f.isDirty ? (
								<i className={classes.unsavedIndicator} />
							) : (
								<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${f.lang}.svg`} alt="js" />
							)}
						</div>
						{f.name}
					</button>
				))}
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
			<div className={classes.wrapper}>
				<Editor
					onMount={editorDidMount}
					onChange={changeHandler}
					options={EDITOR_OPTIONS}
					path={activeFile.id}
					defaultLanguage={getLang(activeFile.lang)}
					defaultValue={activeFile.code}
					saveViewState={true}
				/>
			</div>
		</div>
	);
};

export default memo(TextEditor);
