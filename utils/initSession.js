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
	return {
		name: orgData.content.name,
		city: orgData.content.location.city,
		country: orgData.content.location.country,
		admins: orgData.content.numberOfLicenses.admin,
		educators: orgData.content.numberOfLicenses.educator,
		learners: orgData.content.numberOfLicenses.learner,
	};
};

const initSession = async (session, callback) => {
	if (session) {
		const input = { properties: ["displayName"] };
		let userData;
		try {
			userData = (await axios.post("/api/profile/read", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: input }))["data"];
		} catch (error) {
			// TODO handle errors
			if (error.response) {
				userData = error.response.data;
			} else if (error.request) {
				userData = { status: "error", content: error.request };
			} else {
				userData = { status: "error", content: error.message };
			}
		}
		let org = null;
		if (session.user.organisation) {
			org = await getOrgData();
		}

		return callback({
			type: session.user.access,
			org: org,
			displayName: userData.content.displayName,
		});
	}
};

export default initSession;
