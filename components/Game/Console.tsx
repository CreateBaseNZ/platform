import { useContext, memo, useState, useEffect, useRef, RefObject } from "react";
import ConsoleContext, { ILog } from "../../store/console-context";

import classes from "./Console.module.scss";

type ILogProps = Omit<ILog, "type">;

const Default = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.log}>
			{message} <p className={classes.time}>{time}</p>
		</div>
	);
});

const Error = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.error}>
			<span className="material-icons-outlined">bug_report</span>
			{message}
			<p className={classes.time}>{time}</p>
		</div>
	);
});

const Warning = memo(({ message, time }: ILogProps): JSX.Element => {
	return (
		<div className={classes.warning}>
			<span className="material-icons-outlined">report_problem</span>
			{message}
			<p className={classes.time}>{time}</p>
		</div>
	);
});

let key = 0;

const Console = ({ show }: { show: boolean }): JSX.Element => {
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
					if (log.type === "default") return <Default key={key++} message={log.message} time={log.time} />;
					if (log.type === "warning") return <Warning key={key++} message={log.message} time={log.time} />;
					if (log.type === "error") return <Error key={key++} message={log.message} time={log.time} />;
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
