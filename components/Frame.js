import { useState } from "react";
import classes from "./Frame.module.scss";
import Header from "./Header";
import Nav from "./Nav";

const Frame = ({ children, route, user, setUser, showVerifyModal, setShowVerifyModal }) => {
	const [collapseNav, setCollapseNav] = useState(false);

	const toggleNavHandler = () => {
		setCollapseNav((state) => !state);
	};

	return (
		<div className={classes.frame}>
			<div className={classes.nav}>
				<Nav route={route} collapseNav={collapseNav} user={user} />
			</div>
			<div className={classes.view}>
				<div className={classes.header}>
					<Header user={user} setUser={setUser} showExternal={showVerifyModal} setShowExternal={setShowVerifyModal} collapseNav={collapseNav} toggleNavHandler={toggleNavHandler} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default Frame;
