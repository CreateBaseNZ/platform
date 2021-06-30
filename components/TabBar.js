import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import CodeIcon from "@material-ui/icons/Code";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";

import classes from "./TabBar.module.scss";

const Divider = (props) => {
  return (
    <div
      className={classes.divider}
      style={{
        opacity:
          props.active === props.tabBefore || props.active === props.tabAfter
            ? 0
            : 1,
      }}
    />
  );
};

const Tab = (props) => {
  const isActive = props.active === props.value;
  return (
    <div
      className={`${classes.tab} ${isActive ? classes.activeTab : ""}`}
      title={props.title}
    >
      <input
        type="radio"
        id={props.id}
        name="workspace-tab"
        value={props.value}
        checked={isActive}
        onChange={props.onChangeHandler}
        onClick={props.onClickHandler}
      />
      <label htmlFor={props.id}>
        {props.icon}
        {props.title}
      </label>
    </div>
  );
};

const TabBar = (props) => {
  const onChangeHandler = (event) => {
    console.log(event);
    props.onChange(event.target.value);
  };

  const consoleClickHandler = () => {
    document
      .querySelector("#console-tab")
      .classList.remove(classes.tabWarning, classes.tabError);
  };

  return (
    <div
      className={`${classes.tabbar} ${
        props.stacked ? classes.stacked : classes.shelved
      }`}
    >
      <span className={`${classes.slider} ${classes[`${props.active}`]}`} />
      <Tab
        title="Flow"
        id="flow-tab"
        value="flow"
        icon={<SwapCallsIcon />}
        onChangeHandler={onChangeHandler}
        active={props.active}
      />
      <Divider tabBefore="flow" tabAfter="text" active={props.active} />
      <Tab
        title="Text"
        id="text-tab"
        value="text"
        icon={<CodeIcon />}
        onChangeHandler={onChangeHandler}
        active={props.active}
      />
      <Divider tabBefore="text" tabAfter="console" active={props.active} />
      <Tab
        title="Console"
        id="console-tab"
        value="console"
        icon={<CallToActionOutlinedIcon />}
        onChangeHandler={onChangeHandler}
        onClickHandler={consoleClickHandler}
        active={props.active}
      />
      <Divider tabBefore="console" tabAfter="" active={props.active} />
    </div>
  );
};

export default TabBar;
