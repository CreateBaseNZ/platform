import { DeepReadonly } from "ts-essentials";
import { SubjectInterface } from "../constants/projectSubjects";
import { ProjectDifficulty } from "../constants/projectDifficulties";
import { ModuleList } from "./modules";

// TODO - array of possible strings, and update blocks
export type BlockList = Array<{ name: string; blocks: JSX.Element[] }>;

export interface ISubsystem {
	title: string;
	requirements: string[];
	imgSrc: string;
	description: string;
	research: {
		threshold: number;
		caption: string[];
		modules: ModuleList;
	};
	plan: {
		threshold: number;
		list: string[];
	};
	code: {
		threshold: number;
		tasks: string[];
		hints: string[];
	};
	blockList: BlockList;
}

export interface IProject {
	name: string;
	query: string;
	caption: string;
	stacked: boolean;
	noFlow?: boolean;
	scenePrefix: string;
	runType: string;
	durPerLesson: string;
	numOfLessons: number;
	difficulty: ProjectDifficulty;
	subjects: SubjectInterface[];
	learningOutcome: string;
	cads: Record<"nz" | "aus" | "cali" | "uk", string>;
	lessonPlan: string;
	learnings: string[];
	define: {
		threshold: number;
		url: string;
		src: string;
		h1: string;
		h2: string;
		title: string;
		docs: string;
		word: string;
	};
	imagine: {
		threshold: number;
		caption: string[];
		modules: ModuleList;
	};
	subsystems: ISubsystem[];
	improve: {
		threshold: number;
		alert: string;
		tasks: string[];
		hints: string[];
		blockList: BlockList;
	};
}

export type IProjectReadOnly = DeepReadonly<IProject>;

export type Role = "admin" | "teacher" | "student";

export interface GroupAndUserObject {
	alias: string;
	id: string;
	licenseId: string;
	name: string;
	numOfUsers: { admins: number; students: number; teachers: number };
	role: Role;
	status: "activated" | "requested" | "invited" | "deactivated";
	type: "school";
	verified: boolean;
}
