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

  const undoHandler = () => {
    props.setElements(
      props.actionStack.stack[props.actionStack.currentIndex - 1]
    );
    props.setActionStack((state) => {
      return { ...state, currentIndex: state.currentIndex - 1 };
    });
  };

  const redoHandler = () => {
    props.setElements(
      props.actionStack.stack[props.actionStack.currentIndex + 1]
    );
    props.setActionStack((state) => {
      return { ...state, currentIndex: state.currentIndex + 1 };
    });
  };

  const saveHandler = () => {
    if (props.elements) {
      window.localStorage.setItem("flow_save", JSON.stringify(props.elements));
    }
  };

  const restoreHandler = () => {
    const restoreFlow = () => {
      const flow = JSON.parse(window.localStorage.getItem("flow_save"));
      if (flow) {
        props.setElements(flow);
        setCenter(0, 0, 1.25);
      }
    };

    restoreFlow();
  };

  return (
    <Controls
      className={classes.controls}
      onInteractiveChange={interactiveChangeHandler}
    >
      <ControlButton
        className={`${classes.customControl} ${classes.undoButton} ${
          props.actionStack.currentIndex === 0 && classes.deactive
        }`}
        onClick={undoHandler}
      >
        <UndoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.redoButton} ${
          props.actionStack.currentIndex + 1 ===
            props.actionStack.stack.length && classes.deactive
        }`}
        onClick={redoHandler}
      >
        <RedoIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.customControl} ${classes.saveButton}`}
        onClick={saveHandler}
      >
        <SaveOutlinedIcon />
      </ControlButton>
      <ControlButton
        className={`${classes.restoreButton} ${classes.customControl}`}
        onClick={restoreHandler}
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
