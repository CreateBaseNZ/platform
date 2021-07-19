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
  const infoHandler = () => {
    console.log("hi");
  };

  return (
    <Controls
      className={classes.controls}
      showFitView={false}
      showInteractive={false}
    >
      <ControlButton
        className={`${classes.customControl} ${classes.undoButton} ${
          !props.allowUndo && classes.deactive
        }`}
        onClick={props.undoHandler}
      >
        <UndoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.redoButton} ${
          !props.allowRedo && classes.deactive
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
        onClick={props.lockHandler}
        title={props.flowLocked ? "Unlock (Ctrl + L)" : "Lock (Ctrl + L)"}
      >
        {props.flowLocked ? <LockIcon /> : <LockOpenOutlinedIcon />}
      </ControlButton>
      <ControlButton className={classes.customControl} onClick={infoHandler}>
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default ControlsBar;
