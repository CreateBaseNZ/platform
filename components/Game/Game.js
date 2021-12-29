import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import useUnity from "../../hooks/useUnity";
import useMixPanel from "../../hooks/useMixpanel";
import Unity from "./Unity";
import Workspace from "./Workspace";
import { ConsoleContextProvider } from "../../store/console-context";
import LoadingScreen from "../UI/LoadingScreen";

import classes from "./Game.module.scss";
import GlobalSessionContext from "../../store/global-session-context";

const Game = ({ isImprove, project, index, query, blockList }) => {
	const [gameLoaded, setGameLoaded] = useState(false);
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: project.query,
		scenePrefix: project.scenePrefix,
		suffix: isImprove ? "improve" : null,
		index: index,
		wip: project.wip,
		setLoaded: setGameLoaded,
	});
	const mp = useMixPanel();
	const { globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		mp.init();
	}, []);

	useEffect(() => {
		if (gameState === "Win") {
			mp.track(`game_${isImprove ? "improve" : "create"}_progress`, {
				state: "win",
				licenses: globalSession.groups.map((group) => group.licenseId),
				schools: globalSession.groups.map((group) => group.id),
				project: router.query.id,
				subsystem: router.query.subsystem,
			});
		}
	}, [gameState]);

	return (
		<div className={classes.code}>
			<ConsoleContextProvider>
				<div className={`${classes.mainWindow} ${project.stacked ? classes.stackedView : classes.shelvedView}`}>
					<Link
						href={{
							pathname: isImprove ? `/project/[id]/improve` : "/project/[id]/create/[subsystem]/code",
							query: router.query,
						}}>
						<button className={classes.backButton} title="Back to project">
							<span className="material-icons-outlined">exit_to_app</span>
						</button>
					</Link>
					<Unity unityContext={unityContext} />
					<Workspace
						saveName={isImprove ? `react-flow_${project.query}_improve` : `react-flow_${project.query}_${index}`}
						query={query}
						blockList={blockList}
						stacked={project.stacked}
						_unityContext={unityContext}
						sensorData={sensorData}
						gameState={gameState}
						noFlow={project.noFlow}
					/>
				</div>
			</ConsoleContextProvider>
			{!gameLoaded && <LoadingScreen />}
		</div>
	);
};

export default Game;
