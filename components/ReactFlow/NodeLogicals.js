import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeLogicals = ({ label, data, className = "", isConnectable }) => {
  return (
    <div
      className={`${classes.node} ${classes.logical} ${classes.hasRightHandle} ${className}`}
    >
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="param__a"
        style={{ left: "30px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>{label}</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="param__b"
        style={{ left: "auto", right: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
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

export const NodeAnd = memo(({ data, isConnectable }) => {
  return <NodeLogicals label="and" data={data} isConnectable={isConnectable} />;
});
export const NodeOr = memo(({ data, isConnectable }) => {
  return <NodeLogicals label="or" data={data} isConnectable={isConnectable} />;
});

export const NodeAndMini = memo(() => {
  return <NodeLogicalsMini label="and" nodeType="and" node={<NodeAnd />} />;
});
export const NodeOrMini = memo(() => {
  return <NodeLogicalsMini label="or" nodeType="or" node={<NodeOr />} />;
});
