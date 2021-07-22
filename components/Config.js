import { memo } from "react";

import classes from "./Config.module.scss";

const Config = (props) => {
  return (
    <div className={`${classes.config} ${props.show ? "" : "hide"}`}></div>
  );
};

export default memo(Config);
