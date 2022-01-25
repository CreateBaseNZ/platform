import { IFullVidData } from "./projects";
import { IExplore } from "./explore";

/** PDF module. */
export type PDFModule = {
	/** Unique type. */
	type: "pdf";
	/** Module title. */
	title: string;
	/** PDF file path (URL or relative). */
	url: string;
};

/** Tutorial module. */
export type TutModule = {
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

/** Explore module. */
export type ExploreModule = {
	/** Explore module identifier. */
	type: "explore";
	/** Module title. */
	title: string;
	/** Array of explore activities. */
	items: IExplore[];
};

/** List of module data objects. */
export type ModuleList = (PDFModule | TutModule | VidModule | ExploreModule)[];
