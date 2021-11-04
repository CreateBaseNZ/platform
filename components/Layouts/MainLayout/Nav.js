import { useContext } from "react";
import Link from "next/link";
import GlobalSessionContext from "../../../store/global-session-context";
import { ColourLogo } from "../../UI/Icons";
import DEFAULT_TABS, { MAIN_TABS } from "../../../constants/mainTabs";

import classes from "./Nav.module.scss";

const Nav = ({ page }) => {
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(globalSession);

	const defaultTabs = globalSession.recentGroups.length
		? [...MAIN_TABS[globalSession.groups[globalSession.recentGroups[0]].type]?.[globalSession.groups[globalSession.recentGroups[0]].role], { page: null }]
		: [];

	const activeTab = [...defaultTabs, ...DEFAULT_TABS].findIndex((t) => t.page === page);

	return (
		<nav className={classes.nav}>
			<ColourLogo width="131.25" height="24" />
			{globalSession.accountId && (
				<div className={classes.menu}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${activeTab} * 4.5rem)`,
						}}
					/>
					{defaultTabs.map((l, i) =>
						l.page ? (
							<Link key={i} href={l.urlObject}>
								<button className={`${classes.tab} ${activeTab === i ? classes.active : ""}`}>
									<i className="material-icons-outlined">{l.icon}</i>
									{l.label}
								</button>
							</Link>
						) : (
							<div key={i} className={classes.divider} />
						)
					)}
					{DEFAULT_TABS.map((l, i) => (
						<Link key={i} href={l.urlObject}>
							<button className={`${classes.tab} ${activeTab === i + defaultTabs.length ? classes.active : ""}`}>
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
