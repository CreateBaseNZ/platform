import { memo } from "react";
import CustomHandle from "./Handles";
import { NodeMini } from "./NodeGeneral";

import classes from "./Nodes.module.scss";

const NodeOperations = ({
  label,
  data = { values: { a: 1, b: 2 } },
  className = "",
}) => {
  const changeHandlerA = (event) => {
    data.callBack({ ...data.values, a: event.target.value });
  };
  const changeHandlerB = (event) => {
    data.callBack({ ...data.values, b: event.target.value });
  };
  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={`${classes.node} ${classes.operating} ${classes.hasRightHandle} ${className}`}
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
      <input
        onChange={changeHandlerA}
        className="nodrag"
        type="number"
        value={data.values.a}
        onDragStart={dragHandler}
        onKeyDown={(e) => e.key === "e" && e.preventDefault()}
      />
      <h4>{label}</h4>
      <input
        onChange={changeHandlerB}
        className="nodrag"
        type="number"
        value={data.values.b}
        onDragStart={dragHandler}
        onKeyDown={(e) => e.key === "e" && e.preventDefault()}
      />
      <CustomHandle type="source" position="right" id="param__out" />
    </div>
  );
};

const NodeOperationsMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.operating} ${props.className}`}>
      <div className={classes.blankInput} />
      <h4>{props.label}</h4>
      <div className={classes.blankInput} />
    </NodeMini>
  );
};

export const NodeAdd = memo(({ data }) => {
  return <NodeOperations label="+" data={data} />;
});
export const NodeSubtract = memo(({ data }) => {
  return <NodeOperations label="-" data={data} />;
});
export const NodeMultiply = memo(({ data }) => {
  return <NodeOperations label="&times;" data={data} />;
});
export const NodeDivide = memo(({ data }) => {
  return <NodeOperations label="&divide;" data={data} />;
});
export const NodeGreaterThan = memo(({ data }) => {
  return <NodeOperations label=">" data={data} />;
});
export const NodeLessThan = memo(({ data }) => {
  return <NodeOperations label="<" data={data} />;
});
export const NodeEquals = memo(({ data }) => {
  return <NodeOperations label="=" data={data} />;
});
export const NodeNotEquals = memo(({ data }) => {
  return (
    <NodeOperations
      label="not ="
      data={data}
      className={classes.nodeNotEquals}
    />
  );
});

export const NodeOperatorGeneral = memo(
  ({ data = { values: { a: 1, b: 2, operator: "+" } } }) => {
    const changeHandlerA = (event) => {
      data.callBack({ ...data.values, a: event.target.value });
    };
    const changeHandlerB = (event) => {
      data.callBack({ ...data.values, b: event.target.value });
    };
    const changeHandlerOperator = (event) => {
      data.callBack({ ...data.values, operator: event.target.value });
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
        />
        <CustomHandle
          type="target"
          position="top"
          id="param__b"
          style={{ left: "auto", right: "34px", transform: "none" }}
        />
        <input
          className="nodrag"
          onChange={changeHandlerA}
          type="number"
          value={data.values.a}
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
        <input
          className="nodrag"
          onChange={changeHandlerB}
          type="number"
          value={data.values.b}
        />
        <CustomHandle type="source" position="right" id="param__out" />
      </div>
    );
  }
);

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
