import { useContext, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";

import classes from "./MainLayout.module.scss";
import MainLayoutContext from "../../../store/main-layout-context";
import AliasModal from "./AliasModal";

const MainLayout = ({ children, page }) => {
	const { navIsCollapsed, headerIsCollapsed } = useContext(MainLayoutContext);
	const [showAliasModal, setShowAliasModal] = useState(false);

	return (
		<div className={classes.frame}>
			<div className={`${classes.nav} ${navIsCollapsed ? classes.navCollapsed : ""}`}>
				<Nav page={page} />
			</div>
			<div className={classes.view}>
				<div className={`${classes.header} ${headerIsCollapsed ? classes.headerCollapsed : ""}`}>
					<Header setShowAliasModal={setShowAliasModal} />
				</div>
				{children}
			</div>
			{showAliasModal && <AliasModal setShow={setShowAliasModal} />}
		</div>
	);
};

export default MainLayout;
