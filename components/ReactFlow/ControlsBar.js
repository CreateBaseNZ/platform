import { memo } from "react";
import { Controls, ControlButton } from "react-flow-renderer";

import classes from "./ControlsBar.module.scss";

const ControlsBar = (props) => {
  return (
    <Controls className={classes.controls} showInteractive={false}>
      {!props.frozen && (
        <>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise} ${
              !props.allowUndo && classes.deactive
            }`}
            onClick={props.undoHandler}
          >
            <span className="material-icons-outlined">undo</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise} ${
              !props.allowRedo && classes.deactive
            }`}
            onClick={props.redoHandler}
          >
            <span className="material-icons-outlined">redo</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise}`}
            onClick={props.saveHandler}
          >
            <span className="material-icons-outlined">save</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise}`}
            onClick={props.restoreHandler}
          >
            <span className="material-icons-outlined">restore</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise}`}
            onClick={props.selectAll}
          >
            <span className="material-icons-outlined">select_all</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.prioritise} ${classes.verySmall}`}
            onClick={props.clearAll}
          >
            <span className="material-icons-outlined">backspace</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${classes.small}`}
            onClick={props.capture}
          >
            <span className="material-icons-outlined">photo_camera</span>
          </ControlButton>
          <ControlButton
            className={`${classes.customControl} ${
              props.flowLocked && classes.locked
            }`}
            id="lockButton"
            onClick={props.lockHandler}
            title={props.flowLocked ? "Unlock (Ctrl + L)" : "Lock (Ctrl + L)"}
          >
            {props.flowLocked ? (
              <span className="material-icons-outlined">lock</span>
            ) : (
              <span className="material-icons-outlined">lock_open</span>
            )}
          </ControlButton>
          <ControlButton className={classes.customControl} onClick={props.info}>
            <span className="material-icons-outlined">info</span>
          </ControlButton>
        </>
      )}
    </Controls>
  );
};

export default memo(ControlsBar);
