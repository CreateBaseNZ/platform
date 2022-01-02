import { useContext, memo, useState, useEffect, useRef, RefObject } from "react";
import ConsoleContext, { ILog } from "../../store/console-context";

import classes from "./Console.module.scss";

type ILogProps = Omit<ILog, "type">;

const DefaultLog = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.log}>
			{message} <p className={classes.time}>{time}</p>
		</div>
	);
});

DefaultLog.displayName = "DefaultLog";

const ErrorLog = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.error}>
			<span className="material-icons-outlined">bug_report</span>
			{message}
			<p className={classes.time}>{time}</p>
		</div>
	);
});

ErrorLog.displayName = "ErrorLog";

const WarningLog = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.warning}>
			<span className="material-icons-outlined">report_problem</span>
			{message}
			<p className={classes.time}>{time}</p>
		</div>
	);
});

WarningLog.displayName = "WarningLog";

let key = 0;

type ConsoleProps = {
	/** Whether the console is shown in the Workspace */
	show: boolean;
};

/**
 * Console in the Game screen Workspace
 * @component
 */
const Console = ({ show }: ConsoleProps): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);
	const consoleCtx = useContext(ConsoleContext);
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		const storage = localStorage.getItem("createbase__console-mode");
		if (storage !== null) {
			setDarkMode(JSON.parse(storage));
		} else {
			localStorage.setItem("createbase__console-mode", "true");
		}
	}, []);

	const darkModeHandler = () => {
		setDarkMode((state) => {
			localStorage.setItem("createbase__console-mode", (!state).toString());
			return !state;
		});
	};

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, [consoleCtx.logs]);

	let warningCount = 0;
	let errorCount = 0;

	for (const log of consoleCtx.logs) {
		if (log.type === "warning") {
			warningCount++;
		} else if (log.type === "error") {
			errorCount++;
		}
	}

	return (
		<div id="console" className={`${classes.console} ${darkMode ? classes.darkMode : classes.lightMode} ${show ? "" : "hide"}`}>
			<div className={classes.logArea}>
				{consoleCtx.logs.map((log) => {
					if (log.type === "default") return <DefaultLog key={key++} message={log.message} time={log.time} />;
					if (log.type === "warning") return <WarningLog key={key++} message={log.message} time={log.time} />;
					if (log.type === "error") return <ErrorLog key={key++} message={log.message} time={log.time} />;
				})}
				<div ref={ref} />
			</div>
			<div className={classes.controls}>
				{warningCount > 0 && (
					<i className={classes.warningIcon} title={`${warningCount} warning${warningCount > 1 ? "s" : ""}`}>
						<span className="material-icons-outlined">report_problem</span>
						{warningCount}
					</i>
				)}
				{errorCount > 0 && (
					<i className={classes.errorIcon} title={`${errorCount} error${errorCount > 1 ? "s" : ""}`}>
						<span className="material-icons-outlined">bug_report</span>
						{errorCount}
					</i>
				)}
				<button title={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"} onClick={darkModeHandler} className={`${classes.modeToggler} ${darkMode ? classes.toLight : classes.toDark}`}>
					{darkMode ? <span className="material-icons-outlined">light_mode</span> : <span className="material-icons-outlined">dark_mode</span>}
				</button>
				<button className={classes.clearConsole} title="Clear Console" onClick={consoleCtx.clearLogs}>
					<span className="material-icons-outlined">delete_sweep</span>
				</button>
			</div>
		</div>
	);
};

export default memo(Console);
