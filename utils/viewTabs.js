const allTabs = {
	onboarding: { route: "/onboarding", query: "onboarding", label: "Onboarding", view: "onboarding", icon: "skateboarding" },
	browse: { route: "/browse", query: "browse", label: "Browse", view: "browse", icon: "camera_roll" },
	myAccount: { route: "/user/my-account", query: "my-account", label: "My Account", view: "user", icon: "person" },
	manageUsers: { route: "/user/manage-users", query: "manage-users", label: "Manage Users", view: "user", icon: "admin_panel_settings" },
	support: { route: "/support", query: "support", view: "support", label: "Support", icon: "support" },
};

export default {
	null: [allTabs.browse, allTabs.support],
	learner: [allTabs.browse, allTabs.myAccount, allTabs.support],
	educator: [allTabs.onboarding, allTabs.browse, allTabs.manageUsers, allTabs.myAccount, allTabs.support],
	admin: [allTabs.onboarding, allTabs.browse, allTabs.manageUsers, allTabs.myAccount, allTabs.support],
};
