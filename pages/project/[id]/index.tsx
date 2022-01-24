import router from "next/router";
import ProjectLayout from "../../../components/Layouts/ProjectLayout/ProjectLayout";
import getProjectData, { ALL_PROJECTS_ARRAY } from "../../../utils/getProjectData";

const ProjectRoot = () => {
	router.replace({ pathname: "/project/[id]/define", query: router.query });

	return null;
};

ProjectRoot.getLayout = (page) => {
	return <ProjectLayout>{page}</ProjectLayout>;
};

ProjectRoot.auth = "user";

export default ProjectRoot;

interface Params {
	params: {
		id: string;
	};
}

export async function getStaticProps({ params }: Params) {
	console.log(params);
	return {
		props: {
			data: getProjectData(params.id),
		},
	};
}

export async function getStaticPaths() {
	return {
		paths: ALL_PROJECTS_ARRAY.map((project) => {
			return {
				params: {
					id: project.query,
				},
			};
		}),
		fallback: false,
	};
}
