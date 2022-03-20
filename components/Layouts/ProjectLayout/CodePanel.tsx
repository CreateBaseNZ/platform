import Image from "next/image";
import { FormEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { deleteFile, renameFile, setActiveFile, TCodeLayout, TCodeStepState, TCodeTab } from "../../../store/reducers/codeStepReducer";
import { TState } from "../../../store/reducers/reducer";
import NewFileModal from "../../Project/Code/NewFileModal";

import classes from "./CodePanel.module.scss";

const CODE_TABS: TCodeTab[] = ["Files", "Blocks"];
const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Simulation"];

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

	useEffect(() => {
		if (renameId) renameRef.current?.focus();
	}, [renameId]);

	const setCtxHandler = (id: string, e: MouseEvent) => {
		e.preventDefault();
		dispatch({ type: "code-step/SET_CTX", payload: { x: e.clientX, y: e.clientY, id: id } });
	};

	const initRenameHandler = () => {
		setRenameId(ctxMenu?.id);
		dispatch({ type: "code-step/SET_CTX", payload: undefined });
	};

	const submitRenameHandler = (id: string, e?: FormEvent) => {
		e?.preventDefault();
		console.log("yeap");
		if (renameRef.current?.value) {
			dispatch(renameFile(globalSession.profileId, projectId, subsystem, id, renameRef.current.value));
		}
		setRenameId(undefined);
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
					{Object.entries(allFiles).map(([id, file]) => (
						<button
							key={id}
							className={`${classes.codeItem} ${classes.file} ${ctxMenu?.id === id && classes.toggled} ${activeFileId === id && classes.activeFile} ${renameId === id && classes.renaming}`}
							onClick={() => dispatch(setActiveFile(globalSession.profileId, projectId, subsystem, id))}
							onContextMenu={(e) => setCtxHandler(id, e)}
							onBlur={() => dispatch({ type: "code-step/SET_CTX", payload: undefined })}>
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
			)}
			{tab === "Blocks" && (
				<div className={classes.codeItemContainer}>
					<div className={`${classes.codeItem} ${classes.block}`}>TODO - @louis</div>
				</div>
			)}
			{isCreatingNewFile && <NewFileModal projectId={projectId} subsystem={subsystem} setIsCreatingNewFile={setIsCreatingNewFile} />}
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
		</div>
	);
};

export default CodePanel;
