import AIMBOT_DATA from "../data/aimbot-data";
import HEAT_SEEKER_DATA from "../data/heat-seeker-data";
import HYPERLOOP_DATA from "../data/hyperloop-data";
import MAGNEBOT_DATA from "../data/magnebot-data";
import SEND_IT_DATA from "../data/send-it-data";
import { IProjectReadOnly } from "../types/projects";

export const ALL_PROJECTS_OBJECT: Record<string, IProjectReadOnly> = {
	"send-it": SEND_IT_DATA,
	magnebot: MAGNEBOT_DATA,
	"heat-seeker": HEAT_SEEKER_DATA,
	aimbot: AIMBOT_DATA,
	hyperloop: HYPERLOOP_DATA,
};

export const ALL_PROJECTS_ARRAY: IProjectReadOnly[] = [SEND_IT_DATA, MAGNEBOT_DATA, HEAT_SEEKER_DATA, HYPERLOOP_DATA, AIMBOT_DATA];
