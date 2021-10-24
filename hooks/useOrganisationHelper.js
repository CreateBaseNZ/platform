import axios from "axios";
import { useContext } from "react";
import VisualBellContext from "../store/visual-bell-context";
import useHandleResponse from "./useHandleResponse";

export const getOrgDataAPI = async (criticalHandler) => {
	let orgData;
	try {
		orgData = (await axios.post("/api/organisation/read-account", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}

	return {
		name: orgData.content.name,
		id: orgData.content.metadata.id,
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
	console.log(data);
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler(data.content);
	}
	return successHandler();
};

export const getEducatorLinkAPI = async (criticalHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/invite-educator/generate-link", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "error") {
		return criticalHandler();
	}
	console.log(data);
	return data.content;
};

export const getLearnerLinkAPI = async (criticalHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/invite-learner/generate-link", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "error") {
		return criticalHandler();
	}
	console.log(data);
	return data.content;
};

const sendEmailInvitationAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/invite-educator/send", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
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

const acceptEmailInvitationAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/invite-educator/join", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	console.log(data);
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return failHandler(data.content);
	}
	return successHandler();
};

const useOrganisationHelper = () => {
	const { setVisualBell } = useContext(VisualBellContext);
	const { handleResponse } = useHandleResponse();

	const getOrgData = async (
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getOrgDataAPI(criticalHandler);
	};

	const getOrgUsers = async ({ successHandler }) => {
		let data = {};
		try {
			// data = (await axios.post("/api/organisation/admin/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
			data = {
				status: "success",
				users: {
					students: [
						{ firstName: "John", lastName: "Doe", email: "johndoe@gmail.com" },
						{ firstName: "Doe", lastName: "John", email: "doejohn@gmail.com" },
						{ firstName: "Dohn", lastName: "Joe", email: "dohnjoe@gmail.com" },
					],
					teachers: [
						{ firstName: "Jane", lastName: "Smith", email: "janesmith@gmail.com" },
						{ firstName: "Smith", lastName: "Jane", email: "smithjane@gmail.com" },
						{ firstName: "Sane", lastName: "Jith", email: "sanejith@gmail.com" },
					],
					admins: [{ firstName: "Bob", lastName: "Turd", email: "bubturd@gmail.com" }],
				},
			};
		} catch (error) {
			data.status = "error";
		} finally {
			return handleResponse({ data, successHandler });
		}
	};

	const createOrg = ({
		details,
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setVisualBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setVisualBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		createOrgAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const joinOrgEducator = async ({
		details,
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setVisualBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setVisualBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		joinOrgEducatorAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const getEducatorLink = async (
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getEducatorLinkAPI(criticalHandler);
	};

	const getLearnerLink = async (
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getLearnerLinkAPI(criticalHandler);
	};

	const sendEmailInvitation = async ({
		details,
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setVisualBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setVisualBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		sendEmailInvitationAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const acceptEmailInvitation = async ({
		details,
		criticalHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		errorHandler = () =>
			setVisualBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		failHandler = () =>
			setVisualBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			}),
		successHandler = () =>
			setVisualBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		acceptEmailInvitationAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	return { getOrgData, getOrgUsers, createOrg, joinOrgEducator, getEducatorLink, getLearnerLink, sendEmailInvitation, acceptEmailInvitation };
};

export default useOrganisationHelper;
