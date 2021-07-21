import { EntityDropdown, NodeMini } from "./NodeGeneral";
import classes from "./Nodes.module.scss";
import CustomHandle from "./Handles";

export const NodeDistance = ({ data }) => {
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
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeDistanceMini = () => {
  return (
    <NodeMini
      nodeType="distance"
      className={`${classes.sensing} ${classes.nodeDistance}`}
    >
      {/* <h4>Distance from</h4>
      <div className={classes.blankInput}></div>
      <h4>to</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Distance to next obstacle</h4>
    </NodeMini>
  );
};

export const NodeHeightOf = ({ data }) => {
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
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeHeightOfMini = () => {
  return (
    <NodeMini
      nodeType="heightOf"
      className={`${classes.sensing} ${classes.nodeHeightOf}`}
    >
      {/* <h4>Height of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Height of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeWidthOf = ({ data }) => {
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
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeWidthOfMini = () => {
  return (
    <NodeMini
      nodeType="widthOf"
      className={`${classes.sensing} ${classes.nodeWidthOf}`}
    >
      {/* <h4>Width of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Width of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeSpeedOf = ({ data }) => {
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
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeSpeedOfMini = () => {
  return (
    <NodeMini
      nodeType="speedOf"
      className={`${classes.sensing} ${classes.nodeSpeedOf}`}
    >
      {/* <h4>Speed of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Speed of next obstacle</h4>
    </NodeMini>
  );
};

export const NodeElevationOf = ({ data }) => {
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
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeElevationOfMini = () => {
  return (
    <NodeMini
      nodeType="elevationOf"
      className={`${classes.sensing} ${classes.nodeElevationOf}`}
    >
      {/* <h4>Elevation of</h4>
      <div className={classes.blankInput}></div> */}
      <h4>Elevation of next obstacle</h4>
    </NodeMini>
  );
};
