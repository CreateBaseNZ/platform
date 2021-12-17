import router from "next/router";
import { useContext, useEffect, useState } from "react";
import GlobalSessionContext from "../store/global-session-context";
import tracking from "../utils/tracking";
import useApi from "./useApi";
import { ALL_PROJECT_DATA } from "../utils/getProjectData";

const getStatus = (duration, threshold, formattedThreshold, gameProgressEvent, isWin) => {
	let status = "";
	let primaryLabel = "Not visited";
	let secondaryLabel = "";

	if (duration > threshold) {
		status = "completed";
		primaryLabel = `Time spent ≥${formattedThreshold}`;
	} else if (duration > 0) {
		status = "visited";
		primaryLabel = `Time spent <${formattedThreshold}`;
	}

	if (duration > 0 && gameProgressEvent) {
		secondaryLabel = ""; // can use primaryLabel
		if (isWin) {
			status = "completed";
			primaryLabel = "Task completed";
		} else {
			status = "visited";
			primaryLabel = "Task in progress";
		}
	}

	return { status, primaryLabel, secondaryLabel };
};

const useClass = () => {
	const { post } = useApi();
	const { globalSession } = useContext(GlobalSessionContext);
	const [classObject, setClassObject] = useState({});
	const [classLoaded, setClassLoaded] = useState(false);
	const [lastSynced, setLastSynced] = useState();

	useEffect(async () => {
		if (router.isReady) {
			await post({
				route: "/api/classes/fetch-one",
				input: { profileId: globalSession.profileId, schoolId: globalSession.groups[globalSession.recentGroups[0]].id, classId: router.query.id },
				failHandler: (data) => {
					if (data.content === "not found") {
						router.replace("/404");
					}
				},
				successHandler: (data) => {
					setClassObject(data.content);
					setClassLoaded(true);
				},
			});
		}
	}, [router.isReady, router.query.id]);

	const fetchData = async (filters) => {
		if (!classLoaded) return;
		let data;
		await post({
			route: "/api/retrieve",
			input: { filters: filters },
			successHandler: (_data) => {
				setLastSynced(new Date());
				console.log(_data);
				data = _data;
			},
		});
		return data;
	};

	const fetchReportingData = async () => {
		const filters = [
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

		const postprocessData = await fetchData(filters);

		const processData = (event, project, license, subsystem, type = "default") => {
			return postprocessData
				.filter((item) => item.event === event && item.properties.project === project && item.properties.licenses.includes(license) && (subsystem ? item.properties.subsystem === subsystem : true))
				.map((item) => ({ start: new Date(item.properties.start), duration: item.properties.duration, type: type }));
		};

		const processCreateData = (project, subsystems, license) => {
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

		return classObject.students.map((student) => {
			let projectData = {};
			for (let i = 0; i < ALL_PROJECT_DATA.length; i++) {
				projectData[ALL_PROJECT_DATA[i].query] = [
					{ label: "Define", name: "define", bars: processData("project_define", ALL_PROJECT_DATA[i].query, student.licenseId) },
					{ label: "Imagine", name: "imagine", bars: processData("project_imagine", ALL_PROJECT_DATA[i].query, student.licenseId) },
					...processCreateData(ALL_PROJECT_DATA[i].query, ALL_PROJECT_DATA[i].subsystems, student.licenseId),
					{ label: "Improve", name: "improve", bars: processData("code_improve_time", ALL_PROJECT_DATA[i].query, student.licenseId) },
				];
			}
			return { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: projectData };
		});
	};

	const fetchProgressData = async () => {
		const filters = [
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

		const postprocessData = await fetchData(filters);

		const processData = (event, project, license, threshold, subsystem, gameProgressEvent) => {
			let duration = 0;
			let isWin = false;
			for (let k = 0; k < postprocessData.length; k++) {
				if (
					postprocessData[k].event === event &&
					postprocessData[k].properties.project === project &&
					postprocessData[k].properties.licenses.includes(license) &&
					(subsystem ? postprocessData[k].properties.subsystem === subsystem : true)
				) {
					duration += postprocessData[k].properties.duration;
				}
				if (
					gameProgressEvent &&
					postprocessData[k].event === gameProgressEvent &&
					postprocessData[k].properties.project === project &&
					postprocessData[k].properties.licenses.includes(license) &&
					(subsystem ? postprocessData[k].properties.subsystem === subsystem : true)
				) {
					isWin = postprocessData[k].properties.state === "win";
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

		const processCreateData = (project, subsystems, license) => {
			const createData = {};
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

		const data = classObject.students.map((student) => {
			const studentData = { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: {} };
			for (let i = 0; i < ALL_PROJECT_DATA.length; i++) {
				studentData.projects[ALL_PROJECT_DATA[i].query] = {
					define: processData("project_define", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].define.threshold),
					imagine: processData("project_imagine", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].imagine.threshold),
					create: processCreateData(ALL_PROJECT_DATA[i].query, ALL_PROJECT_DATA[i].subsystems, student.licenseId),
					improve: processData("code_improve_time", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].improve.threshold, undefined, "game_improve_progress"),
				};
			}
			return studentData;
		});

		return data;
	};

	return { classObject, setClassObject, classLoaded, fetchProgressData, fetchReportingData, lastSynced };
};

export default useClass;
