import { memo } from "react";
import { EntityDropdown, NodeMini } from "./NodeGeneral";
import CustomHandle from "./Handles";

import classes from "./Nodes.module.scss";

const NodeActions = ({ data, className, label, selectName, dataName }) => {
  return (
    <div
      className={`${classes.node} ${classes.actioning} ${classes.hasLeftHandle} ${classes.hasRightHandle} ${className}`}
    >
      <CustomHandle type="target" position="left" id="execution" />
      <h4>{label}</h4>
      {/* <EntityDropdown data={data} selectName={selectName} dataName={dataName} /> */}
      <CustomHandle type="source" position="right" id="execution" />
    </div>
  );
};

export const NodeAttack = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeAttack}
      label="Attack"
      selectName="attack"
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
      selectName="doubleJump"
      dataName="entity"
    />
  );
});
export const NodeCrouch = memo(({ data }) => {
  return (
    <NodeActions
      data={data}
      className={classes.nodeCrouch}
      label="Crouch"
      selectName="crouch"
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
      selectName="jump"
      dataName="entity"
    />
  );
});

const NodeActionsMini = (props) => {
  return (
    <NodeMini {...props} className={`${classes.actioning} ${props.className}`}>
      <h4>{props.label}</h4>
      {/* <div className={classes.blankInput}></div> */}
    </NodeMini>
  );
};

export const NodeAttackMini = () => {
  return (
    <NodeActionsMini
      className={classes.nodeAttack}
      label="Attack"
      nodeType="attack"
      node={<NodeAttack />}
    />
  );
};
export const NodeDoubleJumpMini = () => {
  return (
    <NodeActionsMini
      className={classes.nodeDoubleJump}
      label="Double Jump"
      nodeType="doubleJump"
      node={<NodeDoubleJump />}
    />
  );
};
export const NodeCrouchMini = () => {
  return (
    <NodeActionsMini
      className={classes.nodeCrouch}
      label="Crouch"
      nodeType="crouch"
      node={<NodeCrouch />}
    />
  );
};
export const NodeJumpMini = () => {
  return (
    <NodeActionsMini
      className={classes.nodeJump}
      label="Jump"
      nodeType="jump"
      node={<NodeJump />}
    />
  );
};
