import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData from "../../../utils/getProjectData";
import ModuleContainer from "../../../components/UI/ModuleContainer";

import classes from "/styles/imagine.module.scss";

const Imagine = () => {
	const [data, setData] = useState();
	const [active, setActive] = useState(0);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	const cardClickHandler = (i) => {
		if (i !== active) {
			setLoaded(false);
			setActive(i);
		}
	};

	const loadHandler = () => setLoaded(true);

	if (!data) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Imagine • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<ModuleContainer active={active} clickHandler={cardClickHandler} modules={data.imagine.modules} caption={data.imagine.caption} />
			<div className={classes.mainContainer}>
				<embed src={data.imagine.modules[active].url} width="100%" height="100%" onLoad={loadHandler} />
				<div className={`${classes.loadScreen} ${loaded ? classes.loaded : ""}`} />
			</div>
		</div>
	);
};

Imagine.getLayout = (page) => {
	return <ProjectLayout activeStep="imagine">{page}</ProjectLayout>;
};

Imagine.auth = "user";

export default Imagine;
