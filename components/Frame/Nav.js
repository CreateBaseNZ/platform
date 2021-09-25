import Link from "next/link";
import { ColourLogo } from "../UI/Icons";

import viewTabs from "../../utils/viewTabs";

import classes from "./Nav.module.scss";

const Nav = ({ route, collapseNav, user }) => {
	if (user.loaded) {
		const match = viewTabs[user.type].find((t) => route.startsWith(t.route));
		if (match) {
			route = match.route;
		}
	}

	return (
		<nav className={`${classes.nav} ${collapseNav ? classes.collapse : ""}`}>
			<ColourLogo width="131.25" height="24" />
			{user.loaded && (
				<div className={classes.menu}>
					<div
						className={classes.slider}
						style={{
							top: `calc(${viewTabs[user.type].map((l) => l.route).indexOf(route)} * 4.5rem)`,
						}}
					/>
					{viewTabs[user.type].map((l, i) => (
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
