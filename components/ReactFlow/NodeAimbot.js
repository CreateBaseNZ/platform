import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import { getDefaultValues } from "../../utils/flowHelpers";
import NodeSensing, { NodeSensingBool } from "./NodeSensing";

import classes from "./Nodes.module.scss";

const NodeAimBotAction = ({ data = { values: {a: 1}, connections: [] }, id, label, isConnectable, style }) => {
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

export const NodeAimBotGetYawAngle = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Yaw Angle" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetPitchAngle = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Pitch Angle" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoXPos = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito X-Pos" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoYPos = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito Y-Pos" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoZPos = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito Z-Pos" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotSetYawSpeed = memo(({ id, data, isConnectable }) => {
	return <NodeAimBotAction data={data} id={id} label="Set Yaw Speed" isConnectable={isConnectable} />;
});

export const NodeAimBotSetPitchSpeed = memo(({ id, data, isConnectable }) => {
	return <NodeAimBotAction data={data} id={id} label="Set Pitch Speed" isConnectable={isConnectable} />;
});

export const NodeAimBotShoot = memo(({data, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Shoot</h4>
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

export const NodeAimBotSetYawSpeedMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetYawSpeed" node={<NodeAimBotSetYawSpeed />}>
			<h4>Set Yaw Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotSetPitchSpeedMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetPitchSpeed" node={<NodeAimBotSetPitchSpeed />}>
			<h4>Set Pitch Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotShootMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotShoot" node={<NodeAimBotShoot />}>
			<h4>Shoot</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetYawAngleMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetYawAngle" node={<NodeAimBotGetYawAngle />}>
			<h4>Get Yaw Angle</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetPitchAngleMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetPitchAngle" node={<NodeAimBotGetPitchAngle />}>
			<h4>Get Pitch Angle</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoXPosMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoXPos" node={<NodeAimBotGetMosquitoXPos />}>
			<h4>Get Mosquito X-Pos</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoYPosMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoYPos" node={<NodeAimBotGetMosquitoYPos />}>
			<h4>Get Mosquito Y-Pos</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoZPosMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoZPos" node={<NodeAimBotGetMosquitoZPos />}>
			<h4>Get Mosquito Z-Pos</h4>
		</NodeMini>
	);
});
