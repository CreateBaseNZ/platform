import { memo } from "react";
import CustomHandle from "./Handles";
import { InputWithHandle } from "./NodeGeneral";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeComparisons = ({
  id,
  label,
  data = { values: { a: 1, b: 2 }, connections: [] },
  className = "",
  isConnectable,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.comparing} ${classes.hasRightHandle} ${className}`}
    >
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="float__in__a"
        inputName="a"
      />
      <CustomHandle
        type="target"
        position="top"
        id="float__in__a"
        style={{ left: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <CustomHandle
        type="target"
        position="top"
        id="float__in__b"
        style={{ left: "auto", right: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <h4>{label}</h4>
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="float__in__b"
        inputName="b"
      />
      <CustomHandle
        type="source"
        position="right"
        id="boolean__out"
        isConnectable={isConnectable}
        connections={data.connections}
      />
    </div>
  );
};

export const NodeGreaterThan = memo(({ id, data, isConnectable }) => {
  return (
    <NodeComparisons
      id={id}
      label=">"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeLessThan = memo(({ id, data, isConnectable }) => {
  return (
    <NodeComparisons
      id={id}
      label="<"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeEquals = memo(({ id, data, isConnectable }) => {
  return (
    <NodeComparisons
      id={id}
      label="="
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeNotEquals = memo(({ id, data, isConnectable }) => {
  return (
    <NodeComparisons
      id={id}
      label="not ="
      data={data}
      className={classes.nodeNotEquals}
      isConnectable={isConnectable}
    />
  );
});

const NodeComparisonsMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.comparing} ${props.className}`}>
      <div className={classes.blankInput} />
      <h4 style={{ fontSize: 14 }}>{props.label}</h4>
      <div className={classes.blankInput} />
    </NodeMini>
  );
};

export const NodeGreaterThanMini = memo(() => {
  return (
    <NodeComparisonsMini
      label=">"
      nodeType="greaterThan"
      node={<NodeGreaterThan />}
    />
  );
});
export const NodeLessThanMini = memo(() => {
  return (
    <NodeComparisonsMini
      label="<"
      nodeType="lessThan"
      node={<NodeLessThan />}
    />
  );
});
export const NodeEqualsMini = memo(() => {
  return (
    <NodeComparisonsMini label="=" nodeType="equals" node={<NodeEquals />} />
  );
});
export const NodeNotEqualsMini = memo(() => {
  return (
    <NodeComparisonsMini
      label="not ="
      className={classes.nodeNotEquals}
      nodeType="notEquals"
      node={<NodeNotEquals />}
    />
  );
});
