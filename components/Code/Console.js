import BugReportIcon from "@material-ui/icons/BugReport";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import { useContext, memo, useState, useEffect, useRef } from "react";
import ConsoleContext from "../../store/console-context";
import DeleteSweepOutlinedIcon from "@material-ui/icons/DeleteSweepOutlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";

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
  const ref = useRef();
  const ctx = useContext(ConsoleContext);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storage = localStorage.getItem("createbase__console-mode");
    if (storage !== null) {
      setDarkMode(JSON.parse(storage));
    } else {
      localStorage.setItem("createbase__console-mode", true);
    }
  }, []);

  const darkModeHandler = () => {
    setDarkMode((state) => {
      localStorage.setItem("createbase__console-mode", !state);
      return !state;
    });
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [ctx.logs]);

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
      className={`${classes.console} ${
        darkMode ? classes.darkMode : classes.lightMode
      } ${props.show ? "" : "hide"}`}
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
        <div ref={ref} />
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
        <button
          title={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
          onClick={darkModeHandler}
          className={`${classes.modeToggler} ${
            darkMode ? classes.toLight : classes.toDark
          }`}
        >
          {darkMode ? <WbSunnyOutlinedIcon /> : <Brightness2OutlinedIcon />}
        </button>
        <button
          className={classes.clearConsole}
          title="Clear Console"
          onClick={ctx.clearLogs}
        >
          <DeleteSweepOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(Console);
