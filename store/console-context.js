import { useState, createContext } from "react";

const ConsoleContext = createContext({
  logs: [],
  addLog: () => {},
  addWarning: () => {},
  addError: () => {},
});

export default ConsoleContext;

export const ConsoleContextProvider = (props) => {
  const [logs, setLogs] = useState([
    { type: "log", message: "hello" },
    { type: "warning", message: "yeap" },
    { type: "error", message: "clock" },
  ]);

  const addLog = (message) => {
    setLogs((state) => [...state, { type: "log", message: message }]);
  };

  const addWarning = (message) => {
    setLogs((state) => [...state, { type: "warning", message: message }]);
  };

  const addError = (message) => {
    setLogs((state) => [...state, { type: "error", message: message }]);
  };

  return (
    <ConsoleContext.Provider
      value={{
        logs: logs,
        addLog: addLog,
        addWarning: addWarning,
        addError: addError,
      }}
    >
      {props.children}
    </ConsoleContext.Provider>
  );
};
