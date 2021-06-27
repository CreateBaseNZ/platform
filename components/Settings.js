import CloseIcon from "@material-ui/icons/Close";

import classes from "./Settings.module.scss";

const Settings = (props) => {
  const closeHandler = () => {
    props.setSettings((state) => ({ ...state, showMenu: false }));
  };

  return (
    <div
      className={classes.backdrop}
      style={{ display: !props.settings.showMenu && "none" }}
    >
      <div className={classes.menu}>
        <CloseIcon
          style={{ fontSize: 36 }}
          className={classes.close}
          onClick={closeHandler}
        />
        <div></div>
      </div>
    </div>
  );
};

export default Settings;
