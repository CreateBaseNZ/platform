import { DeepReadonly } from "ts-essentials";
import { SubjectInterface } from "../constants/projectSubjects";
import { ExploreInterface } from "../data/explore-data";
import { IBasicVidData, IFullVidData } from "../components/Project/VideoViewer";
import { ProjectDifficulty } from "../constants/projectDifficulties";

type Module =
	| {
			type: "pdf";
			title: string;
			url: string;
			img?: string;
	  }
	| {
			type: "tut";
			title: string;
			items: IBasicVidData[];
	  }
	| {
			type: "video";
			title: string;
			data: IFullVidData;
	  }
	| {
			type: "explore";
			title: string;
			items: ExploreInterface[];
	  };

// TODO - array of possible strings, and update blocks
type BlockList = Array<{ name: string; blocks: JSX.Element[] }>;

export interface ISubsystem {
	title: string;
	requirements: string[];
	imgSrc: string;
	description: string;
	research: {
		threshold: number;
		caption: string[];
		modules: Module[];
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

interface IProject {
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
		modules: Module[];
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
