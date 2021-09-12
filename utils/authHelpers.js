import router from "next/router";
import { signIn } from "next-auth/client";
import axios from "axios";
import { getSession } from "next-auth/client";
import { getOrgDataAPI } from "../hooks/useOrganisationHelper";

export const initSession = async (loading, session, callback) => {
	if (!loading) {
		if (session) {
			let profileData;
			try {
				profileData = (await axios.post("/api/profile/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { properties: ["displayName"], saves: ["teachingFirst"] } }))["data"];
			} catch (error) {
				alert("Something went wrong, please reload the page and try again. If this problem persists, please get in touch with us.");
			}
			let licenseData;
			try {
				licenseData = (await axios.post("/api/license/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: { properties: ["username"] } }))["data"];
			} catch (error) {
				alert("Something went wrong, please reload the page and try again. If this problem persists, please get in touch with us.");
			}
			const { access, verified, organisation } = (await getSession())["user"];
			let org = null;
			if (organisation) {
				org = await getOrgDataAPI();
			}
			return callback({
				loaded: true,
				type: access,
				username: licenseData.content.username,
				displayName: profileData.content.displayName,
				org: org,
				saves: profileData.content.saves,
				verified: access === "learner" ? true : verified,
			});
		} else {
			return callback({
				loaded: true,
				type: null,
			});
		}
	}
};

export const logIn = async (username, password, catastropheHandler, failHandler, successHandler) => {
	const result = await signIn("credentials", {
		redirect: false,
		user: username,
		password: password,
		PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
	});

	if (result.error) {
		const error = JSON.parse(result.error);
		if (error.status === "failed") {
			return failHandler();
		} else {
			return catastropheHandler();
		}
	}

	successHandler();
	router.replace("/onboarding");
};
