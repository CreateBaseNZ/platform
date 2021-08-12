import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";
import { InputWithHandle } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

export const NodePrint = memo(
  ({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
    return (
      <div
        className={`${classes.node} ${classes.utils} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <h4>Print</h4>
        <InputWithHandle
          data={data}
          blockId={id}
          handleId="any__in__a"
          inputName="a"
        />
        <CustomHandle
          type="target"
          position="top"
          id="any__in__a"
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
  }
);

export const NodeDelay = memo(
  ({ id, data = { values: { a: 1 }, connections: [] }, isConnectable }) => {
    return (
      <div
        className={`${classes.node} ${classes.utils} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <h4>Delay</h4>
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
  }
);

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
