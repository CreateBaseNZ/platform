import { memo } from "react";
import NodeSensing from "./NodeSensing";
import { NodeMini } from "./NodeGeneral";
import CustomHandle from "./Handles";

import classes from "./Nodes.module.scss";

const NodeSendItAction = ({ data, className, label, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>{label}</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
};

export const NodeSendItCrouch = memo(({ data, isConnectable }) => {
	return <NodeSendItAction data={data} className={classes.nodeCrouch} label="Crouch" selectName="crouch" dataName="entity" isConnectable={isConnectable} />;
});
export const NodeSendItJump = memo(({ data, isConnectable }) => {
	return <NodeSendItAction data={data} className={classes.nodeJump} label="Jump" selectName="jump" dataName="entity" isConnectable={isConnectable} />;
});

const NodeSendItActionMini = (props) => {
	return (
		<NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
			<h4>{props.label}</h4>
		</NodeMini>
	);
};

export const NodeSendItCrouchMini = memo(() => {
	return <NodeSendItActionMini className={classes.nodeCrouch} label="Crouch" nodeType="NodeSendItCrouch" node={<NodeSendItCrouch />} />;
});
export const NodeSendItJumpMini = memo(() => {
	return <NodeSendItActionMini className={classes.nodeJump} label="Jump" nodeType="NodeSendItJump" node={<NodeSendItJump />} />;
});

export const NodeSendItDistance = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Distance to next obstacle" />;
});

export const NodeSendItHeightOf = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Height of next obstacle" />;
});

export const NodeSendItWidthOf = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Width of next obstacle" />;
});

export const NodeSendItSpeedOf = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Speed of next obstacle" />;
});

export const NodeSendItElevationOf = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Elevation of next obstacle" />;
});

export const NodeSendItDistanceMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeDistance}`} nodeType="NodeSendItDistance" node={<NodeSendItDistance />}>
			<h4>Distance to next obstacle</h4>
		</NodeMini>
	);
});

export const NodeSendItHeightOfMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeHeightOf}`} nodeType="NodeSendItHeightOf" node={<NodeSendItHeightOf />}>
			<h4>Height of next obstacle</h4>
		</NodeMini>
	);
});

export const NodeSendItWidthOfMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeWidthOf}`} nodeType="NodeSendItWidthOf" node={<NodeSendItWidthOf />}>
			<h4>Width of next obstacle</h4>
		</NodeMini>
	);
});

export const NodeSendItSpeedOfMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeSpeedOf}`} nodeType="NodeSendItSpeedOf" node={<NodeSendItSpeedOf />}>
			<h4>Speed of next obstacle</h4>
		</NodeMini>
	);
});

export const NodeSendItElevationOfMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeElevationOf}`} nodeType="NodeSendItElevationOf" node={<NodeSendItElevationOf />}>
			<h4>Elevation of next obstacle</h4>
		</NodeMini>
	);
});
