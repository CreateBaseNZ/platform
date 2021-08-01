import { memo } from "react";
import classes from "./FlowEditor.module.scss";

const VisualBell = memo(({ message }) => {
  return <div className={classes.visualBell}>{message}</div>;
});

export default VisualBell;
