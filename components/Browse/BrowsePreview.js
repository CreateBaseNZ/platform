import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrowseOverview from "./BrowseOverview";
import BrowseTeaching from "./BrowseTeaching";
import BrowseLearning from "./BrowseLearning";
import { SecondaryButton } from "../UI/Buttons";
import axios from "axios";

import classes from "./BrowsePreview.module.scss";
import { useRouter } from "next/router";

import GlobalSessionContext from "../../store/global-session-context";
import mixpanel from "mixpanel-browser";

const getTabs = (role) => {
	switch (role) {
		case "student":
			return ["overview"];
		case "teacher":
			return ["overview", "learning", "teaching"];
		case "admin":
			return ["overview", "learning", "teaching"];
		default:
			return ["overview", "learning", "teaching"];
	}
};

const BrowsePreview = ({ project, role }) => {
	const ref = useRef();
	const router = useRouter();
	const [tab, setTab] = useState(getTabs(role)[0]);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const { globalSession } = useContext(GlobalSessionContext);

	// Setup Mixpanel Config
	useEffect(async () => {
		mixpanel.init("05ac2b14242d76453c53168b2304778d", { api_host: "https://api.mixpanel.com" });
		mixpanel.identify(globalSession.profileId);
		// Test query mixpanel
		const options = {
			method: "GET",
			headers: {
				Accept: "text/plain",
				Authorization: "Basic Yzk3NmNkMjFmYWViOTdhNmI0NzE2YWFkZDI4ODBjNDM6",
			},
		};

		fetch("https://data.mixpanel.com/api/2.0/export?from_date=2021-01-01&to_date=2021-11-21", options)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		return () => (ref.current = false);
	}, []);

	useEffect(() => {
		const tab = router?.query?.tab;
		const queriedStep = getTabs(role).find((t) => t === tab);
		if (queriedStep) {
			setTab(queriedStep);
			mixpanel.track(`${project.name} ${tab}`, { Hello: "World!" });
		}
	}, [router.query.tab]);

	useEffect(() => {
		if (ref.current) {
			setVideoLoaded(false);
		}
		mixpanel.track(`${project.name} Card`, { Hello: "World!" });
	}, [project]);

	const canPlayHandler = () => {
		if (ref.current) {
			window.requestAnimationFrame(() => setVideoLoaded(true));
		}
	};

	return (
		<div className={classes.preview}>
			<div className={classes.vidContainer}>
				<video
					ref={ref}
					src={`https://raw.githubusercontent.com/CreateBaseNZ/public/main/${project.query}/vid/situation.mp4`}
					autoPlay={true}
					muted={true}
					className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`}
					onCanPlay={canPlayHandler}>
					<source type="video/mp4" />
				</video>
			</div>
			<div className={classes.details}>
				<h1 className={classes.h1}>{project.name}</h1>
				<div className={classes.tabContainer}>
					{getTabs(role).map((t) => (
						<Link key={t} href={`/browse/${project.query}/${t}`}>
							<button className={`${classes.tab} ${tab === t ? classes.active : ""}`}>{t}</button>
						</Link>
					))}
				</div>
				<div className={classes.container}>
					{tab === "overview" && <BrowseOverview project={project} />}
					{tab === "learning" && <BrowseLearning learnings={project.learnings} />}
					{tab === "teaching" && <BrowseTeaching project={project} role={role} />}
				</div>
				<Link href={`/project/${project.query}`}>
					<div>
						<SecondaryButton className={classes.continueBtn} mainLabel="Continue" iconRight={<i className="material-icons-outlined">play_arrow</i>} />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default BrowsePreview;
