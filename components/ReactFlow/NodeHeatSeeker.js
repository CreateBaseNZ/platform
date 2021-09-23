import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import { getDefaultValues } from "../../utils/flowHelpers";
import NodeSensing, { NodeSensingBool } from "./NodeSensing";

import classes from "./Nodes.module.scss";

const HeatSeekerActionNode = ({ data = { values: getDefaultValues({ selectName }), connections: [] }, id, className, label, selectName, dataName, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>{label}</h4>
			<CustomHandle
				type="target"
				position="top"
				id="float__in__a"
				style={{ left: "auto", right: "40px", transform: "none" }}
				isConnectable={isConnectable}
				connections={data ? data.connections : []}
			/>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<InputWithHandle data={data} blockId={id} handleId="float__in__a" inputName="a" />
		</div>
	);
};

export const heatSeeker__leftWheel = memo(({ id, data, isConnectable }) => {
	return <HeatSeekerActionNode data={data} id={id} className={classes.moveForward} label="Left Wheel" selectName="leftWheel" dataName="entity" isConnectable={isConnectable} />;
});

export const heatSeeker__rightWheel = memo(({ id, data, isConnectable }) => {
	return <HeatSeekerActionNode data={data} id={id} className={classes.moveForward} label="Right Wheel" selectName="rightWheel" dataName="entity" isConnectable={isConnectable} />;
});

export const heatSeeker__moveForward = memo(({ id, data, isConnectable }) => {
	return <HeatSeekerActionNode data={data} id={id} className={classes.moveForward} label="Move Forward" selectName="moveForward" dataName="entity" isConnectable={isConnectable} />;
});

export const heatSeeker__moveBackward = memo(({ id, data, isConnectable }) => {
	return <HeatSeekerActionNode data={data} id={id} className={classes.moveForward} label="Move Backwards" selectName="moveBackward" dataName="entity" isConnectable={isConnectable} />;
});

export const heatSeeker__turn = memo(({ id, data = { values: getDefaultValues("waterHose"), connections: [] }, isConnectable }) => {
	const changeHandler = () => {
		console.log(data.values.a);
		data.callBack({ a: !data.values.a }, id);
	};
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.nodeTurn} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Turn</h4>
			<div className={classes.flexRow}>
				<div className={classes.label} style={{ opacity: data.values.a && "0" }}>
					Anti-clockwise
				</div>
				<div className={`nodrag ${classes.toggle}`} onDragStart={(e) => e.preventDefault}>
					<input type="checkbox" checked={data.values.a} onChange={changeHandler} />
					<div />
				</div>
				<div className={classes.label} style={{ opacity: !data.values.a && "0" }}>
					Clockwise
				</div>
			</div>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const heatSeeker__stop = memo(({ id, data = { values: getDefaultValues("waterHose"), connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Stop</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const heatSeeker__waterHose = memo(({ id, data = { values: getDefaultValues("waterHose"), connections: [] }, isConnectable }) => {
	const changeHandler = () => {
		data.callBack({ a: !data.values.a }, id);
	};
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.nodeMagneticSwitch} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Water Hose</h4>
			<div className={classes.flexRow}>
				<div className={classes.label} style={{ opacity: data.values.a && "0" }}>
					Off
				</div>
				<div className={`nodrag ${classes.toggle}`} onDragStart={(e) => e.preventDefault}>
					<input type="checkbox" checked={data.values.a} onChange={changeHandler} />
					<div />
				</div>
				<div className={classes.label} style={{ opacity: !data.values.a && "0" }}>
					On
				</div>
			</div>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const heatSeeker__leftWheel__mini = memo(() => {
	return (
		<NodeMini className={classes.nodeAttack} nodeType="leftWheel" node={<NodeLeftWheel />}>
			<h4>Left wheel</h4>
		</NodeMini>
	);
});

export const heatSeeker__rightWheel__mini = memo(() => {
	return (
		<NodeMini className={classes.nodeAttack} nodeType="rightWheel" node={<NodeRightWheel />}>
			<h4>Right wheel</h4>
		</NodeMini>
	);
});

export const heatSeeker__moveForward__mini = memo(() => {
	return (
		<NodeMini className={classes.nodeAttack} nodeType="moveForward" node={<NodeMoveForward />}>
			<h4>Move forward</h4>
		</NodeMini>
	);
});

export const heatSeeker__moveBackward__mini = memo(() => {
	return (
		<NodeMini className={classes.nodeAttack} nodeType="moveBackward" node={<NodeMoveBackward />}>
			<h4>Move backward</h4>
		</NodeMini>
	);
});

export const heatSeeker__turn__mini = memo(() => {
	return (
		<NodeMini nodeType="turn" node={<NodeTurn />} className={classes.actioning} style={{ height: "3rem" }}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Turn</h4>
			</div>
		</NodeMini>
	);
});

export const heatSeeker__stop__mini = memo(() => {
	return (
		<NodeMini nodeType="stop" node={<NodeStop />} className={classes.actioning} style={{ height: "3rem" }}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Stop</h4>
			</div>
		</NodeMini>
	);
});

export const heatSeeker__waterHose__mini = memo(() => {
	return (
		<NodeMini nodeType="waterHose" node={<NodeWaterHose />} className={classes.actioning} style={{ height: "3rem" }}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Water Hose</h4>
			</div>
		</NodeMini>
	);
});

export const heatSeeker__leftSensor__mini = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Left line sensor" />;
});

export const heatSeeker__middleSensor__mini = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Middle line sensor" />;
});

export const heatSeeker__rightSensor__mini = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Right line sensor" />;
});

export const heatSeeker__onLine__mini = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is car on line?" />;
});

export const heatSeeker__frontOnLine__mini = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is front on line?" />;
});

export const heatSeeker__isFire = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is fire?" />;
});

export const heatSeeker__leftRightDifference = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Difference between left and right" />;
});

export const heatSeeker__fireSensor = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Fire sensor" />;
});

export const heatSeeker__leftSensor__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="leftLineSensor" node={<NodeLeftSensor />}>
			<h4>Left line sensor</h4>
		</NodeMini>
	);
});

export const heatSeeker__middleSensor__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="middleLineSensor" node={<NodeMiddleSensor />}>
			<h4>Middle line sensor</h4>
		</NodeMini>
	);
});

export const heatSeeker__rightSensor__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="rightLineSensor" node={<NodeRightSensor />}>
			<h4>Right line sensor</h4>
		</NodeMini>
	);
});

export const heatSeeker__onLine__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="onLine" node={<NodeOnLine />}>
			<h4>Front on line?</h4>
		</NodeMini>
	);
});

export const heatSeeker__frontOnLine__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="frontOnLine" node={<NodeFrontOnLine />}>
			<h4>Is front on line?</h4>
		</NodeMini>
	);
});

export const heatSeeker__isFire__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="isFire" node={<NodeIsFire />}>
			<h4>Is fire?</h4>
		</NodeMini>
	);
});

export const heatSeeker__leftRightDifference__mini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="leftRightDifference" node={<NodeLeftRightDifference />}>
			<h4>Difference between left and right</h4>
		</NodeMini>
	);
});

export const heatSeeker__fireSensor__mini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeLeftSensor}`} nodeType="fireDetectionSensor" node={<NodeFireSensor />}>
			<h4>Fire sensor</h4>
		</NodeMini>
	);
});
