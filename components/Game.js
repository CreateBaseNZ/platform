import Unity from "react-unity-webgl";
import SettingsIcon from "@material-ui/icons/Settings";

import classes from "./Game.module.scss";

const Game = (props) => {
  const showSettingsHandler = () => {
    props.setSettings((state) => ({ ...state, showMenu: true }));
  };

  const focusHandler = () => {
    console.log("working");
    props.unityContext.send("GameController", "FocusCanvas", "1");
  };

  const blurHandler = () => {
    props.unityContext.send("GameController", "FocusCanvas", "0");
  };

  return (
    <div
      className={classes.game}
      onFocus={focusHandler}
      onBlur={blurHandler}
      tabIndex={1}
    >
      {/* <Unity
        unityContext={props.unityContext}
        style={{ height: "100%", width: "100%" }}
      /> */}
      <button className={classes.settingsBtn} onClick={showSettingsHandler}>
        <SettingsIcon />
      </button>
    </div>
  );
};

export default Game;
