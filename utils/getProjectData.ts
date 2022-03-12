import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import magnebot2Data from "../data/magnebot2-data";
import heatSeekerData from "../data/heat-seeker-data";
import aimbotData from "../data/aimbot-data";
import hyperloopData from "../data/hyperloop-data";
import flowTrainingCampData from "../data/flow-training-camp-data";
import { IProjectReadOnly } from "../types/projects";

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
		case "magnebot2":
			return magnebot2Data;
		case "heat-seeker":
			return heatSeekerData;
		case "aimbot":
			return aimbotData;
		case "hyperloop":
			return hyperloopData;
		case "flow-training-camp":
				return flowTrainingCampData;
		default:
			return null;
	}
};

export default getProjectData;

export const ALL_PROJECTS_ARRAY: IProjectReadOnly[] = [magnebotData, magnebot2Data, sendItData, heatSeekerData, aimbotData, hyperloopData, flowTrainingCampData];
