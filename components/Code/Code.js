import { useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import useUnity from "/hooks/useUnity";

import Game from "./Game";
import Workspace from "./Workspace";

import { ConsoleContextProvider } from "../../store/console-context";

import classes from "./code.module.scss";

const Code = ({ setLoaded, mode, project, iteration }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: project.query,
		scenePrefix: project.scenePrefix,
		scene: mode.toLowerCase(),
		iteration: iteration,
		setLoaded: setLoaded,
	});

	useEffect(() => {
		return () => setLoaded(false);
	}, []);

	return (
		<div className={classes.code}>
			<ConsoleContextProvider>
				<div className={`${classes.mainWindow} ${project.stacked ? classes.stackedView : classes.shelvedView}`}>
					<Link
						href={{
							pathname: `/project/${project.query}/[step]`,
							query: { step: mode.toLowerCase() },
						}}>
						<button className={classes.backButton} title="Back to project">
							<span className="material-icons-outlined">exit_to_app</span>
						</button>
					</Link>
					<Game unityContext={unityContext} />
					<Workspace stacked={project.stacked} unityContext={unityContext} sensorData={sensorData} query={project.query} gameState={gameState} />
				</div>
			</ConsoleContextProvider>
		</div>
	);
};

export default Code;
