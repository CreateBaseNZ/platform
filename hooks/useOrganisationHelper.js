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
		id: orgData.content.metadata.id,
		city: orgData.content.location.city,
		country: orgData.content.location.country,
		admins: orgData.content.numberOfLicenses.admin,
		educators: orgData.content.numberOfLicenses.educator,
		learners: orgData.content.numberOfLicenses.learner,
	};
};

const getOrgUsersAPI = async (criticalHandler) => {
	let data;
	try {
		data = (await axios.post("/api/organisation/admin/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	return data.content;
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

const changeUserPasswordAPI = async (details, criticalHandler, successHandler) => {
	let data;
	console.log(details);
	try {
		data = (await axios.post("/api/organisation/admin/update-learner-license", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	console.log(data);
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

	const getOrgUsers = async (
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getOrgUsersAPI(criticalHandler);
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

	const joinOrgEducator = async ({
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

	const getEducatorLink = async (
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getEducatorLinkAPI(criticalHandler);
	};

	const getLearnerLink = async (
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			})
	) => {
		return getLearnerLinkAPI(criticalHandler);
	};

	const sendEmailInvitation = async ({
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
		sendEmailInvitationAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const acceptEmailInvitation = async ({
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
		acceptEmailInvitationAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const changeUserPassword = async ({
		details,
		criticalHandler = () =>
			setBell({
				type: "catastrophe",
				message: "Oops! Something went wrong, please refresh the page and try again",
			}),
		successHandler = () =>
			setBell({
				type: "success",
				message: "Success!",
			}),
	}) => {
		return changeUserPasswordAPI(details, criticalHandler, successHandler);
	};

	return { getOrgData, getOrgUsers, createOrg, joinOrgEducator, getEducatorLink, getLearnerLink, sendEmailInvitation, acceptEmailInvitation, changeUserPassword };
};

export default useOrganisationHelper;
