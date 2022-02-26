import { useContext, useEffect } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import useMixpanel from "../../../hooks/useMixpanel";
import useUnity from "../../../hooks/useUnity";
import GlobalSessionContext from "../../../store/global-session-context";
import { TPlaytestModule } from "../../../types/modules";
import { TProject } from "../../../types/projects";
import classes from "./PlaytestModule.module.scss";

interface Props {
	module: TPlaytestModule;
	data: TProject;
}

const PlaytestModule = ({ module, data }: Props): JSX.Element => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { track } = useMixpanel();

	const [unityContext, sensorData, gameState, resetScene] = useUnity({
		index: data.subsystems.length - 1,
		project: data.id,
		scenePrefix: data.scenePrefix,
		setLoaded: () => {}, // TODO - @louis
		suffix: "manual",
		wip: data.wip,
	});

	useEffect(() => {
		if (gameState === "Win") {
			console.log("wonnered!");
			track("game_manual_progress", {
				state: "win",
				licenses: globalSession.groups.map((group) => group.licenseId),
				schools: globalSession.groups.map((group) => group.id),
				project: data.id,
			});
		}
	}, [globalSession.groups, track, gameState, data]);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<Unity unityContext={unityContext as UnityContext} />
			</div>
		</div>
	);
};

export default PlaytestModule;
