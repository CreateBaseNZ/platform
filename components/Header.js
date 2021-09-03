import { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/client";
import UserAvatar from "./UI/UserAvatar";

import classes from "./Header.module.scss";
import { PrimaryButton, SecondaryButton } from "./UI/Buttons";
import { ColourLogoIcon } from "./UI/Icons";

const Header = ({ session, type, org, name = "", collapseNav, toggleNavHandler }) => {
	const [active, setActive] = useState(false);

	return (
		<header className={classes.header}>
			<ColourLogoIcon className={`${classes.home} ${collapseNav ? classes.collapsed : ""}`} />
			<button className={`${classes.collapse} ${collapseNav ? classes.collapsed : ""}`} title={collapseNav ? "Expand" : "Collapse"} onClick={toggleNavHandler}>
				<i className="material-icons-outlined">{collapseNav ? "chevron_right" : "chevron_left"}</i>
			</button>
			<Link href="/faq">
				<button className={classes.help} title="FAQ">
					<i className="material-icons-outlined">live_help</i>
				</button>
			</Link>
			{session ? (
				type && (
					<div className={classes.navUser} tabIndex={-1} onBlur={() => setActive(false)}>
						<UserAvatar size={40} name={name} type={type} className={`${classes.avatar} ${active ? classes.avatarActive : ""}`} onClick={() => setActive((state) => !state)} />
						<div className={`${classes.menu} ${active ? classes.active : ""}`}>
							<div className={classes.name}>Hi, {name.split(" ")[0]}</div>
							<div className={classes.divider} />
							{type === "admin" && org && (
								<button onMouseDown={() => router.push("/user/console")}>
									<i className="material-icons-outlined">admin_panel_settings</i>
									Admin console
								</button>
							)}
							{(type === "admin" || type === "create") && !org && (
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
				)
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
		</header>
	);
};

export default Header;
