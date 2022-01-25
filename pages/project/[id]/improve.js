import { useState, useEffect, useContext } from "react";
import router from "next/router";
import Link from "next/link";
import Head from "next/head";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import Img from "../../../components/UI/Img";
import getProjectData from "../../../utils/getProjectData";

import classes from "/styles/improve.module.scss";

const Improve = () => {
	const [data, setData] = useState();
	const mp = useMixpanel();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		mp.init();
		const clearSession = mp.trackActiveSession("project_improve");
		return () => clearSession();
	}, []);

	useEffect(() => {
		if (router.query.id) {
			setData(getProjectData(router.query.id));
		}
	}, [router.query.id]);

	if (!data) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Improve • {data.name} | CreateBase</title>
				<meta name="description" content={data.caption} />
			</Head>
			<div className={classes.leftContainer}>
				{data.improve.alert && (
					<div className={classes.alert}>
						<h2>
							<span className="material-icons-outlined">campaign</span> Alert
						</h2>
						{data.improve.alert}
					</div>
				)}
				{data.improve.tasks && (
					<ul className={classes.tasks}>
						<h2>
							<span className="material-icons-outlined">inventory</span> Tasks
						</h2>
						{data.improve.tasks.map((t, i) => (
							<li key={i}>{t}</li>
						))}
					</ul>
				)}
				{data.improve.hints && (
					<ul className={classes.hints}>
						<h2>
							<span className="material-icons-outlined">lightbulb</span> Hints
						</h2>
						{data.improve.hints.map((h, i) => (
							<li key={i}>{h}</li>
						))}
					</ul>
				)}
			</div>
			<div className={classes.rightContainer}>
				<div className={classes.imgContainer}>
					<Img
						src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/improve.svg"
						layout="responsive"
						width={1000}
						height={1000}
						objectFit="cover"
						label="Illustration by Storyset"
					/>
				</div>
				<div className={classes.caption}>{data.improve.caption}</div>
				<Link href={{ pathname: "/game/[id]/improve", query: { id: router.query.id } }}>
					<button className={classes.btn}>
						Improve It!
						<span className="material-icons-outlined">trending_up</span>
					</button>
				</Link>
			</div>
		</div>
	);
};

Improve.getLayout = (page) => {
	return <ProjectLayout activeStep="improve">{page}</ProjectLayout>;
};

Improve.auth = "user";

export default Improve;
