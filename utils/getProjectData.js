import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import lineFollowingData from "../data/line-following-data";

const getProjectData = (query) => {
	switch (query) {
		case "send-it":
			return sendItData;
		case "magnetbot":
			return magnebotData;
	}
};

export default getProjectData;

export const allData = [sendItData, magnebotData];
