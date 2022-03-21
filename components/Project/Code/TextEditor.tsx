import { memo, MouseEvent, useContext, useRef, useState, WheelEvent } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import Image from "next/image";
import { editor } from "monaco-editor";
import GlobalSessionContext from "../../../store/global-session-context";
import { Restart, Run, Stop, Unlink } from "../../../types/editor";
import { closeFile, saveFile, setActiveFile, TCodeStepState, TOpenTextFile } from "../../../store/reducers/codeStepReducer";

import classes from "./TextEditor.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../../store/reducers/reducer";
import CloseUnsavedModal from "./CloseUnsavedModal";
import { CloseI } from "../../UI/CustomIcon";

const getLang = (lang?: string) => {
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
	projectId: string;
	subsystem: string;
	run: Run;
	stop: Stop;
	restart: Restart;
	unlink: Unlink;
}

const TextEditor = ({ projectId, subsystem, run, stop, restart, unlink }: Props): JSX.Element => {
	const headerRef = useRef<HTMLDivElement>(null);
	const monacoRef = useRef<Monaco>();
	const editorRef = useRef<editor.IStandaloneCodeEditor>();
	const { globalSession } = useContext(GlobalSessionContext);
	const { allFiles, activeFileId, openTextFiles } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();
	const [closingUnsavedId, setClosingUnsavedId] = useState("");

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

	const saveHandler = (callback?: () => any) => {
		editorRef.current?.getAction("editor.action.formatDocument").run();
		dispatch(
			saveFile(
				globalSession.profileId,
				projectId,
				subsystem,
				editorRef.current?.getModel()?.uri.path.slice(1) as string,
				editorRef.current?.getValue() as string,
				editorRef.current?.getModel()?.getAlternativeVersionId() as number,
				callback
			)
		);
	};

	const closeHandler = (fileId: string) => dispatch(closeFile(globalSession.profileId, projectId, subsystem, fileId));

	const checkSaveBeforeCloseHandler = (id: string, e: MouseEvent) => {
		e.stopPropagation();
		if ((openTextFiles.find((f) => f.id === id) as TOpenTextFile).isDirty) {
			setClosingUnsavedId(id);
		} else {
			console.log("close this please");
			closeHandler(id);
		}
	};

	const changeHandler = () =>
		dispatch({ type: "code-step/TEXT_FILE_ONCHANGE", payload: { id: editorRef.current?.getModel()?.uri.path.slice(1), version: editorRef.current?.getModel()?.getAlternativeVersionId() } });

	const editorDidMount: OnMount = (editor, monaco) => {
		editor.addAction({
			id: "save",
			label: "Save",
			keybindings: [monaco.KeyMod.CtrlCmd | (monaco.KeyCode as any).KEY_S], // type coercion due to error in package
			contextMenuGroupId: "2_basic",
			contextMenuOrder: 1,
			run: () => saveHandler(),
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

	const scrollHandler = (e: WheelEvent) =>
		headerRef.current?.scrollBy({
			left: e.deltaY < 0 ? -30 : 30,
		});

	return (
		<div className={classes.textEditor}>
			<div ref={headerRef} className={classes.header} onWheel={scrollHandler}>
				{openTextFiles.map((file) => (
					<button
						key={file.id}
						className={`${classes.filename} ${activeFileId === file.id && classes.active}`}
						title={file.name + "." + file.lang}
						onClick={() => dispatch(setActiveFile(globalSession.profileId, projectId, subsystem, file.id))}>
						<div className={classes.fileIcon}>
							<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${file.lang}.svg`} alt="js" />
						</div>
						{file.name}
						<button className={classes.rightIcon}>
							<i className={classes.unsavedIndicator} title="Unsaved changes" style={{ display: file.isDirty ? "block" : "none" }} />
							<div className={classes.closeIcon} onClick={(e) => checkSaveBeforeCloseHandler(file.id, e)} title="Close" style={{ display: file.isDirty ? "none" : "flex" }}>
								<CloseI height={14} width={14} />
							</div>
						</button>
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
					path={activeFileId || undefined}
					value={allFiles?.[activeFileId].code}
					defaultLanguage={getLang(allFiles?.[activeFileId].lang)}
					defaultValue={allFiles?.[activeFileId].code}
					saveViewState={true}
				/>
				{closingUnsavedId && <CloseUnsavedModal closingUnsavedId={closingUnsavedId} saveHandler={saveHandler} closeHandler={closeHandler} setClosingUnsavedId={setClosingUnsavedId} />}
			</div>
		</div>
	);
};

export default memo(TextEditor);
