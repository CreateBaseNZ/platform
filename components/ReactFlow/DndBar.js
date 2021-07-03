import { NodeDistanceMini } from "./NodeDistance";
import { NodeSpeedOfMini } from "./NodeSpeedOf";
import { NodeSizeOfMini } from "./NodeSizeOf";
import { NodeJumpMini } from "./NodeJump";
import { NodeDoubleJumpMini } from "./NodeDoubleJump";
import { NodeDuckMini } from "./NodeDuck";
import { NodeSlideMini } from "./NodeSlide";
import { NodeAttackMini } from "./NodeAttack";

import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.dndbar}>
      <div className={classes.wrapper}>
        <h5>Sensoring</h5>
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
      </div>
    </aside>
  );
};

export default DndBar;
