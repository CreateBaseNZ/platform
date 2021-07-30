import Unity from "react-unity-webgl";

import classes from "./Game.module.scss";

const Game = (props) => {
  const focusHandler = () => {
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
      <Unity
        unityContext={props.unityContext}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default Game;
