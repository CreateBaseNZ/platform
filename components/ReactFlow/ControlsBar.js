import { Controls, ControlButton } from "react-flow-renderer";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

import classes from "./ControlsBar.module.scss";

const ControlsBar = (props) => {
  const lockHandler = () => {
    props.lockHandler();
    const lock = document.querySelector("." + classes.controls).children[6];
    if (lock.title === "Lock") {
      lock.title = "Unlock";
    } else {
      lock.title = "Lock";
    }
  };

  return (
    <Controls
      className={classes.controls}
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton
        className={`${classes.customControl} ${classes.undoButton} ${
          props.allowUndo && classes.deactive
        }`}
        onClick={props.undoHandler}
      >
        <UndoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.redoButton} ${
          props.allowRedo && classes.deactive
        }`}
        onClick={props.redoHandler}
      >
        <RedoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.saveButton}`}
        onClick={props.saveHandler}
      >
        <SaveOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.restoreButton} ${classes.customControl}`}
        onClick={props.restoreHandler}
      >
        <RestoreOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${
          props.flowLocked && classes.locked
        }`}
        id="lockButton"
        onClick={lockHandler}
      >
        {props.flowLocked ? <LockIcon /> : <LockOpenOutlinedIcon />}
      </ControlButton>
      <ControlButton
        className={classes.customControl}
        onClick={() => console.log("another action")}
      >
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default ControlsBar;
