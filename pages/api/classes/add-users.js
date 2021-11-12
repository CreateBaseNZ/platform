// TODO: Integration - Test

// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

const DUMMY_UPDATED_USERS_LIST = {
	teachers: ["asdfsdf", "asdfsdf"],
	students: [
		{ accountId: "abc123", firstName: "asd", lastName: "asfsdf" },
		{ accountId: "gh", firstName: "asdf", lastName: "df" },
		{ accountId: "asdf", firstName: "ssa", lastName: "sdf" },
	],
};

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
	// 		content: DUMMY_UPDATED_USERS_LIST, // includes both existing users and new users successfully added
	// 	};
	// } // no failure mode
	// Integration Logic
	// Add each user
	for (let i = 0; i < input.users.length; i++) {
		const licenseId = input.licenseIds[i];
		let data;
		try {
			data = (
				await axios.post(process.env.ROUTE_URL + "/class/add-member", {
					PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
					input: { class: input.classId, license: licenseId, date: input.date },
				})
			)["data"];
		} catch (error) {
			data = { status: "error", content: error };
		}
		if (data.status !== "succeeded") return res.send({ status: "error" });
	}
	return res.send({ status: "succeeded" });
}

// HELPERS ==================================================

// END ======================================================
