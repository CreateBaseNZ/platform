import { IBasicVidData, IFullVidData } from "../components/Project/VideoViewer";
import { IExplore } from "./explore";

/** PDF module. */
export type PDFModule = {
	/** Unique type. */
	type: "pdf";
	/** Module title. */
	title: string;
	/** PDF file path (URL or relative). */
	url: string;
	/** Optional module thumbail source. */
	img?: string;
};

/** Tutorial module. */
export type TutModule = {
	/** Tutorial module identifier. */
	type: "tut";
	/** Module title. */
	title: string;
	/** Array of tutorial video data (with simple display, similar to GIF's). */
	items: IBasicVidData[];
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
