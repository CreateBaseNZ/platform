import { DeepReadonly } from "ts-essentials";
import { SubjectInterface } from "../constants/projectSubjects";
import { ExploreInterface } from "../data/explore-data";

type Module =
	| {
			type: "pdf";
			title: string;
			img: string;
			url: string;
	  }
	| {
			type: "tut";
			title: string;
			items: Array<{ src: string; subtitle: JSX.Element }>;
	  }
	| {
			type: "video";
			title: string;
			data: {
				url: string;
				src: string;
				h1: string;
				h2: string;
				title: string; // TODO - is this a duplicate of h1??
			};
	  }
	| {
			type: "explore";
			title: string;
			items: ExploreInterface[];
	  };

// TODO - array of possible strings, and update blocks
type BlockList = Array<{ name: string; blocks: JSX.Element[] }>;

interface SubsystemInterface {
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
		caption: string; // TODO can possibly hard code
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
	scenePrefix: string;
	runType: string;
	durPerLesson: string;
	numOfLessons: number;
	difficulty: "introductory" | "proficient" | "advanced";
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
	subsystems: SubsystemInterface[];
	improve: {
		threshold: number;
		caption: string;
		alert: string;
		tasks: string[];
		hints: string[];
		code: boolean; // TODO - check if this is still being used
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
