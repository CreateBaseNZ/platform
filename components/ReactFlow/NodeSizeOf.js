import { memo } from "react";
import { Handle } from "react-flow-renderer";

import classes from "./Nodes.module.scss";

const NodeSizeOf = ({ data }) => {
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
      className={`${classes.node} ${classes.sensoring} ${classes.nodeSizeOf} ${classes.hasRightHandle} ${classes.hasRightLabel}`}
    >
      <h4>Size of</h4>
      <select
        name={`${data.id}_sizeOf`}
        id={`${data.id}_sizeOf`}
        onChange={changeHandler}
        onDragStart={dragHandler}
        value={data.values.entity}
      >
        <option value="character">Character</option>
        <option value="drone">Drone</option>
        <option value="vehicle">Vehicle</option>
      </select>
      <div className={classes.rightHandleLabel} style={{ top: 16 }}>
        Height
      </div>
      <div className={classes.rightHandleLabel} style={{ bottom: 16 }}>
        Width
      </div>
      <Handle
        type="source"
        position="right"
        id="height"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
        style={{ top: 16, transform: "none" }}
      />
      <Handle
        type="source"
        position="right"
        id="width"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
        style={{ bottom: 16, top: "auto", transform: "none" }}
      />
    </div>
  );
};

export default memo(NodeSizeOf);

export const NodeSizeOfMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.sensoring} ${classes.nodeSizeOf}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>Size of</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};
