import { IMainLayoutTab } from "../types/layouts";

export const BROWSE: IMainLayoutTab = { urlObject: { pathname: "/browse" }, page: "browse", label: "Browse", icon: "view_carousel" };

export const CLASSES: IMainLayoutTab = { urlObject: { pathname: "/classes" }, page: "classes", label: "Classes", icon: "chair_alt" };
// TODO - change to HQ
export const HQ: IMainLayoutTab = { urlObject: { pathname: "/manage-group" }, page: "manage-group", label: "Manage Group", icon: "admin_panel_settings" };

export const MY_GROUPS: IMainLayoutTab = { urlObject: { pathname: "/my-groups" }, page: "my-groups", label: "My Groups", icon: "groups" };
const ONBOARDING: IMainLayoutTab = { urlObject: { pathname: "/onboarding" }, page: "onboarding", label: "Onboarding", icon: "skateboarding" };
export const ACCOUNT: IMainLayoutTab = { urlObject: { pathname: "/my-account" }, page: "my-account", label: "My Account", icon: "person" };
const SUPPORT: IMainLayoutTab = { urlObject: { pathname: "/support" }, page: "support", label: "Support", icon: "support" };
export const INBOX: IMainLayoutTab = { urlObject: { pathname: "/inbox" }, page: "inbox", label: "Inbox", icon: "inbox" };

const DEFAULT_TABS = [ONBOARDING, MY_GROUPS, INBOX, ACCOUNT, SUPPORT];
export default DEFAULT_TABS;

export const MAIN_TABS = {
	school: {
		admin: [CLASSES, HQ],
		teacher: [CLASSES, HQ],
		student: [],
	},
	family: {
		admin: [],
		member: [],
	},
};

// TODO - change browse to projects and phase out browse
export const PROJECTS: IMainLayoutTab = { urlObject: { pathname: "/browse" }, page: "browse", label: "Projects", icon: "grid_view" };

// TODO - replace
export const NEW_DEFAULT_TABS = [MY_GROUPS, INBOX, ACCOUNT];
