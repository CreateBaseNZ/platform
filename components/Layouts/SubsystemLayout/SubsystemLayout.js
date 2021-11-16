import Link from "next/link";
import router from "next/router";
import { SUBSYSTEM_TABS } from "../../../constants/projectSteps";

import classes from "./SubsystemLayout.module.scss";

const SubsystemLayout = ({ children, activeTab }) => {
	return (
		<div className={classes.layout}>
			<header className={classes.head}>
				<Link href={{ pathname: "/project/[id]/create", query: { id: router.query.id } }}>
					<a className={classes.backBtn}>
						<i className="material-icons-outlined">navigate_before</i>
						Subsystems
					</a>
				</Link>
				{SUBSYSTEM_TABS.map((tab) => (
					<Link key={tab} href={{ pathname: `/project/[id]/create/[subsystem]/${tab}`, query: router.query }}>
						<a className={`${classes.tab} ${activeTab === tab ? classes.active : ""}`}>{tab}</a>
					</Link>
				))}
			</header>
			{children}
		</div>
	);
};

export default SubsystemLayout;
