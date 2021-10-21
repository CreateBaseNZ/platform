import Link from "next/link";
import { ColourLogo } from "../../UI/Icons";
import viewTabs, { SCHOOL_ADMIN_TABS, SCHOOL_STUDENT_TABS } from "../../../constants/viewTabs";
import classes from "./Nav.module.scss";

const getTabs = (userSession) => {
	if (userSession.email) {
		const groupType = userSession.view.groupType;
		if (groupType === "school") {
			switch (userSession.view.userType) {
				case "admin":
					return SCHOOL_ADMIN_TABS;
				case "teacher":
					return SCHOOL_STUDENT_TABS;
				case "student":
					return SCHOOL_STUDENT_TABS;
				default:
					return [];
			}
		} else if (groupType === "family") {
			// TODO family tabs
			return [];
		}
	} else {
		return [];
	}
};

// TODO refactor routes to be cleaner
const Nav = ({ page, userSession }) => {
	console.log(page);
	const tabs = getTabs(userSession);
	const activeTab = tabs.findIndex((t) => page === t.page);

	console.log(activeTab);

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
				</div>
			)}
		</nav>
	);
};

export default Nav;
