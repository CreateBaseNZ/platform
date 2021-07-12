import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { isValidConnection } from "../../utils/nodeHelpers";

import classes from "./Nodes.module.scss";

const NodeOperations = ({ label, data }) => {
  const changeHandlerA = (event) => {
    data.callBack({ ...data.values, a: event.target.value });
  };
  const changeHandlerB = (event) => {
    data.callBack({ ...data.values, b: event.target.value });
  };

  return (
    <div
      className={`${classes.node} ${classes.operating} ${classes.hasRightHandle}`}
    >
      <Handle
        type="target"
        position="top"
        id="param___a"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "30px", transform: "none" }}
      />
      <Handle
        type="target"
        position="top"
        id="param__b"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "auto", right: "34px", transform: "none" }}
      />
      <input
        onChange={changeHandlerA}
        type="number"
        value={data.values.a}
      ></input>
      <h4>{label}</h4>
      <input
        onChange={changeHandlerB}
        type="number"
        value={data.values.b}
      ></input>
      <Handle
        type="source"
        position="right"
        id="param"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.paramHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

const NodeOperationsMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.operating}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <div className={classes.blankInput} />
      <h4>{props.label}</h4>
      <div className={classes.blankInput} />
    </div>
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
export const NodeOr = memo(({ data }) => {
  return <NodeOperations label="or" data={data} />;
});

export const NodeOperatorGeneral = memo(({ data }) => {
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
      <Handle
        type="target"
        position="top"
        id="param___a"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "30px", transform: "none" }}
      />
      <Handle
        type="target"
        position="top"
        id="param__b"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.topHandle} ${classes.paramHandle} ${classes.targetHandle}`}
        style={{ left: "auto", right: "34px", transform: "none" }}
      />
      <input
        onChange={changeHandlerA}
        type="number"
        value={data.values.a}
      ></input>
      <select
        name={`${data.id}_operator`}
        id={`${data.id}_operator`}
        onChange={changeHandlerOperator}
        value={data.values.operator}
      >
        {["+", "-", "×", "÷", ">", "<", "=", "or"].map((operator) => (
          <option value={operator} key={operator}>
            {operator}
          </option>
        ))}
      </select>
      <input
        onChange={changeHandlerB}
        type="number"
        value={data.values.b}
      ></input>
      <Handle
        type="source"
        position="right"
        id="param"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.paramHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
});

export const NodeAddMini = (props) => {
  return <NodeOperationsMini {...props} label="+" />;
};
export const NodeSubtractMini = (props) => {
  return <NodeOperationsMini {...props} label="-" />;
};
export const NodeMultiplyMini = (props) => {
  return <NodeOperationsMini {...props} label="&times;" />;
};
export const NodeDivideMini = (props) => {
  return <NodeOperationsMini {...props} label="&divide;" />;
};
export const NodeGreaterThanMini = (props) => {
  return <NodeOperationsMini {...props} label=">" />;
};
export const NodeLessThanMini = (props) => {
  return <NodeOperationsMini {...props} label="<" />;
};
export const NodeEqualsMini = (props) => {
  return <NodeOperationsMini {...props} label="=" />;
};
export const NodeOrMini = (props) => {
  return <NodeOperationsMini {...props} label="or" />;
};

export const NodeOperatorGeneralMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.operating}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <div className={classes.blankInput} />
      <div className={classes.blankInput} />
      <div className={classes.blankInput} />
    </div>
  );
};
