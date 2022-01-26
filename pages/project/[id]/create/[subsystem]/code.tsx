import React, { ReactElement } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";
import classes from "../../../../../styles/code.module.scss";

interface Props {
	data: TProject;
}

const Code = ({ data }: Props) => {
	const {} = useMixpanel("project_create_code");

	return <div className={classes.page}></div>;
};

Code.getLayout = (page: ReactElement, data: any) => {
	return (
		<NewProjectLayout step="Create" substep="code" isFlat={true} hasLeftPanel={true} data={data.data}>
			{page}
		</NewProjectLayout>
	);
};

Code.auth = "user";

export default Code;

interface Params {
	params: {
		id: string;
	};
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
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
