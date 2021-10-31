import { useContext, useState } from "react";
import router from "next/router";
import { signOut } from "next-auth/react";
import GlobalSessionContext from "../../../store/global-session-context";
import MainLayoutContext from "../../../store/main-layout-context";

import UserAvatar from "../../UI/UserAvatar";
import { ColourLogoIcon } from "../../UI/Icons";
import DEFAULT_TABS from "../../../constants/mainTabs";

import classes from "./Header.module.scss";

const Header = () => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { navIsCollapsed, setNavIsCollapsed } = useContext(MainLayoutContext);
	const [showDropdown, setShowDropdown] = useState(false);

	const changeGroup = (group) => {
		setGlobalSession((state) => ({ ...state, recentGroups: [group, ...state.recentGroups.filter((_group) => _group._id !== group._id)].slice(0, 3) }));
	};

	return (
		<>
			<button className={`${classes.collapse} ${navIsCollapsed ? classes.collapsed : ""}`} title={navIsCollapsed ? "Expand" : "Collapse"} onClick={() => setNavIsCollapsed((state) => !state)}>
				<i className="material-icons-outlined">{navIsCollapsed ? "chevron_right" : "chevron_left"}</i>
			</button>
			<header className={classes.header}>
				<ColourLogoIcon className={`${classes.home} ${navIsCollapsed ? classes.collapsed : ""}`} />
				{globalSession.isViewingGroup && (
					<div className={classes.viewingAs}>
						<div className={classes.viewingAsName}>{globalSession.recentGroups[0].name}</div>
						<div className={classes.viewingAsRole}>{globalSession.recentGroups[0].role}</div>
					</div>
				)}
				{globalSession.email && (
					<div className={`${classes.headerUserContainer} ${globalSession.email ? classes.loaded : ""}`} tabIndex={-1} onBlur={() => setShowDropdown(false)}>
						<div className={`${classes.headerUser} ${showDropdown ? classes.active : ""}`} onClick={() => setShowDropdown((state) => !state)}>
							<UserAvatar size={40} name={`${globalSession.firstName}${globalSession.lastName}`} className={classes.avatar} />
							<div className={classes.headerName}>
								{globalSession.firstName} {globalSession.lastName}
							</div>
							<i className="material-icons-outlined">expand_more</i>
						</div>
						<div className={`${classes.menu} ${showDropdown ? classes.active : ""}`}>
							{globalSession.recentGroups.map((group, i) => (
								//TODO switching between views
								<button key={i} onMouseDown={() => changeGroup(group)} title={group.name}>
									<i className="material-icons-outlined">{group.type === "school" ? "holiday_village" : group.type === "family" ? "cottage" : ""}</i>
									<span>{group.name}</span>
								</button>
							))}
							{globalSession.numOfGroups > 3 && <div className={classes.moreGroups}>and {globalSession.numOfGroups - 3} more ...</div>}
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
		</>
	);
};

export default Header;
