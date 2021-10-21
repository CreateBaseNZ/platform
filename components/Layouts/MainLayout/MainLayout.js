import { useContext, useEffect, useState } from "react";
import UserSessionContext from "../../../store/user-session";
import Header from "./Header";
import Nav from "./Nav";

import classes from "./MainLayout.module.scss";
import { useRouter } from "next/router";

const MainLayout = ({ children }) => {
	const router = useRouter();
	const { userSession } = useContext(UserSessionContext);
	const [navIsCollapsed, setNavIsCollapsed] = useState(false);
	const [headerIsCollapsed, setHeaderIsCollapsed] = useState(false);

	const toggleNavHandler = () => {
		setNavIsCollapsed((state) => !state);
	};

	return (
		<div className={classes.frame}>
			<div className={`${classes.nav} ${navIsCollapsed ? classes.navCollapsed : ""}`}>
				<Nav page={router?.pathname?.split("/")[1]} userSession={userSession} />
			</div>
			<div className={classes.view}>
				<div className={`${classes.header} ${headerIsCollapsed ? classes.headerCollapsed : ""}`}>
					<Header userSession={userSession} navIsCollapsed={navIsCollapsed} toggleNavHandler={toggleNavHandler} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
