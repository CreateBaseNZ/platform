import { useContext } from "react";
import Link from "next/link";
import GlobalSessionContext from "../../../store/global-session-context";
import { ColourLogo } from "../../UI/Icons";
import DEFAULT_TABS, { BROWSE, MAIN_TABS } from "../../../constants/mainTabs";

import classes from "./Nav.module.scss";

const NavTab = ({ tab, page }) => {
	return tab.page ? (
		<Link href={tab.urlObject}>
			<button className={`${classes.tab} ${tab.page === page ? classes.active : ""}`}>
				<i className="material-icons-outlined">{tab.icon}</i>
				{tab.label}
				{tab.page === "inbox" && <div className={classes.inbox}>3</div>}
			</button>
		</Link>
	) : (
		<div className={classes.divider} />
	);
};

const Nav = ({ page }) => {
	const { globalSession } = useContext(GlobalSessionContext);

	const defaultTabs = globalSession.recentGroups.length
		? [...MAIN_TABS[globalSession.groups[globalSession.recentGroups[0]].type]?.[globalSession.groups[globalSession.recentGroups[0]].role], { page: null }]
		: [];

	const activeTab = [BROWSE, ...defaultTabs, ...DEFAULT_TABS].findIndex((t) => t.page === page);

	return (
		<nav className={classes.nav}>
			<ColourLogo width="131.25" height="24" className={classes.logo} />
			{globalSession.accountId && (
				<div className={`${classes.menu} roundScollbar`}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${activeTab} * 4rem)`,
						}}
					/>
					<NavTab tab={BROWSE} page={page} />
					{defaultTabs.map((tab, i) => (
						<NavTab key={i} tab={tab} page={page} />
					))}
					{DEFAULT_TABS.map((tab, i) => (
						<NavTab key={i} tab={tab} page={page} />
					))}
				</div>
			)}
		</nav>
	);
};

// TODO populate notification number [FRONTEND]

export default Nav;
