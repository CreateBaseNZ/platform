import { useState, createContext, useMemo, ReactNode } from "react";

export interface ILog {
	type: "default" | "warning" | "error";
	message: string;
	time: string;
}

type UnreadStatus = "default" | "warning" | "error" | undefined;

type AddLog = (_: string) => void;

interface IConsoleCtx {
	logs: ILog[];
	addDefault: AddLog;
	addWarning: AddLog;
	addError: AddLog;
	clearLogs: () => void;
	unreadStatus: UnreadStatus;
	clearUnread: () => void;
}

const ConsoleContext = createContext<IConsoleCtx>({
	logs: [],
	addDefault: () => {},
	addWarning: () => {},
	addError: () => {},
	clearLogs: () => {},
	unreadStatus: undefined,
	clearUnread: () => {},
});

export default ConsoleContext;

type ConsoleCtxProps = { children: ReactNode };

export const ConsoleContextProvider = ({ children }: ConsoleCtxProps) => {
	const [logs, setLogs] = useState<ILog[]>([]);
	const [unreadStatus, setUnreadStatus] = useState<UnreadStatus>();

	const addDefault = (message: string): void => {
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

	const addWarning = (message: string): void => {
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

	const addError = (message: string): void => {
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
		setUnreadStatus(undefined);
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
