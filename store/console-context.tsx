import { useState, createContext, useMemo, ReactNode } from "react";

/** Log type identifiers. */
export type LogType = "default" | "warning" | "error";

export interface ILog {
	/** Log type identifiers. */
	type: LogType;
	/** Message to be logged. */
	message: string;
	/** Time of logging (automatically handled). */
	time: string;
}

/** Console tab status corresponding to unread logs, or `null` if none unread. Logs are marked as read when the tab is opened while of after a log is printed.  */
export type UnreadStatus = LogType | null;

/**
 * Generic type alias for functions that add logs (e.g. see {@link addDefault}, {@link addWarning}).
 * @param message Message to be logged.
 */
export type AddLog = (message: string) => void;

/** Console context object. */
export interface IConsoleCtx {
	/** Array of logs shown in the Console. */
	logs: ILog[];
	/** Adds a default log. */
	addDefault: AddLog;
	/** Adds a warning log. */
	addWarning: AddLog;
	/** Adds an error log. */
	addError: AddLog;
	/** Clears all logs in the Console. */
	clearLogs: () => void;
	/** Console tab styling to indicate unread log status. */
	unreadStatus: UnreadStatus;
	/** Sets {@link unreadStatus} to `null`. */
	clearUnread: () => void;
}

/**
 * @ignore
 */
const ConsoleContext = createContext<IConsoleCtx>({
	logs: [],
	addDefault: () => {},
	addWarning: () => {},
	addError: () => {},
	clearLogs: () => {},
	unreadStatus: null,
	clearUnread: () => {},
});

export default ConsoleContext;

/**
 * @ignore
 */
type ConsoleCtxProps = { children: ReactNode };

/**
 * @ignore
 */
export const ConsoleContextProvider = ({ children }: ConsoleCtxProps) => {
	const [logs, setLogs] = useState<ILog[]>([]);
	const [unreadStatus, setUnreadStatus] = useState<UnreadStatus>(null);

	const addDefault: AddLog = (message) => {
		setLogs((state) => [
			...state,
			{
				type: "default",
				message: message,
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);
		setUnreadStatus("default");
	};

	const addWarning: AddLog = (message) => {
		setLogs((state) => [
			...state,
			{
				type: "warning",
				message: message,
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);
		setUnreadStatus("warning");
	};

	const addError: AddLog = (message) => {
		setLogs((state) => [
			...state,
			{
				type: "error",
				message: message,
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		]);
		setUnreadStatus("error");
	};

	const clearLogs = (): void => {
		setLogs([]);
	};

	const clearUnread = (): void => {
		setUnreadStatus(null);
	};

	const value = useMemo(
		() => ({
			logs: logs,
			addDefault: addDefault,
			addWarning: addWarning,
			addError: addError,
			clearLogs: clearLogs,
			unreadStatus: unreadStatus,
			clearUnread: clearUnread,
		}),
		[logs, unreadStatus]
	);

	return <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>;
};
