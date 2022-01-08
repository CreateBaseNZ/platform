export interface IInnerLayoutTab {
	/** Formatted tab name */
	title: string;
	/** Unique tab name */
	name: string;
	/** Tab icon */
	icon: string;
	/** URL path to navigate to */
	pathname: string;
	/** If tab is WIP */
	todo?: boolean;
}

export interface IInnerLayoutTabObject {
	admin: IInnerLayoutTab[];
	teacher: IInnerLayoutTab[];
	student: IInnerLayoutTab[];
}
