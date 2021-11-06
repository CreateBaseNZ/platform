import { useState, useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import ProjectLayout from "../../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData from "../../../../utils/getProjectData";

import classes from "/styles/create.module.scss";

const DUMMY_SUBSYSTEMS = [
	{ title: "Some subsystem", req: [] },
	{ title: "Another subsytem", req: ["Some subsytem"] },
	{ title: "Third subsytem", req: ["Some subsytem"] },
	{ title: "Final subsytem", req: ["Another subsystem", "Third subsystem"] },
];

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
			<div className={classes.leftSide}>
				<div className={classes.headings}>
					<h1>Subsystems</h1>
					<h3>The Create step is made up of one or more subsystems. Each subsystem focuses on part of the overall problem, and some must be done before others. Click on the cards to get started.</h3>
				</div>
				<div className={classes.cardContainer}>
					{DUMMY_SUBSYSTEMS.map((subsystem) => (
						<Link href={{ query: { subsystem: subsystem.title } }}>
							<a className={classes.card}>
								<h2>{subsystem.title}</h2>
								<div className={classes.requirements}>
									{subsystem.requirements.map((req) => (
										<span className={subsystem.requirements.find((_subsystem) => _subsystem.title === req)?.progress === 100 ? classes.completed : classes.notCompleted}>{req}</span>
									))}
								</div>
							</a>
						</Link>
					))}
				</div>
			</div>
			<div className={classes.rightSide}>
				<div className={classes.floatCard}></div>
			</div>
		</div>
	);
};

Create.getLayout = (page) => {
	return <ProjectLayout activeStep="create">{page}</ProjectLayout>;
};

Create.auth = "user";

export default Create;
