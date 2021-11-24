import general from "./headers/general";
import magnebot from "./headers/magnebot";
import sendIt from "./headers/sendIt";
import heatSeeker from "./headers/heatSeeker";
import aimBot from "./headers/aimBot";
import hyperloop from "./headers/hyperloop";

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
		case "aimbot":
			return aimBot();
		case "hyperloop":
				return hyperloop();
		default:
			return "";
	}
}
