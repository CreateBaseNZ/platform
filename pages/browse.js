import { useState, useEffect } from "react";
import Head from "next/head";
import BrowseThumb from "../components/Browse/BrowseThumb";
import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import lineFollowingData from "../data/line-following-data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useSession } from "next-auth/client";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { initSession } from "../utils/authHelpers";
import Frame from "../components/Frame";
import BrowsePreview from "../components/Browse/BrowsePreview";

import classes from "/styles/Browse.module.scss";

const allData = [sendItData, magnebotData];

const Browse = ({ setLoaded }) => {
	const [session, loading] = useSession();
	const [user, setUser] = useState({});
	const [activeIndex, setActiveIndex] = useState(0);
	const [videoLoaded, setVideoLoaded] = useState(false);

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

	const thumbnailHandler = (index) => {
		setVideoLoaded(false);
		setActiveIndex(index);
	};

	return (
		<Frame tabIndex={1} session={session} type={user.type} org={user.org} username={user.username} displayName={user.displayName}>
			<OverlayScrollbarsComponent className={classes.browse}>
				<div className={classes.inner}>
					<Head>
						<title>Browse | CreateBase</title>
						<meta name="description" content="Browse CreateBase projects" />
					</Head>
					<div className={classes.preview}>
						<BrowsePreview project={allData[activeIndex]} videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} paidAccess={session && user && user.type !== "learner"} />
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
		</Frame>
	);
};

export default Browse;
