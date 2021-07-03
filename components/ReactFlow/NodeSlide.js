import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeSlide = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.nodeSlide} ${classes.hasRightHandle}`}
    >
      <h4>Slide</h4>
      <EntityDropdown data={data} selectName="slide" dataName="entity" />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeSlide);

export const NodeSlideMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${classes.nodeSlide}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Slide</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
