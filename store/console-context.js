import { useState, createContext } from "react";

const ConsoleContext = createContext({
  logs: [],
  addLog: () => {},
  addWarning: () => {},
  addError: () => {},
  clearLogs: () => {},
  hasUnread: "",
  setUnreadStatus: () => {},
});

export default ConsoleContext;

export const ConsoleContextProvider = (props) => {
  const [logs, setLogs] = useState([
    { type: "log", message: "hello" },
    { type: "warning", message: "yeap" },
    { type: "error", message: "clock" },
    { type: "error", message: "clock" },
  ]);
  const [hasUnread, setHasUnread] = useState("");

  const addLog = (message) => {
    setLogs((state) => [...state, { type: "log", message: message }]);
  };

  const addWarning = (message) => {
    setLogs((state) => [...state, { type: "warning", message: message }]);
  };

  const addError = (message) => {
    setLogs((state) => [...state, { type: "error", message: message }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const setUnreadStatus = (status) => {
    setHasUnread(status);
  };

  return (
    <ConsoleContext.Provider
      value={{
        logs: logs,
        addLog: addLog,
        addWarning: addWarning,
        addError: addError,
        clearLogs: clearLogs,
        hasUnread: hasUnread,
        setUnreadStatus: setUnreadStatus,
      }}
    >
      {props.children}
    </ConsoleContext.Provider>
  );
};
