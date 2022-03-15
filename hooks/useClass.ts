import router from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalSessionContext from "../store/global-session-context";
import useApi from "./useApi";
import { ALL_PROJECTS_ARRAY } from "../utils/getProjectData";
import useMixpanel from "./useMixpanel";
import { ISubsystem } from "../types/projects";
import { DeepReadonly } from "ts-essentials";

interface IFilter {
	event: string;
	properties: any;
}

interface IPostProcessDatum {
	event: string;
	properties: {
		project: string;
		licenses: string[];
		subsystem: string;
		start: number;
		duration: number;
	};
}

const getStatus = (duration: number, threshold: number, formattedThreshold: string, gameProgressEvent = "", isWin = false) => {
	let status = "";
	let primaryLabel = "Not visited";

	if (duration > threshold) {
		status = "completed";
		primaryLabel = `Time spent ≥${formattedThreshold}`;
	} else if (duration > 0) {
		status = "visited";
		primaryLabel = `Time spent <${formattedThreshold}`;
	}

	if (duration > 0 && gameProgressEvent) {
		if (isWin) {
			status = "completed";
			primaryLabel = "Task completed";
		} else {
			status = "visited";
			primaryLabel = "Task in progress";
		}
	}

	return { status, primaryLabel };
};

interface IClassUser {
	email: string;
	firstName: string;
	lastName: string;
	licenseId: string;
}

export interface IClassStudent extends IClassUser {
	profileId: string;
	role: "student";
	status: "joined" | "requested";
}

export interface IClassTeacher extends IClassUser {
	role: "teacher" | "admin";
	status: "joined";
	alias: string;
}

export interface IFullClassObject {
	announcements: any; // TODO type
	assignments: any; // TODO type
	id: string;
	name: string;
	students: IClassStudent[];
	teachers: IClassTeacher[];
}

const defaultClassObject = {
	announcements: {},
	assignments: {},
	id: "",
	name: "",
	students: [],
	teachers: [],
};

const useClass = () => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const [classObject, setClassObject] = useState<IFullClassObject>(defaultClassObject);
	const [classLoaded, setClassLoaded] = useState(false);
	const [lastSynced, setLastSynced] = useState<Date>();
	const mp = useMixpanel();

	useEffect(() => {
		(async () => {
			if (router.isReady) {
				await post(
					"/api/classes/fetch-one",
					{ profileId: globalSession.profileId, schoolId: globalSession.groups[globalSession.recentGroups[0]].id, classId: router.query.id },
					(data) => {
						setClassObject(data.content);
						setClassLoaded(true);
					},
					(data) => {
						if (data.content === "not found") router.replace("/404");
					}
				);
			}
		})();
	}, [router.isReady]);

	const fetchData = async (filters: IFilter[]) => {
		if (!classLoaded) return;
		let preprocessData;
		try {
			preprocessData = await mp.retrieve(filters);
		} catch (error) {
			// TODO: Error handling
		} finally {
			setLastSynced(new Date());
		}
		console.log(preprocessData);
		// console.log(JSON.parse(preprocessData));
		return preprocessData;
	};

	const fetchReportingData = async () => {
		const filters: IFilter[] = [
			"project_define",
			"project_imagine",
			"project_improve",
			"project_create_research",
			"project_create_plan",
			"code_create_time",
			"code_improve_time",
			"game_manual_progress",
			"game_create_progress",
			"game_improve_progress",
		].map((ev) => ({ event: ev, properties: [{ schools: globalSession.groups[globalSession.recentGroups[0]].id }] }));

		const postprocessData: IPostProcessDatum[] = await fetchData(filters);

		const processData = (event: string, project: string, license: string, subsystem?: string, type = "default") => {
			return postprocessData
				.filter((item) => item.event === event && item.properties.project === project && item.properties.licenses.includes(license) && (subsystem ? item.properties.subsystem === subsystem : true))
				.map((item) => ({ start: new Date(item.properties.start), duration: item.properties.duration, type: type }));
		};

		const processCreateData = (project: string, subsystems: DeepReadonly<ISubsystem[]>, license: string) => {
			return subsystems.map((subsystem) => ({
				name: subsystem.title,
				label: subsystem.title,
				bars: [
					...processData("project_create_research", project, license, subsystem.title, "research"),
					...processData("project_create_plan", project, license, subsystem.title, "plan"),
					...processData("code_create_time", project, license, subsystem.title, "create"),
				],
			}));
		};

		return classObject?.students.map((student) => {
			let projectData: Record<string, any> = {}; // TODO type
			for (let i = 0; i < ALL_PROJECTS_ARRAY.length; i++) {
				projectData[ALL_PROJECTS_ARRAY[i].query] = [
					{ label: "Define", name: "define", bars: processData("project_define", ALL_PROJECTS_ARRAY[i].query, student.licenseId) },
					{ label: "Imagine", name: "imagine", bars: processData("project_imagine", ALL_PROJECTS_ARRAY[i].query, student.licenseId) },
					...processCreateData(ALL_PROJECTS_ARRAY[i].query, ALL_PROJECTS_ARRAY[i].subsystems, student.licenseId),
					{ label: "Improve", name: "improve", bars: processData("code_improve_time", ALL_PROJECTS_ARRAY[i].query, student.licenseId) },
				];
			}
			return { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: projectData };
		});
	};

	const fetchProgressData = async () => {
		// const filters = [
		// 	"project_define",
		// 	"project_imagine",
		// 	"project_improve",
		// 	"project_create_research",
		// 	"project_create_plan",
		// 	"code_create_time",
		// 	"code_improve_time",
		// 	"game_manual_progress",
		// 	"game_create_progress",
		// 	"game_improve_progress",
		// ].map((ev) => ({ event: ev, properties: [{ schools: globalSession.groups[globalSession.recentGroups[0]].id }] }));

		const filters: any = {
			event: [
				"project_define",
				"project_imagine",
				"project_improve",
				"project_create_research",
				"project_create_plan",
				"code_create_time",
				"code_improve_time",
				"game_manual_progress",
				"game_create_progress",
				"game_improve_progress",
			],
			group: [globalSession.groups[globalSession.recentGroups[0]].id],
		};

		const postprocessData = await fetchData(filters);

		console.log(postprocessData);

		const processData = (event: string, project: string, license: string, threshold: number, subsystem?: string, gameProgressEvent?: string) => {
			let duration = 0;
			let isWin = false;
			// for (let k = 0; k < postprocessData.length; k++) {
			// 	if (
			// 		postprocessData[k].event === event &&
			// 		postprocessData[k].properties.project === project &&
			// 		postprocessData[k].properties.licenses.includes(license) &&
			// 		(subsystem ? postprocessData[k].properties.subsystem === subsystem : true)
			// 	) {
			// 		duration += postprocessData[k].properties.duration;
			// 	}
			// 	if (
			// 		gameProgressEvent &&
			// 		postprocessData[k].event === gameProgressEvent &&
			// 		postprocessData[k].properties.project === project &&
			// 		postprocessData[k].properties.licenses.includes(license) &&
			// 		(subsystem ? postprocessData[k].properties.subsystem === subsystem : true)
			// 	) {
			// 		isWin = postprocessData[k].properties.state === "win";
			// 	}
			// }
			for (let k = 0; k < postprocessData.length; k++) {
				if (
					postprocessData[k].event === event &&
					postprocessData[k].project === project &&
					postprocessData[k].licenses.includes(license) &&
					(subsystem ? postprocessData[k].subsystem === subsystem : true)
				) {
					duration += postprocessData[k].duration;
				}
				if (
					gameProgressEvent &&
					postprocessData[k].event === gameProgressEvent &&
					postprocessData[k].project === project &&
					postprocessData[k].licenses.includes(license) &&
					(subsystem ? postprocessData[k].subsystem === subsystem : true)
				) {
					isWin = postprocessData[k].state === "win";
				}
			}
			const formattedThreshold = `${Math.floor(threshold / 3600) ? `${Math.floor(threshold / 3600)}hr` : ""}${Math.floor((threshold % 3600) / 60) ? ` ${Math.floor((threshold % 3600) / 60)}min` : ""}${
				Math.floor(threshold % 60) ? ` ${Math.floor(threshold % 60)}s` : ""
			}`;
			const formattedDuration = `${Math.floor(duration / 3600) ? `${Math.floor(duration / 3600)}hr` : ""}${Math.floor((duration % 3600) / 60) ? ` ${Math.floor((duration % 3600) / 60)}min` : ""}${
				Math.floor(duration % 60) ? ` ${Math.floor(duration % 60)}s` : ""
			}`;

			const params = getStatus(duration, threshold, formattedThreshold, gameProgressEvent, isWin);

			return { ...params, formattedDuration };
		};

		const processCreateData = (project: string, subsystems: DeepReadonly<ISubsystem[]>, license: string) => {
			const createData: Record<string, any> = {}; // TODO
			for (let j = 0; j < subsystems.length; j++) {
				createData[subsystems[j].title] = {
					name: subsystems[j].title,
					research: processData("project_create_research", project, license, subsystems[j].research.threshold, subsystems[j].title),
					plan: processData("project_create_plan", project, license, subsystems[j].plan.threshold, subsystems[j].title),
					code: processData("code_create_time", project, license, subsystems[j].code.threshold, subsystems[j].title, "game_create_progress"),
				};
			}
			return createData;
		};

		const data = await Promise.all(
			classObject?.students.map(async (student) => {
				let learningJournals: any = {};
				const properties = ALL_PROJECTS_ARRAY.map((proj) => `${student.licenseId}__${proj.query}`);
				console.log(properties);
				await post(
					"/api/profile/read-saves",
					{
						profileId: student.profileId,
						properties: ALL_PROJECTS_ARRAY.map((proj) => `${student.licenseId}__${proj.query}`),
						date: new Date().toString(),
					},
					(data) => {
						console.log(data);
						learningJournals = data.content;
					}
				);

				const studentData: ProgressDatum = { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: {} };
				for (let i = 0; i < ALL_PROJECTS_ARRAY.length; i++) {
					studentData.projects[ALL_PROJECTS_ARRAY[i].query] = {
						define: processData("project_define", ALL_PROJECTS_ARRAY[i].query, student.licenseId, ALL_PROJECTS_ARRAY[i].define.threshold),
						imagine: processData("project_imagine", ALL_PROJECTS_ARRAY[i].query, student.licenseId, ALL_PROJECTS_ARRAY[i].imagine.threshold),
						create: processCreateData(ALL_PROJECTS_ARRAY[i].query, ALL_PROJECTS_ARRAY[i].subsystems, student.licenseId),
						improve: processData("code_improve_time", ALL_PROJECTS_ARRAY[i].query, student.licenseId, ALL_PROJECTS_ARRAY[i].improve.threshold, undefined, "game_improve_progress"),
						learningJournal: learningJournals[`${student.licenseId}__${ALL_PROJECTS_ARRAY[i].query}`] || "",
					};
				}
				return studentData;
			})
		);

		return data;
	};

	return { classObject, setClassObject, classLoaded, fetchProgressData, fetchReportingData, lastSynced };
};

export default useClass;

interface ProgressDatum {
	id: string;
	name: string;
	projects: any; // TODO
}
