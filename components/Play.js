import { useEffect } from "react";
import Link from "next/link";
import useUnity from "/hooks/useUnity";
import Game from "./Code/Game";

import classes from "./Play.module.scss";
import router from "next/router";

const Play = ({ setLoaded, project }) => {
	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		project: project.query,
		scenePrefix: project.scenePrefix,
		scene: "research",
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
