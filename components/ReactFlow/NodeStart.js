import { memo } from "react";
import { Handle } from "react-flow-renderer";

import OutlinedFlagIcon from "@material-ui/icons/OutlinedFlag";
import classes from "./Nodes.module.scss";

const NodeStart = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}
    >
      <h4>Start</h4>
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeStart);
