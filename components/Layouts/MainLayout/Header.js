import { useContext, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserAvatar from "../../UI/UserAvatar";
import { PrimaryButton, SecondaryButton } from "../../UI/Buttons";
import { ColourLogoIcon } from "../../UI/Icons";
import DEFAULT_TABS from "../../../constants/mainTabs";

import classes from "./Header.module.scss";
import UserSessionContext from "../../../store/user-session";

const Header = ({ navIsCollapsed, toggleNavHandler }) => {
	const { userSession, setUserSession } = useContext(UserSessionContext);
	const [showDropdown, setShowDropdown] = useState(false);

	console.log(userSession);

	return (
		<header className={classes.header}>
			<ColourLogoIcon className={`${classes.home} ${navIsCollapsed ? classes.collapsed : ""}`} />
			<button className={`${classes.collapse} ${navIsCollapsed ? classes.collapsed : ""}`} title={navIsCollapsed ? "Expand" : "Collapse"} onClick={toggleNavHandler}>
				<i className="material-icons-outlined">{navIsCollapsed ? "chevron_right" : "chevron_left"}</i>
			</button>
			{userSession?.email && (
				<div className={`${classes.headerUserContainer} ${userSession.email ? classes.loaded : ""}`} tabIndex={-1} onBlur={() => setShowDropdown(false)}>
					<div className={`${classes.headerUser} ${showDropdown ? classes.active : ""}`} onClick={() => setShowDropdown((state) => !state)}>
						<UserAvatar size={40} name={`${userSession.firstName}${userSession.lastName}`} className={classes.avatar} />
						<div className={classes.headerName}>
							{userSession.firstName} {userSession.lastName}
						</div>
						<i className="material-icons-outlined">expand_more</i>
					</div>
					<div className={`${classes.menu} ${showDropdown ? classes.active : ""}`}>
						{userSession.recentGroups.map((group, i) => (
							//TODO switching between views
							<button key={i} onMouseDown={() => {}} title={group.name}>
								<i className="material-icons-outlined">{group.type === "school" ? "holiday_village" : group.type === "family" ? "cottage" : ""}</i>
								<span>{group.name}</span>
							</button>
						))}
						{userSession.numOfGroups > 3 && <div className={classes.moreGroups}>and {userSession.numOfGroups - 3} more ...</div>}
						<div className={classes.divider} />
						{DEFAULT_TABS.map((tab, i) => (
							<button key={i} onMouseDown={() => router.push(tab.urlObject)} title={tab.label}>
								<i className="material-icons-outlined">{tab.icon}</i> {tab.label}
							</button>
						))}
						<div className={classes.divider} />
						<button onMouseDown={() => signOut({ callbackUrl: `${window.location.origin}` })}>
							<i className="material-icons-outlined">logout</i>Log out
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
