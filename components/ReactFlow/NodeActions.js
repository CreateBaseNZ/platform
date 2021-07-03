import { memo } from "react";
import { Handle } from "react-flow-renderer";
import { EntityDropdown } from "./NodeShared";

import classes from "./Nodes.module.scss";

const NodeActions = ({ data, className, label, selectName, dataName }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.hasRightHandle} ${className}`}
    >
      <h4>{label}</h4>
      <EntityDropdown data={data} selectName={selectName} dataName={dataName} />
      <Handle
        type="source"
        position="right"
        className={`${classes.handle} ${classes.rightHandle} ${classes.sourceHandle}`}
      />
    </div>
  );
};

export const NodeAttack = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeAttack}
      label="Attack"
      selectname="attack"
      dataName="entity"
    />
  );
});
export const NodeDoubleJump = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeDoubleJump}
      label="Double Jump"
      selectname="doubleJump"
      dataName="entity"
    />
  );
});
export const NodeDuck = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeDuck}
      label="Duck"
      selectname="duck"
      dataName="entity"
    />
  );
});
export const NodeJump = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeJump}
      label="Jump"
      selectname="jump"
      dataName="entity"
    />
  );
});
export const NodeSlide = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeSlide}
      label="Slide"
      selectname="slide"
      dataName="entity"
    />
  );
});

const NodeActionsMini = (props) => {
  return (
    <div
      className={`${classes.nodeMini} ${classes.actioning} ${props.className}`}
      onDragStart={props.onDragStart}
      draggable
    >
      <h4>{props.label}</h4>
      <div className={classes.blankInput}></div>
    </div>
  );
};

export const NodeAttackMini = (props) => {
  return (
    <NodeActionsMini
      {...props}
      className={classes.nodeAttack}
      label={"Attack"}
    />
  );
};
export const NodeDoubleJumpMini = (props) => {
  return (
    <NodeActionsMini
      {...props}
      className={classes.nodeDoubleJump}
      label={"Double Jump"}
    />
  );
};
export const NodeDuckMini = (props) => {
  return (
    <NodeActionsMini {...props} className={classes.nodeDuck} label={"Duck"} />
  );
};
export const NodeJumpMini = (props) => {
  return (
    <NodeActionsMini {...props} className={classes.nodeJump} label={"Jump"} />
  );
};
export const NodeSlideMini = (props) => {
  return (
    <NodeActionsMini {...props} className={classes.nodeSlide} label={"Slide"} />
  );
};
