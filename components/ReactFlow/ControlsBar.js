import { memo } from "react";
import { Controls, ControlButton } from "react-flow-renderer";

import classes from "./ControlsBar.module.scss";

const ControlsBar = ({ isReadOnly, allowUndo, allowRedo, undoHandler, redoHandler, saveHandler, restoreHandler, selectAll, clearAll, capture, flowLocked, lockHandler, info }) => {
	return (
		<Controls className={classes.controls} showInteractive={false}>
			{!isReadOnly && (
				<>
					<ControlButton className={`${classes.customControl} ${classes.prioritise} ${!allowUndo && classes.deactive}`} onClick={undoHandler}>
						<span className="material-icons-outlined">undo</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.prioritise} ${!allowRedo && classes.deactive}`} onClick={redoHandler}>
						<span className="material-icons-outlined">redo</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.prioritise}`} onClick={saveHandler}>
						<span className="material-icons-outlined">save</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.prioritise}`} onClick={restoreHandler}>
						<span className="material-icons-outlined">restore</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.prioritise}`} onClick={selectAll}>
						<span className="material-icons-outlined">select_all</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.prioritise} ${classes.verySmall}`} onClick={clearAll}>
						<span className="material-icons-outlined">backspace</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${classes.small}`} onClick={capture}>
						<span className="material-icons-outlined">photo_camera</span>
					</ControlButton>
					<ControlButton className={`${classes.customControl} ${flowLocked && classes.locked}`} id="lockButton" onClick={lockHandler} title={flowLocked ? "Unlock (Ctrl + L)" : "Lock (Ctrl + L)"}>
						{flowLocked ? <span className="material-icons-outlined">lock</span> : <span className="material-icons-outlined">lock_open</span>}
					</ControlButton>
					<ControlButton className={classes.customControl} onClick={info}>
						<span className="material-icons-outlined">info</span>
					</ControlButton>
				</>
			)}
		</Controls>
	);
};

export default memo(ControlsBar);
