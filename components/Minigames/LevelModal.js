import classes from "./LevelModal.module.scss";

const levels = (mode) => {
  const mode = mode.toLowerCase();
  switch (mode) {
    case "comparison":
      return ["1", "2"];
  }
};

const LevelCard = () => {
  <div className={classes.card}></div>;
};

const LevelModal = () => {
  return (
    <div className={classes.levelModal}>
      <div className={classes.menu}>
        {levels.map((l) => (
          <LevelCard />
        ))}
      </div>
    </div>
  );
};

export default LevelModal;
