import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import classes from "./Modules.module.scss";

const Module = ({ className, icon, label, children, clickHandler }) => {
  return (
    <div className={`${classes.module} ${className}`} onClick={clickHandler}>
      <div className={classes.label}>
        <i>{icon}</i>
        <h4>{label}</h4>
      </div>
      <h3>{children}</h3>
    </div>
  );
};

export const VideoModule = (props) => {
  return (
    <Module
      className={classes.videoModule}
      icon={<VideocamOutlinedIcon />}
      label="Video"
      clickHandler={props.onClick}
    >
      {props.children}
    </Module>
  );
};

export const InfoModule = (props) => {
  return (
    <Module
      className={classes.infoModule}
      icon={<InfoOutlinedIcon />}
      label="Info"
      clickHandler={props.onClick}
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
      clickHandler={props.onClick}
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
      clickHandler={props.onClick}
    >
      {props.children}
    </Module>
  );
};

export const SneakPeekModule = (props) => {
  return (
    <Module
      className={classes.sneakPeekModule}
      icon={<SportsEsportsOutlinedIcon />}
      label="Sneak peek"
      clickHandler={props.onClick}
    >
      {props.children}
    </Module>
  );
};

export const ResourceModule = (props) => {
  return (
    <Module
      className={classes.docModule}
      icon={<AttachFileIcon />}
      label="Resource"
      clickHandler={props.onClick}
    >
      {props.children}
    </Module>
  );
};
