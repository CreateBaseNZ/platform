import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import useMixpanel from "../../../../../hooks/useMixpanel";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";
import classes from "../../../../../styles/code.module.scss";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";
// import Console from "../../../../../components/Project/Code/Console";
import Unity from "../../../../../components/Project/Code/Unity";
import Editor from "../../../../../components/Project/Code/Editor";
import useUnity from "../../../../../hooks/useUnity";
import { UnityContext } from "react-unity-webgl";
import CodeContext from "../../../../../store/code-context";

let Console: any = () => <></>;
let Hook: any = () => {};
let Unhook: any = () => {};

interface Props {
	data: TProject;
	subsystem: string;
	subsystemIndex: number;
}

const Code = ({ data, subsystem, subsystemIndex }: Props) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const intervalRef = useRef<NodeJS.Timeout>();
	const workerRef = useRef<Worker>();
	const consoleRef = useRef<HTMLDivElement>(null);
	const {} = useMixpanel("project_create_code");
	const { globalSession } = useContext(GlobalSessionContext);
	const { codeLayout, codeTab } = useContext(CodeContext);
	const { post } = useApi();
	const [logs, setLogs] = useState<any[]>([]);
	const [unityLoaded, setUnityLoaded] = useState(false);
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: data.id,
		scenePrefix: data.scenePrefix,
		suffix: "",
		index: subsystemIndex,
		wip: data.wip,
		setLoaded: setUnityLoaded,
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

	useEffect(() => {
		if (!consoleRef.current) return;
		consoleRef.current.scrollTop = consoleRef.current.scrollHeight - consoleRef.current.clientHeight;
	}, [logs]);

	useEffect(() => {
		(async () => {
			// ({ Console, Hook, Unhook } = await import("console-feed"));

			// Hook((iframeRef.current?.contentWindow as any)?.console, (log: any) => setLogs((state) => [...state, log]), false);
			// return () => void Unhook((iframeRef.current?.contentWindow as any)?.console);

			({ Console } = await import("console-feed"));
		})();
	}, []);

	// const run = (code: string) => {
	// 	const fn = (iframeRef.current?.contentWindow as any)?.Function;
	// 	fn(
	// 		"sensorData",
	// 		`
	//     try {
	//       ${code}
	//     } catch(error) {
	//       console.error(error)
	//     }`
	// 	)(sensorData);
	// };

	const run = async (code: string) => {
		workerRef.current?.terminate();
		workerRef.current = new window.Worker("/user-worker.js", { name: code });
		({ Hook, Unhook } = await import("console-feed"));
		Hook(window.console, (log: any) => setLogs((state) => [...state, log]), false);
		workerRef.current.onerror = (err) => err;
		workerRef.current.onmessage = (e) => {
			// Function(e.mainThreadCode)()
			console.log(e.data.buffer);
		};
		intervalRef.current = setInterval(() => {
			workerRef.current?.postMessage({ sensorDataString: sensorData });
		}, 1000 / 1);
	};

	const stop = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
		Unhook(window.console);
		workerRef.current?.terminate();
	};

	return (
		<div className={classes.page}>
			<div className={`${classes.main} ${classes[`${codeLayout.toLowerCase()}Layout`]}`}>
				<div className={classes.editor}>
					<Editor run={run} stop={stop} />
				</div>
				<div className={classes.unity}>
					<Unity unityContext={unityContext as UnityContext} unityLoaded={unityLoaded} />
				</div>
				<div ref={consoleRef} className={classes.console}>
					{Console && <Console logs={logs} variant="light" />}
				</div>
			</div>
			<iframe ref={iframeRef} className={classes.iframe} name="yes" />
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
