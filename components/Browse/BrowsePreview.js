import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrowseOverview from "./BrowseOverview";
import BrowseTeaching from "./BrowseTeaching";
import BrowseLearning from "./BrowseLearning";
import { SecondaryButton } from "../UI/Buttons";

import classes from "./BrowsePreview.module.scss";
import { useRouter } from "next/router";

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

	useEffect(() => {
		return () => (ref.current = false);
	}, []);

	useEffect(() => {
		const tab = router?.query?.tab;
		const queriedStep = getTabs(role).find((t) => t === tab);
		if (queriedStep) {
			setTab(queriedStep);
		}
	}, [router.query.tab]);

	useEffect(() => {
		if (ref.current) {
			setVideoLoaded(false);
		}
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
