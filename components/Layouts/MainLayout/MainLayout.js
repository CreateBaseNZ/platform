import { useContext, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";

import classes from "./MainLayout.module.scss";
import MainLayoutContext from "../../../store/main-layout-context";
import AliasModal from "./AliasModal";
import GlobalSessionContext from "../../../store/global-session-context";
import { globals } from "overlayscrollbars";

const MainLayout = ({ children, page }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { navIsCollapsed, headerIsCollapsed } = useContext(MainLayoutContext);
	const [showAliasModal, setShowAliasModal] = useState(false);

	console.log(globalSession);

	return (
		<div className={classes.frame}>
			{globalSession.accountId && (
				<div className={`${classes.nav} ${navIsCollapsed ? classes.navCollapsed : ""}`}>
					<Nav page={page} />
				</div>
			)}
			<div className={classes.view}>
				{globalSession.accountId && (
					<div className={`${classes.header} ${headerIsCollapsed ? classes.headerCollapsed : ""}`}>
						<Header setShowAliasModal={setShowAliasModal} />
					</div>
				)}
				{children}
			</div>
			{showAliasModal && <AliasModal setShow={setShowAliasModal} />}
		</div>
	);
};

export default MainLayout;
