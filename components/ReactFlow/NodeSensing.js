import { EntityDropdown, NodeMini } from "./NodeGeneral";
import classes from "./Nodes.module.scss";
import CustomHandle from "./Handles";

const NodeSensing = ({
  data = { values: {}, connections: [] },
  isConnectable,
  label,
  id="float__out"
}) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.hasRightHandle}`}
    >
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
      <CustomHandle
        type="source"
        position="right"
        id={id}
        isConnectable={isConnectable}
        connections={data.connections}
      />
    </div>
  );
};

const NodeSensingBool = ({
  data = { values: {}, connections: [] },
  isConnectable,
  label,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.hasRightHandle}`}
    >
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
      <CustomHandle
        type="source"
        position="right"
        id="boolean__out"
        isConnectable={isConnectable}
        connections={data.connections}
      />
    </div>
  );
};

export const NodeDistance = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Distance to next obstacle"
    />
  );
};

export const NodeHeightOf = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Height of next obstacle"
    />
  );
};

export const NodeLeftSensor = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Left Line Sensor"
    />
  );
};

export const NodeRightSensor = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Right Line Sensor"
    />
  );
};

export const NodeOnLine = ({ data, isConnectable }) => {
  return (
    <NodeSensingBool
      data={data}
      isConnectable={isConnectable}
      label="Car on Line"
    />
  );
};

export const NodeFrontOnLine = ({ data, isConnectable }) => {
  return (
    <NodeSensingBool
      data={data}
      isConnectable={isConnectable}
      label="Is Front On the Line"
    />
  );
};

export const NodeIsFire = ({ data, isConnectable }) => {
  return (
    <NodeSensingBool
      data={data}
      isConnectable={isConnectable}
      label="Is Fire?"
    />
  );
};

export const NodeDifference = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Difference between right and left"
    />
  );
};

export const NodeMiddleSensor = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Middle Line Sensor"
    />
  );
};

export const NodeFireSensor = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Fire Sensor"
    />
  );
};

export const NodeWidthOf = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Width of next obstacle"
    />
  );
};

export const NodeSpeedOf = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Speed of next obstacle"
    />
  );
};

export const NodeElevationOf = ({ data, isConnectable }) => {
  return (
    <NodeSensing
      data={data}
      isConnectable={isConnectable}
      label="Elevation of next obstacle"
    />
  );
};

export const NodeDistanceMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeDistance}`}
      nodeType="distance"
      node={<NodeDistance />}
    >
      {/* <h4>Distance from</h4>
      <div className={classes.blankInput}></div>
      <h4>to</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Distance to next obstacle</h4>
    </NodeMini>
  );
};

export const NodeHeightOfMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeHeightOf}`}
      nodeType="heightOf"
      node={<NodeHeightOf />}
    >
      {/* <h4>Height of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Height of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeLeftSensorMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeLeftSensor}`}
      nodeType="leftLineSensor"
      node={<NodeLeftSensor />}
    >
      <h4>Left Line Sensor</h4>
    </NodeMini>
  );
};

export const NodeRightSensorMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="rightLineSensor"
      node={<NodeRightSensor />}
    >
      <h4>Right Line Sensor</h4>
    </NodeMini>
  );
};

export const NodeOnLineMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="onLine"
      node={<NodeOnLine />}
    >
      <h4>Car on Line</h4>
    </NodeMini>
  );
};

export const NodeFrontOnLineMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="frontOnLine"
      node={<NodeFrontOnLine />}
    >
      <h4>Is Front On the Line</h4>
    </NodeMini>
  );
};

export const NodeIsFireMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="isFire"
      node={<NodeIsFire />}
    >
      <h4>Is Fire?</h4>
    </NodeMini>
  );
};


export const NodeDifferenceMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="difference"
      node={<NodeDifference />}
    >
      <h4>Difference between right and left</h4>
    </NodeMini>
  );
};

export const NodeMiddleSensorMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeRightSensor}`}
      nodeType="middleLineSensor"
      node={<NodeMiddleSensor />}
    >
      <h4>Middle Line Sensor</h4>
    </NodeMini>
  );
};

export const NodeFireSensorMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeLeftSensor}`}
      nodeType="fireDetectionSensor"
      node={<NodeFireSensor />}
    >
      <h4>Fire Sensor</h4>
    </NodeMini>
  );
};

export const NodeWidthOfMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeWidthOf}`}
      nodeType="widthOf"
      node={<NodeWidthOf />}
    >
      {/* <h4>Width of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Width of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeSpeedOfMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeSpeedOf}`}
      nodeType="speedOf"
      node={<NodeSpeedOf />}
    >
      {/* <h4>Speed of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Speed of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeElevationOfMini = () => {
  return (
    <NodeMini
      className={`${classes.sensing} ${classes.nodeElevationOf}`}
      nodeType="elevationOf"
      node={<NodeElevationOf />}
    >
      {/* <h4>Elevation of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Elevation of next obstacle</h4>
    </NodeMini>
  );
};
