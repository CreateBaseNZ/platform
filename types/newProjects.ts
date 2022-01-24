import { DeepReadonly } from "ts-essentials";
import { ModuleList } from "./modules";

// TODO - re-evaluate whether all props are necessary

/** Project difficulty levels. */
export type ProjectDifficulty = "introductory" | "proficient" | "advanced";

/** Project subject type. */
export interface IProjectSubject {
	/** Subject colour rendered with tags. */
	color: string;
	/** Subject label. */
	label: string;
}

/** Subsystem data object. */
export interface ISubsystem {
	/** Subsystem title. */
	title: string;
	/** List of prerequisites; each item should correspond to the title of another subsystem in the same project. */
	requirements: string[];
	/** Subsystem thumbnail source. */
	img: string;
	/** Brief description of the subsystem. */
	description: string;
	/** Research step data. */
	research: {
		/** Minimum recommended time spent on Research step. */
		threshold: number;
		/** List of captions, where each item is displayed as a paragraph. */
		caption: string[];
		/** Research modules. */
		modules: ModuleList;
	};
	/** Plan step data. */
	plan: {
		/** Minimum recommended time spent on Plan step. */
		threshold: number;
	};
	/** Code step data. */
	code: {
		/** Minimum recommended time spent on Code step. */
		threshold: number;
	};
}

/** Project data object. */
export interface IProject {
	/** Unique project query ID. */
	id: string;
	/** Project title. */
	title: string;
	/** Project subtitle. */
	subtitle: string;
	/** One paragraph description of the project. */
	description: string;
	/** Unique prefix for Unity scene rendering. */
	scenePrefix: string;
	// /** How the code is run under-the-hood.
	//  * - `loop` - the code is continuously evaluated until terminated.
	//  * - `once` - the code runs once and is then terminated.
	//  */
	// runType: "loop" | "once";
	/** Estimated duration per lesson. */
	durPerLesson: string;
	/** Estimated number of lessons. */
	numOfLessons: number;
	/** Suggested project difficulty. */
	difficulty: ProjectDifficulty;
	/** List of subjects covered. */
	subjects: IProjectSubject[];
	/** Path to Lesson Plan file. */
	lessonPlan: string;
	/** Bullet-pointed list of learning outcomes. */
	learningOutcomes: string[];
	/** Embedded YouTube link. */
	situationVideo: string;
	/** Define step data. */
	define: {
		/** Minimum recommended time spent on Define step. */
		threshold: number;
		/** Text content written in Markdown. */
		md: string;
	};
	/** Imagine step data. */
	// imagine: {
	// 	/** Minimum recommended time spent on Imagine step. */
	// 	threshold: number;
	// 	/** List of Imagine step modules. */
	// 	modules: ModuleList;
	// };
	// /** Project subsystems. */
	// subsystems: ISubsystem[];
	// /** Improve step data. */
	// improve: {
	// 	/** Minimum recommended time spent on Improve step. */
	// 	threshold: number;
	// 	/** Short alert message. */
	// 	alert: string;
	// 	/** List of tasks to be completed. */
	// 	tasks: string[];
	// 	/** List of hints. */
	// 	hints: string[];
	// 	/** List of blocks available for Improve step coding. */
	// 	blockList: BlockList;
	// };
}

/** Project data object (read-only). */
export type IProjectReadOnly = DeepReadonly<IProject>;
