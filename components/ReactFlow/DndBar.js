import { NodeDistanceMini } from "./NodeDistance";
import { NodeSpeedOfMini } from "./NodeSpeedOf";
import { NodeSizeOfMini } from "./NodeSizeOf";

import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.dndbar}>
      <div className={classes.wrapper}>
        <NodeDistanceMini
          onDragStart={(event) => onDragStart(event, "distance")}
        />
        <NodeSpeedOfMini
          onDragStart={(event) => onDragStart(event, "speedOf")}
        />
        <NodeSizeOfMini onDragStart={(event) => onDragStart(event, "sizeOf")} />
      </div>
    </aside>
  );
};

export default DndBar;
