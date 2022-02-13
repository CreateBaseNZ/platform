import React, { ReactElement, useContext, useEffect, useState } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";
import classes from "../../../../../styles/code.module.scss";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";
import Console from "../../../../../components/Project/Code/Console";
import Unity from "../../../../../components/Project/Code/Unity";
import Editor from "../../../../../components/Project/Code/Editor";
import useUnity from "../../../../../hooks/useUnity";

interface Props {
	data: TProject;
	subsystem: string;
	subsystemIndex: number;
}

const Code = ({ data, subsystem, subsystemIndex }: Props) => {
	const {} = useMixpanel("project_create_code");
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const [gameLoaded, setGameLoaded] = useState(false);
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: data.id,
		scenePrefix: data.scenePrefix,
		suffix: "",
		index: subsystemIndex,
		wip: data.wip,
		setLoaded: setGameLoaded,
	});

	useEffect(() => {
		if (!globalSession.loaded) return;
		(async () => {
			let saves = {};
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, [subsystem]: "code" } }, date: new Date().toString() });
			console.log("code page saved");
		})();
	}, [globalSession.loaded, globalSession.profileId, data.id, post, subsystem]);

	return (
		<div className={classes.page}>
			<div className={classes.main}>
				<div className={classes.editor}>
					<Editor />
				</div>
				<div className={classes.unity}>
					<Unity unityContext={unityContext} />
				</div>
				<div className={classes.console}>
					<Console />
				</div>
			</div>
		</div>
	);
};

Code.getLayout = (page: ReactElement, pageProps: any) => {
	return (
		<ProjectLayout step="Create" substep="code" isFlat={true} hasLeftPanel={true} data={pageProps.data} subsystem={pageProps.subsystem}>
			{page}
		</ProjectLayout>
	);
};

Code.auth = "user";

export default Code;

interface Params {
	params: {
		id: string;
		subsystem: string;
		subsystemIndex: number;
	};
}

export async function getStaticProps({ params }: Params) {
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[params.id],
			subsystem: params.subsystem,
			subsystemIndex: ALL_PROJECTS_OBJECT[params.id].subsystems.findIndex((subsys) => subsys.id === params.subsystem),
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
