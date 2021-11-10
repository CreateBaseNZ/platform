// TODO update onboarding page

import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/onboarding.module.scss";
import GlobalSessionContext from "../store/global-session-context";

const teachingContent = {
	title: "Teaching my first project",
	content: (
		<>
			Projects are delivered through a combination of teachers, like yourself, and our platform. To help you deliver a Project to your class, each one comes with a detailed lesson plan.
			<br />
			<br />
			We recommend going through the Project lesson plan and even the Project on the platform yourself before you start teaching the lesson to familiarise yourself with its content and structure. Key
			things to look out for in the lesson plan are glossaries and useful resources at the start of each section.
			<br />
			<br />
			If it is your first time delivering a lesson like this, then we recommend following the lesson plan step-by-step. If you feel more confident, you are also free to adapt the lesson plans to suit
			your teaching style. There are no restrictions or pre-requisites in place on the platform so feel free to skip over any content or add in your own throughout the Project!
			<br />
			<br />
			Most importantly, let your students dictate the flow of class discussions and don’t be afraid to go off track!
		</>
	),
};

const Onboarding = () => {
	const [tasks, setTasks] = useState([]);
	const [popup, setPopup] = useState();
	const { globalSession } = useContext(GlobalSessionContext);

	// useEffect(() => {
	// 	if (user.loaded) {
	// 		setTasks([
	// 			{ title: "Verify your account", progress: user.verified ? 100 : 0, clickHandler: () => router.push("/user/my-account/verification") },
	// 			{ title: "Join or register an org", progress: user.org ? 100 : 0, clickHandler: () => router.push("/user/my-account/org") },
	// 			{
	// 				title: "Teaching my first project",
	// 				progress: user.saves.teachingFirst === "done" ? 100 : 0,
	// 				clickHandler: () => {
	// 					setPopup(teachingContent);
	// 					setUser((state) => ({ ...state, saves: { ...state.saves, teachingFirst: "done" } }));
	// 					updateProfile({
	// 						details: { saves: { teachingFirst: "done" } },
	// 						successHandler: () => {
	// 							setTasks((state) => state.map((task, i) => (i === 2 ? { ...task, progress: 100 } : task)));
	// 						},
	// 					});
	// 				},
	// 			},
	// 			{
	// 				title: "Check out the support tab",
	// 				progress: user.saves.checkedSupport === "done" ? 100 : 0,
	// 				clickHandler: () => {
	// 					console.log("saving");
	// 					setUser((state) => ({ ...state, saves: { ...state.saves, checkedSupport: "done" } }));
	// 					updateProfile({
	// 						details: { saves: { checkedSupport: "done" } },
	// 						successHandler: () => {},
	// 					});
	// 					router.push("/support");
	// 				},
	// 			},
	// 		]);
	// 	}
	// }, [user.loaded]);

	// useEffect(() => {
	// 	if (user.verified) setTasks((state) => state.map((task, i) => (i === 0 ? { ...task, progress: 100 } : task)));
	// }, [user.verified]);

	return (
		<div className={classes.onboarding}>
			<Head>
				<title>Onboarding | CreateBase</title>
				<meta name="description" content="Get to know the platform by completing all the onboarding tasks" />
			</Head>
			<h1 className={classes.h1}>
				Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {globalSession.firstName} 👋
			</h1>
			<div className={classes.main}>
				{/* <div className={classes.tasks}>
					<h2 className={classes.h2}>Onboarding tasks</h2>
					<div className={classes.divider} />
					{tasks.map((task, i) => (
						<div key={i} className={`${classes.task} ${task.progress === 100 ? classes.done : task.progress > 0 ? classes.inProgress : ""}`} onClick={task.clickHandler}>
							{task.progress > 0 ? <i className="material-icons-outlined">{task.progress === 100 ? "done" : "hourglass_top"}</i> : <i className={classes.dot} />}
							<span>{task.title}</span>
							{task.progress > 0 && <div className={classes.progress}>{task.progress}%</div>}
							<i className={`material-icons-outlined ${classes.arrow}`}>chevron_right</i>
						</div>
					))}
				</div>
				{popup && (
					<div className={`${classes.popup} roundScrollbar`}>
						<h2 className={classes.h2}>{popup.title}</h2>
						<p>{popup.content}</p>
					</div>
				)} */}
			</div>
		</div>
	);
};

Onboarding.getLayout = (page) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Onboarding.auth = "any";

export default Onboarding;
