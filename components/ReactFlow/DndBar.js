import {
  NodeDistanceMini,
  NodeSizeOfMini,
  NodeSpeedOfMini,
} from "./NodeSensing";
import {
  NodeAttackMini,
  NodeDoubleJumpMini,
  NodeDuckMini,
  NodeJumpMini,
  NodeSlideMini,
} from "./NodeActions";
import {
  NodeAddMini,
  NodeSubtractMini,
  NodeMultiplyMini,
  NodeDivideMini,
  NodeGreaterThanMini,
  NodeLessThanMini,
  NodeEqualsMini,
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
        <NodeSizeOfMini onDragStart={(event) => onDragStart(event, "sizeOf")} />
        <h5>Actions</h5>
        <NodeJumpMini onDragStart={(event) => onDragStart(event, "jump")} />
        <NodeDoubleJumpMini
          onDragStart={(event) => onDragStart(event, "doubleJump")}
        />
        <NodeDuckMini onDragStart={(event) => onDragStart(event, "duck")} />
        <NodeSlideMini onDragStart={(event) => onDragStart(event, "slide")} />
        <NodeAttackMini onDragStart={(event) => onDragStart(event, "attack")} />
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
