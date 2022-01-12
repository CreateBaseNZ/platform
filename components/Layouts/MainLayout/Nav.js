import { useContext } from "react";
import Link from "next/link";
import GlobalSessionContext from "../../../store/global-session-context";
import { ColourLogo } from "../../UI/Icons";
import DEFAULT_TABS, { BROWSE, MAIN_TABS } from "../../../constants/mainTabs";

import classes from "./Nav.module.scss";

const NavTab = ({ tab, page }) => {
	const { globalSession } = useContext(GlobalSessionContext);

	return tab.page ? (
		<Link href={tab.urlObject} passHref>
			<button className={`${classes.tab} ${tab.page === page ? classes.active : ""}`}>
				<i className="material-icons-outlined">{tab.icon}</i>
				{tab.label}
				{tab.page === "inbox" && globalSession.numOfNotifications ? <div className={classes.inbox}>{globalSession.numOfNotifications}</div> : null}
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

	console.log(defaultTabs);

	const activeTab = [BROWSE, ...defaultTabs, ...DEFAULT_TABS].findIndex((t) => t.page === page);

	return (
		<nav className={classes.nav}>
			<ColourLogo width="131.25" height="24" className={classes.logo} />
			{globalSession.accountId && (
				<div className={`${classes.menu} roundScrollbar`}>
					<div className={classes.inner}>
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
				</div>
			)}
		</nav>
	);
};

export default Nav;
