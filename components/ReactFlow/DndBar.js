import React, { memo, useContext } from "react";
import MiniHoverContext from "../../store/mini-hover-context";
import classes from "./DndBar.module.scss";

const DndBar = memo(({ blockList }) => {
	const { mouseLeaveHandler } = useContext(MiniHoverContext);

	return (
		<aside className={classes.dndbar} onMouseLeave={mouseLeaveHandler}>
			<div className={classes.wrapper}>
				{blockList.map((type) => (
					<React.Fragment key={type.name}>
						<h5>{type.name}</h5>
						{type.blocks.map((block, i) => (
							<React.Fragment key={i}>{block}</React.Fragment>
						))}
					</React.Fragment>
				))}
			</div>
		</aside>
	);
});

export default DndBar;
