import { memo } from "react";
import {
  NodeDistanceMini,
  NodeHeightOfMini,
  NodeWidthOfMini,
  NodeSpeedOfMini,
  NodeElevationOfMini,
  NodeLeftSensorMini,
  NodeRightSensorMini,
  NodeFireSensorMini,
  NodeMiddleSensorMini,
  NodeOnLineMini,
  NodeDifferenceMini,
  NodeFrontOnLineMini,
  NodeIsFireMini,
} from "./NodeSensing";
import {
  NodeLeftWheelMini,
  NodeMoveBackwardMini,
  NodeMoveForwardMini,
  NodeRightWheelMini,
  NodeStopMini,
  NodeTurnMini,
  NodeWateHoseMini
} from "./NodeLineFollowing";
import {
  NodeAttackMini,
  NodeDoubleJumpMini,
  NodeCrouchMini,
  NodeJumpMini,
} from "./NodeSendIt";
import { NodeMoveArmMini, NodeMagneticSwitchMini } from "./NodeMagneBot";
import {
  NodeAddMini,
  NodeSubtractMini,
  NodeMultiplyMini,
  NodeDivideMini,
  NodeOperatorGeneralMini,
  NodeAbsoluteMini
} from "./NodeOperations";
import {
  NodeGreaterThanMini,
  NodeLessThanMini,
  NodeEqualsMini,
  NodeNotEqualsMini,
} from "./NodeComparisons";
import { NodeAndMini, NodeOrMini, NodeNotMini } from "./NodeLogicals";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "./NodeConditionals";
import { NodeDelayMini, NodePrintMini} from "./NodeUtils";

import classes from "./DndBar.module.scss";

const DndBar = memo(({ query }) => {
  return (
    <aside className={classes.dndbar}>
      {query === "send-it" && (
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
          {/* <NodeDoubleJumpMini/> DO NOT ADD BACK */}
          {/* <NodeAttackMini /> DO NOT ADD BACK */}
          <h5>Operators</h5>
          <NodeAddMini />
          <NodeSubtractMini />
          <NodeMultiplyMini />
          <NodeDivideMini />
          {/* <NodeOperatorGeneralMini /> DO NOT ADD BACK */}
          <h5>Comparisons</h5>
          <NodeGreaterThanMini />
          <NodeLessThanMini />
          {/* <NodeNotEqualsMini /> */}
          {/* <NodeEqualsMini /> DO NOT ADD BACK */}
          <h5>Logicals</h5>
          <NodeAndMini />
          <NodeOrMini />
          <h5>Conditionals</h5>
          <NodeIfMini />
          {/* <NodeRepeatMini /> */}
          {/* <NodeWhileMini /> */}
          <h5>Utilities</h5>
          {/* <NodeDelayMini /> */}
          <NodePrintMini />
        </div>
      )}
      {query === "magnebot" && (
        <div className={classes.wrapper}>
          <h5>Actions</h5>
          <NodeMoveArmMini />
          <NodeMagneticSwitchMini />
        </div>
      )}
      {query === "comparison-boost" && (
        <div className={classes.wrapper}>
          <h5>Operators</h5>
          <NodeAddMini />
          <NodeSubtractMini />
          <NodeMultiplyMini />
          <NodeDivideMini />
          <h5>Comparisons</h5>
          <NodeGreaterThanMini />
          <NodeLessThanMini />
          <NodePrintMini />
        </div>
      )}
      {query === "line-following" && (
        <div className={classes.wrapper}>
          <h5>Sensing</h5>
          <NodeLeftSensorMini />
          <NodeMiddleSensorMini />
          <NodeRightSensorMini />
          <NodeOnLineMini />
          <NodeFrontOnLineMini />
          <NodeDifferenceMini />
          <NodeFireSensorMini />
          <NodeIsFireMini />
          <h5>Actions</h5>
          <NodeMoveForwardMini />
          <NodeTurnMini />
          <NodeStopMini />
          <NodeMoveBackwardMini />
          <NodeLeftWheelMini />
          <NodeRightWheelMini />
          <NodeWateHoseMini />
          <h5>Operators</h5>
          <NodeAddMini />
          <NodeSubtractMini />
          <NodeMultiplyMini />
          <NodeDivideMini />
          <NodeAbsoluteMini />
          <h5>Comparisons</h5>
          <NodeGreaterThanMini />
          <NodeLessThanMini />
          <h5>Logicals</h5>
          <NodeNotMini />
          <NodeAndMini />
          <NodeOrMini />
          <h5>Conditionals</h5>
          <NodeIfMini />
          <NodeWhileMini />
          <h5>Utilities</h5>
          <NodeDelayMini />
          <NodePrintMini />
        </div>
      )}
    </aside>
  );
});

export default DndBar;
