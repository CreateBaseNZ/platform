import { ReactElement, useContext, useEffect } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { TProject } from "../../../../../types/projects";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import classes from "../../../../../styles/plan.module.scss";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";

interface Props {
	data: TProject;
	subsystem: string;
}

const Plan = ({ data, subsystem }: Props) => {
	const {} = useMixpanel("project_create_plan");
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!globalSession.loaded) return;
		(async () => {
			let saves = {};
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, [subsystem]: "plan" } }, date: new Date().toString() });
			console.log("plan page saved");
		})();
	}, [globalSession.loaded, globalSession.profileId, data.id, post, subsystem]);

	return <div className={classes.page}></div>;
};

Plan.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<NewProjectLayout step="Create" substep="plan" data={pageProps.data} subsystem={pageProps.subsystem} isFlat={true} hasLeftPanel={true}>
			{page}
		</NewProjectLayout>
	);
};

Plan.auth = "user";

export default Plan;

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
