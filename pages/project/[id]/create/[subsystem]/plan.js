import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import useMixpanel from "../../../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../../../store/global-session-context";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import SubsystemLayout from "../../../../../components/Layouts/SubsystemLayout/SubsystemLayout";
import Img from "../../../../../components/UI/Img";
import getProjectData from "../../../../../utils/getProjectData";
import classes from "/styles/plan.module.scss";

const Plan = () => {
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);
	const [subsystemData, setSubsystemData] = useState();

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_create_plan", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
			subsystem: router.query.subsystem,
		});
		return () => clearSession();
	}, []);

	useEffect(() => {
		if (router.isReady) {
			const projectData = getProjectData(router.query.id);
			if (projectData && router.query.subsystem) {
				setSubsystemData(projectData.subsystems.find((subsystem) => subsystem.title === router.query.subsystem));
			}
		}
	}, [router.isReady, router.query.id, router.query.subystem]);

	if (!subsystemData) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Plan • {subsystemData.title} | CreateBase</title>
				<meta name="description" content={subsystemData.description} />
			</Head>
			<div className={classes.container}>
				<div className={classes.imgWrapper}>
					<Img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/plan.svg" layout="responsive" width="100%" height="100%" objectFit="contain" />
				</div>
				<div className={classes.contentContainer}>
					<h2>Let's plan!</h2>
					{subsystemData.plan.map((p, i) => (
						<p key={i} className={classes.content}>
							{p}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

Plan.getLayout = (page) => {
	return (
		<ProjectLayout activeStep="create">
			<SubsystemLayout activeTab="plan">{page}</SubsystemLayout>;
		</ProjectLayout>
	);
};

Plan.auth = "user";

export default Plan;
