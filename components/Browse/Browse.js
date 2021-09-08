import { useState } from "react";
import BrowseThumb from "./BrowseThumb";
import sendItData from "../../data/send-it-data";
import magnebotData from "../../data/magnebot-data";
import lineFollowingData from "../../data/line-following-data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";
import BrowsePreview from "./BrowsePreview";

import classes from "./Browse.module.scss";

const allData = [sendItData];

const Browse = ({ user }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [videoLoaded, setVideoLoaded] = useState(false);

	const thumbnailHandler = (index) => {
		setVideoLoaded(false);
		setActiveIndex(index);
	};

	return (
		<OverlayScrollbarsComponent className={classes.browse}>
			<Head>
				<title>Browse | CreateBase</title>
				<meta name="description" content="Browse CreateBase projects" />
			</Head>
			<div className={classes.inner}>
				<div className={classes.preview}>
					<BrowsePreview project={allData[activeIndex]} videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} paidAccess={user.loaded && (user.type === "admin" || user.type === "educator")} />
				</div>
				<h2 className={classes.h2}>All Projects</h2>
				<div className={classes.allProjects}>
					{allData.map((project, index) => (
						<BrowseThumb key={index} isActive={activeIndex === index} index={index} query={project.query} name={project.name} thumbnailHandler={thumbnailHandler} />
					))}
					{[...Array(allData.length % 4).keys()].map((i) => (
						<div key={i} className={classes.empty} />
					))}
				</div>
			</div>
		</OverlayScrollbarsComponent>
	);
};

export default Browse;
