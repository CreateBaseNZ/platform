import { Controls, ControlButton } from "react-flow-renderer";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import classes from "./FlowEditor.module.scss";

const ControlsBar = () => {
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
        className={classes.customControl}
        onClick={() => console.log("another action")}
      >
        <InfoOutlinedIcon />
      </ControlButton>
    </Controls>
  );
};

export default ControlsBar;
