import { useState } from "react";
import classes from "./PageSizeSelect.module.scss";

const PageSizeSelect = ({ pageSize, pageSizes, setPageSize }) => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className={classes.pageSize}>
			View
			<button className={`${classes.pageSizeBtn} ${showMenu ? classes.show : ""}`} onClick={() => setShowMenu((state) => !state)} onBlur={() => setShowMenu(false)}>
				<span>{pageSize}</span> <i className="material-icons-outlined">expand_less</i>
				<div className={classes.pageSizeMenu}>
					{pageSizes.map((o) => (
						<div key={o} onClick={() => setPageSize(o)}>
							{o}
						</div>
					))}
				</div>
			</button>
			per page
		</div>
	);
};

export default PageSizeSelect;
