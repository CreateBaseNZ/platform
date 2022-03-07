// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.API_KEY_PUBLIC !== process.env.API_KEY_PUBLIC) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// Integration Logic
	// Fetch the group
	let data;
	try {
		data = (
			await axios.post(process.env.PREFIX_BACKEND + "/group/retrieve", {
				API_KEY_PRIVATE: process.env.API_KEY_PRIVATE,
				input: {
					query: { _id: input.schoolId },
					option: { license: [], profile: [], account: [] },
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	// Construct the return array object
	let users = [];
	users = users.concat(constructUsers(data.content[0].licenses.active));
	users = users.concat(constructUsers(data.content[0].licenses.queue));
	// TODO: Check the privileges
	return res.send({ status: "succeeded", content: users });
}

// HELPERS ==================================================

const constructUsers = (licenses) => {
	return licenses.map((license) => {
		return {
			profileId: license.profile._id,
			licenseId: license._id,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			role: license.role,
			status: license.status,
			email: license.profile.account.local ? license.profile.account.local.email : license.profile.account.google.email,
			message: license.status === "requested" ? license.metadata.requestMessage : "",
		};
	});
};

// END ======================================================
