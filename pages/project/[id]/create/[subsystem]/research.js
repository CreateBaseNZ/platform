import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import useMixpanel from "../../../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../../../store/global-session-context";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import SubsystemLayout from "../../../../../components/Layouts/SubsystemLayout/SubsystemLayout";
import ModuleContainer from "../../../../../components/Project/ModuleContainer";
import Img from "../../../../../components/UI/Img";
import TutorialModule from "../../../../../components/Project/TutorialModule";
import VideoModule from "../../../../../components/Project/VideoModule";
import PdfModule from "../../../../../components/Project/PdfModule";
import getProjectData from "../../../../../utils/getProjectData";

import classes from "../../../../../styles/research.module.scss";
import ModuleBody from "../../../../../components/Project/ModuleBody";

const Research = () => {
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);
	const [subsystemData, setSubsystemData] = useState();
	const [activeModule, setActiveModule] = useState(0);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_create_research", {
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
		<div className={classes.view}>
			<Head>
				<title>Research • {subsystemData.title} | CreateBase</title>
				<meta name="description" content={subsystemData.description} />
			</Head>
			<ModuleContainer active={activeModule} clickHandler={(i) => setActiveModule(i)} modules={subsystemData.research.modules} caption={subsystemData.research.caption} showManualBtn={false} />
			<div className={classes.mainContainer}>
				<ModuleBody module={subsystemData.research.modules[activeModule]} length={subsystemData.research.modules.length} />
			</div>
		</div>
	);
};

Research.getLayout = (page) => {
	return (
		<ProjectLayout activeStep="create">
			<SubsystemLayout activeTab="research">{page}</SubsystemLayout>;
		</ProjectLayout>
	);
};

Research.auth = "user";

export default Research;
