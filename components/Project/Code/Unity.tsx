import UnityWebgl, { UnityContext } from "react-unity-webgl";
import LoadingScreen from "../../UI/LoadingScreen";

import classes from "./Unity.module.scss";

interface Props {
	unityContext: UnityContext;
	unityLoaded: boolean;
}

const Unity = ({ unityContext, unityLoaded }: Props): JSX.Element => {
	const focusHandler = () => unityContext.send("GameController", "FocusCanvas", "1");

	const blurHandler = () => unityContext.send("GameController", "FocusCanvas", "0");

	return (
		<div className={classes.game} onFocus={focusHandler} onBlur={blurHandler} tabIndex={1}>
			<UnityWebgl unityContext={unityContext} style={{ height: "100%", width: "100%" }} />
			{!unityLoaded && <LoadingScreen />}
		</div>
	);
};

export default Unity;
