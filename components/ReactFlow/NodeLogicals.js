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
        id="boolean__in__a"
        style={{ left: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <h4>{label}</h4>
      <input className={classes.preventInput} />
      <CustomHandle
        type="target"
        position="top"
        id="boolean__in__b"
        style={{ left: "auto", right: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data ? data.connections : []}
      />
      <CustomHandle
        type="source"
        position="right"
        id="boolean__out"
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

export const NodeNotMini = memo(() => {
  return (
    <NodeMini
      nodeType="not"
      node={<NodeNot />}
      className={classes.logical}
      style={{ height: "3rem" }}
    >
      <h4>Not</h4>  
      <div className={classes.blankInput}  />
    </NodeMini>
  );
});

export const NodeNot = memo(
  ({ id, data = { values: { a: false }, connections: [] }, isConnectable }) => {
    return (
      <div
        className={`${classes.node} ${classes.logical} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="top"
          id="boolean__in__a"
          style={{left: "auto", right: "58px", transform: "none" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        
        <h4>Not</h4>
        <input className={classes.preventInput} />

        <CustomHandle
          type="source"
          position="right"
          id="boolean__out"
          isConnectable={isConnectable}
          connections={data.connections}
        />
      </div>
    );
  }
);