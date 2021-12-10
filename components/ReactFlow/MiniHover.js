import { useContext } from "react";
import MiniHoverContext from "../../store/mini-hover-context";

import { tooltips } from "../../utils/flowConfig";

import classes from "./MiniHover.module.scss";

const MiniHover = () => {
	const { activeNode } = useContext(MiniHoverContext);

	if (!activeNode) return null;

	return (
		<div className={classes.hoverBg}>
			{activeNode.block}
			<aside>
				<p>
					<span className={classes.label}>Inputs:</span>
					{tooltips[activeNode.nodeType][0]}
				</p>
				<p>
					<span className={classes.label}>Outputs:</span>
					{tooltips[activeNode.nodeType][1]}
				</p>
				<p style={{ marginTop: 12 }}>{tooltips[activeNode.nodeType][2]}</p>
			</aside>
		</div>
	);
};

export default MiniHover;
