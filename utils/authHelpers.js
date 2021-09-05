import router from "next/router";
import { signIn } from "next-auth/client";
import axios from "axios";

export const getOrgData = async () => {
	let orgData;
	try {
		orgData = (await axios.post("/api/organisation/read-account", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY }))["data"];
	} catch (error) {
		// TODO handle errors
		if (error.response) {
			orgData = error.response.data;
		} else if (error.request) {
			orgData = { status: "error", content: error.request };
		} else {
			orgData = { status: "error", content: error.message };
		}
	}
	console.log(orgData);
	return {
		name: orgData.content.name,
		city: orgData.content.location.city,
		country: orgData.content.location.country,
		admins: orgData.content.numberOfLicenses.admin,
		educators: orgData.content.numberOfLicenses.educator,
		learners: orgData.content.numberOfLicenses.learner,
	};
};

export const initSession = async (session, callback) => {
	if (session) {
		let profileData;
		try {
			profileData = (await axios.post("/api/profile/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { properties: ["displayName"] } }))["data"];
		} catch (error) {
			// TODO handle errors
			if (error.response) {
				profileData = error.response.data;
			} else if (error.request) {
				profileData = { status: "error", content: error.request };
			} else {
				profileData = { status: "error", content: error.message };
			}
		}
		let licenseData;
		try {
			licenseData = (await axios.post("/api/license/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { properties: ["username"] } }))["data"];
		} catch (error) {
			// TODO handle errors
			if (error.response) {
				licenseData = error.response.data;
			} else if (error.request) {
				licenseData = { status: "error", content: error.request };
			} else {
				licenseData = { status: "error", content: error.message };
			}
		}
		let org = null;
		if (session.user.organisation) {
			org = await getOrgData();
		}

		return callback({
			type: session.user.access,
			username: licenseData.content.username,
			displayName: profileData.content.displayName,
			org: org,
		});
	}
};

export const logIn = async (username, password, catastropheHandler, failHandler, successHandler) => {
	const result = await signIn("credentials", {
		redirect: false,
		username: username,
		password: password,
		type: "username",
		PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
	});

	console.log(result);

	// TODO update after streamline
	if (result.error) {
		const error = result.error;
		if (error === "failed") {
			return failHandler();
		} else {
			return catastropheHandler();
		}
	}

	router.replace("/browse");
	successHandler();
};

export const sendForgotPasswordCode = async (email, criticalHandler, errorHandler, failHandler, successHandler) => {
	// let data;
	// try {
	// 	data = (await axios.post("/api/auth/reset-password-email", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { email: email } }))["data"];
	// } catch (error) {
	// 	data = { status: "error", content: error };
	// }
	// if (data.status === "critical error") {
	// 	return criticalHandler()
	// } else if (data.status === "error") {
	// 	return errorHandler()
	// } else if (data.status === "failed") {
	// 	return failHandler();
	// }
	successHandler();
};
