import { memo } from "react";
// import { Handle } from "react-flow-renderer";
import CustomHandle from "./Handles";

import { entities } from "../../utils/flowConfig";

import classes from "./Nodes.module.scss";

export const NodeStart = memo(() => {
  return (
    <div
      className={`${classes.node} ${classes.nodeStart} ${classes.hasRightHandle}`}
    >
      <h4>Start</h4>
      <CustomHandle type="source" position="right" id="execution" />
    </div>
  );
});

export const EntityDropdown = ({
  data,
  selectName,
  dataName,
  options = entities,
}) => {
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
      {options.map((entity) => (
        <option value={entity.toLowerCase()} key={entity}>
          {entity}
        </option>
      ))}
    </select>
  );
};
