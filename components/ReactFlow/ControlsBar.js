import { memo } from "react";
import { Controls, ControlButton } from "react-flow-renderer";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import SelectAllOutlinedIcon from "@material-ui/icons/SelectAllOutlined";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import CameraAltOutlinedIcon from "@material-ui/icons/CameraAltOutlined";

import classes from "./ControlsBar.module.scss";

const ControlsBar = (props) => {
  return (
    <Controls className={classes.controls} showInteractive={false}>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise} ${
          !props.allowUndo && classes.deactive
        }`}
        onClick={props.undoHandler}
      >
        <UndoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise} ${
          !props.allowRedo && classes.deactive
        }`}
        onClick={props.redoHandler}
      >
        <RedoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise}`}
        onClick={props.saveHandler}
      >
        <SaveOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise}`}
        onClick={props.restoreHandler}
      >
        <RestoreOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise}`}
        onClick={props.selectAll}
      >
        <SelectAllOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.prioritise} ${classes.verySmall}`}
        onClick={props.clearAll}
      >
        <BackspaceOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.small}`}
        onClick={props.capture}
      >
        <CameraAltOutlinedIcon />
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
      <ControlButton className={classes.customControl} onClick={props.info}>
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default memo(ControlsBar);
