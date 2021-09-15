import { memo } from "react";
import classes from "./FlowEditor.module.scss";

const VisualBell = memo(({ message, show }) => {
	console.log(message);
	console.log(show);

	return (
		<div className={`${classes.visualBell} ${show ? classes.show : ""}`} style={{ opacity: show ? 1 : 0 }}>
			{message}
		</div>
	);
});

export default VisualBell;
