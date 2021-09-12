import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import lineFollowingData from "../data/line-following-data";

// ----- How to Add Projects -----
//
// 1. import it above
// 2. add a case clause
// 3. assign the route as a string (app.createbase.co.nz/project/...)
// 4. add it to the allData array

const getProjectData = (query) => {
	switch (query) {
		case "send-it":
			return sendItData;
		case "magnebot":
			return magnebotData;
		case "line-following":
			return lineFollowingData;
		default:
			return null;
	}
};

export default getProjectData;

export const allData = [sendItData, magnebotData, lineFollowingData];
