import { memo } from "react";
import { Handle } from "react-flow-renderer";

import classes from "./Nodes.module.scss";

const NodeSpeedOf = ({ data }) => {
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
      className={`${classes.node} ${classes.sensoring} ${classes.nodeSpeedOf} ${classes.hasRightHandle}`}
    >
      <h4>Speed of</h4>
      <select
        name={`${data.id}_speedOf`}
        id={`${data.id}_speedOf`}
        onChange={changeHandler}
        onDragStart={dragHandler}
        value={data.values.entity}
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

export default memo(NodeSpeedOf);

export const NodeSpeedOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensoring} ${classes.nodeSpeedOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Speed of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
