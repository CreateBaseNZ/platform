import { useEffect, useState } from "react";

import CloseIcon from "@material-ui/icons/Close";

import classes from "./SettingsModal.module.scss";

const defaultSettings = {
  showMenu: false,
};

const Settings = (props) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    setSettings((state) => ({ ...state, showMenu: true }));
  }, [props.showSettings]);

  const closeMenu = () => {
    setSettings((state) => ({ ...state, showMenu: false }));
  };

  return (
    <div className={classes.backdrop}>
      <div
        className={classes.menu}
        style={{ display: settings.showMenu && "none" }}
      >
        <CloseIcon
          style={{ fontSize: 36 }}
          className={classes.close}
          onClick={closeMenu}
        />
        <div></div>
      </div>
    </div>
  );
};

export default Settings;
