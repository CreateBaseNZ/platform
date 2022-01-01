import { useContext, memo } from "react";
import VisualBellContext from "../store/visual-bell-context";
import classes from "./VisualBell.module.scss";

const VisualBell = () => {
	const { visualBell, setVisualBell } = useContext(VisualBellContext);

	return (
		<div className={classes.container} style={{ pointerEvents: !visualBell?.message ? "none" : "auto" }}>
			<div key={Math.random()} className={`${classes.bell} ${classes[visualBell?.type || ""]}`}>
				{visualBell?.message}
				<i className="material-icons-outlined" onClick={() => setVisualBell()} title="Close">
					close
				</i>
			</div>
		</div>
	);
};

export default memo(VisualBell);
