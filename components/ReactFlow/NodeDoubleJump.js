import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeDoubleJump = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.nodeDoubleJump} ${classes.hasRightHandle}`}
    >
      <h4>Double jump</h4>
      <EntityDropdown data={data} selectName="doubleJump" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeDoubleJump);

export const NodeDoubleJumpMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${classes.nodeDoubleJump}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Double jump</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
