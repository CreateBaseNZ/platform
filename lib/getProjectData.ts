// TODO - replace the original (in utils)

// TODO - update when new replaces original
import SEND_IT_DATA from "../data/new-send-it-data";
import MAGNEBOT_DATA from "../data/magnebot-data";
import HEAT_SEEKER_DATA from "../data/heat-seeker-data";
import aimbotData from "../data/new-aimbot-data";
import hyperloopData from "../data/hyperloop-data";
import { IProjectReadOnly } from "../types/projects";
import HYPERLOOP_DATA from "../data/hyperloop-data";

// ----- How to Add Projects -----
//
// 1. import it above
// 2. add a case clause
// 3. assign the route as a string (app.createbase.co.nz/project/...)
// 4. add it to the ALL_PROJECTS_ARRAY array

const getProjectData = (query: string) => {
	switch (query) {
		case "send-it":
			return SEND_IT_DATA;
		case "magnebot":
			return MAGNEBOT_DATA;
		case "heat-seeker":
			return HEAT_SEEKER_DATA;
		case "aimbot":
			return aimbotData;
		case "hyperloop":
			return hyperloopData;
		default:
			return undefined;
	}
};

export default getProjectData;

export const ALL_PROJECTS_ARRAY: IProjectReadOnly[] = [SEND_IT_DATA, MAGNEBOT_DATA, HEAT_SEEKER_DATA, HYPERLOOP_DATA];
