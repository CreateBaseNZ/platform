import { useState, createContext, useEffect } from "react";

const ConsoleContext = createContext({
  logs: [],
  addLog: () => {},
  addWarning: () => {},
  addError: () => {},
  clearLogs: () => {},
  unreadStatus: "",
  clearUnread: () => {},
});

export default ConsoleContext;

export const ConsoleContextProvider = (props) => {
  const [logs, setLogs] = useState([]);
  const [unreadStatus, setUnreadStatus] = useState("");

  useEffect(() => {
    addLog("yeap ");
    addLog("yeap ");
    addLog("yeap ");
    addLog("yeap ");
    // addWarning("wow so bad");
    // addError("wow so bad");
  }, []);

  const addLog = (message) => {
    setLogs((state) => [
      ...state,
      {
        type: "log",
        message: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setUnreadStatus("hasLog");
  };

  const addWarning = (message) => {
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
    setUnreadStatus("hasWarning");
  };

  const addError = (message) => {
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
    setUnreadStatus("hasError");
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const clearUnread = () => {
    setUnreadStatus("");
  };

  return (
    <ConsoleContext.Provider
      value={{
        logs: logs,
        addLog: addLog,
        addWarning: addWarning,
        addError: addError,
        clearLogs: clearLogs,
        unreadStatus: unreadStatus,
        clearUnread: clearUnread,
      }}
    >
      {props.children}
    </ConsoleContext.Provider>
  );
};
