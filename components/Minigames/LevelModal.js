import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import classes from "./LevelModal.module.scss";
import { useRouter } from "next/router";

const levels = { comparison: 3, conditional: 3 };
const modes = ["comparison", "conditional"];

const DUMMY_COMPLETE = 0;

const LevelModal = ({
  currLvl,
  currMode,
  playSynth,
  playFlick,
  playDonk,
  closeHandler,
  setLevel,
}) => {
  const router = useRouter();
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
    if (selection.mode !== currMode) {
      router.push(`/explore/${selection.mode}-boost`);
    } else {
      setLevel(selection.level);
    }
    closeHandler();
  };

  const exitClickHandler = () => {
    playFlick();
    closeHandler();
  };

  return (
    <div className={`${classes.levelModal} ${classes[currMode]}`}>
      <div className={classes.menuContainer}>
        <div
          className={`${classes.menuWrapper} ${
            currMode !== selection.mode ? classes.disabled : ""
          }`}
        >
          <h3 className={`${classes.card} ${classes.titleCard}`}>Levels</h3>
          {[...Array(levels[currMode]).keys()].map((i) => (
            <button
              key={i}
              className={`${classes.card} ${classes.buttonCard} ${
                classes.levelCard
              }  ${i <= DUMMY_COMPLETE ? classes.complete : ""} ${
                selection.level === i ? classes.selected : ""
              } ${currLvl === i ? classes.current : ""}`}
              onMouseEnter={playSynth}
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
              onMouseEnter={playSynth}
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
