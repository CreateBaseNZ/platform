import UnityWebgl from "react-unity-webgl";

import classes from "./Unity.module.scss";

const Unity = ({ unityContext }) => {
	const focusHandler = () => {
		unityContext.send("GameController", "FocusCanvas", "1");
	};

	const blurHandler = () => {
		unityContext.send("GameController", "FocusCanvas", "0");
	};

	return (
		<div className={classes.game} onFocus={focusHandler} onBlur={blurHandler} tabIndex={1}>
			<UnityWebgl unityContext={unityContext} style={{ height: "100%", width: "100%" }} />
		</div>
	);
};

export default Unity;
