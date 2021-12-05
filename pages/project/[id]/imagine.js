import { useState, useEffect, useContext } from "react";
import router from "next/router";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import ModuleContainer from "../../../components/Project/ModuleContainer";
import PdfModule from "../../../components/Project/PdfModule";
import VideoModule from "../../../components/Project/VideoModule";
import TutorialModule from "../../../components/Project/TutorialModule";
import getProjectData from "../../../utils/getProjectData";

import classes from "../../../styles/imagine.module.scss";

const Imagine = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [data, setData] = useState();
	const [active, setActive] = useState(0);
	const mp = useMixpanel();

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_imagine", {
			licenses: globalSession.groups.map((group) => group.licenseId),
			schools: globalSession.groups.map((group) => group.id),
			project: router.query.id,
		});
		return () => clearSession();
	}, []);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	const cardClickHandler = (i) => {
		if (i !== active) {
			setActive(i);
		}
	};

	if (!data) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Imagine • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<ModuleContainer active={active} clickHandler={cardClickHandler} modules={data.imagine.modules} caption={data.imagine.caption} />
			<div className={classes.mainContainer}>
				{(data.imagine.modules[active]?.type === "pdf" || data.imagine.modules[active]?.type === "task") && <PdfModule module={data.imagine.modules[active]} />}
				{data.imagine.modules[active]?.type === "video" && <VideoModule module={data.imagine.modules[active]} />}
				{data.imagine.modules[active]?.type === "tut" && <TutorialModule module={data.imagine.modules[active]} />}
			</div>
		</div>
	);
};

Imagine.getLayout = (page) => {
	return <ProjectLayout activeStep="imagine">{page}</ProjectLayout>;
};

Imagine.auth = "user";

export default Imagine;
