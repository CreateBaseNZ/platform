import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeGeneral";
import { isValidConnection } from "../../utils/nodeHelpers";

import classes from "./Nodes.module.scss";

const NodeDistance = ({ data }) => {
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
        id="param"
        onConnect={() => {
          console.log("need to remove placeholder");
        }}
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.paramHandle}`}
      />
    </div>
  );
};

export default memo(NodeDistance);

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
