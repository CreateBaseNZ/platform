import { useContext, useState } from "react";
import InviteOrgContext from "../../store/invite-org-context";
import classes from "./Frame.module.scss";
import Header from "./Header";
import InviteOrgModal from "./InviteOrgModal";
import Nav from "./Nav";

const Frame = ({ children, route, user, collapseHeader }) => {
	const ctx = useContext(InviteOrgContext);
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
				<div className={`${classes.header} ${collapseHeader ? classes.collapsed : ""}`}>
					<Header user={user} collapseNav={collapseNav} toggleNavHandler={toggleNavHandler} />
				</div>
				{children}
			</div>
			{ctx.show && <InviteOrgModal user={user} />}
		</div>
	);
};

export default Frame;
