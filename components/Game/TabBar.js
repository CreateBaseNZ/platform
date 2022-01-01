import { memo, useContext, useEffect, useRef, useState } from "react";
import ConsoleContext from "../../store/console-context";

import classes from "./TabBar.module.scss";

const Divider = ({ active, tabBefore, tabAfter }) => {
	return (
		<div
			className={classes.divider}
			style={{
				opacity: active === tabBefore || active === tabAfter ? 0 : 0.5,
			}}
		/>
	);
};

const Tab = ({ id, active, value, icon, title, status, innerRef, onChangeHandler, onClickHandler }) => {
	const isActive = active === value;
	return (
		<div className={`${classes.tab} ${isActive ? classes.activeTab : ""} ${classes[status]}`} title={title} ref={innerRef}>
			<input type="radio" id={id} name="workspace-tab" value={value} checked={isActive} onChange={onChangeHandler} onClick={onClickHandler} />
			<label htmlFor={id}>
				{icon}
				<p>{title}</p>
			</label>
		</div>
	);
};

const TabBar = ({ active, onChange, stacked, noFlow }) => {
	const flowRef = useRef(null);
	const textRef = useRef(null);
	const consoleRef = useRef(null);
	const configRef = useRef(null);
	const [sliderSize, setSliderSize] = useState({ top: 0, size: 1 });
	const consoleCtx = useContext(ConsoleContext);

	useEffect(() => {
		switch (active) {
			case "flow":
				setSliderSize({
					top: flowRef.current.offsetTop,
					size: flowRef.current.offsetHeight,
				});
				break;
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
				setSliderSize({
					top: 0,
					size: noFlow ? textRef.current.offsetTop : flowRef.current.offsetHeight,
				});
				break;
		}
	}, [active]);

	const onChangeHandler = (event) => {
		onChange(event.target.value);
	};

	const consoleClickHandler = () => {
		consoleCtx.clearUnread();
	};

	return (
		<div className={`${classes.tabbar} ${stacked ? classes.stacked : classes.shelved}`}>
			<span id="tab-slider" className={`${classes.slider} span`} style={{ top: sliderSize.top, height: sliderSize.size }} />
			{!noFlow && <Tab title="Flow" id="flow-tab" value="flow" icon={<i className="material-icons-outlined">swap_calls</i>} onChangeHandler={onChangeHandler} active={active} innerRef={flowRef} />}
			<Divider tabBefore="flow" tabAfter="text" active={active} />
			<Tab title="Text" id="text-tab" value="text" icon={<i className="material-icons-outlined">code</i>} onChangeHandler={onChangeHandler} active={active} innerRef={textRef} />
			<Divider tabBefore="text" tabAfter="console" active={active} />
			<Tab
				title="Console"
				id="console-tab"
				value="console"
				icon={<i className="material-icons-outlined">call_to_action</i>}
				onChangeHandler={onChangeHandler}
				onClickHandler={consoleClickHandler}
				active={active}
				innerRef={consoleRef}
				status={consoleCtx.unreadStatus}
			/>
			<Divider tabBefore="console" tabAfter="settings" active={active} />
			<Tab title="Config" id="config-tab" value="config" icon={<i className="material-icons-outlined">tune</i>} onChangeHandler={onChangeHandler} active={active} innerRef={configRef} />
		</div>
	);
};

export default memo(TabBar);
