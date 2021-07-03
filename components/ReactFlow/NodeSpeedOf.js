import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeSpeedOf = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.sensing} ${classes.nodeSpeedOf} ${classes.hasRightHandle}`}
    >
      <h4>Speed of</h4>
      <EntityDropdown data={data} selectName="speedOf" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeSpeedOf);

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
