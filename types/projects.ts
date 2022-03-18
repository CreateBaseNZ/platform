import { DeepReadonly } from "ts-essentials";
import { ModuleList } from "./modules";
import { BlockList } from "./flow";

/** Project difficulty levels. */
export type ProjectDifficulty = "introductory" | "proficient" | "advanced";

/** Project subject type. */
export interface IProjectSubject {
	/** Subject colour rendered with tags. */
	color: string;
	/** Subject label. */
	label: string;
}

/** Basic video data object (typically shown as a GIF). */
export interface IBasicVidData {
	/** Video file. */
	src: string;
	/** A short description. */
	subtitle: JSX.Element;
}

/** Full video data object (usually with controls). */
export interface IFullVidData {
	/** YouTube link. */
	url: string;
	/** Video file. */
	src: string;
	/** Title. */
	h1: string;
	/** Subtitle. */
	h2: string;
}

/** Subsystem data object. */
export interface ISubsystem {
	/** Subsystem title. */
	title: string;
	/** List of prerequisites; each item should correspond to the title of another subsystem in the same project. */
	requirements: string[];
	/** Subsystem thumbnail source. */
	imgSrc: string;
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
		/** List of tasks to complete in Plan step. */
		list: string[];
	};
	/** Code step data. */
	code: {
		/** Minimum recommended time spent on Code step. */
		threshold: number;
		/** List of tasks to complete in Code step. */
		tasks: string[];
		/** List of hints. */
		hints: string[];
	};
	/** List of blocks available for coding in this subsystem. */
	blockList: BlockList;
}

/** Project data object. */
export interface IProject {
	/** Project name. */
	name: string;
	/** Optional if currently working on project simulation*/
	wip?: boolean;
	/** Unique project query ID. */
	query: string;
	/** One paragraph description of the project. */
	caption: string;
	/** How the simulation and Flow coding windows are displayed. Currently does nothing.
	 * @todo remove this prop or support shelved view.
	 */
	stacked: boolean;
	spotlight?: string;
	/** Link to Project text code documentation. */
	documentation?: string;
	/** If `true`, Flow will not be available. */
	textCodingOnly?: boolean;
	/** Unique prefix for Unity scene rendering. */
	scenePrefix: string;
	/** How the code is run under-the-hood.
	 * - `loop` - the code is continuously evaluated until terminated.
	 * - `once` - the code runs once and is then terminated.
	 */
	runType: "loop" | "once";
	/** Estimated duration per lesson. */
	durPerLesson: string;
	/** Estimated number of lessons. */
	numOfLessons: number;
	/** Suggested project difficulty. */
	difficulty: ProjectDifficulty;
	/** List of subjects covered. */
	subjects: IProjectSubject[];
	/** Path to Learning Outcomes PDF file. */
	learningOutcome: string;
	/** Object containing paths to curriculum alignment documents for each supported region. */
	cads: Record<"nz" | "aus" | "cali" | "uk", string>;
	/** Path to Lesson Plan file. */
	lessonPlan: string;
	/** Bullet-pointed list of learning outcomes. */
	learnings: string[];
	/** Define step data. */
	define: {
		/** Minimum recommended time spent on Define step. */
		threshold: number;
		/** Learning journal Google Docs link. */
		docs: string;
		/** Learning journal Word document. */
		word: string;
	} & IFullVidData;
	/** Imagine step data. */
	imagine: {
		/** Minimum recommended time spent on Imagine step. */
		threshold: number;
		/** List of Imagine step modules. */
		modules: ModuleList;
	};
	/** Project subsystems. */
	subsystems: ISubsystem[];
	/** Improve step data. */
	improve: {
		/** Minimum recommended time spent on Improve step. */
		threshold: number;
		/** Short alert message. */
		alert: string;
		/** List of tasks to be completed. */
		tasks: string[];
		/** List of hints. */
		hints: string[];
		/** List of blocks available for Improve step coding. */
		blockList: BlockList;
	};
}

/** Project data object (read-only). */
export type IProjectReadOnly = DeepReadonly<IProject>;
