import { Controls, ControlButton, useZoomPanHelper } from "react-flow-renderer";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";

import classes from "./ControlsBar.module.scss";

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

  const saveHandler = () => {
    if (props.elements) {
      window.localStorage.setItem("flow_save", JSON.stringify(props.elements));
    }
  };

  const restoreHandler = () => {
    const restoreFlow = () => {
      const flow = JSON.parse(window.localStorage.getItem("flow_save"));

      console.log(flow);

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
        className={classes.customControl}
        onClick={() => console.log("another action")}
      >
        <InfoOutlinedIcon />
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
    </Controls>
  );
};

export default ControlsBar;
