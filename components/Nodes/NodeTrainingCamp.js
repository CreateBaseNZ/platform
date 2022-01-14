import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import NodeSensing from "./NodeSensing";

import classes from "./Nodes.module.scss";

const NodeTrainingBotAction = ({ data = { values: { a: 1 }, connections: [] }, id, label, isConnectable, style = {} }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${classes.heatSeekerAction}`} style={style}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>{label}</h4>
			<CustomHandle
				type="target"
				position="top"
				id="float__in__a"
				style={{ left: "auto", right: "34px", transform: "none" }}
				isConnectable={isConnectable}
				connections={data ? data.connections : []}
			/>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
		</div>
	);
};

export const NodeTrainingBotGetBananaGreen = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Banana Green" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeTrainingBotGetBananaYellow = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Banana Yellow" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeTrainingBotGetBananaBrown = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Banana Brown" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeTrainingBotGetTrafficLight = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Traffic Light Colour" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeTrainingBotPullLever = memo(({ id, data, isConnectable }) => {
	return <NodeTrainingBotAction data={data} id={id} label="Pull Lever" isConnectable={isConnectable} />;
});

export const NodeTrainingBotPunch = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Punch</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotTurnLeft = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Turn Left</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotTurnRight = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Turn Right</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotMoveForward = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Move Forward</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotPumpTyre = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Pump Tyre</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotWalk = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Walk</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeTrainingBotStop = memo(({ data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Stop</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

const NodeAimBotActionMini = (props) => {
	return (
		<NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
			<h4>{props.label}</h4>
		</NodeMini>
	);
};

export const NodeTrainingBotGetBananaGreenMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeTrainingBotGetBananaGreen" node={<NodeTrainingBotGetBananaGreen />}>
			<h4>Get Banana Green</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotGetBananaYellowMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeTrainingBotGetBananaYellow" node={<NodeTrainingBotGetBananaYellow />}>
			<h4>Get Banana Yellow</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotGetBananaBrownMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeTrainingBotGetBananaBrown" node={<NodeTrainingBotGetBananaBrown />} style={{ border: "outset #00ffee" }}>
			<h4>Get Banana Brown</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotGetTrafficLightMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeTrainingBotGetTrafficLight" node={<NodeTrainingBotGetTrafficLight />} style={{ border: "outset #00ffee" }}>
			<h4>Get Traffic Light Colour</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotPullLeverMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotPullLever" node={<NodeTrainingBotPullLever />}>
			<h4>Pull Lever</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotPunchMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotPunch" node={<NodeTrainingBotPunch />}>
			<h4>Punch</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotTurnLeftMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotTurnLeft" node={<NodeTrainingBotTurnLeft />}>
			<h4>Turn Left</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotTurnRightMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotTurnRight" node={<NodeTrainingBotTurnRight />} style={{ border: "outset #5fdaff" }}>
			<h4>Turn Right</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotMoveForwardMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotMoveForward" node={<NodeTrainingBotMoveForward />} style={{ border: "outset #5fdaff" }}>
			<h4>Move Forward</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotPumpTyreMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotPumpTyre" node={<NodeTrainingBotPumpTyre />}>
			<h4>Pump Tyre</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotWalkMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotWalk" node={<NodeTrainingBotWalk />}>
			<h4>Walk</h4>
		</NodeMini>
	);
});

export const NodeTrainingBotStopMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeTrainingBotStop" node={<NodeTrainingBotStop />}>
			<h4>Stop</h4>
		</NodeMini>
	);
});