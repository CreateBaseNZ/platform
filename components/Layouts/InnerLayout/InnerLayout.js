import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import GlobalSessionContext from "../../../store/global-session-context";

import classes from "./InnerLayout.module.scss";

const InnerLayout = ({ tabs, children, backHref }) => {
	const { globalSession } = useContext(GlobalSessionContext);
	const router = useRouter();

	return (
		<div className={classes.layout}>
			<div className={classes.sidebar}>
				{backHref && (
					<Link href={backHref}>
						<a className={classes.back}>
							<i className="material-icons-outlined">chevron_left</i>
							Back
						</a>
					</Link>
				)}
				{tabs[globalSession.groups[globalSession.recentGroups[0]].role]?.map((tab) => (
					<Link key={tab.title} href={{ pathname: tab.pathname, query: router.query }}>
						<div className={`${classes.tab} ${router.pathname === tab.pathname ? classes.active : ""}`}>
							<i className="material-icons-outlined" style={{ opacity: tab.todo && 0.25 }}>
								{tab.icon}
							</i>
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
