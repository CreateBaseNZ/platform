import { useContext, memo } from "react";
import VisualBellContext from "../store/visual-bell-context";
import classes from "./VisualBell.module.scss";

const VisualBell = () => {
	const ctx = useContext(VisualBellContext);

	return (
		<div className={classes.container} style={{ pointerEvents: !ctx.bell.message && "none" }}>
			<div key={Math.random()} className={`${classes.bell} ${classes[ctx.bell.type]}`}>
				{ctx.bell.message}
				<i className="material-icons-outlined" onClick={() => ctx.setBell({})} title="Close">
					close
				</i>
			</div>
		</div>
	);
};

export default memo(VisualBell);
