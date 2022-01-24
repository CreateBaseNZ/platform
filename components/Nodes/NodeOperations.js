import { memo } from "react";
import CustomHandle from "./Handles";
import { InputWithHandle } from "./NodeGeneral";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

export const NodeOperations = ({ id, label, data = { values: { a: 1, b: 2 }, connections: [] }, className = "", isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle} ${className}`}>
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "30px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="target" position="top" id="float__in__b" style={{ left: "auto", right: "34px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<h4>{label}</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__b" inputName="b" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
};

export const NodeAdd = memo(({ id, data, isConnectable }) => {
	return <NodeOperations id={id} label="+" data={data} isConnectable={isConnectable} />;
});
export const NodeSubtract = memo(({ id, data, isConnectable }) => {
	return <NodeOperations id={id} label="-" data={data} isConnectable={isConnectable} />;
});
export const NodeMultiply = memo(({ id, data, isConnectable }) => {
	return <NodeOperations id={id} label="&times;" data={data} isConnectable={isConnectable} />;
});
export const NodeDivide = memo(({ id, data, isConnectable }) => {
	return <NodeOperations id={id} label="&divide;" data={data} isConnectable={isConnectable} />;
});

export const NodeAbsolute = memo(({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "auto", right: "34px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<h4 style={{ marginLeft: 0 }}>Absolute</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeArcTan = memo(({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "auto", right: "34px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<h4 style={{ marginLeft: 0 }}>Arc Tan</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeSqrt = memo(({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "auto", right: "34px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<h4 style={{ marginLeft: 0 }}>Sqrt</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodePI = memo(({ data = { connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`}>
			<h4 style={{ marginLeft: 0 }}>PI</h4>
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeClamp = memo(({ id, data = { values: { a: 1, b: 2, c: 3}, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`} style={{width: "15em"}}> 
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "auto", right: "8em", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="target" position="top" id="float__in__b" style={{ left: "auto", right: "5em", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="target" position="top" id="float__in__c" style={{ left: "auto", right: "2em", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<h4 style={{ marginLeft: 0 }}>Clamp</h4>
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<InputWithHandle data={data} blockId={id} handleId="float__in__b" inputName="b" />
			<InputWithHandle data={data} blockId={id} handleId="float__in__c" inputName="c" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeGeneralOperator = memo(({ id, data = { values: { a: 1, b: 2, operator: "+" }, connections: [] }, isConnectable }) => {
	const changeHandlerOperator = (event) => {
		data.callBack({ ...data.values, operator: event.target.value }, id);
	};

	return (
		<div className={`${classes.node} ${classes.operating} ${classes.hasRightHandle} ${classes.operatingGeneral}`}>
			<CustomHandle type="target" position="top" id="float__in__a" style={{ left: "30px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<CustomHandle type="target" position="top" id="float__in__b" style={{ left: "auto", right: "30px", transform: "none" }} isConnectable={isConnectable} connections={data.connections} />
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
			<select name={`${data.id}_operator`} id={`${data.id}_operator`} onChange={changeHandlerOperator} value={data.values.operator}>
				{["+", "-", "×", "÷", ">", "<", "=", "not =", "and", "or"].map((operator) => (
					<option value={operator} key={operator}>
						{operator}
					</option>
				))}
			</select>
			<InputWithHandle data={data} blockId={id} handleId="float__in__b" inputName="b" />
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
});

export const NodeOperationsMini = (props) => {
	return (
		<NodeMini {...props} className={`${classes.operating} ${props.className}`}>
			<div className={classes.blankInput} />
			<h4
				style={{
					fontSize: (props.nodeType === "greaterThan" || props.nodeType === "lessThan") && 14,
				}}>
				{props.label}
			</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
};

export const NodeAddMini = memo(() => {
	return <NodeOperationsMini label="+" nodeType="NodeAdd" node={<NodeAdd />} />;
});
export const NodeSubtractMini = memo(() => {
	return <NodeOperationsMini label="-" nodeType="NodeSubtract" node={<NodeSubtract />} />;
});
export const NodeMultiplyMini = memo(() => {
	return <NodeOperationsMini label="&times;" nodeType="NodeMultiply" node={<NodeMultiply />} />;
});
export const NodeDivideMini = memo(() => {
	return <NodeOperationsMini label="&divide;" nodeType="NodeDivide" node={<NodeDivide />} />;
});

export const NodeGeneralOperatorMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodeGeneralOperator" node={<NodeGeneralOperator />}>
			<div className={classes.blankInput} />
			<div className={classes.blankInput} />
			<div className={classes.blankInput} />
		</NodeMini>
	);
});

export const NodeAbsoluteMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodeAbsolute" node={<NodeAbsolute />}>
			<h4>Absolute</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
});

export const NodeArcTanMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodeArcTan" node={<NodeArcTan />}>
			<h4>Arc Tan</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
});

export const NodePIMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodePI" node={<NodePI />}>
			<h4>PI</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
});

export const NodeSqrtMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodeSqrt" node={<NodeSqrt />}>
			<h4>Sqrt</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
});

export const NodeClampMini = memo(() => {
	return (
		<NodeMini className={classes.operating} nodeType="NodeClamp" node={<NodeClamp />}>
			<h4>Clamp</h4>
			<div className={classes.blankInput} />
		</NodeMini>
	);
});