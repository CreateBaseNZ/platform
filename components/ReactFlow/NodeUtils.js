import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";
import { InputWithHandle } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeUtils = ({
  id,
  label,
  data = { values: { a: 1 }, connections: [] },
  className = "",
  isConnectable,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.utils} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle
        type="target"
        position="left"
        id="execution__in"
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <h4>{label}</h4>
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="param__a"
        inputName="a"
      />
      <CustomHandle
        type="target"
        position="top"
        id="param__a"
        style={{ left: "auto", right: "32px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <CustomHandle
        type="source"
        position="right"
        id="execution__out"
        isConnectable={isConnectable}
        connections={data.connections}
      />
    </div>
  );
};

export const NodePrint = memo(({ id, data, isConnectable }) => {
  return (
    <NodeUtils
      id={id}
      label="Print"
      data={data}
      isConnectable={isConnectable}
    />
  );
});

export const NodeDelay = memo(({ id, data, isConnectable }) => {
  return (
    <NodeUtils
      id={id}
      label="Delay"
      data={data}
      isConnectable={isConnectable}
    />
  );
});

const NodeUtilsMini = (props) => {
  return (
    <NodeMini {...props} className={classes.utils}>
      <h4>{props.label}</h4>
      <div className={classes.blankInput}></div>
    </NodeMini>
  );
};

export const NodePrintMini = () => {
  return <NodeUtilsMini label="Print" nodeType="print" node={<NodePrint />} />;
};

export const NodeDelayMini = () => {
  return <NodeUtilsMini label="Delay" nodeType="delay" node={<NodeDelay />} />;
};
