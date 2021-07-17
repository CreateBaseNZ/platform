import { EntityDropdown } from "./NodeGeneral";

import classes from "./Nodes.module.scss";
import CustomHandle from "./Handles";

export const NodeDistance = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeDistance} ${classes.hasRightHandle}`}
    >
      <h4>Distance from</h4>
      <EntityDropdown data={data} selectName="distance-from" dataName="from" />
      <h4>to</h4>
      <EntityDropdown
        data={data}
        selectName="distance-to"
        dataName="to"
        options={["Next obstacle"]}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeDistanceMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeDistance}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Distance from</h4>
      <div className={classes.blankInput}></div>
      <h4>to</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeHeightOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeHeightOf} ${classes.hasRightHandle}`}
    >
      <h4>Height of</h4>
      <EntityDropdown
        data={data}
        selectName="heightOf"
        dataName="entity"
        options={["Next obstacle"]}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeHeightOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeHeightOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Height of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeWidthOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeWidthOf} ${classes.hasRightHandle}`}
    >
      <h4>Width of</h4>
      <EntityDropdown
        data={data}
        selectName="widthOf"
        dataName="entity"
        options={["Next obstacle"]}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeWidthOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeWidthOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Width of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeSpeedOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeSpeedOf} ${classes.hasRightHandle}`}
    >
      <h4>Speed of</h4>
      <EntityDropdown
        data={data}
        selectName="speedOf"
        dataName="entity"
        options={["Next obstacle"]}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeSpeedOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeSpeedOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Speed of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeElevationOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeElevationOf} ${classes.hasRightHandle}`}
    >
      <h4>Elevation of</h4>
      <EntityDropdown
        data={data}
        selectName="elevationOf"
        dataName="entity"
        options={["Next obstacle"]}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

export const NodeElevationOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeElevationOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Elevation of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
