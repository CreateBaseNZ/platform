import Image from "next/image";
import { FormEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { deleteFile, renameFile, setActiveFile, TCodeLayout, TCodeStepState, TCodeTab } from "../../../store/reducers/codeStepReducer";
import { TState } from "../../../store/reducers/reducer";
import DeleteFileModal from "../../Project/Code/DeleteFileModal";
import NewFileModal from "../../Project/Code/NewFileModal";

import classes from "./CodePanel.module.scss";

const CODE_TABS: TCodeTab[] = ["Files", "Blocks"];
const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Pudding", "Simulation"];

interface Props {
	projectId: string;
	subsystem: string;
}

const CodePanel = ({ projectId, subsystem }: Props): JSX.Element => {
	const renameRef = useRef<HTMLInputElement>(null);
	const { globalSession } = useContext(GlobalSessionContext);
	const { layout, tab, allFiles, activeFileId, ctxMenu } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);
	const [renameId, setRenameId] = useState<string>();
	const [isDeletingFile, setIsDeletingFile] = useState("");

	useEffect(() => {
		if (renameId) renameRef.current?.focus();
	}, [renameId]);

	const setCtxHandler = (id: string, e: MouseEvent) => {
		e.preventDefault();
		dispatch({ type: "code-step/SET_CTX", payload: { x: e.clientX, y: e.clientY, id: id } });
	};

	const initRenameHandler = () => {
		setRenameId(ctxMenu?.id);
		dispatch({ type: "code-step/SET_CTX", payload: null });
	};

	const submitRenameHandler = (id: string, e?: FormEvent) => {
		e?.preventDefault();
		console.log("yeap");
		if (renameRef.current?.value) {
			dispatch(renameFile(globalSession.profileId, projectId, subsystem, id, renameRef.current.value));
		}
		setRenameId(undefined);
	};

	const keyDownHandler = (id: string, e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "Delete") setIsDeletingFile(id);
	};

	return (
		<div className={classes.codePanel}>
			<div className={classes.layouts}>
				{CODE_LAYOUTS.map((_layout) => (
					<button title={_layout} key={_layout} className={_layout === layout ? classes.active : ""} onClick={() => dispatch({ type: "code-step/SET_LAYOUT", payload: _layout })}>
						<Image src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/layout-${_layout.toLowerCase()}.svg`} height={24} width={24} alt={_layout} />
					</button>
				))}
			</div>
			<div className={classes.codeTabs}>
				{CODE_TABS.map((_tab) => (
					<button key={_tab} title={_tab} className={tab === _tab ? classes.active : ""} onClick={() => dispatch({ type: "code-step/SET_TAB", payload: _tab })}>
						{_tab}
					</button>
				))}
			</div>
			{tab === "Files" && (
				<div className={classes.codeItemContainer}>
					<button className={classes.newFileBtn} title="New file" onMouseDown={() => setIsCreatingNewFile(true)}>
						<i />
						New file
					</button>
					<div className={classes.fileList}>
						{Object.entries(allFiles).map(([id, file]) => (
							<button
								key={id}
								tabIndex={-1}
								className={`${classes.file} ${ctxMenu?.id === id && classes.toggled} ${activeFileId === id && classes.activeFile} ${renameId === id && classes.renaming}`}
								onClick={() => dispatch(setActiveFile(globalSession.profileId, projectId, subsystem, id))}
								onContextMenu={(e) => setCtxHandler(id, e)}
								onBlur={() => dispatch({ type: "code-step/SET_CTX", payload: null })}
								onKeyDown={(e) => keyDownHandler(id, e)}>
								<div className={classes.fileIcon}>
									<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${file.lang}.svg`} alt={file.lang} />
								</div>
								{renameId === id ? (
									<form key={`${id}-rename`} onSubmit={(e) => submitRenameHandler(id, e)}>
										<input ref={renameRef} onBlur={() => submitRenameHandler(id)} />
									</form>
								) : (
									<span>{file.name}</span>
								)}
							</button>
						))}
					</div>
				</div>
			)}
			{tab === "Blocks" && (
				<div className={classes.codeItemContainer}>
					<div className={`${classes.codeItem} ${classes.block}`}>TODO - @louis</div>
				</div>
			)}
			{ctxMenu && (
				<div className={classes.ctxMenu} style={{ top: ctxMenu.y, left: ctxMenu.x }}>
					<button title="Rename" onMouseDown={initRenameHandler}>
						Rename
					</button>
					<button title="Delete" onMouseDown={() => dispatch(deleteFile(globalSession.profileId, projectId, subsystem, ctxMenu.id))}>
						Delete
					</button>
				</div>
			)}
			{isCreatingNewFile && <NewFileModal projectId={projectId} subsystem={subsystem} setIsCreatingNewFile={setIsCreatingNewFile} />}
			{isDeletingFile && <DeleteFileModal id={isDeletingFile} projectId={projectId} subsystem={subsystem} setIsDeletingFile={setIsDeletingFile} />}
		</div>
	);
};

export default CodePanel;
