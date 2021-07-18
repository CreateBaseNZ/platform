import { Controls, ControlButton, useZoomPanHelper } from "react-flow-renderer";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";

import classes from "./ControlsBar.module.scss";
import { useEffect, useState } from "react";

const ControlsBar = (props) => {
  const { setCenter } = useZoomPanHelper();

  const interactiveChangeHandler = () => {
    const lock = document.querySelector("." + classes.controls).children[3];
    if (lock.title === "Lock") {
      lock.title = "Unlock";
      lock.classList.add(classes.locked);
    } else {
      lock.title = "Lock";
      lock.classList.remove(classes.locked);
    }
  };

  return (
    <Controls
      className={classes.controls}
      onInteractiveChange={interactiveChangeHandler}
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
        className={classes.customControl}
        onClick={() => console.log("another action")}
      >
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default ControlsBar;
