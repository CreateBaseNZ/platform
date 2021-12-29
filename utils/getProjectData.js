import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import heatSeekerData from "../data/heat-seeker-data";
import aimbotData from "../data/aimbot-data";
import hyperloopData from "../data/hyperloop-data";

// ----- How to Add Projects -----
//
// 1. import it above
// 2. add a case clause
// 3. assign the route as a string (app.createbase.co.nz/project/...)
// 4. add it to the ALL_PROJECT_DATA array

const getProjectData = (query) => {
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
			return null;
	}
};

export default getProjectData;

export const ALL_PROJECT_DATA = [magnebotData, sendItData, heatSeekerData, aimbotData, hyperloopData];
