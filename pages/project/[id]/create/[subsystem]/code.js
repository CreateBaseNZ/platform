import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import Link from "next/link";
import useMixpanel from "../../../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../../../store/global-session-context";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import SubsystemLayout from "../../../../../components/Layouts/SubsystemLayout/SubsystemLayout";
import Img from "../../../../../components/UI/Img";
import getProjectData from "../../../../../utils/getProjectData";
import classes from "/styles/code.module.scss";

const Code = () => {
	const [subsystemData, setSubsystemData] = useState();
	const { globalSession } = useContext(GlobalSessionContext);
	const mp = useMixpanel();

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_create_code", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
			subsystem: router.query.subsystem,
		});
		return () => clearSession();
	}, []);

	useEffect(() => {
		const projectData = getProjectData(router.query?.id);
		if (projectData && router.query.subsystem) {
			setSubsystemData(projectData.subsystems.find((subsystem) => subsystem.title === router.query.subsystem));
		}
	}, [router.query.id, router.query.subystem]);

	if (!subsystemData) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Code • {subsystemData.title} | CreateBase</title>
				<meta name="description" content={subsystemData.description} />
			</Head>
			<div className={classes.leftContainer}>
				<ul className={classes.tasks}>
					<h2>
						<span className="material-icons-outlined">inventory</span> Tasks
					</h2>
					{subsystemData.code.tasks.map((t, i) => (
						<li key={i}>{t}</li>
					))}
				</ul>
				<ul className={classes.hints}>
					<h2>
						<span className="material-icons-outlined">lightbulb</span> Hints
					</h2>
					{subsystemData.code.hints.map((h, i) => (
						<li key={i}>{h}</li>
					))}
				</ul>
			</div>
			<div className={classes.rightContainer}>
				<div className={classes.imgContainer}>
					<Img
						src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/project-pages/create.svg"
						layout="responsive"
						width={1000}
						height={1000}
						objectFit="contain"
						label="Illustration by Storyset"
					/>
				</div>
				<div className={classes.caption}>{subsystemData.code.caption}</div>
				<Link href={{ pathname: "/game/[id]/[subsystem]", query: router.query }}>
					<button className={classes.btn}>
						Start Coding!
						<span className="material-icons-outlined">arrow_right</span>
					</button>
				</Link>
			</div>
		</div>
	);
};

Code.getLayout = (page) => {
	return (
		<ProjectLayout activeStep="create">
			<SubsystemLayout activeTab="code">{page}</SubsystemLayout>;
		</ProjectLayout>
	);
};

Code.auth = "user";

export default Code;
