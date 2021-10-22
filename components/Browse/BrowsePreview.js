import { useState } from "react";
import BrowseOverview from "./BrowseOverview";
import BrowseTeaching from "./BrowseTeaching";
import BrowseLearning from "./BrowseLearning";
import { ADMIN_TABS, MEMBER_TABS, STUDENT_TABS, TEACHER_TABS } from "../../constants/browseTabs";

import classes from "./BrowsePreview.module.scss";

const getTabs = (type) => {
	console.log(type);
	switch (type) {
		case "student":
			return STUDENT_TABS;
		case "member":
			return MEMBER_TABS;
		case "teacher":
			return TEACHER_TABS;
		case "admin":
			return ADMIN_TABS;
		default:
			return [];
	}
};

const BrowsePreview = ({ project, videoLoaded, setVideoLoaded, userType }) => {
	const [tab, setTab] = useState(0);

	return (
		<div className={classes.preview}>
			<div className={classes.vidContainer}>
				<video src={`/${project.query}/vid/situation.mp4`} autoPlay={true} muted={true} className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`} onCanPlay={() => setVideoLoaded(true)}>
					<source type="video/mp4" />
				</video>
			</div>
			<div className={classes.details}>
				<h1 className={classes.h1}>{project.name}</h1>

				<div className={classes.tabContainer}>
					{getTabs(userType).map((t, i) => (
						<button key={i} className={`${classes.tab} ${tab === i ? classes.active : ""}`} onClick={() => setTab(i)}>
							{t}
						</button>
					))}
				</div>
				<div className={classes.container}>
					{tab === 0 && <BrowseOverview project={project} userType={userType} />}
					{tab === 1 && <BrowseTeaching project={project} />}
					{tab === 2 && <BrowseLearning learnings={project.learnings} />}
				</div>
			</div>
		</div>
	);
};

export default BrowsePreview;
