import { memo } from "react";
import classes from "./FlowEditor.module.scss";

const FlowVisualBell = memo(({ message, _key = "" }) => {
	return (
		<div key={_key} className={`${classes.visualBell} ${message ? classes.show : ""}`}>
			{message}
		</div>
	);
});

export default FlowVisualBell;
