import { useContext, memo, useState, useEffect, useRef } from "react";
import ConsoleContext from "../../store/console-context";

import classes from "./Console.module.scss";

const Log = memo((props) => {
  return (
    <div className={classes.log}>
      {props.message} <p className={classes.time}>{props.time}</p>
    </div>
  );
});

const Error = memo((props) => {
  return (
    <div className={classes.error}>
      <span className="material-icons-outlined">bug_report</span>
      {props.message}
      <p className={classes.time}>{props.time}</p>
    </div>
  );
});

const Warning = memo((props) => {
  return (
    <div className={classes.warning}>
      <span className="material-icons-outlined">report_problem</span>
      {props.message}
      <p className={classes.time}>{props.time}</p>
    </div>
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
            <span className="material-icons-outlined">report_problem</span>
            {warningCount}
          </i>
        )}
        {errorCount > 0 && (
          <i
            className={classes.errorIcon}
            title={`${errorCount} error${errorCount > 1 ? "s" : ""}`}
          >
            <span className="material-icons-outlined">bug_report</span>
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
          {darkMode ? (
            <span className="material-icons-outlined">light_mode</span>
          ) : (
            <span className="material-icons-outlined">dark_mode</span>
          )}
        </button>
        <button
          className={classes.clearConsole}
          title="Clear Console"
          onClick={ctx.clearLogs}
        >
          <span className="material-icons-outlined">delete_sweep</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Console);
