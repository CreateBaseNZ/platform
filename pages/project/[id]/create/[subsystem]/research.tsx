import { ReactElement, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import useMixpanel from "../../../../../hooks/useMixpanel";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import { TProject } from "../../../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import renderModule from "../../../../../lib/renderModule";
import NoModule from "../../../../../components/Project/Modules/NoModule";
import { TModule } from "../../../../../types/modules";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";

import classes from "../../../../../styles/research.module.scss";

interface Props {
	data: TProject;
	subsystem: string;
}

const Research = ({ data, subsystem }: Props) => {
	const router = useRouter();
	const {} = useMixpanel("project_create_research");
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	console.log("loading");

	useEffect(() => {
		if (!globalSession.loaded) return;
		(async () => {
			let saves = {};
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, [subsystem]: "research" } }, date: new Date().toString() });
		})();
		console.log("research page saved");
	}, [globalSession.loaded, globalSession.profileId, data.id, post, subsystem]);

	useEffect(() => {
		if (!router.isReady) return;
		const current = router.query.module as string;
		if (router.query.module) return localStorage.setItem(`${data.id}_${subsystem}`, current);
		const recent = localStorage.getItem(`${data.id}_${subsystem}`);
		if (recent) router.replace({ pathname: router.pathname, query: { ...router.query, module: recent } });
	}, [router, data.id, subsystem]);

	const modules = data.subsystems.find((s) => s.id === subsystem)?.research.modules;

	return (
		<div className={classes.page}>
			<main className={classes.main}>{modules?.length ? renderModule(modules.find((m) => m.title === router.query.module) as TModule, data) : <NoModule />}</main>
		</div>
	);
};

Research.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<ProjectLayout step="Create" substep="research" isFlat={true} hasLeftPanel={true} data={pageProps.data} subsystem={pageProps.subsystem}>
			{page}
		</ProjectLayout>
	);
};

Research.auth = "user";

export default Research;

interface Params {
	params: {
		id: string;
		subsystem: string;
	};
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
			subsystem: params.subsystem,
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return project.subsystems.map((subsystem) => {
				return {
					params: {
						id: project.id,
						subsystem: subsystem.id,
					},
				};
			});
		}).flat(),
		fallback: false,
	};
}
