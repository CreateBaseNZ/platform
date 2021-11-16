import Link from "next/link";
import router from "next/router";
import useUnity from "../../hooks/useUnity";
import Unity from "./Unity";
import Workspace from "./Workspace";
import { ConsoleContextProvider } from "../../store/console-context";

import classes from "./Game.module.scss";

const Game = ({ setLoaded, mode = "", project, index, query, blockList }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: project.query,
		scenePrefix: project.scenePrefix,
		mode: mode,
		index: index,
		setLoaded: setLoaded,
	});

	return (
		<div className={classes.code}>
			<ConsoleContextProvider>
				<div className={`${classes.mainWindow} ${project.stacked ? classes.stackedView : classes.shelvedView}`}>
					<Link
						href={{
							pathname: mode ? `/project/[id]/${mode}` : "/project/[id]/create/[subsystem]/code",
							query: router.query,
						}}>
						<button className={classes.backButton} title="Back to project">
							<span className="material-icons-outlined">exit_to_app</span>
						</button>
					</Link>
					<Unity unityContext={unityContext} />
					<Workspace query={query} blockList={blockList} stacked={project.stacked} unityContext={unityContext} sensorData={sensorData} gameState={gameState} />
				</div>
			</ConsoleContextProvider>
		</div>
	);
};

export default Game;
