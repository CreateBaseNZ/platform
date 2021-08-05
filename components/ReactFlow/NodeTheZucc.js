import { memo } from "react";
import { NodeMini, InputWithHandle } from "./NodeGeneral";
import CustomHandle from "./Handles";

import classes from "./Nodes.module.scss";

export const NodeMoveArm = memo(
  ({
    id,
    data = { values: { x: 0, y: 0, z: 0 }, connections: [] },
    isConnectable,
  }) => {
    return (
      <div
        className={`${classes.node} ${classes.actioning} ${classes.nodeMoveArm} ${classes.hasLeftHandle} ${classes.hasRightHandle}`}
      >
        <CustomHandle
          type="target"
          position="left"
          id="execution__in"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
        <h4>Move Arm</h4>
        <CustomHandle
          type="target"
          position="bottom"
          id="float__in__x"
          style={{ left: "36px", transform: "none" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <CustomHandle
          type="target"
          position="bottom"
          id="float__in__y"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <CustomHandle
          type="target"
          position="bottom"
          id="float__in__z"
          style={{ left: "auto", right: "36px", transform: "none" }}
          isConnectable={isConnectable}
          connections={data.connections}
        />
        <div className={classes.flexRow}>
          <div className={classes.flexCol}>
            <div className={classes.label}>X</div>
            <InputWithHandle
              data={data}
              blockId={id}
              handleId="float__in__x"
              inputName="x"
            />
          </div>
          <div className={classes.flexCol}>
            <div className={classes.label}>Y</div>
            <InputWithHandle
              data={data}
              blockId={id}
              handleId="float__in__y"
              inputName="y"
            />
          </div>
          <div className={classes.flexCol}>
            <div className={classes.label}>Z</div>
            <InputWithHandle
              data={data}
              blockId={id}
              handleId="float__in__z"
              inputName="z"
            />
          </div>
        </div>
        <CustomHandle
          type="source"
          position="right"
          id="execution__out"
          isConnectable={isConnectable}
          connections={data ? data.connections : []}
        />
      </div>
    );
  }
);

export const NodeMoveArmMini = memo(() => {
  return (
    <NodeMini
      nodeType="moveArm"
      node={<NodeMoveArm />}
      className={classes.actioning}
      style={{ height: "3rem" }}
    >
      <div className={classes.flexCol} style={{ marginTop: "-4px" }}>
        <h4>Move Arm</h4>
        <div className={classes.flexRow}>
          <div className={classes.blankInput} style={{ margin: "0" }} />
          <div className={classes.blankInput} />
          <div className={classes.blankInput} style={{ margin: "0" }} />
        </div>
      </div>
    </NodeMini>
  );
});
