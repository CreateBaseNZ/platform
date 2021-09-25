import { memo, useContext, useEffect, useRef, useState } from "react";
import ConsoleContext from "../../store/console-context";

import classes from "./TabBar.module.scss";

const tabs = ["flow", "text", "console", "config"];

const Divider = (props) => {
	return (
		<div
			className={classes.divider}
			style={{
				opacity: props.active === props.tabBefore || props.active === props.tabAfter ? 0 : 0.5,
			}}
		/>
	);
};

const Tab = (props) => {
	const isActive = props.active === props.value;
	return (
		<div className={`${classes.tab} ${isActive ? classes.activeTab : ""} ${classes[props.status]}`} title={props.title} ref={props.innerRef}>
			<input type="radio" id={props.id} name="workspace-tab" value={props.value} checked={isActive} onChange={props.onChangeHandler} onClick={props.onClickHandler} />
			<label htmlFor={props.id}>
				{props.icon}
				<p>{props.title}</p>
			</label>
		</div>
	);
};

const TabBar = (props) => {
	const flowRef = useRef(null);
	const textRef = useRef(null);
	const consoleRef = useRef(null);
	const configRef = useRef(null);
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
			case "config":
				setSliderSize({
					top: configRef.current.offsetTop,
					size: configRef.current.offsetHeight + 1,
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
		<div className={`${classes.tabbar} ${props.stacked ? classes.stacked : classes.shelved}`}>
			<span id="tab-slider" className={`${classes.slider} span`} style={{ top: sliderSize.top, height: sliderSize.size }} />
			<Tab title="Flow" id="flow-tab" value="flow" icon={<i className="material-icons-outlined">swap_calls</i>} onChangeHandler={onChangeHandler} active={props.active} innerRef={flowRef} />
			<Divider tabBefore="flow" tabAfter="text" active={props.active} />
			<Tab title="Text" id="text-tab" value="text" icon={<i className="material-icons-outlined">code</i>} onChangeHandler={onChangeHandler} active={props.active} innerRef={textRef} />
			<Divider tabBefore="text" tabAfter="console" active={props.active} />
			<Tab
				title="Console"
				id="console-tab"
				value="console"
				icon={<i className="material-icons-outlined">call_to_action</i>}
				onChangeHandler={onChangeHandler}
				onClickHandler={consoleClickHandler}
				active={props.active}
				innerRef={consoleRef}
				status={ctx.unreadStatus}
			/>
			<Divider tabBefore="console" tabAfter="settings" active={props.active} />
			<Tab title="Config" id="config-tab" value="config" icon={<i className="material-icons-outlined">tune</i>} onChangeHandler={onChangeHandler} active={props.active} innerRef={configRef} />
		</div>
	);
};

export default memo(TabBar);
