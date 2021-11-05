import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import ProjectLayout from "../../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData from "../../../../utils/getProjectData";

import classes from "/styles/create.module.scss";

const Create = () => {
	const [data, setData] = useState();

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	console.log(data);

	if (!data) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Create • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			// TODO
		</div>
	);
};

Create.getLayout = (page) => {
	return <ProjectLayout activeStep="create">{page}</ProjectLayout>;
};

Create.auth = "user";

export default Create;
