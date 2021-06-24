import React, { useState, createContext } from "react";

const SettingsContext = createContext({
  showSettings: false,
  setShowSettings: () => {},
});

export const SettingsContextProvider = (props) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        showSettings: showSettings,
        setShowSettings: setShowSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
