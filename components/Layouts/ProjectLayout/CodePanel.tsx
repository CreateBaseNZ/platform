import Image from "next/image";
import { FormEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalSessionContext from "../../../store/global-session-context";
import { deleteFile, renameFile, setActiveFile, TCodeLayout, TCodeStepState, TCodeTab } from "../../../store/reducers/codeStepReducer";
import { TState } from "../../../store/reducers/reducer";
import DeleteFileModal from "../../Project/Code/DeleteFileModal";
import NewFileModal from "../../Project/Code/NewFileModal";
import CodeFileList from "./CodeFileList";

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
	const { layout, tab, ctxMenu } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);
	const [renameId, setRenameId] = useState("");
	const [deletingFile, setDeletingFile] = useState("");

	useEffect(() => {
		if (renameId) renameRef.current?.focus();
	}, [renameId]);

	const initRenameHandler = () => {
		setRenameId(ctxMenu?.id as string);
		dispatch({ type: "code-step/SET_CTX", payload: null });
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
					<CodeFileList projectId={projectId} subsystem={subsystem} renameRef={renameRef} renameId={renameId} setRenameId={setRenameId} setDeletingFile={setDeletingFile} />
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
					<button title="Delete" onMouseDown={() => setDeletingFile(ctxMenu.id)}>
						Delete
					</button>
				</div>
			)}
			{isCreatingNewFile && <NewFileModal projectId={projectId} subsystem={subsystem} setIsCreatingNewFile={setIsCreatingNewFile} />}
			{deletingFile && <DeleteFileModal id={deletingFile} projectId={projectId} subsystem={subsystem} setDeletingFile={setDeletingFile} />}
		</div>
	);
};

export default CodePanel;
