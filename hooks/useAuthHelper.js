// TODO update all API calls
import axios from "axios";
import useHandleResponse from "./useHandleResponse";
import { signIn } from "next-auth/react";

const useAuthHelper = () => {
	const { handleResponse } = useHandleResponse();

	// completed
	const signUp = async ({ details, failHandler, successHandler }) => {
		let data = {};
		try {
			data = (await axios.post("/api/signup", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { ...details, date: new Date().toString() } }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({ data, failHandler: () => failHandler(data.content), successHandler });
		}
	};

	// completed
	const logIn = async ({ email, password, failHandler }) => {
		const result = await signIn("credentials", {
			user: email,
			password: password,
			PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		});
		if (result.error) {
			const error = JSON.parse(result.error);
			if (error.status === "failed") {
				return failHandler(error.content);
			} else {
				return router.push("/404");
			}
		}
	};

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

	const verifyAccount = async ({ details, failHandler, successHandler }) => {
		let data = {};
		try {
			data = (await axios.post("/api/auth/account-verify", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: details }))["data"];
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

	return { signUp, logIn, sendForgotPasswordCode, resetPassword, verifyAccount, resendVerificationCode };
};

export default useAuthHelper;
