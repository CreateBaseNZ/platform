import { ReactElement, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import GlobalSessionContext from "../../store/global-session-context";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import BrowseThumb from "./BrowseThumb";
import BrowsePreview from "./BrowsePreview";
import { ALL_PROJECTS_ARRAY } from "../../utils/getProjectData";

import "overlayscrollbars/css/OverlayScrollbars.css";
import classes from "../../styles/browse.module.scss";

const Browse = (): JSX.Element => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);
	const [activeProject, setActiveProject] = useState(ALL_PROJECTS_ARRAY[0]);

	useEffect(() => {
		const query = router?.query?.project;
		const queriedProject = ALL_PROJECTS_ARRAY.find((data) => data.query === query);
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
					<BrowsePreview project={activeProject} role={globalSession.groups[globalSession.recentGroups?.[0]]?.role} />
				</div>
				<h2 className={classes.h2}>All Projects</h2>
				<div className={classes.allProjects}>
					{ALL_PROJECTS_ARRAY.map((project, index) => (
						<BrowseThumb key={index} isActive={activeProject.query === project.query} query={project.query} name={project.name} />
					))}
					{[...Array(ALL_PROJECTS_ARRAY.length % 4)].map((_, i) => (
						<div key={i} className={classes.empty} />
					))}
				</div>
			</div>
		</OverlayScrollbarsComponent>
	);
};

Browse.getLayout = (page: ReactElement) => {
	return <MainLayout page="browse">{page}</MainLayout>;
};

Browse.auth = "user";

export default Browse;
