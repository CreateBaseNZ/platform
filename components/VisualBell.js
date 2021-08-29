import { useContext } from "react";
import VisualBellContext from "../store/visual-bell-context";
import classes from "./VisualBell.module.scss";

const VisualBell = () => {
  const ctx = useContext(VisualBellContext);

  return (
    <div className={classes.container}>
      <div
        key={Math.random()}
        className={`${classes.bell} ${classes[ctx.bell.type]}`}
      >
        {ctx.bell.message}
      </div>
    </div>
  );
};

export default VisualBell;
