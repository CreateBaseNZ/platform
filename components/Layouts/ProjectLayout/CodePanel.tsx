import Image from "next/image";
import { useContext, useState } from "react";
import CodeContext, { CODE_TABS, TCodeLayout } from "../../../store/code-context";
import NewFileModal from "../../Project/Code/NewFileModal";

import classes from "./CodePanel.module.scss";

const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Simulation"];

interface Props {
	projectId: string;
	subsystem: string;
}

const CodePanel = ({ projectId, subsystem }: Props): JSX.Element => {
	const { codeLayout, setCodeLayout, codeTab, setCodeTab, files, setFiles, activeFileId, setActiveFileId } = useContext(CodeContext);
	const [isCreatingNewFile, setIsCreatingNewFile] = useState(false);

	console.log(files);

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
					<button className={classes.newFileBtn} title="New file" onMouseDown={() => setIsCreatingNewFile(true)} />
					{files.map((file) => (
						<div key={file.id} className={`${classes.codeItem} ${classes.file}`}>
							<div className={classes.fileIcon}>
								<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/${file.lang}.svg`} alt={file.lang} />
							</div>
							<span>{file.name}</span>
						</div>
					))}
				</div>
			)}
			{codeTab === "Blocks" && (
				<div className={classes.codeItemContainer}>
					<div className={`${classes.codeItem} ${classes.block}`}>TODO - @louis</div>
				</div>
			)}
			{isCreatingNewFile && <NewFileModal projectId={projectId} subsystem={subsystem} setIsCreatingNewFile={setIsCreatingNewFile} />}
		</div>
	);
};

export default CodePanel;
