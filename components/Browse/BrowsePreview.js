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
// NOTE: Mixpanel Tracking
// // Imports;
// import mixpanel from "mixpanel-browser";
// import tracking from "../../utils/tracking";

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

	// NOTE: Mixpanel Tracking
	// // Setup Mixpanel Config Initialisation
	// useEffect(async () => {
	// 	// Initialise the mixpanel channel
	// 	// The parameter is the API Key
	// 	mixpanel.init(process.env.NEXT_PUBLIC_PROJECT_A_TOKEN);
	// 	// Set the distinct_id of the events that will be created
	// 	mixpanel.identify(globalSession.profileId);
	// 	// EXAMPLE: Fetching data
	// 	// Array of filters
	// 	// Each filter has two properties:
	// 	//			event - the event name that we want to retrieve
	// 	//			properties - further filter the datasets to only containing the properties specified
	// 	const filters = [
	// 		{
	// 			event: "MagneBot Card",
	// 			properties: [{ distinct_id: globalSession.profileId, string: "Hello World!" }],
	// 		},
	// 	];
	// 	let data;
	// 	try {
	// 		data = await tracking.retrieve(process.env.NEXT_PUBLIC_PROJECT_A_SECRET, filters);
	// 	} catch (error) {
	// 		// TODO: Error handling
	// 	}
	// 	console.log(data);
	// }, []);

	useEffect(() => {
		return () => (ref.current = false);
	}, []);

	useEffect(() => {
		const tab = router?.query?.tab;
		const queriedStep = getTabs(role).find((t) => t === tab);
		if (queriedStep) {
			setTab(queriedStep);
			// NOTE: Mixpanel Tracking
			// // Additional data to store
			// const data = {
			// 	property1: "value1",
			// 	property2: 2,
			// };
			// // Create an event, with the first parameter is the event name.
			// // The second parameter is optional, it contains additional data to store.
			// mixpanel.track(`${project.name} ${tab}`, data);
		}
	}, [router.query.tab]);

	useEffect(() => {
		if (ref.current) {
			setVideoLoaded(false);
		}
		// NOTE: Mixpanel Tracking
		// // Additional data to store
		// const data = {
		// 	string: "Hello World!",
		// 	number: 42069,
		// 	array: [1, 2, 3, 4, 5],
		// };
		// // Create an event, with the first parameter is the event name.
		// // The second parameter is optional, it contains additional data to store.
		// mixpanel.track(`${project.name} Card`, data);
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
