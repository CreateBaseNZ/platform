const allTabs = {
	onboarding: { route: "/onboarding", label: "Onboarding", icon: "skateboarding" },
	browse: { route: "/browse", label: "Browse", icon: "camera_roll" },
	myAccount: { route: "/user/my-account", label: "My Account", icon: "person" },
	adminConsole: { route: "/user/admin-console", label: "Admin Console", icon: "admin_panel_settings" },
	faq: { route: "/faq", label: "FAQ", icon: "help_outline" },
};

export default {
	null: [allTabs.browse, allTabs.faq],
	learner: [allTabs.browse, allTabs.faq, allTabs.myAccount],
	educator: [allTabs.onboarding, allTabs.browse, allTabs.myAccount, allTabs.faq],
	admin: [allTabs.onboarding, allTabs.browse, allTabs.adminConsole, allTabs.myAccount, allTabs.faq],
};
