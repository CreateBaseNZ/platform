import React, { memo } from "react";
import classes from "./DndBar.module.scss";

const DndBar = memo(({ blockList }) => {
	return (
		<aside className={classes.dndbar}>
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
