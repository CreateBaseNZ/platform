import { useEffect, useState } from "react";
import BrowseThumb from "./BrowseThumb";
import Head from "next/head";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/css/OverlayScrollbars.css";
import BrowsePreview from "./BrowsePreview";
import { allData } from "../../utils/getProjectData";

import classes from "./Browse.module.scss";
import { useRouter } from "next/router";

const Browse = ({ user }) => {
	const router = useRouter();
	const [activeProject, setActiveProject] = useState(allData[0]);
	const [videoLoaded, setVideoLoaded] = useState(false);

	useEffect(() => {
		if (router.query && router.query.view[0] === "browse") {
			const query = router.query.view[1] || "";
			const queriedProject = allData.filter((data) => data.query === query)[0];
			if (queriedProject) {
				setActiveProject(queriedProject);
			} else {
				router.replace(`/browse/${allData[0].query}`);
			}
		}
	}, [router.query]);

	return (
		<OverlayScrollbarsComponent className={classes.browse}>
			<Head>
				<title>Browse | CreateBase</title>
				<meta name="description" content="Browse CreateBase projects" />
			</Head>
			<div className={classes.inner}>
				<div className={classes.preview}>
					<BrowsePreview project={activeProject} videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} user={user} />
				</div>
				<h2 className={classes.h2}>All Projects</h2>
				<div className={classes.allProjects}>
					{allData.map((project, index) => (
						<BrowseThumb key={index} isActive={activeProject.query === project.query} project={project} query={project.query} name={project.name} setVideoLoaded={setVideoLoaded} />
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
