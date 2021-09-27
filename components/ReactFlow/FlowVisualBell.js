import { memo } from "react";
import classes from "./FlowEditor.module.scss";

const FlowVisualBell = memo(({ message, show }) => {
	return (
		<div className={`${classes.visualBell} ${show ? classes.show : ""}`} style={{ opacity: show ? 1 : 0 }}>
			{message}
		</div>
	);
});

export default FlowVisualBell;