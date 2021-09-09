import axios from "axios";

const changePasswordAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
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

const useLicenseHelper = ({ setBell }) => {
	const changePassword = ({
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
		failHandler = () => {
			setBell({
				type: "error",
				message: "Oops! An error occurred, please try again",
			});
		},
		successHandler = () => {
			setBell({
				type: "success",
				message: "Success!",
			});
		},
	}) => {
		changePasswordAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	return { changePassword };
};

export default useLicenseHelper;
