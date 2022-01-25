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
