// TODO - @louis check what's going on here
import { IFullVidData } from "./projects";

/** PDF module. */
export type IPdfModule = {
	/** Unique type. */
	type: "pdf";
	/** Module title. */
	title: string;
	/** PDF file path (URL or relative). */
	url: string;
};

/** Tutorial module. */
export type ITutorialModule = {
	/** Tutorial module identifier. */
	type: "tutorial";
	/** Module title. */
	title: string;
	/** Array of GIF's. */
	items: {
		/** URL to GIF file. */
		src: string;
		/** One sentence description. */
		caption: string;
	}[];
};

/** Video module. */
export type VidModule = {
	/** Video module identifier. */
	type: "video";
	/** Module title. */
	title: string;
	/** Full video data (displayed in full). */
	data: IFullVidData;
};

/** List of module data objects. */
export type ModuleList = (IPdfModule | ITutorialModule | VidModule)[];
