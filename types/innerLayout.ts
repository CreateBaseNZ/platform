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
