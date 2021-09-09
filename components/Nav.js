import Link from "next/link";
import { ColourLogo } from "./UI/Icons";

import classes from "./Nav.module.scss";

const onboardingTab = { route: "/onboarding", label: "Onboarding", icon: "skateboarding" };
const browseTab = { route: "/browse", label: "Browse", icon: "camera_roll" };
const myAccountTab = { route: "/user/my-account", label: "My Account", icon: "person" };
const adminConsoleTab = { route: "/user/admin-console", label: "Admin Console", icon: "admin_panel_settings" };
const faqTab = { route: "/faq", label: "FAQ", icon: "help_outline" };

const tabs = { null: [browseTab, faqTab], learner: [browseTab, faqTab], educator: [onboardingTab, browseTab, myAccountTab, faqTab], admin: [onboardingTab, browseTab, myAccountTab, faqTab] };

const Nav = ({ route, collapseNav, user }) => {
	route = route.includes("/faq") ? "/faq" : route;

	if (route.includes("/faq")) {
		route = "/faq";
	} else if (route.includes("/browse")) {
		route = "/browse";
	}

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
