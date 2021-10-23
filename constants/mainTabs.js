const ONBOARDING = { urlObject: { pathname: "/onboarding" }, page: "onboarding", label: "Onboarding", icon: "skateboarding" };
const BROWSE = { urlObject: { pathname: "/browse" }, page: "browse", label: "Browse", icon: "view_carousel" };
const CLASSES = { urlObject: { pathname: "/classes" }, page: "classes", label: "Classes", icon: "chair_alt" };
const MANAGE_SCHOOL = { urlObject: { pathname: "/manage-school" }, page: "manage-school", label: "Manage School", icon: "admin_panel_settings" };

const MY_GROUPS = { urlObject: { pathname: "/my-groups" }, page: "my-groups", label: "My Groups", icon: "groups" };
const MY_ACCOUNT = { urlObject: { pathname: "/my-account" }, page: "my-account", label: "My Account", icon: "person" };
const SUPPORT = { urlObject: { pathname: "/support" }, page: "support", label: "Support", icon: "support" };

const DEFAULT_TABS = [MY_GROUPS, MY_ACCOUNT, SUPPORT];
export default DEFAULT_TABS;

export const MAIN_TABS = {
	school: {
		admin: [ONBOARDING, BROWSE, CLASSES, MANAGE_SCHOOL],
		teacher: [ONBOARDING, BROWSE, CLASSES],
		student: [BROWSE, CLASSES],
	},
	family: {
		admin: [],
		member: [],
	},
};

// TODO FAMILY_ADMIN_TABS, FAMILY_MEMBER_TABS
