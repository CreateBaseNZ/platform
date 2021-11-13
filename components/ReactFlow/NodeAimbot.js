import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import { getDefaultValues } from "../../utils/flowHelpers";
import NodeSensing, { NodeSensingBool } from "./NodeSensing";

import classes from "./Nodes.module.scss";

const NodeAimBotAction = ({ data = { values: getDefaultValues({ selectName }), connections: [] }, id, className, label, selectName, isConnectable, style }) => {
	console.log(id);
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

export const NodeAimBotYawS = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Yaw Sensor" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeAimBotYaw = memo(({ id, data, isConnectable }) => {
	return <NodeAimBotAction data={data} id={id} className={classes.nodeCrouch} label="Set Yaw Speed" selectName="Yaw" dataName="entity" isConnectable={isConnectable} />;
});

export const NodeAimBotPitch = memo(({ data, isConnectable }) => {
	return <NodeAimBotAction data={data} className={classes.nodeCrouch} label="Set Pitch Speed" selectName="Pitch" dataName="entity" isConnectable={isConnectable} />;
});

const NodeAimBotActionMini = (props) => {
	return (
		<NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
			<h4>{props.label}</h4>
		</NodeMini>
	);
};

export const NodeAimBotYawMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeAimBotYaw" node={<NodeAimBotYaw />}>
			<h4>Set Yaw Speed</h4>
		</NodeMini>
	);
});

export const NodeAimBotYawSMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeAimBotYawS" node={<NodeAimBotYawS />}>
			<h4>Yaw Sensor</h4>
		</NodeMini>
	);
});
