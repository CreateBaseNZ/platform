import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeGeneral";
import { isValidConnection } from "../../utils/nodeHelpers";

import classes from "./Nodes.module.scss";

export const NodeDistance = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeDistance} ${classes.hasRightHandle}`}
    >
      <h4>Distance from</h4>
      <EntityDropdown data={data} selectName="distance-from" dataName="from" />
      <h4>to</h4>
      <EntityDropdown data={data} selectName="distance-to" dataName="to" />
      <Handle
        type="source"
        position="right"
        id="param__out"
        onConnect={() => {
          console.log("need to remove placeholder");
        }}
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.paramHandle}`}
      />
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

export const NodeSizeOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeSizeOf} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <h4>Size of</h4>
      <EntityDropdown data={data} selectName="sizeOf" dataName="entity" />
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Height
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Width
      </div>
      <Handle
        type="source"
        position="right"
        id="param__height"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.paramHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="param__width"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.paramHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export const NodeSizeOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensing} ${classes.nodeSizeOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Size of</h4>
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
      <EntityDropdown data={data} selectName="speedOf" dataName="entity" />
      <Handle
        type="source"
        position="right"
        id="param__out"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.paramHandle}`}
      />
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
