import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import GlobalSessionContext from "../../../store/global-session-context";
import { IInnerLayoutTabObject } from "../../../types/innerLayout";

import classes from "./InnerLayout.module.scss";

export interface InnerLayoutProps {
	tabs: IInnerLayoutTabObject;
	children: ReactNode;
	backHref?: string;
}

const InnerLayout = ({ tabs, children, backHref }: InnerLayoutProps): JSX.Element => {
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
					<div key={tab.title} className={`${classes.tab} ${router.pathname === tab.pathname ? classes.active : ""}`}>
						<Link href={{ pathname: tab.pathname, query: router.query }} passHref>
							<i className="material-icons-outlined" style={{ opacity: tab.todo ? 0.25 : 1 }}>
								{tab.icon}
							</i>
						</Link>
						<div className={classes.label}>{tab.title}</div>
					</div>
				))}
			</div>
			<div className={classes.viewport}>{children}</div>
		</div>
	);
};

export default InnerLayout;
