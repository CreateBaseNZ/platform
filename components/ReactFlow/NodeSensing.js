import { EntityDropdown, NodeMini } from "./NodeGeneral";
import classes from "./Nodes.module.scss";
import CustomHandle from "./Handles";

export const NodeDistance = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeDistance} ${classes.hasRightHandle}`}
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
      <h4>Distance to next obstacle</h4>
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeHeightOf = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeHeightOf} ${classes.hasRightHandle}`}
    >
      {/* <h4>Height of</h4>
      <EntityDropdown
        data={data}
        selectName="heightOf"
        dataName="entity"
        options={["Next obstacle"]}
      /> */}
      <h4>Height of next obstacle</h4>
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeWidthOf = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeWidthOf} ${classes.hasRightHandle}`}
    >
      {/* <h4>Width of</h4>
      <EntityDropdown
        data={data}
        selectName="widthOf"
        dataName="entity"
        options={["Next obstacle"]}
      /> */}
      <h4>Width of next obstacle</h4>
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeSpeedOf = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeSpeedOf} ${classes.hasRightHandle}`}
    >
      {/* <h4>Speed of</h4>
      <EntityDropdown
        data={data}
        selectName="speedOf"
        dataName="entity"
        options={["Next obstacle"]}
      /> */}
      <h4>Speed of next obstacle</h4>
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
  );
};

export const NodeElevationOf = ({ data, isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeElevationOf} ${classes.hasRightHandle}`}
    >
      {/* <h4>Elevation of</h4>
      <EntityDropdown
        data={data}
        selectName="elevationOf"
        dataName="entity"
        options={["Next obstacle"]}
      /> */}
      <h4>Elevation of next obstacle</h4>
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
    </div>
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
