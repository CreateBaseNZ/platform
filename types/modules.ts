/** PDF module. */
export type TPdfModule = {
	/** Unique type. */
	type: "pdf";
	/** Module title. */
	title: string;
	/** PDF file path (URL or relative). */
	url: string;
};

/** Tutorial module. */
export type TTutorialModule = {
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
export type TVideoModule = {
	/** Video module identifier. */
	type: "video";
	/** Module title. */
	title: string;
	/** YouTube video ID. */
	videoId: string;
	/** Brief description. */
	description: string;
};

/** List of module data objects. */
export type ModuleList = (TPdfModule | TTutorialModule | TVideoModule)[];
