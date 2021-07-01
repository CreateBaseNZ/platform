import classes from "./DndBar.module.scss";

const DndBar = () => {
  const onDragStart = (event, nodeType) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.dataTransfer.setData(
      "application/reactflow",
      `${nodeType}-${x}-${y}`
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className={classes.dndbar}>
      <div className={classes.wrapper}>
        <div
          onDragStart={(event) => onDragStart(event, "gravity")}
          draggable
        ></div>
      </div>
    </aside>
  );
};

export default DndBar;
