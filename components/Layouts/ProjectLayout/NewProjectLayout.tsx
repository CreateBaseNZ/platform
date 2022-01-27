import { Fragment, ReactElement, useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import STEPS, { IMPROVE_STEPS, SUBSYSTEM_STEPS } from "../../../constants/projectSteps";
import { NextRouter, useRouter } from "next/router";
import UserAvatar from "../../UI/UserAvatar";
import GlobalSessionContext from "../../../store/global-session-context";
import getMainTabs from "../../../lib/getMainTabs";
import { NEW_DEFAULT_TABS } from "../../../constants/mainTabs";
import { TProject } from "../../../types/projects";
import classes from "./NewProjectLayout.module.scss";
import ProjectContext, { TCodeTab, TCodeLayout } from "../../../store/project-context";

const CODE_LAYOUTS: TCodeLayout[] = ["Default", "Editor", "Simulation"];
const CODE_TABS: TCodeTab[] = ["Blocks", "Files"];

const renderResearchModules = (data: TProject, subsystem: string, router: NextRouter) => {
	const modules = data.subsystems.find((s) => s.id === subsystem)?.research.modules;

	if (!modules || modules?.length === 0) return <a className={classes.noModules}>No modules</a>;

	return modules.map((module) => (
		<Link key={module.title} href={{ pathname: router.pathname, query: { ...router.query, module: module.title } }}>
			<a className={router.query.module === module.title ? classes.active : ""}>{module.title}</a>
		</Link>
	));
};

interface Props {
	children: ReactElement;
	step: string;
	data: TProject;
	isFlat?: boolean;
	hasLeftPanel?: boolean;
	substep?: string;
	subsystem?: string;
}

const NewProjectLayout = ({ children, step, data, isFlat = false, hasLeftPanel = false, substep = "", subsystem = "" }: Props) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const { codeLayout, setCodeLayout, codeTab, setCodeTab } = useContext(ProjectContext);
	const [showMenu, setShowMenu] = useState(false);

	console.log(subsystem);

	console.log(router);

	return (
		<div className={classes.container}>
			<Head>
				<title>
					{step} • {data.title}
				</title>
				<meta name="description" content={data.description} />
			</Head>
			<nav className={`${classes.nav} ${isFlat ? classes.flat : ""}`}>
				<div className={`${classes.logo} ${showMenu ? classes.active : ""}`} tabIndex={-1} onBlur={() => setShowMenu(false)}>
					<button className={classes.menuBtn} onClick={() => setShowMenu((state) => !state)} title="Open menu">
						<Image src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/icons/logo-no-text.svg" height={32} width={28} layout="fixed" alt="CreateBase" />
						<i className="material-icons-outlined">expand_more</i>
					</button>
					<div className={classes.menu}>
						{getMainTabs(globalSession.groups[globalSession.recentGroups[0]])[0].map((tab) => (
							<Link key={tab.page} href={tab.urlObject}>
								<a title={tab.label} onMouseDown={(e) => e.preventDefault()}>
									<i className="material-icons-outlined">{tab.icon}</i>
									{tab.label}
								</a>
							</Link>
						))}
						<div className={classes.sep} />
						{NEW_DEFAULT_TABS.map((tab) => (
							<Link key={tab.page} href={tab.urlObject}>
								<a title={tab.label} onMouseDown={(e) => e.preventDefault()}>
									<i className="material-icons-outlined">{tab.icon}</i>
									{tab.label}
								</a>
							</Link>
						))}
					</div>
				</div>
				<div className={classes.title}>{data.title}</div>
				<div className={classes.steps}>
					{STEPS.map((s, i) => (
						<Fragment key={s.name}>
							{i !== 0 ? <div className={classes.separator} /> : null}
							<Link href={{ pathname: `/project/[id]/${s.name}`, query: { id: router.query.id } }}>
								<a className={step.toLowerCase() === s.name ? classes.active : ""} title={s.title}>
									{s.title}
								</a>
							</Link>
						</Fragment>
					))}
				</div>
				<div className={classes.buttons}>
					<button className={classes.upgrade} title="Upgrade">
						<i className="material-icons-outlined">bolt</i>
					</button>
					<div className={classes.avatarWrapper}>
						<UserAvatar id={globalSession.accountId} size={40} className={classes.avatar} />
						<div className={classes.avatarTooltip}>
							<span>
								<b>{globalSession.groups[globalSession.recentGroups[0]]?.alias || `${globalSession.firstName} ${globalSession.lastName}`}</b>
								{globalSession.groups[globalSession.recentGroups[0]]
									? ` • ${globalSession.groups[globalSession.recentGroups[0]].name} ${globalSession.groups[globalSession.recentGroups[0]].role}`
									: ""}
							</span>
						</div>
					</div>
				</div>
			</nav>
			<div className={`${classes.leftPanel} ${hasLeftPanel ? "" : classes.hide}`}>
				{router.query.subsystem && (
					<div className={classes.toSubsystems}>
						<Link href={{ pathname: "/project/[id]/create/", query: { id: router.query.id } }}>
							<a title="All subsystems">
								<i className="material-icons-outlined">navigate_before</i>
								All subsystems
							</a>
						</Link>
					</div>
				)}
				<div className={classes.substepContainer}>
					<div className={classes.substepName}>{data.subsystems.find((subsystem) => subsystem.id === router.query.subsystem)?.title || "Improve"}</div>
					{router.query.subsystem
						? SUBSYSTEM_STEPS.map((step) => (
								<Link href={{ pathname: `/project/[id]/create/[subsystem]/${step.name}`, query: { id: router.query.id, subsystem: router.query.subsystem } }} key={step.name}>
									<a className={substep === step.name ? classes.active : ""} title={step.title}>
										<i className="material-icons-outlined">chevron_right</i>
										{step.title}
									</a>
								</Link>
						  ))
						: IMPROVE_STEPS.map((step) => (
								<Link href={{ pathname: `/project/[id]/improve/${step.name}`, query: { id: router.query.id } }} key={step.name}>
									<a className={substep === step.name ? classes.active : ""} title={step.title}>
										<i className="material-icons-outlined">chevron_right</i>
										{step.title}
									</a>
								</Link>
						  ))}
				</div>
				{substep === "code" && (
					<>
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
					</>
				)}
				{substep === "research" && (
					<div className={`${classes.researchPanel} ${router.query.module ? "" : classes.blink}`}>
						<div className={classes.researchHeading}>Modules</div>
						{renderResearchModules(data, subsystem, router)}
					</div>
				)}
			</div>
			{children}
		</div>
	);
};

export default NewProjectLayout;
