import Link from "next/link";
import { ColourLogo } from "../../UI/Icons";
import DEFAULT_TABS, { MAIN_TABS } from "../../../constants/mainTabs";
import classes from "./Nav.module.scss";

const Nav = ({ page, userSession }) => {
	const tabs = MAIN_TABS[userSession?.view?.groupType][userSession?.view?.userType] || [];
	const activeTab = [...tabs, { page: null }, ...DEFAULT_TABS].findIndex((t) => t.page === page);

	return (
		<nav className={classes.nav}>
			<ColourLogo width="131.25" height="24" />
			{userSession.email && (
				<div className={classes.menu}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${activeTab} * 4.5rem)`,
						}}
					/>
					{tabs.map((l, i) => (
						<Link key={i} href={l.urlObject}>
							<button className={`${classes.tab} ${activeTab === i ? classes.active : ""}`}>
								<i className="material-icons-outlined">{l.icon}</i>
								{l.label}
							</button>
						</Link>
					))}
					<div className={classes.divider} />
					{DEFAULT_TABS.map((l, i) => (
						<Link key={i} href={l.urlObject}>
							<button className={`${classes.tab} ${activeTab === i + tabs.length + 1 ? classes.active : ""}`}>
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
