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
import { memo, useContext } from "react";
import ConsoleContext from "../../store/console-context";

const ControlsBar = (props) => {
  const ctx = useContext(ConsoleContext);

  const infoHandler = () => {
    ctx.addLog(
      "To start coding with Flow, drag and drop one of the blocks into the drop zone. You can add as many blocks as you like and rearrange them."
    );
    ctx.addLog(
      "Before you run your code, you will need to connect each of your blocks together in the order you want them to be run. To connect two blocks, drag from the output handle (solid square) of one block to the input handle (hollow square) of another to form a track."
    );
    ctx.addLog(
      "If a block is connected with multiple tracks, you may get unexpected behavior when running your code. To delete a track, click on its arrowhead to select the track, then press the backspace key on your keyboard. "
    );
    ctx.addLog(
      "When you code in Flow, the corresponding text code will automatically generate in the Text tab."
    );
  };

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
      <ControlButton className={classes.customControl} onClick={infoHandler}>
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default memo(ControlsBar);
