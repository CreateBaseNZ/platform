import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeDuck = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.nodeDuck} ${classes.hasRightHandle}`}
    >
      <h4>Duck</h4>
      <EntityDropdown data={data} selectName="duck" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeDuck);

export const NodeDuckMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${classes.nodeDuck}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Duck</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
