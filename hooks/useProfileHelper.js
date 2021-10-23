// TODO update all API calls

import axios from "axios";
import useHandleResponse from "./useHandleResponse";

const useProfileHelper = () => {
	const { handleResponse } = useHandleResponse();

	const updateProfile = async ({ details, failHandler = () => {}, successHandler = () => {} }) => {
		let data;
		try {
			data = (await axios.post("/api/profile/update", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
		} catch (error) {
			return criticalHandler();
		} finally {
			handleResponse({ data, failHandler, successHandler });
		}
	};

	return { updateProfile };
};

export default useProfileHelper;
