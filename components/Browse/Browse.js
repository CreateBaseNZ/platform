import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import UserSessionContext from "../../store/user-session";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import BrowseThumb from "./BrowseThumb";
import BrowsePreview from "./BrowsePreview";
import { allData } from "../../utils/getProjectData";

import "overlayscrollbars/css/OverlayScrollbars.css";
import classes from "/styles/browse.module.scss";

const Browse = () => {
	const router = useRouter();
	const { userSession } = useContext(UserSessionContext);
	const [activeProject, setActiveProject] = useState(allData[0]);

	useEffect(() => {
		const query = router?.query?.project;
		const queriedProject = allData.find((data) => data.query === query);
		if (queriedProject) {
			setActiveProject(queriedProject);
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
					<BrowsePreview project={activeProject} role={userSession.view?.role} />
				</div>
				<h2 className={classes.h2}>All Projects</h2>
				<div className={classes.allProjects}>
					{allData.map((project, index) => (
						<BrowseThumb key={index} isActive={activeProject.query === project.query} project={project} query={project.query} name={project.name} />
					))}
					{[...Array(allData.length % 4).keys()].map((i) => (
						<div key={i} className={classes.empty} />
					))}
				</div>
			</div>
		</OverlayScrollbarsComponent>
	);
};

Browse.getLayout = (page) => {
	return <MainLayout page="browse">{page}</MainLayout>;
};

Browse.authorisation = "user";

export default Browse;
