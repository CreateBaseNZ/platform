// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_USERS = [
	{
		accountId: "accountId123",
		profileId: "profileId123",
		email: "asd@asdf.com",
		firstName: "Cash",
		lastName: "Buttercup",
		role: "student",
	},
	{
		accountId: "accountId123",
		profileId: "profileId123",
		email: "asd@asdf.com",
		firstName: "Cash",
		lastName: "Buttercup",
		role: "student",
	},
	{
		accountId: "accountId123",
		profileId: "profileId123",
		email: "asd@asdf.com",
		firstName: "Cash",
		lastName: "Buttercup",
		role: "teacher",
	},
	{
		accountId: "accountId123",
		profileId: "profileId123",
		email: "asd@asdf.com",
		firstName: "Cash",
		lastName: "Buttercup",
		role: "admin",
	},
];

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	const input = req.body.input;
	// // Test Logic
	// let data;
	// if (req.body.status === "succeeded") {
	// 	data = {
	// 		status: "succeeded",
	// 		content: DUMMY_USERS,
	// 	};
	// } else if (req.body.status === "failed 1") {
	// 	// this fail mode is only required if we double check access
	// 	// do we want to allow teachers to be able to access Manage Group but only the Students tab?
	// 	data = {
	// 		status: "failed",
	// 		content: "unauthorised",
	// 	};
	// }
	// Integration Logic
	// Fetch the group
	let data;
	try {
		data = (
			await axios.post(process.env.ROUTE_URL + "/group/retrieve", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
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
	users = users.concat(constructUsers(data.content[0].licenses.inactive));
	// TODO: Check the privileges
	return res.send({ status: "succeeded", content: users });
}

// HELPERS ==================================================

const constructUsers = (licenses) => {
	return licenses.map((license) => {
		return {
			accountId: license.profile.account.local,
			profileId: license.profile._id,
			licenseId: license._id,
			firstName: license.profile.name.first,
			lastName: license.profile.name.last,
			role: license.role,
			status: license.status,
			email: license.profile.account.email,
		};
	});
};

// END ======================================================
