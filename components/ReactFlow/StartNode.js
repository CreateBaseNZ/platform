import { memo } from "react";
import { Handle } from "react-flow-renderer";

import OutlinedFlagIcon from "@material-ui/icons/OutlinedFlag";
import classes from "./Nodes.module.scss";

const isValidConnection = (connection) => {
  connection.target === "unconnectable";
};

const StartNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.start}`}>
      <h5>
        <OutlinedFlagIcon />
        Start
      </h5>
      <Handle
        type="source"
        position="right"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.source}`}
      />
    </div>
  );
};

export default memo(StartNode);
