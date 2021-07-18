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
  NodeAndMini,
  NodeOrMini,
  NodeOperatorGeneralMini,
} from "./NodeOperations";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "./NodeConditionals";

import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.dndbar}>
      <div className={classes.wrapper}>
        <h5>Sensing</h5>
        <NodeDistanceMini
          onDragStart={(event) => onDragStart(event, "distance")}
        />
        <NodeSpeedOfMini
          onDragStart={(event) => onDragStart(event, "speedOf")}
        />
        <NodeHeightOfMini
          onDragStart={(event) => onDragStart(event, "heightOf")}
        />
        <NodeWidthOfMini
          onDragStart={(event) => onDragStart(event, "widthOf")}
        />
        <NodeElevationOfMini
          onDragStart={(event) => onDragStart(event, "elevationOf")}
        />
        <h5>Actions</h5>
        <NodeJumpMini onDragStart={(event) => onDragStart(event, "jump")} />
        {/* <NodeDoubleJumpMini
          onDragStart={(event) => onDragStart(event, "doubleJump")}
        /> */}
        <NodeCrouchMini onDragStart={(event) => onDragStart(event, "crouch")} />
        {/* <NodeAttackMini onDragStart={(event) => onDragStart(event, "attack")} /> */}
        <h5>Operators</h5>
        <NodeAddMini onDragStart={(event) => onDragStart(event, "add")} />
        <NodeSubtractMini
          onDragStart={(event) => onDragStart(event, "subtract")}
        />
        <NodeMultiplyMini
          onDragStart={(event) => onDragStart(event, "multiply")}
        />
        <NodeDivideMini onDragStart={(event) => onDragStart(event, "divide")} />
        <NodeGreaterThanMini
          onDragStart={(event) => onDragStart(event, "greaterThan")}
        />
        <NodeLessThanMini
          onDragStart={(event) => onDragStart(event, "lessThan")}
        />
        <NodeEqualsMini onDragStart={(event) => onDragStart(event, "equals")} />
        <NodeNotEqualsMini
          onDragStart={(event) => onDragStart(event, "notEquals")}
        />
        <NodeAndMini onDragStart={(event) => onDragStart(event, "and")} />
        <NodeOrMini onDragStart={(event) => onDragStart(event, "or")} />
        <NodeOperatorGeneralMini
          onDragStart={(event) => onDragStart(event, "operatorGeneral")}
        />
        <h5>Conditionals</h5>
        <NodeIfMini onDragStart={(event) => onDragStart(event, "if")} />
        <NodeRepeatMini onDragStart={(event) => onDragStart(event, "repeat")} />
        <NodeWhileMini onDragStart={(event) => onDragStart(event, "while")} />
      </div>
    </aside>
  );
};

export default DndBar;
