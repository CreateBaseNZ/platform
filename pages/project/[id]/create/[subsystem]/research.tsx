import { ReactElement } from "react";
import { useRouter } from "next/router";
import useMixpanel from "../../../../../hooks/useMixpanel";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { IProjectReadOnly } from "../../../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import renderModule from "../../../../../lib/renderModule";
import NoModule from "../../../../../components/Project/NoModule";

import classes from "../../../../../styles/research.module.scss";

interface Props {
	data: IProjectReadOnly;
	subsystem: string;
}

const Research = ({ data, subsystem }: Props) => {
	const router = useRouter();
	const {} = useMixpanel("project_create_research");

	const modules = data.subsystems.find((s) => s.id === subsystem)?.research.modules;

	return (
		<div className={classes.page}>
			<main className={classes.main}>{modules?.length ? renderModule(modules.find((m) => m.title === router.query.module)) : <NoModule />}</main>
		</div>
	);
};

Research.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" substep="research" isFlat={true} hasLeftPanel={true} data={pageProps.data} subsystem={pageProps.subsystem}>
			{page}
		</NewProjectLayout>
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
