// TODO: Integration - Backend

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
	// Test Logic
	let data;
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_UPDATED_USERS_LIST, // includes both existing users and new users successfully added
		};
	} // no failure mode
	console.log(data);
	return res.send(data);
}

// HELPERS ==================================================

// END ======================================================
