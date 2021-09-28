import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";
import { getDefaultValues } from "../../utils/flowHelpers";
import NodeSensing, { NodeSensingBool } from "./NodeSensing";

import classes from "./Nodes.module.scss";

const NodeHeatSeekerAction = ({ data = { values: getDefaultValues({ selectName }), connections: [] }, id, className, label, selectName, isConnectable, style }) => {
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

export const NodeHeatSeekerMoveForward = memo(({ id, data, isConnectable }) => {
	return <NodeHeatSeekerAction data={data} id={id} label="Move Forward" selectName="moveForward" dataName="entity" isConnectable={isConnectable} />;
});

export const NodeHeatSeekerMoveBackward = memo(({ id, data, isConnectable }) => {
	return <NodeHeatSeekerAction data={data} id={id} label="Move Backwards" selectName="moveBackward" dataName="entity" isConnectable={isConnectable} />;
});

export const NodeHeatSeekerLeftWheel = memo(({ id, data, isConnectable }) => {
	return <NodeHeatSeekerAction data={data} id={id} label="Left Wheel" selectName="leftWheel" dataName="entity" isConnectable={isConnectable} />;
});

export const NodeHeatSeekerRightWheel = memo(({ id, data, isConnectable }) => {
	return <NodeHeatSeekerAction data={data} id={id} label="Right Wheel" selectName="rightWheel" dataName="entity" isConnectable={isConnectable} />;
});

export const NodeHeatSeekerStop = memo(({ id, data = { values: {}, connections: [] }, isConnectable }) => {
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle}`} style={{ width: "auto" }}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Stop</h4>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeHeatSeekerTurn = memo(({ id, data = { values: {}, connections: [] }, isConnectable }) => {
	const changeHandler = () => {
		console.log(data.values.a);
		data.callBack({ a: !data.values.a }, id);
	};
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.nodeTurn} ${classes.hasLeftHandle} ${classes.hasRightHandle}`} style={{ width: "auto" }}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Turn</h4>
			<div className={classes.flexRow} style={{ alignItems: "center", justifyContent: "center" }}>
				<div className={classes.label} style={{ marginRight: "0.5rem", width: "4rem" }}>
					{data.values.a ? "Clockwise" : "Anti-clockwise"}
				</div>
				<div className={`nodrag ${classes.toggle}`} onDragStart={(e) => e.preventDefault}>
					<input type="checkbox" checked={data.values.a} onChange={changeHandler} />
					<div />
				</div>
			</div>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeHeatSeekerWaterHose = memo(({ id, data = { values: {}, connections: [] }, isConnectable }) => {
	const changeHandler = () => {
		data.callBack({ a: !data.values.a }, id);
	};
	return (
		<div className={`${classes.node} ${classes.actioning} ${classes.nodeMagneticSwitch} ${classes.hasLeftHandle} ${classes.hasRightHandle}`} style={{ width: "auto" }}>
			<CustomHandle type="target" position="left" id="execution__in" isConnectable={isConnectable} connections={data ? data.connections : []} />
			<h4>Water Hose</h4>
			<div className={classes.flexRow}>
				<div className={classes.label}>{data.values.a ? "On" : "Off"}</div>
				<div className={`nodrag ${classes.toggle}`} onDragStart={(e) => e.preventDefault}>
					<input type="checkbox" checked={data.values.a} onChange={changeHandler} />
					<div />
				</div>
			</div>
			<CustomHandle type="source" position="right" id="execution__out" isConnectable={isConnectable} connections={data ? data.connections : []} />
		</div>
	);
});

export const NodeHeatSeekerLeftWheelMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeHeatSeekerLeftWheel" node={<NodeHeatSeekerLeftWheel />}>
			<h4>Left wheel</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerRightWheelMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeHeatSeekerRightWheel" node={<NodeHeatSeekerRightWheel />}>
			<h4>Right wheel</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerMoveForwardMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeHeatSeekerMoveForward" node={<NodeHeatSeekerMoveForward />}>
			<h4>Move forward</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerMoveBackwardMini = memo(() => {
	return (
		<NodeMini className={classes.actioning} nodeType="NodeHeatSeekerMoveBackward" node={<NodeHeatSeekerMoveBackward />}>
			<h4>Move backward</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerTurnMini = memo(() => {
	return (
		<NodeMini nodeType="NodeHeatSeekerTurn" node={<NodeHeatSeekerTurn />} className={classes.actioning}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Turn</h4>
			</div>
		</NodeMini>
	);
});

export const NodeHeatSeekerStopMini = memo(() => {
	return (
		<NodeMini nodeType="NodeHeatSeekerStop" node={<NodeHeatSeekerStop />} className={classes.actioning}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Stop</h4>
			</div>
		</NodeMini>
	);
});

export const NodeHeatSeekerWaterHoseMini = memo(() => {
	return (
		<NodeMini nodeType="NodeHeatSeekerWaterHose" node={<NodeHeatSeekerWaterHose />} className={classes.actioning}>
			<div className={classes.flexCol} style={{ marginTop: "-4px" }}>
				<h4>Water Hose</h4>
			</div>
		</NodeMini>
	);
});

export const NodeHeatSeekerLeftSensor = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Left line sensor" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeHeatSeekerMiddleSensor = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Middle line sensor" style={{ width: "12rem", height: "2rem" }} />;
});

export const NodeHeatSeekerRightSensor = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Right line sensor" style={{ width: "11rem", height: "2rem" }} />;
});

export const NodeHeatSeekerRobotOnLine = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is robot on line?" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeHeatSeekerFrontOnLine = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is front on line?" style={{ width: "10rem", height: "2rem" }} />;
});

export const NodeHeatSeekerIsFireNear = memo(({ data, isConnectable }) => {
	return <NodeSensingBool data={data} isConnectable={isConnectable} label="Is Fire Near?" style={{ width: "8rem", height: "2rem" }} />;
});

export const NodeHeatSeekerDifference = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Difference between left and right sensors" style={{ width: "13rem", height: "4rem" }} />;
});

export const NodeHeatSeekerFireSensor = memo(({ data, isConnectable }) => {
	return <NodeSensing data={data} isConnectable={isConnectable} label="Fire sensor" style={{ width: "8rem", height: "2rem" }} />;
});

export const NodeHeatSeekerLeftSensorMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerLeftSensor" node={<NodeHeatSeekerLeftSensor />}>
			<h4>Left line sensor</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerMiddleSensorMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerMiddleSensor" node={<NodeHeatSeekerMiddleSensor />}>
			<h4>Middle line sensor</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerRightSensorMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerRightSensor" node={<NodeHeatSeekerRightSensor />}>
			<h4>Right line sensor</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerRobotOnLineMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerRobotOnLine" node={<NodeHeatSeekerRobotOnLine />}>
			<h4>Is robot on line?</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerFrontOnLineMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerFrontOnLine" node={<NodeHeatSeekerFrontOnLine />}>
			<h4>Is front on line?</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerIsFireNearMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerIsFireNear" node={<NodeHeatSeekerIsFireNear />}>
			<h4>Is fire near?</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerDifferenceMini = memo(() => {
	return (
		<NodeMini className={classes.sensing} nodeType="NodeHeatSeekerDifference" node={<NodeHeatSeekerDifference />}>
			<h4>Difference between left and right sensors</h4>
		</NodeMini>
	);
});

export const NodeHeatSeekerFireSensorMini = memo(() => {
	return (
		<NodeMini className={`${classes.sensing} ${classes.nodeLeftSensor}`} nodeType="NodeHeatSeekerFireSensor" node={<NodeHeatSeekerFireSensor />}>
			<h4>Fire sensor</h4>
		</NodeMini>
	);
});
