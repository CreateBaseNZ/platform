import { ReactElement } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { IProjectReadOnly } from "../../../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import classes from "../../../../../styles/plan.module.scss";

interface Props {
	data: IProjectReadOnly;
}

const Plan = ({ data }: Props) => {
	const {} = useMixpanel("project_create_plan");

	return <div className={classes.page}></div>;
};

Plan.getLayout = (page: ReactElement, data: any) => {
	return (
		<NewProjectLayout step="Create" substep="plan" data={data.data} isFlat={true} hasLeftPanel={true}>
			{page}
		</NewProjectLayout>
	);
};

Plan.auth = "user";

export default Plan;

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
