import { UrlObject } from "url";

export interface ITab {
	/** URL to navigate to */
	urlObject: UrlObject;
	/** Page ID */
	page: string;
	/** Formatted page name */
	label: string;
	/** Page icon */
	icon: string;
}

export const BROWSE: ITab = { urlObject: { pathname: "/browse" }, page: "browse", label: "Browse", icon: "view_carousel" };

const CLASSES: ITab = { urlObject: { pathname: "/classes" }, page: "classes", label: "Classes", icon: "chair_alt" };
const MANAGE_GROUP: ITab = { urlObject: { pathname: "/manage-group" }, page: "manage-group", label: "Manage Group", icon: "admin_panel_settings" };

const MY_GROUPS: ITab = { urlObject: { pathname: "/my-groups" }, page: "my-groups", label: "My Groups", icon: "groups" };
const ONBOARDING: ITab = { urlObject: { pathname: "/onboarding" }, page: "onboarding", label: "Onboarding", icon: "skateboarding" };
const MY_ACCOUNT: ITab = { urlObject: { pathname: "/my-account" }, page: "my-account", label: "My Account", icon: "person" };
const SUPPORT: ITab = { urlObject: { pathname: "/support" }, page: "support", label: "Support", icon: "support" };
const INBOX: ITab = { urlObject: { pathname: "/inbox" }, page: "inbox", label: "Inbox", icon: "inbox" };

const DEFAULT_TABS = [ONBOARDING, MY_GROUPS, INBOX, MY_ACCOUNT, SUPPORT];
export default DEFAULT_TABS;

export const MAIN_TABS = {
	school: {
		admin: [CLASSES, MANAGE_GROUP],
		teacher: [CLASSES, MANAGE_GROUP],
		student: [CLASSES],
	},
	family: {
		admin: [],
		member: [],
	},
};
