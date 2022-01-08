export interface ICADRegion {
	/** Formatted region name */
	name: string;
	/** Unique region ID */
	id: string;
}

const CAD_REGIONS: ICADRegion[] = [
	{ name: "New Zealand", id: "nz" },
	{ name: "Australia", id: "aus" },
	{ name: "California (US)", id: "cali" },
	{ name: "England", id: "uk" },
];

export default CAD_REGIONS;
