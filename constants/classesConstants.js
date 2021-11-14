const tabs = [
	{ title: "Announcements", name: "announcements", icon: "campaign", pathname: "/classes/[id]/announcements" },
	{ title: "Assignments", name: "assignments", icon: "assignment", pathname: "/classes/[id]/assignments" },
	{ title: "Progress", name: "progress", icon: "table_chart", pathname: "/classes/[id]/progress" },
	{ title: "Reporting", name: "reporting", icon: "pending_actions", pathname: "/classes/[id]/reporting" },
	{ title: "Engagement", name: "engagement", icon: "stacked_bar_chart", pathname: "/classes/[id]/engagement" },
	{ title: "Manage Members", name: "manage", icon: "manage_accounts", pathname: "/classes/[id]/manage-members" },
	{ title: "Settings", name: "settings", icon: "tune", pathname: "/classes/[id]/settings" },
];

const CLASSES_TABS = {
	admin: tabs,
	teacher: tabs,
};

export default CLASSES_TABS;

export const MANAGE_MEMBERS_COLUMNS = [
	{ Header: "First Name", accessor: "firstName", style: { width: "25%", cursor: "pointer" } },
	{ Header: "Last Name", accessor: "lastName", style: { width: "25%", cursor: "pointer" } },
	{ Header: "Email", accessor: "email", style: { cursor: "pointer" } },
];

export const MANAGE_MEMBERS_SIZES = [10, 20, 50, 100];

export const PROGRESS_VIEW_OPTIONS = [
	{ id: "project", name: "Project" },
	{ id: "student", name: "Student" },
];
