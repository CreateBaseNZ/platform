import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import * as esprima from "esprima";
import * as escodegen from "escodegen";
import useMixpanel from "../../../../../hooks/useMixpanel";
import ProjectLayout from "../../../../../components/Layouts/ProjectLayout/ProjectLayout";
import { ALL_PROJECTS_ARRAY, ALL_PROJECTS_OBJECT } from "../../../../../constants/projects";
import { TProject } from "../../../../../types/projects";
import GlobalSessionContext from "../../../../../store/global-session-context";
import useApi from "../../../../../hooks/useApi";
import Unity from "../../../../../components/Project/Code/Unity";
import Editor from "../../../../../components/Project/Code/Editor";
import useUnity from "../../../../../hooks/useUnity";
import { Restart, Run, Stop, Unlink } from "../../../../../types/editor";
import { wrapper } from "../../../../../store/store";
import { ParsedUrlQuery } from "querystring";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../../../../store/reducers/reducer";
import { fetchCodeStepData, TCodeStepState } from "../../../../../store/reducers/codeStepReducer";
import classes from "../../../../../styles/code.module.scss";

declare global {
	interface String {
		insert(index: number, string: string): string;
	}
}

String.prototype.insert = function (index: number, string: string) {
	const ind = index < 0 ? this.length + index : index;
	return this.substring(0, ind) + string + this.substring(ind);
};

let Console: any = () => <></>;
let Hook: any = () => <></>;

interface Props {
	data: TProject;
	subsystem: string;
	subsystemIndex: number;
}

const Code = ({ data, subsystem, subsystemIndex }: Props) => {
	const workerRef = useRef<Worker>();
	const consoleRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const sensorDataRef = useRef<any>();
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const {} = useMixpanel("project_create_code");
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
	sensorDataRef.current = sensorData;
	const { layout, activeFileId } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!globalSession.loaded) return;
		(async () => {
			let saves = {};
			await post("/api/profile/read-saves", { profileId: globalSession.profileId, properties: [data.id] }, (savesData) => (saves = savesData.content[data.id]));
			post("/api/profile/update-saves", { profileId: globalSession.profileId, update: { [data.id]: { ...saves, [subsystem]: "code" } }, date: new Date().toString() });
		})();
	}, [globalSession.loaded, globalSession.profileId, data.id, post, subsystem]);

	useEffect(() => {
		if (!globalSession.loaded) return;
		dispatch(fetchCodeStepData(globalSession.profileId, data.id, subsystem));
	}, [globalSession.loaded, globalSession.profileId, data.id, subsystem, dispatch]);

	useEffect(() => {
		if (!consoleRef.current) return;
		consoleRef.current.scrollTop = consoleRef.current.scrollHeight - consoleRef.current.clientHeight;
	}, [logs]);

	useEffect(() => {
		(async () => {
			({ Console, Hook } = await import("console-feed"));
			// Hook(window.console, (log) => setLogs((state) => [...state, log]), false);
		})();
	}, []);

	const stop: Stop = useCallback(() => {
		workerRef.current?.terminate();
		if (intervalRef.current) clearInterval(intervalRef.current);
		resetScene();
		dispatch({ type: "code-step/SET_RUNNING_FILE", payload: "" });
	}, []);

	const run: Run = useCallback(
		(value) => {
			stop();
			console.log(activeFileId);
			dispatch({ type: "code-step/SET_RUNNING_FILE", payload: activeFileId });

			// let initNode = {};
			// let loopNode = {};
			// try {
			// 	const ast = esprima.parseScript(value, { loc: true, range: true, tolerant: true }, (node: any) => {
			// 		// console.log(node);
			// 		if (node.name === "init" && node.type === "Identifier") {
			// 			initNode = node;
			// 		} else if (node.name === "loop") {
			// 			loopNode = node;
			// 		}
			// 		console.log(ast);
			// 	});
			// } catch (e) {
			// 	console.log(e);
			// 	setLogs((logs) => [...logs, { method: "error", id: uuidv4(), data: e }]);
			// }
			// console.log(escodegen.generate(ast));

			workerRef.current = new Worker(new URL("/lib/worker.js", import.meta.url), { name: value });

			workerRef.current.onmessage = (evt) => {
				const payload = JSON.parse(evt.data);
				console.log(`WebWorker response:`);
				console.log(payload);
				if (["console.log", "console.debug", "console.info", "console.warn", "console.error"].includes(payload.fn)) {
					setLogs((logs) => [...logs, { method: payload.fn.split(".")[1], id: uuidv4(), data: payload.params }]);
				} else if (payload.fn === "unityContext.send") {
					unityContext.send(...(payload.params as [string, string, any]));
				} else if (payload.fn === "terminate") {
					stop();
				} else if (payload.fn === "hang") {
					workerRef.current?.terminate();
					if (intervalRef.current) clearInterval(intervalRef.current);
				}
			};

			// intervalRef.current = setInterval(() => {
			// 	workerRef.current?.postMessage(sensorDataRef.current);
			// }, 500);

			// setInterval(() => console.log(sensorData), 1000);
		},
		[activeFileId, dispatch, stop]
	);

	const restart: Restart = useCallback(() => {
		// TODO @louis
	}, []);

	const unlink: Unlink = useCallback(() => {
		// TODO @louis
	}, []);

	return (
		<div className={classes.page}>
			<div className={`${classes.main} ${classes[`${layout.toLowerCase()}Layout`]}`}>
				<div className={classes.editor}>
					<Editor projectId={data.id} subsystem={subsystem} run={run} stop={stop} restart={restart} unlink={unlink} />
				</div>
				<div className={classes.unity}>
					<Unity unityContext={unityContext as UnityContext} unityLoaded={unityLoaded} />
				</div>
				<div className={classes.consoleContainer}>
					<div className={classes.consoleHeader}>
						<div className={classes.consoleTitle}>Console</div>
						<div className={classes.consoleBtnContainer}>
							<button title="Clear console" className={classes.clearConsole} onClick={() => setLogs([])}>
								<Image src={`https://raw.githubusercontent.com/CreateBaseNZ/public/dev/project-pages/clear-console.svg`} height={24} width={24} alt="Clear console" />
							</button>
						</div>
					</div>
					<div ref={consoleRef} className={classes.consoleWrapper}>
						{Console && <Console logs={logs} variant="dark" />}
					</div>
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

interface Params extends ParsedUrlQuery {
	id: string;
	subsystem: string;
}

export const getStaticProps = wrapper.getStaticProps((store) => ({ params, preview }) => {
	const { id, subsystem } = params as Params;
	return {
		props: {
			data: ALL_PROJECTS_OBJECT[id],
			subsystem: subsystem,
			subsystemIndex: ALL_PROJECTS_OBJECT[id].subsystems.findIndex((subsys) => subsys.id === subsystem),
		},
	};
});

export const getStaticPaths = () => {
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
};
