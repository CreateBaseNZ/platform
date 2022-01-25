import { DeepReadonly } from "ts-essentials";
import { ISubsystem } from "../types/projects";
import { ALL_PROJECTS_ARRAY } from "../constants/projects";

const generateSubsystem = (subsystems: DeepReadonly<ISubsystem[]>, fn: () => void) => {
	let ret: any = {}; // TODO replace any type
	for (let i = 0; i < subsystems.length; i++) {
		ret[subsystems[i].title] = { research: fn(), plan: fn(), code: fn(), name: subsystems[i].title };
	}
	return ret;
};

export const generateStudentData = (fn: () => void) => {
	let ret: any = {}; // TODO replace any type
	for (let i = 0; i < ALL_PROJECTS_ARRAY.length; i++) {
		ret[ALL_PROJECTS_ARRAY[i].id] = {
			define: fn(),
			imagine: fn(),
			create: generateSubsystem(ALL_PROJECTS_ARRAY[i].subsystems, fn),
			improve: fn(),
		};
	}
	return ret;
};

export const generateRandomProgress = () => {
	const strings = ["completed", "visited", "not visited"];
	const label = ["Visted for ≥60 seconds", "Visited for <60 seconds", "Not visited"];
	const randomIndex = Math.floor(Math.random() * strings.length);
	let duration;
	if (randomIndex === 0) {
		duration = Math.random() * 600 + 60;
	} else if (randomIndex === 1) {
		duration = Math.random() * 600 + 60;
	} else {
		duration = Math.random() * 60;
	}
	return { duration: duration, status: strings[randomIndex], label: label[randomIndex] };
};
