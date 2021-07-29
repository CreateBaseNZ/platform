import { memo } from "react";
import CustomHandle from "./Handles";
import { InputWithHandle } from "./NodeGeneral";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeOperations = ({
  id,
  label,
  data = { values: { a: 1, b: 2 }, connections: [] },
  className = "",
  isConnectable,
}) => {
  return (
    <div
      className={`${classes.node} ${classes.operating} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle
        type="target"
        position="top"
        id="param__a"
        style={{ left: "30px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <CustomHandle
        type="target"
        position="top"
        id="param__b"
        style={{ left: "auto", right: "34px", transform: "none" }}
        isConnectable={isConnectable}
        connections={data.connections}
      />
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="param__a"
        inputName="a"
      />
      <h4>{label}</h4>
      <InputWithHandle
        data={data}
        blockId={id}
        handleId="param__b"
        inputName="b"
      />
      <CustomHandle
        type="source"
        position="right"
        id="param__out"
        isConnectable={isConnectable}
        connections={data.connections}
      />
    </div>
  );
};

export const NodeAdd = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="+"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeSubtract = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="-"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeMultiply = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="&times;"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeDivide = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="&divide;"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeGreaterThan = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label=">"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeLessThan = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="<"
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeEquals = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="="
      data={data}
      isConnectable={isConnectable}
    />
  );
});
export const NodeNotEquals = memo(({ id, data, isConnectable }) => {
  return (
    <NodeOperations
      id={id}
      label="not ="
      data={data}
      className={classes.nodeNotEquals}
      isConnectable={isConnectable}
    />
  );
});

export const NodeOperatorGeneral = memo(
  ({
    id,
    data = { values: { a: 1, b: 2, operator: "+" }, connections: [] },
    isConnectable,
  }) => {
    const changeHandlerOperator = (event) => {
      data.callBack({ ...data.values, operator: event.target.value }, id);
    };

    return (
      <div
        className={`${classes.node} ${classes.operating} ${classes.hasRightHandle} ${classes.operatingGeneral}`}
      >
        <CustomHandle
          type="target"
          position="top"
          id="param__a"
          style={{ left: "30px", transform: "none" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <CustomHandle
          type="target"
          position="top"
          id="param__b"
          style={{ left: "auto", right: "30px", transform: "none" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <InputWithHandle
          data={data}
          blockId={id}
          handleId="param__a"
          inputName="a"
        />
        <select
          name={`${data.id}_operator`}
          id={`${data.id}_operator`}
          onChange={changeHandlerOperator}
          value={data.values.operator}
        >
          {["+", "-", "×", "÷", ">", "<", "=", "not =", "and", "or"].map(
            (operator) => (
              <option value={operator} key={operator}>
                {operator}
              </option>
            )
          )}
        </select>
        <InputWithHandle
          data={data}
          blockId={id}
          handleId="param__b"
          inputName="b"
        />
        <CustomHandle
          type="source"
          position="right"
          id="param__out"
          isConnectable={isConnectable}
          connections={data.connections}
        />
      </div>
    );
  }
);

const NodeOperationsMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.operating} ${props.className}`}>
      <div className={classes.blankInput} />
      <h4
        style={{
          fontSize:
            (props.nodeType === "greaterThan" ||
              props.nodeType === "lessThan") &&
            14,
        }}
      >
        {props.label}
      </h4>
      <div className={classes.blankInput} />
    </NodeMini>
  );
};

export const NodeAddMini = memo(() => {
  return <NodeOperationsMini label="+" nodeType="add" node={<NodeAdd />} />;
});
export const NodeSubtractMini = memo(() => {
  return (
    <NodeOperationsMini label="-" nodeType="subtract" node={<NodeSubtract />} />
  );
});
export const NodeMultiplyMini = memo(() => {
  return (
    <NodeOperationsMini
      label="&times;"
      nodeType="multiply"
      node={<NodeMultiply />}
    />
  );
});
export const NodeDivideMini = memo(() => {
  return (
    <NodeOperationsMini
      label="&divide;"
      nodeType="divide"
      node={<NodeDivide />}
    />
  );
});
export const NodeGreaterThanMini = memo(() => {
  return (
    <NodeOperationsMini
      label=">"
      nodeType="greaterThan"
      node={<NodeGreaterThan />}
    />
  );
});
export const NodeLessThanMini = memo(() => {
  return (
    <NodeOperationsMini label="<" nodeType="lessThan" node={<NodeLessThan />} />
  );
});
export const NodeEqualsMini = memo(() => {
  return (
    <NodeOperationsMini label="=" nodeType="equals" node={<NodeEquals />} />
  );
});
export const NodeNotEqualsMini = memo(() => {
  return (
    <NodeOperationsMini
      label="not ="
      className={classes.nodeNotEquals}
      nodeType="notEquals"
      node={<NodeNotEquals />}
    />
  );
});

export const NodeOperatorGeneralMini = (props) => {
  return (
    <NodeMini
      className={classes.operating}
      nodeType="operatorGeneral"
      node={<NodeOperatorGeneral />}
    >
      <div className={classes.blankInput} />
      <div className={classes.blankInput} />
      <div className={classes.blankInput} />
    </NodeMini>
  );
};
