const allTabs = {
	onboarding: { route: "/onboarding", query: "onboarding", label: "Onboarding", view: "onboarding", icon: "skateboarding" },
	browse: { route: "/browse", query: "browse", label: "Browse", view: "browse", icon: "camera_roll" },
	myAccount: { route: "/user/my-account", query: "my-account", label: "My Account", view: "user", icon: "person" },
	adminConsole: { route: "/user/admin-console", query: "admin-console", label: "Admin Console", view: "user", icon: "admin_panel_settings" },
	faq: { route: "/faq", query: "faq", view: "faq", label: "FAQ", icon: "help_outline" },
};

export default {
	null: [allTabs.browse, allTabs.faq],
	learner: [allTabs.browse, allTabs.myAccount, allTabs.faq],
	educator: [allTabs.onboarding, allTabs.browse, allTabs.myAccount, allTabs.faq],
	admin: [allTabs.onboarding, allTabs.browse, allTabs.adminConsole, allTabs.myAccount, allTabs.faq],
};
