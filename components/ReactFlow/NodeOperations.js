import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeOperations = ({ label, data }) => {
  const aChangeHandler = (event) => {
    data.callBack({ ...data.values, a: event.target.value });
  };
  const bChangeHandler = (event) => {
    data.callBack({ ...data.values, b: event.target.value });
  };

  return (
    <div
      className={`${classes.node} ${classes.operating} ${classes.nodeSpeedOf} ${classes.hasRightHandle}`}
    >
      <h4>{label}</h4>
      <input onChange={aChangeHandler}></input>
      <input onChange={bChangeHandler}></input>
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export const NodeAdd = memo(({ data }) => {
  return <NodeOperations label="+" data={data} selectName="add" />;
});
