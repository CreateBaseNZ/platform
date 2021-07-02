import { memo } from "react";
import { Handle } from "react-flow-renderer";

import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import classes from "./Nodes.module.scss";

const NodeEnd = ({ data }) => {
  return (
    <div
      className={`${classes.node} ${classes.endNode} ${classes.hasLeftHandle}`}
    >
      <Handle
        type="target"
        position="left"
        className={`${classes.handle} ${classes.leftHandle} ${classes.targetHandle}`}
      />
      <h4>End</h4>
    </div>
  );
};

export default memo(NodeEnd);
