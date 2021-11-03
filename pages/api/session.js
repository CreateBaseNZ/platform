// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

let output = {
	accountId: "617cb718450a3488115f7844",
	profileId: "617cb718450a3488115f7845",
	email: "louiscflin@gmail.com",
	firstName: "Louis",
	lastName: "Lin",
	verified: true,
	recentGroups: [
		{ id: "123", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
		{ id: "456", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
		{ id: "789", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	],
	numOfGroups: 5,
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
	// 		content: DUMMY_SESSION,
	// 	};
	// }
	// Integration Logic
	let data;
	try {
		data = (await axios.post(process.env.ROUTE_URL + "/session", { PRIVATE_API_KEY: process.env.PRIVATE_API_KEY, input: { account: input.accountId, date: input.date } }))["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	if (data.status !== "succeeded") return res.send({ status: "error" });
	Object.assign(output, data.content);
	return res.send({ status: "succeeded", content: output });
}

// HELPERS ==================================================

// END ======================================================
