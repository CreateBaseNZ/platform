/** Explore activity data object. */
export interface IExplore {
	/** Title. */
	readonly title: string;
	/** One-sentence description of activity. */
	readonly caption: string;
	/** Thumbnail source. */
	readonly img: string;
	/** URL to access activity. */
	readonly url: string;
	/** Primary colour. */
	readonly col1: string;
	/** Secondary colour. */
	readonly col2: string;
}
