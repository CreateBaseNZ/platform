import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./LevelModal.module.scss";

const levels = { comparison: 3, if: 3, while: 4 };
const modes = ["comparison", "if", "while"];

const DUMMY_COMPLETE = -1;

const LevelModal = ({ currLvl, currMode, playSynth, playFlick, playDonk, closeHandler, setLevel }) => {
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
				<div className={`${classes.menuWrapper}`}>
					<h3 className={`${classes.card} ${classes.titleCard}`}>{selection.mode} Levels</h3>
					{[...Array(levels[selection.mode]).keys()].map((i) => (
						<button
							key={i}
							className={`${classes.card} ${classes.buttonCard} ${classes.levelCard}  ${i <= DUMMY_COMPLETE ? classes.complete : ""} ${selection.level === i ? classes.selected : ""} ${
								selection.mode === currMode && currLvl === i ? classes.current : ""
							}`}
							onMouseEnter={playSynth}
							onClick={levelClickHandler.bind(this, i)}>
							{i + 1}
						</button>
					))}
				</div>
				<div className={classes.menuWrapper}>
					<h3 className={`${classes.card} ${classes.titleCard}`}>All Boosts</h3>
					{modes.map((m, i) => (
						<button
							key={i}
							className={`${classes.card} ${classes.buttonCard} ${classes.modeCard} ${selection.mode === m ? classes.selected : ""} ${currMode === m ? classes.current : ""}`}
							onMouseEnter={playSynth}
							onClick={modeClickHandler.bind(this, m)}>
							{m}
						</button>
					))}
				</div>
				<button className={`${classes.card} ${classes.buttonCard} ${classes.proceed}`} onMouseEnter={playDonk} onClick={proceedClickHandler}>
					Proceed
				</button>
				<button className={classes.close} onMouseEnter={playDonk} onClick={exitClickHandler}>
					<span className="material-icons-outlined">close</span>
				</button>
			</div>
		</div>
	);
};

export default LevelModal;
