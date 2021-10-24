const GROUP_CONFIG = {
	school: {
		userTypes: [
			{ title: "Students", name: "students", icon: "backpack" },
			{ title: "Teachers", name: "teachers", icon: "school" },
			{ title: "Admins", name: "admin", icon: "verified_user" },
		],
	},
	family: {
		userTypes: [{ title: "", name: "", icon: "" }],
	},
};

export default GROUP_CONFIG;

export const COLUMNS = [
	{ label: "First Name", name: "firstName" },
	{ label: "Last Name", name: "lastName" },
	{ label: "Email", name: "email" },
];

export const SIZES = [10, 20, 50, 100];
