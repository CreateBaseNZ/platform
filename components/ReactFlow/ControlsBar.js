import { useCallback } from "react";
import { Controls, ControlButton } from "react-flow-renderer";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

import classes from "./FlowEditor.module.scss";

const ControlsBar = (props) => {
  console.log(props.instance);

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

  const saveHandler = useCallback(() => {
    if (props.instance) {
      const flow = props.instance.toObject();
      localforage.setItem("flow_save", flow);
    }
  }, [props.instance]);

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
      <ControlButton className={classes.customControl} onClick={saveHandler}>
        <SaveOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default ControlsBar;
