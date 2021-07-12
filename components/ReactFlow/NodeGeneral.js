import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { isValidConnection } from "../../utils/nodeHelpers";

import { entities } from "../../utils/flowConfig";

import classes from "./Nodes.module.scss";

export const NodeStart = memo(() => {
  return (
    <div
      className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}
    >
      <h4>Start</h4>
      <Handle
        type="source"
        position="right"
        id="execution"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle} ${classes.executionHandle}`}
      />
    </div>
  );
});

export const NodeEnd = memo(() => {
  return (
    <div
      className={`${classes.node} ${classes.nodeEnd} ${classes.hasLeftHandle}`}
    >
      <Handle
        type="target"
        position="left"
        id="execution"
        isValidConnection={isValidConnection}
        className={`${classes.handle} ${classes.leftHandle} ${classes.targetHandle} ${classes.executionHandle}`}
      />
      <h4>End</h4>
    </div>
  );
});

export const EntityDropdown = ({ data, selectName, dataName }) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, [dataName]: event.target.value });
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <select
      name={selectName}
      onChange={changeHandler}
      onDragStart={dragHandler}
      value={data.values.entity}
    >
      {entities.map((entity) => (
        <option value={entity.toLowerCase()} key={entity}>
          {entity}
        </option>
      ))}
    </select>
  );
};
