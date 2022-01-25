interface ProjectStep {
	title: string;
	icon: string;
	name: string;
}

const STEPS: ProjectStep[] = [
	{ title: "Define", icon: "biotech", name: "define" },
	{ title: "Imagine", icon: "filter_drama", name: "imagine" },
	{ title: "Create", icon: "auto_fix_high", name: "create" },
	{ title: "Improve", icon: "auto_graph", name: "improve" },
	{ title: "Review", icon: "checklist", name: "review" },
];

export default STEPS;

export const SUBSYSTEM_STEPS: ProjectStep[] = [
	{ title: "Research", icon: "travel_explore", name: "research" },
	{ title: "Plan", icon: "design_services", name: "plan" },
	{ title: "Code", icon: "smart_toy", name: "code" },
];

export const IMPROVE_STEPS: ProjectStep[] = [
	{ title: "Brief", icon: "assignment", name: "brief" },
	{ title: "Code", icon: "smart_toy", name: "code" },
];
