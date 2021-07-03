import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeAttack = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.nodeAttack} ${classes.hasRightHandle}`}
    >
      <h4>Attack</h4>
      <EntityDropdown data={data} selectName="attack" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeAttack);

export const NodeAttackMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${classes.nodeAttack}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Attack</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
