// TODO update all API calls
import axios from "axios";
import useHandleResponse from "./useHandleResponse";

const useAuthHelper = () => {
	const { handleResponse } = useHandleResponse();

	const sendForgotPasswordCode = async ({ details, failHandler, successHandler }) => {
		let data = {};
		try {
			data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({ data, successHandler, failHandler });
		}
	};

	const resetPassword = async ({ details, failHandler, successHandler }) => {
		let data = {};
		try {
			data = (await axios.post("/api/auth/reset-password", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({ data, failHandler, successHandler });
		}
	};

	const resendVerificationCode = async ({ successHandler }) => {
		let data = {};
		try {
			data = (await axios.post("/api/auth/account-verification-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({ data, successHandler });
		}
	};

	return { sendForgotPasswordCode, resetPassword, resendVerificationCode };
};

export default useAuthHelper;
