import Link from "next/link";
import { ColourLogo } from "./UI/Icons";

import classes from "./Nav.module.scss";

const labels = [
	{ view: "onboarding", route: "/onboarding", label: "Onboarding", icon: "skateboarding", access: ["educator", "admin"] },
	{ view: "browse", route: "/browse", label: "Browse", icon: "camera_roll", access: [null, "learner", "educator", "admin"] },
	{ view: "user", route: "/user/my-account", label: "My Account", icon: "person", access: ["educator", "admin"] },
	// {
	//  view: 'admin-console',
	// 	route: "/user/admin-console",
	// 	label: "Admin Console",
	// 	icon: "admin_panel_settings",
	// 	access: ["admin"],
	// },
	{ view: "faq", route: "/faq", label: "FAQ", icon: "help_outline", access: [null, "learner", "educator", "admin"] },
];

const Nav = ({ route, collapseNav, user }) => {
	return (
		<nav className={`${classes.nav} ${collapseNav ? classes.collapse : ""}`}>
			<ColourLogo width="131.25" height="24" />
			{user.loaded && (
				<div className={classes.menu}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${labels
								.filter((l) => l.access.includes(user.type))
								.map((l) => l.route)
								.indexOf(route)} * 4.5rem)`,
						}}
					/>
					{labels.map(
						(l, i) =>
							l.access.includes(user.type) && (
								<Link key={i} href={l.route}>
									<button className={`${classes.tab} ${route === l.route ? classes.active : ""}`}>
										<i className="material-icons-outlined">{l.icon}</i>
										{l.label}
									</button>
								</Link>
							)
					)}
				</div>
			)}
		</nav>
	);
};

export default Nav;
