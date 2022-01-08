import { useContext, memo } from "react";
import VisualBellContext from "../store/visual-bell-context";
import classes from "./VisualBell.module.scss";

const VisualBell = (): JSX.Element => {
	const { visualBell, setVisualBell } = useContext(VisualBellContext);

	const onAnimationEnd = () => {
		if (!visualBell) return;
		if (visualBell.type !== "catastrophe" && visualBell.type !== "warning") setVisualBell();
	};

	return (
		<div className={`${classes.container} ${visualBell ? "" : classes.hide}`} onAnimationEnd={onAnimationEnd}>
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
