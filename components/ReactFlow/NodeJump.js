import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeJump = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.nodeJump} ${classes.hasRightHandle}`}
    >
      <h4>Jump</h4>
      <EntityDropdown data={data} selectName="jump" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeJump);

export const NodeJumpMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${classes.nodeJump}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Jump</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
