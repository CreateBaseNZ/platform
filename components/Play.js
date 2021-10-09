import { useEffect } from "react";
import router from "next/router";
import useUnity from "/hooks/useUnity";
import Game from "./Code/Game";

import classes from "./Play.module.scss";

const Play = ({ setLoaded, project, iteration }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: project.query,
		scenePrefix: project.scenePrefix,
		scene: "manual",
		iteration: iteration,
		setLoaded: setLoaded,
	});

	useEffect(() => {
		return () => setLoaded(false);
	}, []);

	return (
		<div className={classes.play}>
			<button className={classes.backButton} title="Back to reserach" onClick={() => router.back()}>
				<span className="material-icons-outlined">exit_to_app</span>
			</button>
			<Game unityContext={unityContext} />
		</div>
	);
};

export default Play;
