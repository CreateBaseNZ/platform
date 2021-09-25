import axios from "axios";

const signUpEducatorAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/signup/educator", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
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

const validateUsernameAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/signup/validate-username", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
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

const signUpLearnerAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/signup/learner-organisation", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
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

const useSignupHelper = ({ setBell }) => {
	const signUpEducator = ({
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
		signUpEducatorAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const validateUsername = ({
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
		validateUsernameAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const signUpLearner = ({
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
		signUpLearnerAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	return { signUpEducator, validateUsername, signUpLearner };
};

export default useSignupHelper;
