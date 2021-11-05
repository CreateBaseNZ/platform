import { useContext, useState } from "react";
import router from "next/router";
import { signOut } from "next-auth/react";
import GlobalSessionContext from "../../../store/global-session-context";
import MainLayoutContext from "../../../store/main-layout-context";

import UserAvatar from "../../UI/UserAvatar";
import { ColourLogoIcon } from "../../UI/Icons";
import DEFAULT_TABS from "../../../constants/mainTabs";

import classes from "./Header.module.scss";

const Header = ({ setShowAliasModal }) => {
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const { navIsCollapsed, setNavIsCollapsed } = useContext(MainLayoutContext);
	const [showDropdown, setShowDropdown] = useState(false);

	const changeGroup = (groupIndex) => {
		setGlobalSession((state) => ({ ...state, recentGroups: [groupIndex, ...state.recentGroups.filter((_group) => _group !== groupIndex)].slice(0, 3) }));
	};

	return (
		<>
			<button className={`${classes.collapse} ${navIsCollapsed ? classes.collapsed : ""}`} title={navIsCollapsed ? "Expand" : "Collapse"} onClick={() => setNavIsCollapsed((state) => !state)}>
				<i className="material-icons-outlined">{navIsCollapsed ? "chevron_right" : "chevron_left"}</i>
			</button>
			<header className={classes.header}>
				<ColourLogoIcon className={`${classes.home} ${navIsCollapsed ? classes.collapsed : ""}`} />
				{globalSession.recentGroups.length ? (
					<div className={classes.viewingAs} key={globalSession.groups[globalSession.recentGroups[0]].name}>
						<div className={classes.viewingAsName}>{globalSession.groups[globalSession.recentGroups[0]].name}</div>
						<div className={classes.viewingAsRole}>{globalSession.groups[globalSession.recentGroups[0]].role}</div>
					</div>
				) : null}
				{globalSession.accountId && (
					<div className={classes.headerUserContainer} tabIndex={-1} onBlur={() => setShowDropdown(false)}>
						<div className={`${classes.headerUser} ${showDropdown ? classes.active : ""}`} onClick={() => setShowDropdown((state) => !state)}>
							<UserAvatar size={40} id={globalSession.profileId} className={classes.avatar} />
							<div className={classes.headerName}>
								{globalSession.recentGroups.length ? globalSession.groups[globalSession.recentGroups[0]].alias : `${globalSession.firstName} ${globalSession.lastName}`}
							</div>
							<i className="material-icons-outlined">expand_more</i>
						</div>
						<div className={`${classes.menu} ${showDropdown ? classes.active : ""}`}>
							{globalSession.recentGroups.length ? (
								<>
									<button onMouseDown={() => setShowAliasModal(true)} title="Edit alias">
										<i className="material-icons-outlined">badge</i>
										<span>Edit alias</span>
									</button>
									<div className={classes.divider} />
									{globalSession.recentGroups.map((groupIndex) => (
										<button key={groupIndex} onMouseDown={() => changeGroup(groupIndex)} title={globalSession.groups[groupIndex].name}>
											<i className="material-icons-outlined">
												{globalSession.groups[groupIndex].type === "school" ? "holiday_village" : globalSession.groups[groupIndex].type === "family" ? "cottage" : ""}
											</i>
											<span>{globalSession.groups[groupIndex].name}</span>
										</button>
									))}
								</>
							) : (
								<>
									<button onMouseDown={() => router.push("/my-groups/join-school")} title="Join a school">
										<i className="material-icons-outlined">add</i>
										<span>Join a school</span>
									</button>
									<button onMouseDown={() => router.push("/my-groups/new-school")} title="Register a school">
										<i className="material-icons-outlined">holiday_village</i>
										<span>Register a school</span>
									</button>
									<button onMouseDown={() => router.push("/my-groups/join-family")} title="Join a family">
										<i className="material-icons-outlined">add</i>
										<span>Join a family</span>
									</button>
									<button onMouseDown={() => router.push("/my-groups/new-family")} title="Create a family">
										<i className="material-icons-outlined">cottage</i>
										<span>Create a family</span>
									</button>
								</>
							)}
							{globalSession.groups.length > 3 && <div className={classes.moreGroups}>and {globalSession.groups.length - 3} more ...</div>}
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
