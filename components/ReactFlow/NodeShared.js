import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { entities } from "../../utils/flowConfig";

import classes from "./Nodes.module.scss";

export const EntityDropdown = ({ data, selectName, dataName }) => {
  const changeHandler = (event) => {
    data.callBack({ ...data.values, [dataName]: event.target.value });
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <select
      name={`${data.id}_${selectName}`}
      id={`${data.id}_${selectName}`}
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

export const NodeStart = memo(() => {
  return (
    <div
      className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}
    >
      <h4>Start</h4>
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
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
        className={`${classes.handle} ${classes.leftHandle} ${classes.targetHandle}`}
      />
      <h4>End</h4>
    </div>
  );
});
