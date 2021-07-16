import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";

import classes from "./Modules.module.scss";

const Module = ({ className, icon, label, children }) => {
  return (
    <div className={`${classes.module} ${className}`}>
      <div className={classes.label}>
        <i>{icon}</i>
        <h4>{label}</h4>
      </div>
      <h3>{children}</h3>
    </div>
  );
};

export const InfoModule = (props) => {
  return (
    <Module
      className={classes.infoModule}
      icon={<InfoOutlinedIcon />}
      label="Info"
    >
      {props.children}
    </Module>
  );
};

export const TutorialModule = (props) => {
  return (
    <Module
      className={classes.tutorialModule}
      icon={<HelpOutlineOutlinedIcon />}
      label="Tutorial"
    >
      {props.children}
    </Module>
  );
};

export const HintModule = (props) => {
  return (
    <Module
      className={classes.hintModule}
      icon={<EmojiObjectsOutlinedIcon />}
      label="Hint"
    >
      {props.children}
    </Module>
  );
};

export const SneaPeekModule = (props) => {
  return (
    <Module
      className={classes.sneakPeekModule}
      icon={<SportsEsportsOutlinedIcon />}
      label="Sneak peek"
    >
      {props.children}
    </Module>
  );
};
