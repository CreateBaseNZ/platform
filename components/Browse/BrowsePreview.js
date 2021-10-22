import { useState } from "react";
import { SecondaryButton } from "../UI/Buttons";
import Link from "next/link";

import classes from "./BrowsePreview.module.scss";
import BrowseOverview from "./BrowseOverview";
import BrowseTeaching from "./BrowseTeaching";

const tabs = ["Overview", "Teaching", "Learning"];

const BrowsePreview = ({ project, videoLoaded, setVideoLoaded, userType = "guest" }) => {
	const [tab, setTab] = useState(0);

	const clickHandler = (i) => setTab(i);

	return (
		<div className={classes.preview}>
			<div className={classes.vidContainer}>
				<video src={`/${project.query}/vid/situation.mp4`} autoPlay={true} muted={true} className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`} onCanPlay={() => setVideoLoaded(true)}>
					<source type="video/mp4" />
				</video>
			</div>
			<div className={classes.details}>
				<h1 className={classes.h1}>{project.name}</h1>
				<div className={classes.container}>
					{tab === 0 && <BrowseOverview project={project} userType={userType} />}
					{tab === 1 && <BrowseTeaching project={project} />}
				</div>
				{tab === 2 && (
					<div className={classes.learning}>
						By the end of this Project, learners will be able to:
						<ol>
							{project.learnings.map((text, i) => (
								<li key={i}>{text}</li>
							))}
						</ol>
					</div>
				)}
			</div>
			{(userType === "teacher" || userType === "admin") && (
				<div className={classes.tabContainer}>
					{tabs.map((t, i) => (
						<button key={i} className={`${classes.tab} ${tab === i ? classes.active : ""}`} onClick={() => clickHandler(i)}>
							{t}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default BrowsePreview;
