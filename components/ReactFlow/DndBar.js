import { NodeDistanceMini } from "./NodeDistance";

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
      </div>
    </aside>
  );
};

export default DndBar;
