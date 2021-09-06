import Link from "next/link";
import { ColourLogo } from "./UI/Icons";

import classes from "./Nav.module.scss";

const labels = [
	{ route: "/onboarding", label: "Onboarding", icon: "skateboarding", access: ["educator", "admin"] },
	{ route: "/browse", label: "Browse", icon: "camera_roll", access: [undefined, "learner", "educator", "admin"] },
	{ route: "/user/my-account", label: "My Account", icon: "person", access: ["educator", "admin"] },
	// {
	// 	route: "/admin-console",
	// 	label: "Admin Console",
	// 	icon: "admin_panel_settings",
	// 	access: ["admin"],
	// },
	{ route: "/faq", label: "FAQ", icon: "help_outline", access: [undefined, "learner", "educator", "admin"] },
];

const Nav = ({ tabIndex, collapseNav, type }) => {
	return (
		<nav className={`${classes.nav} ${collapseNav ? classes.collapse : ""}`}>
			<ColourLogo width="131.25" height="24" />
			<div className={classes.menu}>
				{type &&
					labels.map(
						(l, i) =>
							l.access.includes(type) && (
								<Link key={i} href={l.route}>
									<button className={`${classes.tab} ${tabIndex === i ? classes.active : ""}`}>
										<i className="material-icons-outlined">{l.icon}</i>
										{l.label}
									</button>
								</Link>
							)
					)}
			</div>
		</nav>
	);
};

export default Nav;
