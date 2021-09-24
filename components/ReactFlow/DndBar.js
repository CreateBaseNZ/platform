import { memo } from "react";
import { NodeAddMini, NodeSubtractMini, NodeMultiplyMini, NodeDivideMini, NodeGeneralOperatorMini, NodeAbsoluteMini } from "./NodeOperations";
import { NodeGreaterThanMini, NodeLessThanMini, NodeEqualsMini, NodeNotEqualsMini } from "./NodeComparisons";
import { NodeAndMini, NodeOrMini, NodeNotMini } from "./NodeLogicals";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "./NodeConditionals";
import { NodeDelayMini, NodePrintMini } from "./NodeUtils";
import { NodeMagnebotMoveArmMini, NodeMagnebotSwitchMini } from "./NodeMagneBot";
import { NodeSendItJumpMini, NodeSendItCrouchMini, NodeSendItDistanceMini, NodeSendItHeightOfMini, NodeSendItWidthOfMini, NodeSendItSpeedOfMini, NodeSendItElevationOfMini } from "./NodeSendIt";
import {
	NodeHeatSeekerLeftWheelMini,
	NodeHeatSeekerRightWheelMini,
	NodeHeatSeekerMoveForwardMini,
	NodeHeatSeekerMoveBackwardMini,
	NodeHeatSeekerTurnMini,
	NodeHeatSeekerStopMini,
	NodeHeatSeekerWaterHoseMini,
	NodeHeatSeekerLeftSensorMini,
	NodeHeatSeekerMiddleSensorMini,
	NodeHeatSeekerRightSensorMini,
	NodeHeatSeekerRobotOnLineMini,
	NodeHeatSeekerFrontOnLineMini,
	NodeHeatSeekerIsFireNearMini,
	NodeHeatSeekerDifferenceMini,
	NodeHeatSeekerFireSensorMini,
} from "./NodeHeatSeeker";

import classes from "./DndBar.module.scss";

const DndBar = memo(({ query }) => {
	return (
		<aside className={classes.dndbar}>
			{query === "send-it" && (
				<div className={classes.wrapper}>
					<h5>Sensing</h5>
					<NodeSendItDistanceMini />
					<NodeSendItSpeedOfMini />
					<NodeSendItHeightOfMini />
					<NodeSendItWidthOfMini />
					<NodeSendItElevationOfMini />
					<h5>Actions</h5>
					<NodeSendItJumpMini />
					<NodeSendItCrouchMini />
					<h5>Operators</h5>
					<NodeAddMini />
					<NodeSubtractMini />
					<NodeMultiplyMini />
					<NodeDivideMini />
					<h5>Comparisons</h5>
					<NodeGreaterThanMini />
					<NodeLessThanMini />
					<h5>Logicals</h5>
					<NodeAndMini />
					<NodeOrMini />
					<h5>Conditionals</h5>
					<NodeIfMini />
					<h5>Utilities</h5>
					<NodePrintMini />
				</div>
			)}
			{query === "magnebot" && (
				<div className={classes.wrapper}>
					<h5>Actions</h5>
					<NodeMagnebotMoveArmMini />
					<NodeMagnebotSwitchMini />
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
			{query === "heat-seeker" && (
				<div className={classes.wrapper}>
					<h5>Sensing</h5>
					<NodeHeatSeekerLeftSensorMini />
					<NodeHeatSeekerMiddleSensorMini />
					<NodeHeatSeekerRightSensorMini />
					<NodeHeatSeekerFireSensorMini />
					<NodeHeatSeekerDifferenceMini />
					<NodeHeatSeekerRobotOnLineMini />
					<NodeHeatSeekerFrontOnLineMini />
					<NodeHeatSeekerIsFireNearMini />
					<h5>Actions</h5>
					<NodeHeatSeekerMoveForwardMini />
					<NodeHeatSeekerMoveBackwardMini />
					<NodeHeatSeekerTurnMini />
					<NodeHeatSeekerStopMini />
					<NodeHeatSeekerLeftWheelMini />
					<NodeHeatSeekerRightWheelMini />
					<NodeHeatSeekerWaterHoseMini />
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
