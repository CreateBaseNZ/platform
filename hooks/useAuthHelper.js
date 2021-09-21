import axios from "axios";

const sendForgotPasswordCodeAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
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

const resetPasswordAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/auth/reset-password", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	if (data.status === "critical error") {
		return criticalHandler();
	} else if (data.status === "error") {
		return errorHandler();
	} else if (data.status === "failed") {
		return data.content.code ? failHandler() : successHandler();
	}
	return successHandler();
};

const verifyAccountAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/auth/account-verify", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
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

const resendVerificationCodeAPI = async (criticalHandler, successHandler) => {
	let data;
	try {
		data = (await axios.post("/api/auth/account-verification-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		return criticalHandler();
	}
	return successHandler();
};

const useAuthHelper = ({ setBell }) => {
	const sendForgotPasswordCode = ({
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
		sendForgotPasswordCodeAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const resetPassword = ({
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
		resetPasswordAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const verifyAccount = async ({
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
		await verifyAccountAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	const resendVerificationCode = ({
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
		resendVerificationCodeAPI(criticalHandler, successHandler);
	};

	return { sendForgotPasswordCode, resetPassword, verifyAccount, resendVerificationCode };
};

export default useAuthHelper;
