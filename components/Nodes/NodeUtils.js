import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";
import { InputWithHandle } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

export const NodePrint = memo(({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.utils} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data.connections} />
			<h4>Print</h4>
			<InputWithHandle data={data} blockId={id} handleId="any__in__a" inputName="a" />
			<CustomHandle type="target" position="top" id="any__in__a" style={{ left: "auto", right: "32px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeDelay = memo(({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.utils} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data.connections} />
			<h4>Delay</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "auto", right: "32px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

const NodeBoolean = ({ data = { connections: [] }, isConnectable, label }) => {
	return (
		<div className={`${classes.node} ${classes.utils} ${classes.hasRightHandle} ${classes.nodeBoolean}`}>
			<h4>{label}</h4>
			<CustomHandle type="source" position="right" id="boolean__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
};

export const NodeTrue = memo(({ data, isConnectable }) => {
	return <NodeBoolean data={data} isConnectable={isConnectable} label="TRUE" />;
});
export const NodeFalse = memo(({ data, isConnectable }) => {
	return <NodeBoolean data={data} isConnectable={isConnectable} label="FALSE" />;
});

const NodeUtilsMini = (props) => {
	return (
		<NodeMini {...props} className={classes.utils}>
			<h4>{props.label}</h4>
			<div className={classes.blankInput}></div>
		</NodeMini>
	);
};

export const NodePrintMini = memo(() => {
	return <NodeUtilsMini label="Print" nodeType="NodePrint" node={<NodePrint />} />;
});

export const NodeDelayMini = memo(() => {
	return <NodeUtilsMini label="Delay" nodeType="NodeDelay" node={<NodeDelay />} />;
});

export const NodeTrueMini = memo(() => {
	return <NodeUtilsMini label="True" nodeType="NodeTrue" node={<NodePrint />} />;
});

export const NodeFalseMini = memo(() => {
	return <NodeUtilsMini label="False" nodeType="NodeFalse" node={<NodeDelay />} />;
});