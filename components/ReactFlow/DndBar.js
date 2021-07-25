import {
  NodeDistanceMini,
  NodeHeightOfMini,
  NodeWidthOfMini,
  NodeSpeedOfMini,
  NodeElevationOfMini,
} from "./NodeSensing";
import {
  NodeAttackMini,
  NodeDoubleJumpMini,
  NodeCrouchMini,
  NodeJumpMini,
} from "./NodeActions";
import {
  NodeAddMini,
  NodeSubtractMini,
  NodeMultiplyMini,
  NodeDivideMini,
  NodeGreaterThanMini,
  NodeLessThanMini,
  NodeEqualsMini,
  NodeNotEqualsMini,
  NodeOperatorGeneralMini,
} from "./NodeOperations";
import { NodeAndMini, NodeOrMini } from "./NodeLogicals";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "./NodeConditionals";

import classes from "./DndBar.module.scss";

const DndBar = () => {
  return (
    <aside className={classes.dndbar}>
      <div className={classes.wrapper}>
        <h5>Sensing</h5>
        <NodeDistanceMini />
        <NodeSpeedOfMini />
        <NodeHeightOfMini />
        <NodeWidthOfMini />
        <NodeElevationOfMini />
        <h5>Actions</h5>
        <NodeJumpMini />
        {/* <NodeDoubleJumpMini/> */}
        <NodeCrouchMini />
        {/* <NodeAttackMini /> */}
        <h5>Operators</h5>
        <NodeAddMini />
        <NodeSubtractMini />
        <NodeMultiplyMini />
        <NodeDivideMini />
        <NodeGreaterThanMini />
        <NodeLessThanMini />
        {/* <NodeEqualsMini /> */}
        <NodeNotEqualsMini />
        <NodeOperatorGeneralMini />
        <h5>Logicals</h5>
        <NodeAndMini />
        <NodeOrMini />
        <h5>Conditionals</h5>
        <NodeIfMini />
        <NodeRepeatMini />
        <NodeWhileMini />
      </div>
    </aside>
  );
};

export default DndBar;
