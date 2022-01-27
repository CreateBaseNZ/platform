import { ReactElement } from "react";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";

interface Props {
	data: TProject;
	subsystem: string;
}

const Subsystem = ({ data, subsystem }: Props) => {
	return null;
};

Subsystem.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" isFlat={true} hasLeftPanel={true} data={pageProps.data} subsystem={pageProps.subsystem}>
			{page}
		</NewProjectLayout>
	);
};

Subsystem.auth = "user";

export default Subsystem;

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
