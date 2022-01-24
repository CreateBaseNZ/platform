import { EntityDropdown, NodeMini } from "./NodeGeneral";
import classes from "./Nodes.module.scss";
import CustomHandle from "./Handles";

export const NodeSensing = ({ data = { values: {}, connections: [] }, isConnectable, label, style }) => {
	return (
		<div className={`${classes.node} ${classes.sensing} ${classes.hasRightHandle}`} style={style}>
			{/* <h4>Distance from</h4>
  <EntityDropdown data={data} selectName="distance-from" dataName="from" />
  <h4>to</h4>
  <EntityDropdown
    data={data}
    selectName="distance-to"
    dataName="to"
    options={["Next obstacle"]}
  /> */}
			<h4>{label}</h4>
			<CustomHandle type="source" position="right" id="float__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
};

export default NodeSensing;

export const NodeSensingBool = ({ data = { values: {}, connections: [] }, isConnectable, label, style }) => {
	return (
		<div className={`${classes.node} ${classes.sensing} ${classes.hasRightHandle}`} style={style}>
			{/* <h4>Distance from</h4>
  <EntityDropdown data={data} selectName="distance-from" dataName="from" />
  <h4>to</h4>
  <EntityDropdown
    data={data}
    selectName="distance-to"
    dataName="to"
    options={["Next obstacle"]}
  /> */}
			<h4>{label}</h4>
			<CustomHandle type="source" position="right" id="boolean__out" isConnectable={isConnectable} connections={data.connections} />
		</div>
	);
};
