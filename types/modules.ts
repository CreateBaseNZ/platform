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
export type IVideoModule = {
	/** Video module identifier. */
	type: "video";
	/** Module title. */
	title: string;
	/** Video data. */
	data: {
		/** YouTube video ID. */
		videoId: string;
		/** Main heading. */
		h1: string;
		/** Secondary heading. */
		h2: string;
	};
};

/** List of module data objects. */
export type ModuleList = (IPdfModule | ITutorialModule | IVideoModule)[];
