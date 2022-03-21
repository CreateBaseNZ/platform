import React, { ReactElement, useCallback, useContext, useEffect, useRef, useState } from "react";
import { UnityContext } from "react-unity-webgl";
import Image from "next/image";
import * as Esprima from "esprima";
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

// const sandboxed = (code: string, args = {}) => {
// 	const frame = document.createElement("iframe");
// 	document.body.appendChild(frame);
// 	Hook((frame.contentWindow as any)?.console);
// 	const F = (frame.contentWindow as any)?.Function;
// 	Unhook((frame.contentWindow as any)?.console);
// 	document.body.removeChild(frame);
// 	return F(...Object.keys(args), "'use strict';" + code)(...Object.values(args));
// };

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
	const consoleRef = useRef<HTMLDivElement>(null);
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const {} = useMixpanel("project_create_code");
	const [status, setStatus] = useState("idle");
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
	const { layout } = useSelector<TState, TCodeStepState>((state) => state.codeStep);
	const dispatch = useDispatch();

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
		if (!globalSession.loaded) return;
		dispatch(fetchCodeStepData(globalSession.profileId, data.id, subsystem));
	}, [globalSession.loaded, globalSession.profileId, data.id, subsystem, dispatch]);

	useEffect(() => {
		if (!consoleRef.current) return;
		consoleRef.current.scrollTop = consoleRef.current.scrollHeight - consoleRef.current.clientHeight;
	}, [logs]);

	useEffect(() => {
		(async () => {
			({ Console, Hook, Unhook } = await import("console-feed"));
			console.log("imported");
			Hook((iframeRef.current?.contentWindow as any).console, (log: any) => setLogs((state) => [...state, log]), false);
		})();
		const dynRef = iframeRef.current;
		return () => dynRef?.contentWindow && Unhook((dynRef.contentWindow as any)?.console);
	}, []);

	const run: Run = useCallback((code) => {
		// Hook(window.console, (log: any) => setLogs((state) => [...state, log]), false);

		// const whileEntry: number[] = [];
		// Esprima.parseScript(code, { loc: true, range: true }, (node: any) => {
		// 	console.log(node);
		// 	if (node.type === "WhileStatement") {
		// 		whileEntry.push(node.body.body[0].range[0]);
		// 	}
		// });
		// whileEntry.forEach((pos) => {
		// 	code = code.insert(pos, `# insert code here \n \t`);
		// });

		setStatus("running");

		// console.log(whileEntry);

		code = ` try {
		  ${code}
      unityContext.send("LeftWheel", "RotateMotorForwards", 0.1)		
    } catch(e) {
		  console.error(e)
		}`;

		(iframeRef.current?.contentWindow as any).Function("sensorData", "unityContext", code)(sensorData, unityContext);

		// console.log(Escodegen.generate(ast));
		// Unhook(window.console);
	}, []);

	const stop: Stop = useCallback(() => {
		console.log("stopping");
		setStatus("idle");
		resetScene();
	}, []);

	const restart: Restart = useCallback(() => {
		// TODO @louis
	}, []);

	const unlink: Unlink = useCallback(() => {
		// TODO @louis
	}, []);

	return (
		<div className={classes.page}>
			<iframe ref={iframeRef} className={classes.iframe} />
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
