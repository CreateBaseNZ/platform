import { useContext } from "react";
import Header from "./Header";
import Nav from "./Nav";

import classes from "./MainLayout.module.scss";
import MainLayoutContext from "../../../store/main-layout-context";

const MainLayout = ({ children, page }) => {
	const { navIsCollapsed, setNavIsCollapsed, headerIsCollapsed } = useContext(MainLayoutContext);

	return (
		<div className={classes.frame}>
			<div className={`${classes.nav} ${navIsCollapsed ? classes.navCollapsed : ""}`}>
				<Nav page={page} />
			</div>
			<div className={classes.view}>
				<div className={`${classes.header} ${headerIsCollapsed ? classes.headerCollapsed : ""}`}>
					<Header />
				</div>
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
