import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import BrowseThumb from "../components/Browse/BrowseThumb";
import BrowsePreview from "../components/Browse/BrowsePreview";
import { allData } from "../utils/getProjectData";

import "overlayscrollbars/css/OverlayScrollbars.css";
import classes from "/styles/browse.module.scss";
import UserSessionContext from "../store/user-session";

const Browse = (props) => {
	const router = useRouter();
	const { userSession } = useContext(UserSessionContext);
	const [activeProject, setActiveProject] = useState(allData[0]);
	const [videoLoaded, setVideoLoaded] = useState(false);

	useEffect(() => {
		const query = router?.query?.project;
		const queriedProject = allData.filter((data) => data.query === query)[0];
		if (queriedProject) {
			setActiveProject(queriedProject);
		} else {
			router.replace({ pathname: "/browse", query: { project: allData[0].query } });
		}
	}, [router.query.project]);

	return (
		<OverlayScrollbarsComponent className={classes.browse}>
			<Head>
				<title>Browse | CreateBase</title>
				<meta name="description" content="Browse CreateBase projects" />
			</Head>
			<div className={classes.inner}>
				<div className={classes.preview}>
					<BrowsePreview project={activeProject} videoLoaded={videoLoaded} setVideoLoaded={setVideoLoaded} userType={userSession.view?.userType} />
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

Browse.getLayout = function getLayout(page) {
	return <MainLayout page="browse">{page}</MainLayout>;
};

export default Browse;
