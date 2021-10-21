import { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import UserAvatar from "../../UI/UserAvatar";
import { PrimaryButton, SecondaryButton } from "../../UI/Buttons";
import { ColourLogoIcon } from "../../UI/Icons";

import classes from "./Header.module.scss";

const Header = ({ userSession, navIsCollapsed, toggleNavHandler }) => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<header className={classes.header}>
			<ColourLogoIcon className={`${classes.home} ${navIsCollapsed ? classes.collapsed : ""}`} />
			<button className={`${classes.collapse} ${navIsCollapsed ? classes.collapsed : ""}`} title={navIsCollapsed ? "Expand" : "Collapse"} onClick={toggleNavHandler}>
				<i className="material-icons-outlined">{navIsCollapsed ? "chevron_right" : "chevron_left"}</i>
			</button>
			<Link href="/support">
				<button className={classes.help} title="Support">
					<i className="material-icons-outlined">live_help</i>
				</button>
			</Link>
			{userSession.email ? (
				<div className={`${classes.headerUserContainer} ${userSession.email ? classes.loaded : ""}`} tabIndex={-1} onBlur={() => setShowDropdown(false)}>
					<div className={`${classes.headerUser} ${showDropdown ? classes.active : ""}`} onClick={() => setShowDropdown((state) => !state)}>
						<UserAvatar size={40} name={`${userSession.firstName}${userSession.lastName}`} className={classes.avatar} />
						<div className={classes.headerName}>
							<div>
								{userSession.firstName} {userSession.lastName}
							</div>
							{/* <div>
								{user.type}
								<i className="material-icons">check_circle</i>
							</div> */}
						</div>
						<i className="material-icons-outlined">expand_more</i>
					</div>
					<div className={`${classes.menu} ${showDropdown ? classes.active : ""}`}>
						{userSession.view?.userType === "admin" && (
							<button onMouseDown={() => router.push("/user/manage-users")}>
								<i className="material-icons-outlined">admin_panel_settings</i>
								Manage Users
							</button>
						)}
						{(userSession.view?.userType === "admin" || userSession.view?.userType === "teacher") && (
							<>
								<button onMouseDown={() => router.push("/user/my-account/org")}>
									<i className="material-icons-outlined">group_add</i> Join an org
								</button>
								<button onMouseDown={() => router.push("/user/my-account/org")}>
									<i className="material-icons-outlined">groups</i>Register an org
								</button>
							</>
						)}
						{userSession.view && (
							<button onMouseDown={() => router.push("/user/my-account/org")}>
								<i className="material-icons-outlined">supervisor_account</i> My org
							</button>
						)}
						<button onMouseDown={() => router.push("/user")}>
							<i className="material-icons-outlined">person</i>My account
						</button>
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
