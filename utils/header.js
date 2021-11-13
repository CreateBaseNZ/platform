import general from "./headers/general";
import magnebot from "./headers/magnebot";
import sendIt from "./headers/sendIt";
import heatSeeker from "./headers/heatSeeker";

// MAIN =====================================================

export default function header(system) {
	switch (system) {
		case "general":
			return general();
		case "magnebot":
			return magnebot();
		case "send-it":
			return sendIt();
		case "heat-seeker":
			return heatSeeker();
		default:
			return "";
	}
}
