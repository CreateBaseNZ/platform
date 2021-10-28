import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import UserSessionContext from "../../../store/user-session";

import classes from "./InnerLayout.module.scss";

const InnerLayout = ({ tabs, children, showBack = true }) => {
	const { userSession } = useContext(UserSessionContext);
	const router = useRouter();

	console.log(router);

	return (
		<div className={classes.layout}>
			<div className={classes.sidebar}>
				{showBack && (
					<Link href={{ query: { tab: "" } }}>
						<a className={classes.back}>
							<i className="material-icons-outlined">chevron_left</i>
							Back
						</a>
					</Link>
				)}
				{tabs[userSession.recentGroups[0]?.role]?.map((tab) => (
					<Link key={tab.title} href={{ pathname: tab.pathname, query: router.query }}>
						<div className={`${classes.tab} ${router.pathname === tab.pathname ? classes.active : ""}`}>
							<i className="material-icons-outlined">{tab.icon}</i>
							<div className={classes.label}>{tab.title}</div>
						</div>
					</Link>
				))}
			</div>
			<div className={classes.viewport}>{children}</div>
		</div>
	);
};

export default InnerLayout;
