import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import classes from "./LevelModal.module.scss";

const levels = { comparison: 3 };
const modes = ["comparison", "conditional"];

const DUMMY_COMPLETE = 0;

const LevelModal = ({
  currLvl,
  currMode,
  playFlick,
  playDonk,
  closeHandler,
}) => {
  const [selection, setSelection] = useState({
    level: currLvl,
    mode: currMode,
  });

  const levelClickHandler = (i) => {
    playFlick();
    setSelection((state) => ({ ...state, level: i }));
  };

  const modeClickHandler = (m) => {
    playFlick();
    setSelection((state) => ({ ...state, mode: m }));
  };

  const proceedClickHandler = () => {
    playFlick();
  };

  const exitClickHandler = () => {
    playFlick();
    closeHandler();
  };

  return (
    <div className={classes.levelModal}>
      <div className={classes.menuContainer}>
        <div className={classes.menuWrapper}>
          <h3 className={`${classes.card} ${classes.titleCard}`}>Levels</h3>
          {[...Array(levels[currMode]).keys()].map((i) => (
            <button
              key={i}
              className={`${classes.card} ${classes.buttonCard} ${
                classes.levelCard
              }  ${i <= DUMMY_COMPLETE ? classes.complete : ""} ${
                selection.level === i ? classes.selected : ""
              } ${currLvl === i ? classes.current : ""}`}
              onMouseEnter={playDonk}
              onClick={levelClickHandler.bind(this, i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className={classes.menuWrapper}>
          <h3 className={`${classes.card} ${classes.titleCard}`}>
            Other Boosts
          </h3>
          {modes.map((m, i) => (
            <button
              key={i}
              className={`${classes.card} ${classes.buttonCard} ${
                classes.modeCard
              } ${selection.mode === m ? classes.selected : ""} ${
                currMode === m ? classes.current : ""
              }`}
              onMouseEnter={playDonk}
              onClick={modeClickHandler.bind(this, m)}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          className={`${classes.card} ${classes.buttonCard} ${classes.proceed}`}
          onMouseEnter={playDonk}
          onClick={proceedClickHandler}
        >
          Proceed
        </button>
        <button
          className={classes.close}
          onMouseEnter={playDonk}
          onClick={exitClickHandler}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default LevelModal;
