import { Fragment, ReactElement, useContext, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import classes from "./NewProjectLayout.module.scss";
import STEPS from "../../../constants/projectSteps";
import { useRouter } from "next/router";
import UserAvatar from "../../UI/UserAvatar";
import GlobalSessionContext from "../../../store/global-session-context";
import getMainTabs from "../../../lib/getMainTabs";
import { NEW_DEFAULT_TABS } from "../../../constants/mainTabs";
import { IProjectReadOnly } from "../../../types/projects";

interface Props {
	children: ReactElement;
	step: string;
	data: IProjectReadOnly;
	isFlat?: boolean;
}

const NewProjectLayout = ({ children, step, data, isFlat = false }: Props) => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const [showMenu, setShowMenu] = useState(false);

	console.log(data);

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
				<div className={classes.title}>TO DO BUT VERY LONG</div>
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
								<b>{globalSession.groups[globalSession.recentGroups[0]].alias || `${globalSession.firstName} ${globalSession.lastName}`} </b> •{" "}
								{globalSession.groups[globalSession.recentGroups[0]].name} {globalSession.groups[globalSession.recentGroups[0]].role}
							</span>
						</div>
					</div>
				</div>
			</nav>
			{children}
		</div>
	);
};

export default NewProjectLayout;
