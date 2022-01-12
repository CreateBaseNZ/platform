import { UrlObject } from "url";

/** Inner layout tab parameters. */
export interface IInnerLayoutTab {
	/** Formatted tab name. */
	title: string;
	/** Unique tab name. */
	name: string;
	/** Tab icon. */
	icon: string;
	/** URL path to navigate to. */
	pathname: string;
	/** Whether the tab is WIP. */
	todo?: boolean;
}

/** Inner layout tab object for all roles. */
export interface IInnerLayoutTabObject {
	admin: IInnerLayoutTab[];
	teacher: IInnerLayoutTab[];
	student: IInnerLayoutTab[];
}

/** Main layout tab parameters. */
export interface IMainLayoutTab {
	/** URL to navigate to. */
	urlObject: UrlObject;
	/** Page ID. */
	page: string;
	/** Formatted page name. */
	label: string;
	/** Page icon. */
	icon: string;
}
