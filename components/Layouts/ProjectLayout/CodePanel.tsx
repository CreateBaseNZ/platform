import Image from "next/image";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import GlobalSessionContext from "../../../store/global-session-context";
import { TCodeLayout, TCodeStepState, TCodeTab } from "../../../store/reducers/codeStepReducer";
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
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const { layout, tab, allFiles, activeFile, ctxMenu } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);

	useEffect(() => {
		post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [`${projectId}-${subsystem}__files`]: allFiles }, date: new Date().toString() });
	}, [allFiles, globalSession.profileId, post, projectId, subsystem]);

	const setCtxHandler = (id: string, e: MouseEvent) => {
		e.preventDefault();
		dispatch({ type: "SET_CTX", action: { x: e.clientX, y: e.clientY, id: id } });
	};

	return (
		<div className={classes.codePanel}>
			<div className={classes.layouts}>
				{CODE_LAYOUTS.map((_layout) => (
					<button title={_layout} key={_layout} className={_layout === layout ? classes.active : ""} onClick={() => dispatch({ type: "SET_LAYOUT", payload: _layout })}>
						<Image src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/layout-${_layout.toLowerCase()}.svg`} height={24} width={24} alt={_layout} />
					</button>
				))}
			</div>
			<div className={classes.codeTabs}>
				{CODE_TABS.map((_tab) => (
					<button key={_tab} title={_tab} className={tab === _tab ? classes.active : ""} onClick={() => dispatch({ type: "SET_TAB", payload: _tab })}>
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
					{allFiles.map((file) => (
						<button
							key={file.id}
							className={`${classes.codeItem} ${classes.file} ${ctxMenu?.id === file.id && classes.toggled} ${activeFile.id === file.id && classes.activeFileId}`}
							onClick={() => dispatch({ type: "SET_ACTIVE_FILE", payload: file.id })}
							onContextMenu={(e) => setCtxHandler(file.id, e)}
							onBlur={() => dispatch({ type: "SET_CTX", payload: undefined })}>
							<div className={classes.fileIcon}>
								<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${file.lang}.svg`} alt={file.lang} />
							</div>
							<span>{file.name}</span>
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
					<button title="Rename">Rename</button>
					<button title="Delete" onMouseDown={() => dispatch({ type: "DELETE_FILE", payload: ctxMenu.id })}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default CodePanel;
