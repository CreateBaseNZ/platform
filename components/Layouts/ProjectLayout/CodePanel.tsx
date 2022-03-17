import Image from "next/image";
import { MouseEvent, useContext, useState } from "react";
import useApi from "../../../hooks/useApi";
import CodeContext, { CODE_TABS, TCodeLayout } from "../../../store/code-context";
import GlobalSessionContext from "../../../store/global-session-context";
import { TCodeFile } from "../../../types/code";
import NewFileModal from "../../Project/Code/NewFileModal";

import classes from "./CodePanel.module.scss";

const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Simulation"];

interface CtxMenu extends TCodeFile {
	x: number;
	y: number;
}

interface Props {
	projectId: string;
	subsystem: string;
}

const CodePanel = ({ projectId, subsystem }: Props): JSX.Element => {
	const { codeLayout, setCodeLayout, codeTab, setCodeTab, files, setFiles, activeFile, setActiveFile } = useContext(CodeContext);
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);
	const [ctxMenu, setCtxMenu] = useState<CtxMenu>();
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);

	const ctxMenuHandler = (file: TCodeFile, e: MouseEvent) => {
		e.preventDefault();
		setCtxMenu({ ...file, x: e.clientX, y: e.clientY });
	};

	const deleteFileHandler = () => {
		let newFiles: TCodeFile[] = [];
		setFiles((state) => {
			newFiles = state.filter((f) => f.id !== ctxMenu?.id);
			return newFiles;
		});

		post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [`${projectId}__${subsystem}`]: newFiles }, date: new Date().toString() }, () => {
			setCtxMenu(undefined);
		});
	};

	return (
		<div className={classes.codePanel}>
			<div className={classes.layouts}>
				{CODE_LAYOUTS.map((view) => (
					<button title={view} key={view} className={view === codeLayout ? classes.active : ""} onClick={() => setCodeLayout(view)}>
						<Image src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/layout-${view.toLowerCase()}.svg`} height={24} width={24} alt={view} />
					</button>
				))}
			</div>
			<div className={classes.codeTabs}>
				{CODE_TABS.map((tab) => (
					<button key={tab} title={tab} className={codeTab === tab ? classes.active : ""} onClick={() => setCodeTab(tab)}>
						{tab}
					</button>
				))}
			</div>
			{codeTab === "Files" && (
				<div className={classes.codeItemContainer}>
					<button className={classes.newFileBtn} title="New file" onMouseDown={() => setIsCreatingNewFile(true)}>
						<i />
						New file
					</button>
					{files.map((file) => (
						<button
							key={file.id}
							className={`${classes.codeItem} ${classes.file} ${ctxMenu?.id === file.id && classes.toggled} ${activeFile.id === file.id && classes.activeFile}`}
							onClick={() => setActiveFile(file)}
							onContextMenu={(e) => ctxMenuHandler(file, e)}
							onBlur={() => setCtxMenu(undefined)}>
							<div className={classes.fileIcon}>
								<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${file.lang}.svg`} alt={file.lang} />
							</div>
							<span>{file.name}</span>
						</button>
					))}
				</div>
			)}
			{codeTab === "Blocks" && (
				<div className={classes.codeItemContainer}>
					<div className={`${classes.codeItem} ${classes.block}`}>TODO - @louis</div>
				</div>
			)}
			{isCreatingNewFile && <NewFileModal projectId={projectId} subsystem={subsystem} setIsCreatingNewFile={setIsCreatingNewFile} />}
			{ctxMenu && (
				<div className={classes.ctxMenu} style={{ top: ctxMenu.y, left: ctxMenu.x }}>
					<button title="Rename">Rename</button>
					<button title="Delete" onMouseDown={deleteFileHandler}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default CodePanel;
