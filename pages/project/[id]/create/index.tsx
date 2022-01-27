import { ReactElement, useContext, useEffect } from "react";
import NewProjectLayout from "../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_OBJECT, ALL_PROJECTS_ARRAY } from "../../../../constants/projects";
import { TProject } from "../../../../types/projects";
import { ReactFlowProvider } from "react-flow-renderer";
import SubsystemsFlow from "../../../../components/Project/SubsystemsFlow";
import classes from "../../../../styles/create.module.scss";
import GlobalSessionContext from "../../../../store/global-session-context";
import useApi from "../../../../hooks/useApi";

interface Props {
	data: TProject;
}

const Create = ({ data }: Props) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!globalSession.loaded) return;
		let saves = {};
		(async () => {
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, step: "create" } }, date: new Date().toString() });
			console.log("create page saved");
		})();
	}, [globalSession.loaded, globalSession.profileId, data.id, post]);

	return (
		<div className={classes.page}>
			<ReactFlowProvider>
				<SubsystemsFlow data={data} />
			</ReactFlowProvider>
		</div>
	);
};

Create.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" data={pageProps.data}>
			{page}
		</NewProjectLayout>
	);
};

Create.auth = "user";

export default Create;

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
			return {
				params: {
					id: project.id,
				},
			};
		}),
		fallback: false,
	};
}
