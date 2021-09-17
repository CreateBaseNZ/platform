import Link from "next/link";
import { ColourLogo } from "../UI/Icons";

import classes from "./Nav.module.scss";

const onboardingTab = { route: "/onboarding", label: "Onboarding", icon: "skateboarding" };
const browseTab = { route: "/browse", label: "Browse", icon: "camera_roll" };
const myAccountTab = { route: "/user/my-account", label: "My Account", icon: "person" };
const adminConsoleTab = { route: "/user/admin-console", label: "Admin Console", icon: "admin_panel_settings" };
const faqTab = { route: "/faq", label: "FAQ", icon: "help_outline" };

const allTabs = {
	onboarding: { route: "/onboarding", label: "Onboarding", icon: "skateboarding" },
	browse: { route: "/browse", label: "Browse", icon: "camera_roll" },
	myAccount: { route: "/user/my-account", label: "My Account", icon: "person" },
	adminConsole: { route: "/user/admin-console", label: "Admin Console", icon: "admin_panel_settings" },
	faq: { route: "/faq", label: "FAQ", icon: "help_outline" },
};

const tabs = {
	null: [allTabs.browse, allTabs.faq],
	learner: [allTabs.browse, allTabs.faq, allTabs.myAccount],
	educator: [allTabs.onboarding, allTabs.browse, allTabs.myAccount, allTabs.faq],
	admin: [allTabs.onboarding, allTabs.browse, allTabs.adminConsole, allTabs.myAccount, allTabs.faq],
};

const Nav = ({ route, collapseNav, user }) => {
	console.log(tabs[user.type]);

	if (user.loaded) {
		route = tabs[user.type].find((t) => route.startsWith(t.route)).route || route;
	}

	console.log(route);

	return (
		<nav className={`${classes.nav} ${collapseNav ? classes.collapse : ""}`}>
			<ColourLogo width="131.25" height="24" />
			{user.loaded && (
				<div className={classes.menu}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${tabs[user.type].map((l) => l.route).indexOf(route)} * 4.5rem)`,
						}}
					/>
					{tabs[user.type].map((l, i) => (
						<Link key={i} href={l.route}>
							<button className={`${classes.tab} ${route === l.route ? classes.active : ""}`}>
								<i className="material-icons-outlined">{l.icon}</i>
								{l.label}
							</button>
						</Link>
					))}
				</div>
			)}
		</nav>
	);
};

export default Nav;
