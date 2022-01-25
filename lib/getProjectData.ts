// TODO - replace the original

import sendItData from "../data/new-send-it-data";
import magnebotData from "../data/new-magnebot-data";
import heatSeekerData from "../data/new-heat-seeker-data";
import aimbotData from "../data/new-aimbot-data";
import hyperloopData from "../data/new-hyperloop-data";
import { IProjectReadOnly } from "../types/newProjects";

// ----- How to Add Projects -----
//
// 1. import it above
// 2. add a case clause
// 3. assign the route as a string (app.createbase.co.nz/project/...)
// 4. add it to the ALL_PROJECTS_ARRAY array

const getProjectData = (query: string) => {
	switch (query) {
		case "send-it":
			return sendItData;
		case "magnebot":
			return magnebotData;
		case "heat-seeker":
			return heatSeekerData;
		case "aimbot":
			return aimbotData;
		case "hyperloop":
			return hyperloopData;
		default:
			return undefined;
	}
};

export default getProjectData;

export const ALL_PROJECTS_ARRAY: IProjectReadOnly[] = [magnebotData, heatSeekerData];
