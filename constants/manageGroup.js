const GROUP_CONFIG = {
	school: {
		roles: [
			{ title: "Students", name: "students", icon: "backpack" },
			{ title: "Teachers", name: "teachers", icon: "school" },
			{ title: "Admins", name: "admin", icon: "verified_user" },
		],
	},
	family: {
		roles: [{ title: "", name: "", icon: "" }],
	},
};

export default GROUP_CONFIG;

export const SCHOOL_TABS = {
	admin: [
		{ title: "Students", name: "students", icon: "backpack", pathname: "/manage-group/students" },
		{ title: "Teachers", name: "teachers", icon: "school", pathname: "/manage-group/teachers" },
		{ title: "Admins", name: "admin", icon: "verified_user", pathname: "/manage-group/admins" },
	],
	teacher: [{ title: "Students", name: "students", icon: "backpack", pathname: "/manage-group/students" }],
};

export const COLUMNS = [
	{ Header: "First Name", accessor: "firstName", style: { width: "20%", cursor: "pointer" } },
	{ Header: "Last Name", accessor: "lastName", style: { width: "20%", cursor: "pointer" } },
	{ Header: "Email", accessor: "email", style: { cursor: "pointer" } },
	{ Header: "Status", accessor: "status", style: { width: "15%", cursor: "pointer" } },
];

export const SIZES = [10, 20, 50, 100];
