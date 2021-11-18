import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import GlobalSessionContext from "../store/global-session-context";

import classes from "../styles/onboarding.module.scss";
import Task from "../components/Onboarding/Task";

const DUMMY_STATUS = { "default-0": true, "default-1": false };

const DEFAULT_TASKS = [
	{ id: "default-0", type: "video", title: "Watch Getting Started on CreateBase", color: "#6853D9", imgUrl: "/public/task.png" },
	{ id: "default-1", type: "link", title: "Your Flow Coding journey starts here", color: "#209CE2", imgUrl: "/public/task.png" },
];

const Onboarding = () => {
	const [tasks, setTasks] = useState([]);
	const [popup, setPopup] = useState();
	const { globalSession } = useContext(GlobalSessionContext);

	const checkHandler = () => {};

	return (
		<div className={classes.onboarding}>
			<Head>
				<title>Onboarding | CreateBase</title>
				<meta name="description" content="Get to know the platform by completing all the onboarding tasks" />
			</Head>
			<div className={classes.view}>
				<h1>
					Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {globalSession.firstName} 👋
				</h1>
				<section>
					<div className={classes.sectionHeading}>
						<h3>We’ve curated a couple of tasks to help you get started</h3>
						<h4>TODO of {DEFAULT_TASKS.length} completed</h4>
					</div>
					<div className={classes.taskContainer}>
						{DEFAULT_TASKS.map((task) => (
							<Task key={task.id} task={task} isCompleted={DUMMY_STATUS[task.id]} checkHandler={checkHandler} />
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

Onboarding.getLayout = (page) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Onboarding.auth = "any";

export default Onboarding;
