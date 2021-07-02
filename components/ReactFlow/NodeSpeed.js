import { memo } from "react";
import { Handle } from "react-flow-renderer";

import classes from "./Nodes.module.scss";

const NodeSpeed = ({ data }) => {
  const changeHandler = (event) => {
    const newValues = {
      ...data.values,
      [event.target.name]:
        event.target.value && parseInt(event.target.value).toString(),
    };
    data.callBack(newValues);
  };

  const dragHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={`${classes.node} ${classes.sensoring} ${classes.nodeSpeed} ${classes.hasRightHandle}`}
    >
      <h4>Speed of</h4>
      <select
        name={`${data.id}_distance-from`}
        id={`${data.id}_distance-from`}
        onChange={changeHandler}
        onDragStart={dragHandler}
        value={data.values.from}
      >
        <option value="character">Character</option>
        <option value="drone">Drone</option>
        <option value="vehicle">Vehicle</option>
      </select>
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export default memo(NodeSpeed);

export const NodeSpeedMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensoring} ${classes.nodeSpeed}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Speed of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
