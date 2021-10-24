import { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserAvatar from "../../UI/UserAvatar";
import { PrimaryButton, SecondaryButton } from "../../UI/Buttons";
import { ColourLogoIcon } from "../../UI/Icons";
import DEFAULT_TABS from "../../../constants/mainTabs";

import classes from "./Header.module.scss";

const Header = ({ userSession, navIsCollapsed, toggleNavHandler }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<header className={classes.header}>
			<ColourLogoIcon className={`${classes.home} ${navIsCollapsed ? classes.collapsed : ""}`} />
			<button className={`${classes.collapse} ${navIsCollapsed ? classes.collapsed : ""}`} title={navIsCollapsed ? "Expand" : "Collapse"} onClick={toggleNavHandler}>
				<i className="material-icons-outlined">{navIsCollapsed ? "chevron_right" : "chevron_left"}</i>
			</button>
			{userSession.email ? (
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
			) : (
				<div className={classes.auth}>
					<Link href={{ pathname: "/auth", query: { action: "signup" } }}>
						<div style={{ alignSelf: "center" }}>
							<PrimaryButton className={classes.signUp} mainLabel="Sign up" />
						</div>
					</Link>
					<Link href={{ pathname: "/auth", query: { action: "login" } }}>
						<div style={{ alignSelf: "center" }}>
							<SecondaryButton className={classes.logIn} mainLabel="Log in" />
						</div>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Header;
