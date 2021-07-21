import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeLogicals = ({ label, data, className = "" }) => {
  return (
    <div
      className={`${classes.node} ${classes.logical} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle
        type="target"
        position="top"
        id="param__a"
        style={{ left: "30px", transform: "none" }}
      />
      <CustomHandle
        type="target"
        position="top"
        id="param__b"
        style={{ left: "auto", right: "34px", transform: "none" }}
      />
      <input className={classes.preventInput} />
      <h4>{label}</h4>
      <input className={classes.preventInput} />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

const NodeLogicalsMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.logical} ${props.className}`}>
      <div className={classes.blankInput} />
      <h4>{props.label}</h4>
      <div className={classes.blankInput} />
    </NodeMini>
  );
};

export const NodeAnd = memo(({ data }) => {
  return <NodeLogicals label="and" data={data} />;
});
export const NodeOr = memo(({ data }) => {
  return <NodeLogicals label="or" data={data} />;
});

export const NodeAndMini = memo(() => {
  return <NodeLogicalsMini label="and" nodeType="and" />;
});
export const NodeOrMini = memo(() => {
  return <NodeLogicalsMini label="or" nodeType="or" />;
});
