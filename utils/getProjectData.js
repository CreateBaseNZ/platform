import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import lineFollowingData from "../data/line-following-data";

export default getProjectData = (query) => {
	switch (query) {
		case "send-it":
			return sendItData;
	}
};

export const allData = [sendItData];
