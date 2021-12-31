import { CSSProperties, memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import NodeSensing from "./NodeSensing";

import classes from "./Nodes.module.scss";

interface NodeData {
	values: any; // TODO
	connections: any[]; // TODO
}

interface AimbotSensingProps {
	data?: NodeData;
	isConnectable?: boolean;
}

interface AimbotActionProps {
	id?: string;
	data?: NodeData;
	isConnectable?: boolean;
}

interface NodeProps {
	data: NodeData;
	id: string;
	label: string;
	isConnectable: boolean;
	style?: CSSProperties;
}

const NodeAimBotAction = ({ data = { values: { a: 1 }, connections: [] }, id, label, isConnectable, style = {} }: NodeProps): JSX.Element => {
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

export const NodeAimBotGetYawAngle = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Yaw Angle" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetPitchAngle = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Pitch Angle" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoXPos = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito X-Pos" style={{ width: "12rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoYPos = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito Y-Pos" style={{ width: "12rem", height: "2rem" }} />;
});

export const NodeAimBotGetMosquitoZPos = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Mosquito Z-Pos" style={{ width: "12rem", height: "2rem" }} />;
});

export const NodeAimBotSetYawSpeed = memo(({ id, data, isConnectable }: AimbotActionProps): JSX.Element => {
	return <NodeAimBotAction data={data} id={id} label="Set Yaw Speed" isConnectable={isConnectable} />;
});

export const NodeAimBotSetPitchSpeed = memo(({ id, data, isConnectable }: AimbotActionProps): JSX.Element => {
	return <NodeAimBotAction data={data} id={id} label="Set Pitch Speed" isConnectable={isConnectable} />;
});

export const NodeAimBotGetCurrentYawSpeed = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Current Yaw Speed" style={{ width: "10rem", height: "3rem", border: "outset #5fdaff" }} />;
});

export const NodeAimBotGetCurrentPitchSpeed = memo(({ data, isConnectable }: AimbotSensingProps): JSX.Element => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Get Current Pitch Speed" style={{ width: "10rem", height: "3rem", border: "outset #5fdaff" }} />;
});

export const NodeAimBotSetCurrentYawSpeed = memo(({ id, data, isConnectable }: AimbotActionProps): JSX.Element => {
	return <NodeAimBotAction data={data} id={id} label="Set Current Yaw Speed" isConnectable={isConnectable} style={{ border: "outset #00ffee" }} />;
});

export const NodeAimBotSetCurrentPitchSpeed = memo(({ id, data, isConnectable }: AimbotActionProps): JSX.Element => {
	return <NodeAimBotAction data={data} id={id} label="Set Current Pitch Speed" isConnectable={isConnectable} style={{ border: "outset #00ffee" }} />;
});

export const NodeAimBotShoot = memo(({ data, isConnectable }): JSX.Element => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Shoot</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

const NodeAimBotActionMini = (props): JSX.Element => {
	return (
		<NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
			<h4>{props.label}</h4>
		</NodeMini>
	);
};

export const NodeAimBotSetYawSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetYawSpeed" node={<NodeAimBotSetYawSpeed />}>
			<h4>Set Yaw Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotSetPitchSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetPitchSpeed" node={<NodeAimBotSetPitchSpeed />}>
			<h4>Set Pitch Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotSetCurrentYawSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetCurrentYawSpeed" node={<NodeAimBotSetCurrentYawSpeed />} style={{ border: "outset #00ffee" }}>
			<h4>Set Current Yaw Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotSetCurrentPitchSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotSetCurrentPitchSpeed" node={<NodeAimBotSetCurrentPitchSpeed />} style={{ border: "outset #00ffee" }}>
			<h4>Set Current Pitch Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotShootMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotShoot" node={<NodeAimBotShoot />}>
			<h4>Shoot</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetYawAngleMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetYawAngle" node={<NodeAimBotGetYawAngle />}>
			<h4>Get Yaw Angle</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetPitchAngleMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetPitchAngle" node={<NodeAimBotGetPitchAngle />}>
			<h4>Get Pitch Angle</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetCurrentYawSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetCurrentYawSpeed" node={<NodeAimBotGetCurrentYawSpeed />} style={{ border: "outset #5fdaff" }}>
			<h4>Get Current Yaw Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetCurrentPitchSpeedMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetCurrentPitchSpeed" node={<NodeAimBotGetCurrentPitchSpeed />} style={{ border: "outset #5fdaff" }}>
			<h4>Get Current Pitch Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoXPosMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoXPos" node={<NodeAimBotGetMosquitoXPos />}>
			<h4>Get Mosquito X-Pos</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoYPosMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoYPos" node={<NodeAimBotGetMosquitoYPos />}>
			<h4>Get Mosquito Y-Pos</h4>
		</NodeMini>
	);
});

export const NodeAimBotGetMosquitoZPosMini = memo((): JSX.Element => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotGetMosquitoZPos" node={<NodeAimBotGetMosquitoZPos />}>
			<h4>Get Mosquito Z-Pos</h4>
		</NodeMini>
	);
});
