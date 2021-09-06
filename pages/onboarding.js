import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { initSession } from "../utils/authHelpers";
import Frame from "../components/Frame";
import VisualBellContext from "../store/visual-bell-context";

import classes from "/styles/Onboarding.module.scss";
import router from "next/router";
import { updateProfile } from "../utils/profileHelpers";

const teachingContent = { title: "Teaching my first project", content: "Yeap" };

const Onboarding = ({ setLoaded }) => {
	const ctx = useContext(VisualBellContext);
	const [session, loading] = useSession();
	const [user, setUser] = useState({});
	const [tasks, setTasks] = useState([]);
	const [popup, setPopup] = useState();

	console.log(user);

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	useEffect(() => {
		if (user.type) {
			setTasks([
				{ title: "Join or create an org", progress: user.org ? 100 : 0, clickHandler: () => router.replace("/user/my-account") },
				{
					title: "Teaching my first project",
					progress: user.saves.teachingFirst === "done" ? 100 : 0,
					clickHandler: () => {
						setPopup(teachingContent);
						updateProfile(
							{ saves: { teachingFirst: "done" } },
							() =>
								ctx.setBell({
									type: "catastrophe",
									message: "Oops! Something went wrong, please refresh the page and try again",
								}),
							() =>
								ctx.setBell({
									type: "catastrophe",
									message: "Oops! Something went wrong, please refresh the page and try again",
								}),
							(content) => {
								//TODO
								console.log(content);
							},
							() => {
								setTasks((state) => state.map((task, i) => (i === 1 ? { ...task, progress: 100 } : task)));
							}
						);
					},
				},
				{ title: "Platform Lite in 60 seconds (coming soon)", progress: "Coming soon", clickHandler: () => {} },
			]);
		}
	}, [user.type]);

	console.log(tasks);

	if (loading || !user.type) {
		return null;
	}

	if (user.type === "learner") {
		router.replace("/browse");
		return null;
	}

	return (
		<Frame tabIndex={0} session={session} type={user.type} org={user.org} username={user.username} displayName={user.displayName}>
			<Head>
				<title>FAQ | CreateBase</title>
				<meta name="description" content="Frequently asked questions about the CreateBase platform" />
			</Head>
			<div className={classes.onboarding}>
				<h1 className={classes.h1}>
					Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {user.displayName} 👋
				</h1>
				<div className={classes.main}>
					<div className={classes.tasks}>
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
						<div className={classes.popup}>
							<h2 className={classes.h2}>{popup.title}</h2>
							<p>{popup.content}</p>
						</div>
					)}
				</div>
			</div>
		</Frame>
	);
};

export default Onboarding;
