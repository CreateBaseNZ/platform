import { useState, createContext } from "react";

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

  const addLog = (message) => {
    setLogs((state) => [...state, { type: "log", message: message }]);
    setUnreadStatus("hasLog");
  };

  const addWarning = (message) => {
    setLogs((state) => [...state, { type: "warning", message: message }]);
    setUnreadStatus("hasWarning");
  };

  const addError = (message) => {
    setLogs((state) => [...state, { type: "error", message: message }]);
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
