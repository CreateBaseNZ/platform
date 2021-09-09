import axios from "axios";

const updateProfileAPI = async (details, criticalHandler, errorHandler, failHandler, successHandler) => {
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

const useProfileHelper = ({ setBell }) => {
	const updateProfile = ({
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
		updateProfileAPI(details, criticalHandler, errorHandler, failHandler, successHandler);
	};

	return { updateProfile };
};

export default useProfileHelper;
