// TODO: Integration - Review
// IMPORT ===================================================

import axios from "axios";

// TEST OUTPUT ==============================================

let output = {
	// recentGroups: [0, 1, 2],
	// groups: [
	// 	{ id: "bdsc", name: "Botany Downs Secondary School", role: "teacher", numOfUsers: { admins: 1, teachers: 3, students: 78 }, type: "school" },
	// 	{ id: "rc", name: "Rosehill College", role: "admin", numOfUsers: { admins: 2, teachers: 2, students: 64 }, type: "school" },
	// 	{ id: "spp", name: "Shelly Park Primary", role: "student", numOfUsers: { admins: 1, teachers: 1, students: 34 }, type: "school" },
	// 	{ id: "school_trial", name: "School trial as an admin", role: "admin", numOfUsers: { admins: 1, teachers: 0, students: 0 }, type: "school" },
	// 	{ id: "does", name: "The Doe's", role: "member", numOfUsers: { members: 5 }, type: "family" },
	// 	{ id: "family_trial", name: "Family trial as an admin", role: "admin", numOfUsers: { members: 1 }, type: "family" },
	// ],
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
		data = (
			await axios.post(process.env.ROUTE_URL + "/session", {
				PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
				input: {
					account: input.accountId,
					date: input.date,
					properties: input.properties,
				},
			})
		)["data"];
	} catch (error) {
		data = { status: "error", content: error };
	}
	console.log(data.content);
	if (data.status !== "succeeded") return res.send({ status: "error" });
	return res.send({ status: "succeeded", content: { ...output, ...data.content } });
}

// HELPERS ==================================================

// END ======================================================
