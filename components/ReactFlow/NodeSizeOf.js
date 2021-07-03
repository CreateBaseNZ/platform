import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeSizeOf = ({ data }) => {
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
        id="height"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="width"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export default memo(NodeSizeOf);

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
