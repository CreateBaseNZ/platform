import Image from "next/image";
import { useContext } from "react";
import CodeContext, { TCodeLayout, TCodeTab } from "../../../store/code-context";

import classes from "./CodePanel.module.scss";

const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Simulation"];
const CODE_TABS: TCodeTab[] = ["Blocks", "Files"];

const CodePanel = (): JSX.Element => {
	const { codeLayout, setCodeLayout, codeTab, setCodeTab } = useContext(CodeContext);

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
			{codeTab === "Blocks" && (
				<div className={classes.codeItemContainer}>
					<div className={`${classes.codeItem} ${classes.block}`}>TODO - @louis</div>
				</div>
			)}
			{codeTab === "Files" && (
				<div className={classes.codeItemContainer}>
					<button className={classes.newFile} title="New file" />
					<div className={`${classes.codeItem} ${classes.file}`}>
						<div className={classes.fileIcon}>
							<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/blockly.svg`} alt="blockly" />
						</div>
						<span>A really really long lorem ipsum</span>
					</div>
					<div className={`${classes.codeItem} ${classes.file}`}>
						<div className={classes.fileIcon}>
							<Image height={16} width={16} src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/js.svg`} alt="js" />
						</div>
						<span>JS file</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CodePanel;
