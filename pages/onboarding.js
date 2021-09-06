import { useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { initSession } from "../utils/authHelpers";
import Frame from "../components/Frame";

import classes from "/styles/Onboarding.module.scss";

const tasks = [
	{ title: "Join or create an org", progress: 100 },
	{ title: "Platform Lite in 60 seconds", progress: 60 },
	{ title: "Teaching my first project", progress: 0 },
];

const Onboarding = ({ setLoaded }) => {
	const [session, loading] = useSession();
	const [user, setUser] = useState({});

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	if (loading) {
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
				<div className={classes.tasks}>
					<h2 className={classes.h2}>Onboarding tasks</h2>
					<div className={classes.divider} />
					{tasks.map((task) => (
						<div className={`${classes.task} ${task.progress === 100 ? classes.done : task.progress > 0 ? classes.inProgress : ""}`}>
							{task.progress > 0 ? <i className="material-icons-outlined">{task.progress === 100 ? "done" : "hourglass_top"}</i> : <i className={classes.dot} />}
							<span>{task.title}</span>
							{task.progress > 0 && <div className={classes.progress}>{task.progress}%</div>}
							<i className={`material-icons-outlined ${classes.arrow}`}>chevron_right</i>
						</div>
					))}
				</div>
			</div>
		</Frame>
	);
};

export default Onboarding;
