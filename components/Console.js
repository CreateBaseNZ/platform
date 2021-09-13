import BugReportIcon from "@material-ui/icons/BugReport";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { useContext, memo } from "react";
import ConsoleContext from "../store/console-context";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import classes from "./Console.module.scss";

const Log = memo((props) => {
  return (
    <p>
      {props.message} <span className={classes.time}>{props.time}</span>
    </p>
  );
});

const Error = memo((props) => {
  return (
    <p className={classes.error}>
      <BugReportIcon style={{ fontSize: 16 }} />
      {props.message}
      <span className={classes.time}>{props.time}</span>
    </p>
  );
});

const Warning = memo((props) => {
  return (
    <p className={classes.warning}>
      <WarningRoundedIcon style={{ fontSize: 16 }} />
      {props.message}
      <span className={classes.time}>{props.time}</span>
    </p>
  );
});

let key = 0;

const Console = (props) => {
  const ctx = useContext(ConsoleContext);

  let warningCount = 0;
  let errorCount = 0;

  for (const log of ctx.logs) {
    if (log.type === "warning") {
      warningCount++;
    } else if (log.type === "error") {
      errorCount++;
    }
  }

  return (
    <div
      id="console"
      className={`${classes.console} ${props.show ? "" : "hide"}`}
    >
      <div className={classes.logArea}>
        {ctx.logs.map((log) => {
          if (log.type === "log")
            return <Log key={key++} message={log.message} time={log.time} />;
          if (log.type === "warning")
            return (
              <Warning key={key++} message={log.message} time={log.time} />
            );
          if (log.type === "error")
            return <Error key={key++} message={log.message} time={log.time} />;
        })}
      </div>
      <div className={classes.controls}>
        {warningCount > 0 && (
          <i
            className={classes.warningIcon}
            title={`${warningCount} warning${warningCount > 1 ? "s" : ""}`}
          >
            <WarningRoundedIcon style={{ fontSize: 16 }} />
            {warningCount}
          </i>
        )}
        {errorCount > 0 && (
          <i
            className={classes.errorIcon}
            title={`${errorCount} error${errorCount > 1 ? "s" : ""}`}
          >
            <BugReportIcon style={{ fontSize: 20 }} />
            {errorCount}
          </i>
        )}
        <button title="Clear console" onClick={ctx.clearLogs}>
          <DeleteSweepIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(Console);
