import { useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/client";
import UserAvatar from "./UI/UserAvatar";

import classes from "./Header.module.scss";
import { PrimaryButton, SecondaryButton } from "./UI/Buttons";
import { ColourLogoIcon } from "./UI/Icons";
import VerifyModal from "./VerifyModal";

const Header = ({ session, type, org, displayName = "", username, isVerified, showExternal, setShowExternal = () => {}, setUser, collapseNav, toggleNavHandler }) => {
	const [active, setActive] = useState(false);
	const [showVerifyModal, setShowVerifyModal] = useState(false);

	return (
		<header className={classes.header}>
			<ColourLogoIcon className={`${classes.home} ${collapseNav ? classes.collapsed : ""}`} />
			<button className={`${classes.collapse} ${collapseNav ? classes.collapsed : ""}`} title={collapseNav ? "Expand" : "Collapse"} onClick={toggleNavHandler}>
				<i className="material-icons-outlined">{collapseNav ? "chevron_right" : "chevron_left"}</i>
			</button>
			{!isVerified && type !== "learner" && (
				<button className={classes.verifyBtn} onClick={() => setShowVerifyModal(true)}>
					Verify
				</button>
			)}
			<Link href="/faq">
				<button className={classes.help} title="FAQ">
					<i className="material-icons-outlined">live_help</i>
				</button>
			</Link>
			{session ? (
				<div className={`${classes.headerUserContainer} ${type ? classes.loaded : ""}`} tabIndex={-1} onBlur={() => setActive(false)}>
					<div className={`${classes.headerUser} ${active ? classes.active : ""}`} onClick={() => setActive((state) => !state)}>
						<UserAvatar size={40} name={username} type={type} className={classes.avatar} />
						<div className={classes.headerName}>
							<div>{displayName}</div>
							<div>
								{type}
								{isVerified && <i className="material-icons">check_circle</i>}
							</div>
						</div>
						<i className="material-icons-outlined">expand_more</i>
					</div>
					<div className={`${classes.menu} ${active ? classes.active : ""}`}>
						{/* {type === "admin" && org && (
							<button onMouseDown={() => router.push("/user/console")}>
								<i className="material-icons-outlined">admin_panel_settings</i>
								Admin console
							</button>
						)} */}
						{(type === "admin" || type === "educator") && !org && (
							<>
								<button onMouseDown={() => router.push("/user")}>
									<i className="material-icons-outlined">group_add</i> Join an org
								</button>
								<button onMouseDown={() => router.push("/user")}>
									<i className="material-icons-outlined">groups</i>Create an org
								</button>
							</>
						)}
						<button onMouseDown={() => router.push("/user")}>
							<i className="material-icons-outlined">assignment_ind</i>My account
						</button>
						<div className={classes.divider} />
						<button onMouseDown={() => signOut({ callbackUrl: `${window.location.origin}` })}>
							<i className="material-icons-outlined">logout</i>Sign out
						</button>
					</div>
				</div>
			) : (
				<div className={classes.auth}>
					<Link href="/auth/signup">
						<div style={{ alignSelf: "center" }}>
							<PrimaryButton className={classes.signUp} mainLabel="Sign up" />
						</div>
					</Link>
					<Link href="/auth/login">
						<div style={{ alignSelf: "center" }}>
							<SecondaryButton className={classes.logIn} mainLabel="Log in" />
						</div>
					</Link>
				</div>
			)}
			{(showVerifyModal || showExternal) && <VerifyModal setIsShown={setShowVerifyModal} setShowExternal={setShowExternal} setUser={setUser} />}
		</header>
	);
};

export default Header;
