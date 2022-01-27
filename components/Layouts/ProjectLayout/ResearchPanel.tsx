import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { TModule } from "../../../types/modules";
import { TProject } from "../../../types/projects";

import classes from "./ResearchPanel.module.scss";

const renderResearchModules = (modules: TModule[], router: NextRouter) => {
	if (modules.length === 0) return <a className={classes.noModules}>No modules</a>;

	return modules.map((module) => (
		<Link key={module.title} href={{ pathname: router.pathname, query: { ...router.query, module: module.title } }}>
			<a className={router.query.module === module.title ? classes.active : ""}>{module.title}</a>
		</Link>
	));
};

interface Props {
	data: TProject;
	subsystem: string;
}

const ResearchPanel = ({ data, subsystem }: Props): JSX.Element => {
	const router = useRouter();

	const modules = data.subsystems.find((s) => s.id === subsystem)?.research.modules || [];

	console.log(modules);

	return (
		<div className={`${classes.researchPanel} ${!router.query.module && modules.length > 0 ? classes.blink : ""}`}>
			<div className={classes.researchHeading}>Modules</div>
			{renderResearchModules(modules, router)}
		</div>
	);
};

export default ResearchPanel;
