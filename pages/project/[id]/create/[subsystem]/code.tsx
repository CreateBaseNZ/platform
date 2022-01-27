import React, { ReactElement, useContext, useEffect } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import NewProjectLayout from "../../../../../components/Layouts/ProjectLayout/NewProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";
import classes from "../../../../../styles/code.module.scss";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";

interface Props {
	data: TProject;
	subsystem: string;
}

const Code = ({ data, subsystem }: Props) => {
	const {} = useMixpanel("project_create_code");
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();

	useEffect(() => {
		if (!globalSession.loaded) return;
		(async () => {
			let saves = {};
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, [subsystem]: "code" } }, date: new Date().toString() });
			console.log("code page saved");
		})();
	}, [globalSession.loaded, globalSession.profileId, data.id, post, subsystem]);

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
