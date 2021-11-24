import { useContext } from "react";
import MainLayoutContext from "../../../store/main-layout-context";
import classes from "./HeaderToggle.module.scss";

const HeaderToggle = () => {
	const { headerIsCollapsed, setHeaderIsCollapsed } = useContext(MainLayoutContext);

	return (
		<button className={classes.toggleHeader} onClick={() => setHeaderIsCollapsed((state) => !state)} title="Expand table view">
			<span>{headerIsCollapsed ? "Collapse" : "Expand"}</span>
			<i className="material-icons-outlined" style={{ transform: headerIsCollapsed && "rotate(180deg)" }}>
				expand_less
			</i>
		</button>
	);
};

export default HeaderToggle;
