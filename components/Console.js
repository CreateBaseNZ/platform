import BugReportIcon from "@material-ui/icons/BugReport";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { useContext } from "react";
import ConsoleContext from "../store/console-context";

import classes from "./Console.module.scss";

const Log = (props) => {
  return <span>{props.message}</span>;
};

const Error = (props) => {
  return (
    <span className={classes.error}>
      <BugReportIcon style={{ fontSize: 16 }} />
      {props.message}
    </span>
  );
};

const Warning = (props) => {
  return (
    <span className={classes.warning}>
      <WarningRoundedIcon style={{ fontSize: 16 }} />
      {props.message}
    </span>
  );
};

let key = 0;

const Console = (props) => {
  const ctx = useContext(ConsoleContext);

  return (
    <div
      id="console"
      className={`${classes.console} ${props.show ? "" : "hide"}`}
    >
      {ctx.logs.map((log) => {
        if (log.type === "log")
          return <Log key={key++} message={log.message} />;
        if (log.type === "warning")
          return <Warning key={key++} message={log.message} />;
        if (log.type === "error")
          return <Error key={key++} message={log.message} />;
      })}
    </div>
  );
};

export default Console;
