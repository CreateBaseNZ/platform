import axios from "axios";

export const getOrgDataAPI = async (criticalHandler) => {
	let orgData;
	try {
		orgData = (await axios.post("/api/organisation/read-account", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	return {
		name: orgData.content.name,
		city: orgData.content.location.city,
		country: orgData.content.location.country,
		admins: orgData.content.numberOfLicenses.admin,
		educators: orgData.content.numberOfLicenses.educator,
		learners: orgData.content.numberOfLicenses.learner,
	};
};

const createOrgAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/create", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler(data.content);
	}
	return successHandler();
};

const joinOrgEducatorAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/join-educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler(data.content);
	}
	return successHandler();
};

const useOrganisationHelper = ({ setBell }) => {
	const getOrgData = async (
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getOrgDataAPI(criticalHandler);
	};

	const createOrg = ({
		details,
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		createOrgAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const joinOrgEducator = ({
		details,
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		joinOrgEducatorAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	return { getOrgData, createOrg, joinOrgEducator };
};

export default useOrganisationHelper;
