import { useContext, useEffect, useRef, useState } from "react";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import CodeIcon from "@material-ui/icons/Code";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";

import ConsoleContext from "../store/console-context";

import classes from "./TabBar.module.scss";

const Divider = (props) => {
  return (
    <div
      className={classes.divider}
      style={{
        opacity:
          props.active === props.tabBefore || props.active === props.tabAfter
            ? 0
            : 0.5,
      }}
    />
  );
};

const Tab = (props) => {
  const isActive = props.active === props.value;
  return (
    <div
      className={`${classes.tab} ${isActive ? classes.activeTab : ""} ${
        classes[props.status]
      }`}
      title={props.title}
      ref={props.innerRef}
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
        <span>{props.title}</span>
      </label>
    </div>
  );
};

const TabBar = (props) => {
  const flowRef = useRef(null);
  const textRef = useRef(null);
  const consoleRef = useRef(null);
  const [sliderSize, setSliderSize] = useState({ top: 0, size: 1 });
  const ctx = useContext(ConsoleContext);

  useEffect(() => {
    switch (props.active) {
      case "text":
        setSliderSize({
          top: textRef.current.offsetTop,
          size: textRef.current.offsetHeight,
        });
        break;
      case "console":
        setSliderSize({
          top: consoleRef.current.offsetTop,
          size: consoleRef.current.offsetHeight + 1,
        });
        break;
      default:
        setSliderSize({ top: 0, size: flowRef.current.offsetHeight });
        break;
    }
  }, [props.active]);

  const onChangeHandler = (event) => {
    props.onChange(event.target.value);
  };

  const consoleClickHandler = () => {
    ctx.clearUnread();
  };

  return (
    <div
      className={`${classes.tabbar} ${
        props.stacked ? classes.stacked : classes.shelved
      }`}
    >
      <span
        id="tab-slider"
        className={`${classes.slider} span`}
        style={{ top: sliderSize.top, height: sliderSize.size }}
      />
      <Tab
        title="Flow"
        id="flow-tab"
        value="flow"
        icon={<SwapCallsIcon />}
        onChangeHandler={onChangeHandler}
        active={props.active}
        innerRef={flowRef}
      />
      <Divider tabBefore="flow" tabAfter="text" active={props.active} />
      <Tab
        title="Text"
        id="text-tab"
        value="text"
        icon={<CodeIcon />}
        onChangeHandler={onChangeHandler}
        active={props.active}
        innerRef={textRef}
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
        innerRef={consoleRef}
        status={ctx.unreadStatus}
      />
    </div>
  );
};

export default TabBar;
