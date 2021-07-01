import { memo } from "react";
import { Handle } from "react-flow-renderer";

import PinDropOutlinedIcon from "@material-ui/icons/PinDropOutlined";
import classes from "./Nodes.module.scss";

const isValidConnection = (connection) => {
  connection.target === "unconnectable";
};

const EndNode = ({ data }) => {
  return (
    <div className={`${classes.node} ${classes.end}`}>
      <Handle
        type="target"
        position="left"
        style={{
          height: "8px",
          width: "8px",
        }}
        className={`${classes.handle} ${classes.target}`}
      />
      <h5>
        <PinDropOutlinedIcon />
        End
      </h5>
    </div>
  );
};

export default memo(EndNode);
