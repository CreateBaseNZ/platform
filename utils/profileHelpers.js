import axios from "axios";

export const updateProfile = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/profile/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler();
	}
	return successHandler();
};

export const changePassword = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/license/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler();
	}
	return successHandler();
};
