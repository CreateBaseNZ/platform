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
  NodeOperatorGeneralMini,
} from "./NodeOperations";
import {
  NodeGreaterThanMini,
  NodeLessThanMini,
  NodeEqualsMini,
  NodeNotEqualsMini,
} from "./NodeComparisons";
import { NodeAndMini, NodeOrMini } from "./NodeLogicals";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "./NodeConditionals";
import { NodeDelayMini, NodePrintMini } from "./NodeUtils";

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
        <NodeCrouchMini />
        {/* <NodeDoubleJumpMini/> */}
        {/* <NodeAttackMini /> */}
        <h5>Operators</h5>
        <NodeAddMini />
        <NodeSubtractMini />
        <NodeMultiplyMini />
        <NodeDivideMini />
        <NodeOperatorGeneralMini />
        <h5>Comparisons</h5>
        <NodeGreaterThanMini />
        <NodeLessThanMini />
        <NodeNotEqualsMini />
        {/* <NodeEqualsMini /> */}
        <h5>Logicals</h5>
        <NodeAndMini />
        <NodeOrMini />
        <h5>Conditionals</h5>
        <NodeIfMini />
        <NodeRepeatMini />
        <NodeWhileMini />
        <h5>Utilities</h5>
        <NodeDelayMini />
        <NodePrintMini />
      </div>
    </aside>
  );
};

export default DndBar;
