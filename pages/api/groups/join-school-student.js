// IMPORT ===================================================

import axios from "axios";

// OUTPUT ===================================================

const DUMMY_GROUP = {
	id: "mit",
	name: "Massachusetts Institute of Technology",
	role: "student",
	numOfUsers: { admins: 2, teachers: 5, students: 350 },
	type: "school",
};

// MAIN =====================================================

export default async function (req, res) {
	if (req.method !== "POST") return;
	if (req.body.PUBLIC_API_KEY !== process.env.PUBLIC_API_KEY) {
		return res.send({ status: "critical error" });
	}
	let data;
	// Test Logic
	if (req.body.status === "succeeded") {
		data = {
			status: "succeeded",
			content: DUMMY_GROUP,
		};
	} else if (req.body.status === "failed 1") {
		data = {
			status: "failed",
			content: "incorrect",
		};
	} else if (req.body.status === "failed 2") {
		data = {
			status: "failed",
			content: "expired",
		};
	} else if (req.body.status === "failed 3") {
		data = {
			status: "failed",
			content: "already joined",
		};
	}
	console.log(data);
	// // Integration Logic
	// // Fetch the group with the specified student code
	// try {
	// 	data = (
	// 		await axios.post(process.env.ROUTE_URL + "/group/retrieve-by-code", {
	// 			PRIVATE_API_KEY: process.env.PRIVATE_API_KEY,
	// 			input: { role: "school-student", code: req.body.input.code },
	// 		})
	// 	)["data"];
	// } catch (error) {
	// 	data = { status: "error", content: error };
	// }
	// // Check if a group with the specified student code exist
	// if (data.status === "failed" && data.content.group) {
	// 	return res.send({ status: "failed", content: "incorrect" });
	// }
	// // Fetch user's profile
	return res.send(data);
}

// HELPER ===================================================

// END  =====================================================
