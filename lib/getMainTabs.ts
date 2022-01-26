import { PROJECTS, MY_GROUPS, INBOX, ACCOUNT, CLASSES, HQ } from "../constants/mainTabs";
import { GroupAndUserObject } from "../types/groups";

const getMainTabs = (group: GroupAndUserObject) => [
	[PROJECTS, ...(group?.role === "admin" || "teacher" ? [CLASSES, HQ] : [])],
	[MY_GROUPS, INBOX, ACCOUNT],
];

export default getMainTabs;
